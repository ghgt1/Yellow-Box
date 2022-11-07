// main의 버튼다루기
const btnEl = document.querySelectorAll(".btn-switch");
const btnMovie = btnEl[0];
const btnSeries = btnEl[1];
const btnEpisodes = btnEl[2];
let moviesEl = document.querySelector(".movies");
let typeEl = document.querySelector(".movie-type");
let countEl = document.querySelector(".movie-count");
let searchCategory = "movie";
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

(async () => {
  let page = 1;
  // 타입, 타이틀 불러오기
  let movies = await searchMovies(page++, type);

  renderMovies(movies);
})();

async function searchMovies(page = 1, type = "movie") {
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
    el.href = `detail.html?id=${movie.imdbID}`;
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

function router() {
  const routePath = location.hash;

  // 초기화면 진입
  if (routePath === "") {
  }
}
