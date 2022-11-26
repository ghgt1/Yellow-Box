export let moviesEl = document.querySelector(".movies");
export let countEl = document.querySelector(".movie-count");

// searchMovies의 긴 로직대신 화면 상단 렌더링을 함수로 따로 뺌
function renderTypeAndResults(
  page,
  json,
  searchDecades,
  title,
  type,
  typeEl,
  movies
) {
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
    if (!typeEl.innerHTML) typeEl.append(typeDiv);
    console.log(countEl.innerHTML);
    if (!countEl.innerHTML) countEl.append(countDiv);
  }
}

//영화 검색
export async function searchMovies(
  page = 1,
  type = "movie",
  title = "",
  typeEl,
  searchDecades
) {
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
    promises = [];
    promiseMovies.forEach((x) => {
      promises.push(x.json());
    });
    promiseMovies = await Promise.all(promises);
    console.log(promiseMovies);
    for (let i = 0; i < 10; i++) {
      let { Search: movies2 } = promiseMovies[i];
      if (!movies) movies = [];
      if (!movies2) movies2 = [];
      movies = movies.concat(movies2);
    }
    console.log(movies);
  }
  renderTypeAndResults(page, json, searchDecades, title, type, typeEl, movies);
  return movies;
}

// 이유는 알수없지만 이렇게 하는 순간 모든 이미지가 대체이미지로 출력이됩니다
// 모든 이미지에서 onerror가 발생한다는건데... 이유를 모르겠습니다 ㅜ
// const imageAltHandler = (element) => {
//   element.src = "/images/image-not-found.png";
//   element.alt = "이미지존재하지않음";
// };

// 영화 목록 렌더링
export function renderMovies(movies) {
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
    // imgEl.src = movie.Poster.replace("SX300", "SX1200");
    imgEl.alt = movie.Title;
    // 대체 이미지 구현.
    // imgEl.onerror = imageAltHandler(imgEl);
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
