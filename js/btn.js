const btnEl = document.querySelectorAll(".btn-switch");
const typeBtns = [btnEl[0], btnEl[1], btnEl[2]];
const videoTypes = ["movie", "series", "episode"];
const decadeBtns = [btnEl[3], btnEl[4], btnEl[5], btnEl[6], btnEl[7]];
const decadeYears = [2020, 2010, 2000, 1990, 1980];
export let searchCategory = "movie";
export let searchDecades = "";
export let typeEl = document.querySelector(".movie-type");
// main의 버튼다루기
export function btnEvents() {
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
}
