//challenge 1 we need to create a fetch/.then 
//with response to the json and returning movie images

let movieData;
let currentMovie;

fetch("http://localhost:3000/movies")
.then(response => response.json())
.then(json => {
    movieData = json;

    movieData.forEach(movie => {
        createMovieImageInBar(movie);
    })

    showMovieDetail(movieData[0]);

    hookUpWatchedButton();

    hookUpBloodForm()
})

function createMovieImageInBar(movie) {
    let movieList = document.getElementById('movie-list');

    let movieImage = document.createElement("img");
    movieImage.src = movie.image;
    movieList.appendChild(movieImage)

    movieImage.addEventListener('click', () => {
        showMovieDetail(movie);
    })
}

function showMovieDetail(movie) {
    currentMovie = movie;

    let detailTitle = document.getElementById("title")
    let detailImage = document.getElementById("detail-image")
    let detailDescription = document.getElementById("description")
    let deatilYearReleased = document.getElementById("year-released")
    let watchedButton = document.getElementById("watched")
    let bloodAmount = document.getElementById("amount")

    detailTitle.textContent = movie.title;
    detailImage.src = movie.image;
    detailDescription.textContent = movie.description;
    deatilYearReleased.textContent = movie.release_year;
    watchedButton.textContent = movie.watched ? "Watched" : "Unwatched"
    bloodAmount.textContent = movie.blood_amount;
}

function hookUpWatchedButton() {
    let watchedButton = document.getElementById("watched");
    watchedButton.addEventListener('click', () => {
        currentMovie.watched = !currentMovie.watched;
        watchedButton.textContent = currentMovie.watched ? "Watched" : "Unwatched";
    })
}

function hookUpBloodForm() {
    const bloodForm = document.getElementById("blood-form");
    bloodForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const amountToAdd = event.target["blood-amount"].value;
        currentMovie.blood_amount += parseInt(amountToAdd);

        document.getElementById("amount").textContent = currentMovie.blood_amount;

        event.target.removeEventListener();
    })
}




//challenge 2 create a function with a CLICK event listener
//that shows the first movie in the ARRAY pulling
//the data from html

//challenge 3 is another click event where you call 
//on the html for the movie data, so when you click
//image it will give movie info 
//**need to learn about keeping watch/unwatched */

//challenge 4 also click event with the watched and unwatched

//challenge 5 add blood to counter. call on #bloodform
//add event listener and prevent default. raise it with parseINt
//