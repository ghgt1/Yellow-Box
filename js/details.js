const critics = ["imdb", "rotten", "metaCritic"];
export let detailsEl = document.querySelector(".movie-details");

// 상세정보 fetch.
export async function detailSearch(id) {
  const res = await fetch(
    `https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`
  );
  const json = await res.json();
  // console.log(json);
  return json;
}

// 상세페이지 렌더링
export function renderDetails(details) {
  const imgEl = document.createElement("img");
  // 업스케일링.
  // console.log(details.Poster);
  imgEl.src = details.Poster.replace("SX300", "SX1200");
  imgEl.alt = details.Title;
  imgEl.onerror = function () {
    this.src = "/images/image-not-found.png";
    this.alt = "이미지존재하지않음";
  };
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
    critic.append(logos);
    const points = document.createElement("span");
    // 없는경우 처리필요. 점수들.
    try {
      points.textContent = details.Ratings[i].Value;
    } catch (error) {
      points.textContent = "N/A";
    }
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
