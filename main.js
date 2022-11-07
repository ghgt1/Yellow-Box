// main의 버튼다루기
const btnEl = document.querySelectorAll(".btn-switch");
const searchEl = document.querySelector(".main-search");
const resEl = document.querySelector(".search-container");
const titleEl = document.querySelector(".input-search");
const btnMovie = btnEl[0];
const btnSeries = btnEl[1];
const btnEpisodes = btnEl[2];
const btn2020s = btnEl[3];
const btn2010s = btnEl[4];
const btn2000s = btnEl[5];
const btn1990s = btnEl[6];
const btn1980s = btnEl[7];
let moviesEl = document.querySelector(".movies");
let typeEl = document.querySelector(".movie-type");
let countEl = document.querySelector(".movie-count");
let searchCategory = "movie";
let searchDecades = "";
let page = 1;
let titleInput = titleEl.value;

btnMovie.addEventListener("click", function () {
  btnMovie.classList.add("active");
  btnSeries.classList.remove("active");
  btnEpisodes.classList.remove("active");
  searchCategory = "movie";
  typeEl.value = searchCategory;
});
btnSeries.addEventListener("click", function () {
  btnMovie.classList.remove("active");
  btnSeries.classList.add("active");
  btnEpisodes.classList.remove("active");
  searchCategory = "series";
  typeEl.value = searchCategory;
});
btnEpisodes.addEventListener("click", function () {
  btnMovie.classList.remove("active");
  btnSeries.classList.remove("active");
  btnEpisodes.classList.add("active");
  searchCategory = "episode";
  typeEl.value = searchCategory;
});

btn2020s.addEventListener("click", function () {
  btn2020s.classList.add("active");
  btn2010s.classList.remove("active");
  btn2000s.classList.remove("active");
  btn1990s.classList.remove("active");
  btn1980s.classList.remove("active");
  searchDecades = "2020";
});
btn2010s.addEventListener("click", function () {
  btn2020s.classList.remove("active");
  btn2010s.classList.add("active");
  btn2000s.classList.remove("active");
  btn1990s.classList.remove("active");
  btn1980s.classList.remove("active");
  searchDecades = "2010";
});
btn2000s.addEventListener("click", function () {
  btn2020s.classList.remove("active");
  btn2010s.classList.remove("active");
  btn2000s.classList.add("active");
  btn1990s.classList.remove("active");
  btn1980s.classList.remove("active");
  searchDecades = "2000";
});
btn1990s.addEventListener("click", function () {
  btn2020s.classList.remove("active");
  btn2010s.classList.remove("active");
  btn2000s.classList.remove("active");
  btn1990s.classList.add("active");
  btn1980s.classList.remove("active");
  searchDecades = "1990";
});
btn1980s.addEventListener("click", function () {
  btn2020s.classList.remove("active");
  btn2010s.classList.remove("active");
  btn2000s.classList.remove("active");
  btn1990s.classList.remove("active");
  btn1980s.classList.add("active");
  searchDecades = "1980";
});

(async () => {
  window.addEventListener("hashchange", router);
  router();
})();

async function searchMovies(page = 1, type = "movie", title = "") {
  console.log(page);
  const res = await fetch(
    `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&type=${type}`
  );
  const json = await res.json();
  const { Search: movies } = json;
  if (page === 1) {
    // 개수가 0개면 undefined가 아닌 0개가나오게함.
    const results = json["totalResults"] || 0;
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
