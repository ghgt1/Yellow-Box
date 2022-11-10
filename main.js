const btnEl = document.querySelectorAll(".btn-switch");
const searchEl = document.querySelector(".main-search");
const resEl = document.querySelector(".search-container");
const loadEl = document.querySelector(".loader");
const titleEl = document.querySelector(".input-search");
const typeBtns = [btnEl[0], btnEl[1], btnEl[2]];
const videoTypes = ["movie", "series", "episode"];
const decadeBtns = [btnEl[3], btnEl[4], btnEl[5], btnEl[6], btnEl[7]];
const decadeYears = [2020, 2010, 2000, 1990, 1980];
const critics = ["imdb", "rotten", "metaCritic"];
const ciritcsPoints = ["imdbRating", ""];
let moviesEl = document.querySelector(".movies");
let typeEl = document.querySelector(".movie-type");
let countEl = document.querySelector(".movie-count");
let detailsEl = document.querySelector(".movie-details");
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
})();

async function searchMovies(page = 1, type = "movie", title = "") {
  const res = await fetch(
    `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&type=${type}&y=${searchDecades}`
  );
  const json = await res.json();
  console.log(json);
  let { Search: movies } = json;
  // 여기 코드 수정하자. await을 for문안에 넣으면 망하는지름길인듯.
  if (searchDecades != "") {
    let promises = [];
    for (let i = searchDecades + 1; i <= searchDecades + 10; i++) {
      const res2 = fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&type=${type}&y=${i}`
      );
      promises.push(res2);
    }
    // promise all로 한번에 받아온다. for문에서 하나하나 await하면 비동기 의미가없음.
    let promiseMovies = await Promise.all(promises);
    console.log(promiseMovies);
    for (let i = 0; i < 10; i++) {
      const json2 = await promiseMovies[i].json();
      let { Search: movies2 } = json2;
      if (!movies) movies = [];
      if (!movies2) movies2 = [];
      movies = movies.concat(movies2);
    }
  }
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

async function detailSearch(id) {
  const res = await fetch(
    `https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`
  );
  const json = await res.json();
  console.log(json);
  return json;
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
    imgEl.alt = movie.Title;
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
  console.log("렌더링끝");
}

function renderDetails(details) {
  const imgEl = document.createElement("img");
  // 업스케일링.
  imgEl.src = details.Poster.replace("SX300", "SX700");
  imgEl.alt = details.Title;
  imgEl.width = 400;
  imgEl.height = 600;
  detailsEl.append(imgEl);
  const detailSpecs = document.createElement("div");
  const title = document.createElement("h1");
  title.textContent = details.Title;
  const infos = document.createElement("span");
  infos.textContent = `${details.Released} · ${details.Runtime} · ${details.Country}`;
  const plots = document.createElement("h2");
  plots.textContent = details.Plot;
  const ratings = document.createElement("div");
  ratings.textContent = "Ratings";
  const ratingWrap = document.createElement("div");
  critics.forEach((x, i) => {
    const critic = document.createElement("div");
    const logos = document.createElement("img");
    logos.src = `images/${x}.png`;
    logos.alt = x;
    logos.height = 30;
    const points = document.createElement("span");
    // 없는경우 처리필요. 점수들.
    points.textContent = details.Ratings[i].Value;
    critic.append(logos, points);
    ratingWrap.append(critic);
  });
  ratingWrap.classList.add("rate-wrap");
  const actors = document.createElement("div");
  actors.textContent = "Actors";
  const actorsWrap = document.createElement("p");
  actorsWrap.textContent = details.Actors;
  actors.append(actorsWrap);
  const director = document.createElement("div");
  director.textContent = "Director";
  const directorWrap = document.createElement("p");
  directorWrap.textContent = details.Director;
  director.append(directorWrap);
  const production = document.createElement("div");
  production.textContent = "Production";
  const productionWrap = document.createElement("p");
  productionWrap.textContent = details.Production;
  production.append(productionWrap);
  const genre = document.createElement("div");
  genre.textContent = "Genre";
  const genreWrap = document.createElement("p");
  genreWrap.textContent = details.Genre;
  genre.append(genreWrap);
  detailSpecs.append(
    title,
    infos,
    plots,
    ratings,
    ratingWrap,
    actors,
    director,
    production,
    genre
  );
  detailsEl.append(detailSpecs);
  detailSpecs.classList.add("movie-specs");
}

async function router() {
  const routePath = location.hash;
  console.log("라우터새로고침");
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
    loadEl.classList.remove("loader-hidden");
    searchEl.classList.remove("show");
    searchEl.classList.add("hidden");
    resEl.classList.remove("hidden");
    resEl.classList.add("show");
    console.log("검색창입니다");
    let movies = await searchMovies((page = 1), searchCategory, titleEl.value);
    page++;
    console.log(movies);
    moviesEl.innerHTML = "";
    detailsEl.innerHTML = "";
    if (!movies) {
      loadEl.classList.add("loader-hidden");
      moviesEl.textContent = "OOPS! NO CONTENT AVAILABLE";
    } else {
      renderMovies(movies);
      loadEl.classList.add("loader-hidden");
    }
  } else if (routePath.includes("#/detail")) {
    loadEl.classList.remove("loader-hidden");
    resEl.classList.remove("show");
    resEl.classList.add("hidden");
    let id = routePath.substring(routePath.indexOf("tt"));
    let details = await detailSearch(id);
    typeEl.innerHTML = "";
    countEl.innerHTML = "";
    detailsEl.innerHTML = "";
    try {
      renderDetails(details);
    } catch (error) {
      loadEl.classList.add("loader-hidden");
    }
    loadEl.classList.add("loader-hidden");
    console.log("상세정보창입니다.");
  }
}

// 무한 스크롤 구현
async function loadMoreMovies() {
  loadEl.classList.remove("loader-hidden");
  movies = await searchMovies(page++, searchCategory, titleEl.value);
  console.log("무한스크롤작동");
  renderMovies(movies);
  loadEl.classList.add("loader-hidden");
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
