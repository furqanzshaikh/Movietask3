
const fetchMovies = async () => {
  const movieNameInput = document.getElementById("movie-input").value;
  const data = await fetch(`https://www.omdbapi.com/?s=${movieNameInput}&apikey=e53b80cf`);
  const moviesData = await data.json();

  if (moviesData.Response === "False") {
    displayNoMoviesFound();
    
  } else {
    displayMovieDetails(moviesData.Search);
    console.log(moviesData)
  }
};

const displayMovieDetails = (movies) => {
  const movieDetailsContainer = document.getElementById("movie-details");

  movieDetailsContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const title = document.createElement("h2");
    title.textContent = movie.Title;

    const poster = document.createElement("img");
    poster.src = movie.Poster;
    poster.alt = movie.Title + " Poster";

    const year = document.createElement("p");
    year.textContent = "Year: " + movie.Year;

    const type = document.createElement("p");
    type.textContent = "Type: " + movie.Type;

    const IMDb = document.createElement("p");
    type.textContent = "IMDb: " + movie.IMDbID;

    const button = document.createElement("button");
    button.textContent = "More Info"; 
    button.addEventListener("click", () => {
      fetchAndDisplayMovieInfo(movie.Title);
    });

    movieCard.appendChild(poster);
    movieCard.appendChild(title);
    movieCard.appendChild(year);
    movieCard.appendChild(type);
    movieCard.appendChild(button); 

    movieDetailsContainer.appendChild(movieCard);
  });
};

const displayNoMoviesFound = () => {
  const movieDetailsContainer = document.getElementById("movie-details");
  movieDetailsContainer.innerHTML = "<p class='no-movies'>No Movies Found</p>";
};

const fetchAndDisplayMovieInfo = async (title) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?t=${title}&apikey=e53b80cf`
    );
    const movieData = await response.json();

    if (movieData.Response === "True") {
      openModal(movieData);
    } else {
      console.log("Movie not found!");
    }
  } catch (error) {
    console.error("Error fetching movie information:", error);
  }
};

const openModal = (movieData) => {
  const modal = document.getElementById("modal");
  const movieInfoContainer = document.getElementById("movie-info");
  movieInfoContainer.innerHTML = `
        <h2>${movieData.Title}</h2>
        <p>Year: ${movieData.Year}</p>
        <p>Plot: ${movieData.Plot}</p>
        <p>Director: ${movieData.Director}</p>
        <p>IMDb: ${movieData.imdbID}</p>
        
    `;
  modal.style.display = "block";
};

const closeModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
};
window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    closeModal(); 
  }
});
