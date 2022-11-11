import { detailSearch, renderDetails, detailsEl } from "./details.js";
import {
  searchMovies,
  renderMovies,
  moviesEl,
  typeEl,
  countEl,
} from "./search.js";
import { btnEvents, searchDecades, typeEl } from "./btn.js";
const searchEl = document.querySelector(".main-search");
const resEl = document.querySelector(".search-container");
const loadEl = document.querySelector(".loader");
const titleEl = document.querySelector(".input-search");
let searchCategory = "movie";
let page = 1;
let titleInput = titleEl.value;

// 버튼활성화
btnEvents();

// 라우터를 담은 즉시실행함수.
(async () => {
  window.addEventListener("hashchange", router);
})();

//라우터처리
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
    // 검색화면 진입
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
    // 검색어가없으면.
    if (!movies || movies.length === 0) {
      loadEl.classList.add("loader-hidden");
      moviesEl.textContent = "OOPS! NO CONTENT AVAILABLE";
    } else {
      renderMovies(movies);
      loadEl.classList.add("loader-hidden");
    }
  } else if (routePath.includes("#/detail")) {
    // 상세정보페이지 진입
    loadEl.classList.remove("loader-hidden");
    resEl.classList.remove("show");
    resEl.classList.add("hidden");
    let id = routePath.substring(routePath.indexOf("tt"));
    let details = await detailSearch(id);
    typeEl.innerHTML = "";
    countEl.innerHTML = "";
    detailsEl.innerHTML = "";
    renderDetails(details);
    loadEl.classList.add("loader-hidden");
    console.log("상세정보창입니다.");
  }
}

// 무한 스크롤 구현
async function loadMoreMovies() {
  loadEl.classList.remove("loader-hidden");
  let movies = await searchMovies(page++, searchCategory, titleEl.value);
  console.log(movies);
  console.log("무한스크롤작동");
  // alert("무한스크롤작동");
  console.log(movies);
  console.log(page, titleEl.value);
  if (!movies) {
    loadEl.classList.add("loader-hidden");
    location.hash = "/";
    typeEl.innerHTML = "";
    countEl.innerHTML = "";
  } else {
    renderMovies(movies);
    loadEl.classList.add("loader-hidden");
  }
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
  threshold: 1,
});
observer.observe(bottom);
