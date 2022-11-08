const btnEl = document.querySelectorAll(".btn-switch");
const searchEl = document.querySelector(".main-search");
const resEl = document.querySelector(".search-container");
const titleEl = document.querySelector(".input-search");
const typeBtns = [btnEl[0], btnEl[1], btnEl[2]];
const videoTypes = ["movie", "series", "episode"];
const decadeBtns = [btnEl[3], btnEl[4], btnEl[5], btnEl[6], btnEl[7]];
const decadeYears = [2020, 2010, 2000, 1990, 1980];
let moviesEl = document.querySelector(".movies");
let typeEl = document.querySelector(".movie-type");
let countEl = document.querySelector(".movie-count");
let searchCategory = "movie";
let searchDecades = "";
let page = 1;
let titleInput = titleEl.value;

// main의 버튼다루기
typeBtns.forEach((x, i) => {
  x.addEventListener("click", function () {
    const tmp = typeBtns.filter((y) => y !== x);
    console.log(tmp);
    tmp.forEach((y) => {
      y.classList.remove("active");
    });
    x.classList.add("active");
    searchCategory = videoTypes[i];
    typeEl.value = searchCategory;
  });
});

decadeBtns.forEach((x, i) => {
  x.addEventListener("click", function () {
    if (searchDecades === decadeYears[i]) {
      x.classList.remove("active");
      searchDecades = "";
    } else {
      x.classList.add("active");
      searchDecades = decadeYears[i];
    }
    const tmp = decadeBtns.filter((y) => y !== x);
    console.log(tmp);
    tmp.forEach((y) => {
      y.classList.remove("active");
    });
  });
});

// 라우터를 담은 즉시실행함수.
(async () => {
  window.addEventListener("hashchange", router);
  router();
})();

async function searchMovies(page = 1, type = "movie", title = "") {
  const res = await fetch(
    `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&type=${type}&y=${searchDecades}`
  );
  const json = await res.json();
  let { Search: movies } = json;
  if (searchDecades != "") {
    for (let i = searchDecades + 1; i <= searchDecades + 10; i++) {
      const res2 = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&type=${type}&y=${i}`
      );
      const json2 = await res2.json();
      let { Search: movies2 } = json2;
      if (!movies) movies = [];
      if (!movies2) movies2 = [];
      console.log(movies2);
      movies = movies.concat(movies2);
    }
  }
  console.log(movies);
  if (page === 1) {
    // 개수가 0개면 undefined가 아닌 0개가나오게함.
    let results = json["totalResults"] || 0;
    if (searchDecades) results = movies.length;
    console.log(searchDecades);
    // 영화 종류정보와 개수정보 출력
    const countDiv = document.createElement("h2");
    const typeDiv = document.createElement("h1");
    countDiv.textContent = `Total ${results} results for "${title}"`;
    type == "series"
      ? (typeDiv.textContent = `${type.toUpperCase()}`)
      : (typeDiv.textContent = `${type.toUpperCase()}S`);
    typeEl.append(typeDiv);
    countEl.append(countDiv);
  }
  return movies;
}

function renderMovies(movies) {
  console.log(movies);
  for (const movie of movies) {
    const el = document.createElement("a");
    el.classList.add("movie");
    el.href = `#/detail/${movie.imdbID}`;
    const infoEl = document.createElement("div");
    infoEl.classList.add("info");
    const h1El = document.createElement("h1");
    h1El.textContent = movie.Title;
    h1El.classList.add("movie-title");
    const h2El = document.createElement("h2");
    h2El.textContent = movie.Year;
    h2El.classList.add("movie-year");
    infoEl.append(h1El, h2El);
    const imgEl = document.createElement("img");
    imgEl.src = movie.Poster;
    // 대체 이미지 구현.
    imgEl.onerror = function () {
      this.src = "/images/image-not-found.png";
      this.alt = "이미지존재하지않음";
    };
    imgEl.width = 230;
    imgEl.height = 345;
    el.append(imgEl, infoEl);
    moviesEl.append(el);
  }
}

async function router() {
  const routePath = location.hash;
  // 타입, 타이틀 불러오기
  // 초기화면 진입
  if (routePath === "") {
    typeEl.innerHTML = "";
    countEl.innerHTML = "";
    searchEl.classList.remove("hidden");
    searchEl.classList.add("show");
    resEl.classList.remove("show");
    resEl.classList.add("hidden");
    console.log("메인화면입니다");
  } else if (routePath.includes("#/search")) {
    let movies = await searchMovies((page = 1), searchCategory, titleEl.value);
    page++;
    moviesEl.innerHTML = "";
    searchEl.classList.remove("show");
    searchEl.classList.add("hidden");
    resEl.classList.remove("hidden");
    resEl.classList.add("show");
    renderMovies(movies);
    console.log("검색창입니다");
  } else if (routePath.includes("#/detail")) {
    typeEl.innerHTML = "";
    countEl.innerHTML = "";
    resEl.classList.remove("show");
    resEl.classList.add("hidden");
    console.log("상세정보창입니다.");
  }
}

// 무한 스크롤 구현
async function loadMoreMovies() {
  movies = await searchMovies(page++, searchCategory, titleEl.value);
  console.log("무한스크롤작동");
  renderMovies(movies);
}

const bottom = document.querySelector(".bottom");

const intersectionCallback = (entries) => {
  const routePath = location.hash;
  entries.forEach((entry) => {
    if (entry.isIntersecting && routePath.includes("#/search")) {
      loadMoreMovies();
    }
  });
};

const observer = new IntersectionObserver(intersectionCallback, {
  threshold: 0.3,
});
observer.observe(bottom);

function pressEnter(f) {
  if (f.keyCode === 13) {
    location.href = "#/search";
  }
}
