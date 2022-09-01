const popularLikesID = "SIiKMqhwLydIOrbjMWDR";
const booksLikesID = "Xw75rllkaIR2yHRmFO5z";
const movieLikeID = "nSpXCf8OwFe4avdUrBLW";
const commentsID = "eBP0iSTxsyUrJo2QtVic";
const getPopular = async () => {
    const fetchPopular = await fetch(
      "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=su6Pt4Vu8bMecCsPP5C5kA09UJyPuwAn"
    );
    const fetchedPopular = await fetchPopular.json();
    const popularArray = fetchedPopular.results.slice(1, 13);
    console.log(popularArray);
    displayPopular(popularArray);
  };
  const displayPopular = (populars) => {
    populars.forEach((popular) => {
      document.getElementById("latest-news-div").innerHTML += `
      <div class="each-character-div">
      <h2>${popular.title}</h2>
      <img src=${popular.multimedia[0].url} alt=${popular.title}>
      <p class="byline">${popular.byline}</p>
      <p class="description">${popular.abstract}</p>
      <div class="like-div">
      <p id=${popular.url} class="likes-count">0<p>
      <i id=${popular.url} class="fa fa-thumbs-up popular-like-button" aria-hidden="true"></i>
      </div>
    </div>  
      `;
      loadPopularLike();
      addPopularLike();
    });
  };