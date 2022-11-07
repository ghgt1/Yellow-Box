// main의 버튼다루기
const btnEl = document.querySelectorAll(".btn-switch");
const btnMovie = btnEl[0];
const btnSeries = btnEl[1];
const btnEpisodes = btnEl[2];
const typeEl = document.querySelector("#hidden-val");
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
typeEl.value = searchCategory;
