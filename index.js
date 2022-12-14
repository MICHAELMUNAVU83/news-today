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
  const getBooks = async () => {
    const fetchBooks = await fetch(
      "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=su6Pt4Vu8bMecCsPP5C5kA09UJyPuwAn"
    );
    const fetchedBooks = await fetchBooks.json();
    displayBooks(fetchedBooks.results);
  };
  const displayBooks = (Books) => {
    Books.books.forEach((book) => {
      if(book.book_image !== null){
        document.getElementById("top-reads-div").innerHTML += `
        <div class="each-character-div">
        <h2 class="byline" >RANK: ${book.rank}</h2>
        <h2 class="byline">TITLE :${book.title}</h2>
        <img src=${book.book_image} alt=${book.title}>
        <p class="description">Author : ${book.author}</p>
        <p class="description">Description : ${book.description}</p>
        <div class="like-div">
        <p class="book-like-count" id=${book.book_uri}>0<p>
        <i id=${book.book_uri} class="fa fa-thumbs-up book-like-button" aria-hidden="true"></i>
        </div>
      </div>
      
        
        
        `;
  
      }
     
      addBooksLike();
      loadBooksLike();
    });
  };

const getMovies = async () => {
    const fetchMovies = await fetch(
      "https://api.nytimes.com/svc/movies/v2/reviews/search.json?&api-key=su6Pt4Vu8bMecCsPP5C5kA09UJyPuwAn"
    );
    const fetchedMovies = await fetchMovies.json();
    displayMovies(fetchedMovies.results.slice(0, 12));
  };
  const displayMovies = (movies) => {
    movies.forEach((movie) => {
      document.getElementById("entertainment-news-div").innerHTML += `
      <div class="each-character-div">
      <h2  >Title: ${movie.display_title}</h2>
      <img src=${movie.multimedia.src} alt=${movie.display_title}>
      <p class="description" >By: ${movie.byline}</p>
      <p class="description">Description: ${movie.summary_short}</p>
      <div class="like-div">
      <p id=${movie.link.url} class="movie-like-count">0<p>
      <i id=${movie.link.url} class="fa fa-thumbs-up movies-like-button" aria-hidden="true"></i>
      </div>
    </div> 
      `;
      loadMovieLike();
      addMovieLike();
    });
  };
  const addPopularLike = () => {
    const AllPopularLikes = document.querySelectorAll(".popular-like-button");
    AllPopularLikes.forEach((likebtn) => {
      likebtn.addEventListener("click", async (e) => {
        const postLikes = await fetch(
          `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${popularLikesID}/likes`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              item_id: e.target.id,
            }),
          }
        );
        const getlikes = await fetch(
          `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${popularLikesID}/likes`
        );
        const gottenLikes = await getlikes.json();
        gottenLikes.forEach((dat) => {
          if (String(e.target.id) === dat.item_id) {
            e.target.parentElement.parentElement.firstElementChild.innerText =
              dat.likes;
          }
        });
      });
    });
  };
  
  const loadPopularLike = async () => {
    const likesContent = document.querySelectorAll(".likes-count");
    const getlikes = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${popularLikesID}/likes`
    );
    const gottenLikes = await getlikes.json();
    likesContent.forEach((likeContent) => {
      gottenLikes.forEach((dat) => {
        if (likeContent.id === dat.item_id) {
          likeContent.innerText = dat.likes;
        }
      });
    });
  };
  const addBooksLike = () => {
    const AllBooksLikes = document.querySelectorAll(".book-like-button");
    AllBooksLikes.forEach((likebtn) => {
      likebtn.addEventListener("click", async (e) => {
        const postBookLikes = await fetch(
          `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${booksLikesID}/likes`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              item_id: e.target.id,
            }),
          }
        );
        const getBooklikes = await fetch(
          `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${booksLikesID}/likes`
        );
        const gottenBooksLikes = await getBooklikes.json();
        gottenBooksLikes.forEach((dat) => {
          if (String(e.target.id) === dat.item_id) {
            e.target.parentElement.parentElement.firstElementChild.innerText =
              dat.likes;
          }
        });
      });
    });
  };
  const loadBooksLike = async () => {
    const likeBooksContent = document.querySelectorAll(".book-like-count");
    const getBooklikes = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${booksLikesID}/likes`
    );
    const gottenBooksLikes = await getBooklikes.json();
    likeBooksContent.forEach((likeContent) => {
      gottenBooksLikes.forEach((dat) => {
        if (likeContent.id === dat.item_id) {
          likeContent.innerText = dat.likes;
        }
      });
    });
  };
  
  const addMovieLike = () => {
    const AllMovieLikes = document.querySelectorAll(".movies-like-button");
    AllMovieLikes.forEach((likebtn) => {
      likebtn.addEventListener("click", async (e) => {
        const postMovieLikes = await fetch(
          `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${movieLikeID}/likes`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              item_id: e.target.id,
            }),
          }
        );
        const getMovielikes = await fetch(
          `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${movieLikeID}/likes`
        );
        const gottenMovieLikes = await getMovielikes.json();
        gottenMovieLikes.forEach((dat) => {
          if (String(e.target.id) === dat.item_id) {
            e.target.parentElement.parentElement.firstElementChild.innerText =
              dat.likes;
          }
        });
      });
    });
  };
  const loadMovieLike = async () => {
    const likeMovieContent = document.querySelectorAll(".movie-like-count");
    const getMovielikes = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${movieLikeID}/likes`
    );
    const gottenMovieLikes = await getMovielikes.json();
    likeMovieContent.forEach((likeContent) => {
      gottenMovieLikes.forEach((dat) => {
        if (likeContent.id === dat.item_id) {
          likeContent.innerText = dat.likes;
        }
      });
    });
  };
  const postComment = () => {
    document.querySelector(".add-review").addEventListener("click", async (e) => {
      e.preventDefault();
      const comment = document.getElementById("review-comment").value;
      const userName = document.getElementById("review-username").value;
      const postComment = await fetch(
        `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${commentsID}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            item_id: 2,
            username: userName,
            comment: comment,
          }),
        }
      );
      const getComments = await fetch(
        `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${commentsID}/comments?item_id=2`
      );
      document.querySelector(".all-comments-section").innerHTML = "";
      const gottenComments = await getComments.json();
      gottenComments.forEach((comment) => {
        document.querySelector(".all-comments-section").innerHTML += `
        <div class="each-comment">
        <p> <i class="fa-solid fa-user"></i> ${comment.username.toUpperCase()}</p>
        <p> <i class="fa-solid fa-comment"></i> ${comment.comment}</p>
        </div>
        
        `;
      });
      document.getElementById("review-comment").value="Add your review....."
      document.getElementById("review-username").value="Username...."
    });
  };
  const loadComments = async () => {
    const getComments = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${commentsID}/comments?item_id=2`
    );
    const gottenComments = await getComments.json();
    gottenComments.forEach((comment) => {
      document.querySelector(".all-comments-section").innerHTML += `
      <div class="each-comment">
      <p><i class="fa-solid fa-user"></i>  ${comment.username.toUpperCase()}</p>
      <p>  <i class="fa-solid fa-comment"></i> ${comment.comment}</p>
      </div>
      
      `;
    });
  };
  document.addEventListener("DOMContentLoaded", () => {
    loadComments();
    postComment();
    getPopular();
    getBooks();
    getMovies();
  });
  