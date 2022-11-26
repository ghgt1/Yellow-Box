import { detailSearch, renderDetails, detailsEl } from "./details.js";
import { searchMovies, renderMovies, moviesEl, countEl } from "./search.js";
const searchEl = document.querySelector(".main-search");
const resEl = document.querySelector(".search-container");
const loadEl = document.querySelector(".loader");
const titleEl = document.querySelector(".input-search");
const typeEl = document.querySelector(".movie-type");
const submitBtn = document.querySelector(".btn-search");
let searchCategory = "";
let searchDecades = "";
let page = 1;
let movieTitle = "";
require("dotenv").config();
// search 버튼 감지(urlsearchparms가 아닌 해쉬값이지만, 쿼리문 비슷하게 구성해보았습니다.)
submitBtn.addEventListener("click", setQuery);
titleEl.addEventListener("keypress", (event) => {
  if (event.key === "Enter") setQuery();
});

function setQuery() {
  window.location.href = `#/search/${titleEl.value}`;
  // 영화정보를 단순 스트링정보로 안빼오고, 이렇게 저장해놔도 좋을까요?
  movieTitle = titleEl.value;
}

// 라우터 실행.
window.addEventListener("hashchange", router);

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
    detailsEl.classList.add("hidden");
    detailsEl.classList.remove("details-show");
    console.log("메인화면입니다");
  } else if (routePath.includes("#/search")) {
    // 검색화면 진입
    searchCategory = document.querySelector(".btn-switch:checked")
      ? document.querySelector(".btn-switch:checked").value
      : "";
    searchDecades = document.querySelector(".btn-switch-decades:checked")
      ? Number(document.querySelector(".btn-switch-decades:checked").value)
      : "";
    // console.log(searchDecades, searchCategory);
    // alert(searchCategory);
    typeEl.value = searchCategory;
    console.log(searchDecades, searchCategory);
    loadEl.classList.remove("loader-hidden");
    searchEl.classList.remove("show");
    searchEl.classList.add("hidden");
    resEl.classList.remove("hidden");
    resEl.classList.add("show");
    detailsEl.classList.add("hidden");
    detailsEl.classList.remove("details-show");
    console.log("검색창입니다");
    let movies = await searchMovies(
      (page = 1),
      searchCategory,
      movieTitle,
      typeEl,
      searchDecades
    );
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
    detailsEl.classList.remove("hidden");
    detailsEl.classList.add("details-show");
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
  let movies = await searchMovies(
    page++,
    searchCategory,
    movieTitle,
    typeEl,
    searchDecades
  );
  console.log(movies);
  console.log("무한스크롤작동");
  // alert("무한스크롤작동");
  console.log(movies);
  console.log(page, movieTitle);
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

// insetesection observer로 무한스크롤 구현
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
