const movieList = document.querySelector("#movie-list")

let currentMovie

const movieDetailTitle = document.querySelector("#title")
const movieDetailYear = document.querySelector("#year-released")
const movieDetailDescription = document.querySelector("#description")
const movieDetailImage = document.querySelector("#detail-image")
const movieDetailWatched = document.querySelector("#watched")
const movieDetailBlood = document.querySelector("#amount")

const bloodForm = document.querySelector("#blood-form")

fetch("http://localhost:3000/movies")
.then(response => response.json())
.then(movieData => {
    movieData.forEach(movie => {
        addMovieImage(movie)
    })
    displayMovieDetails(movieData[0])

    toggleWatchedButton()

    addBloodToForm()
})

function addMovieImage(movie) {
    const movieImage = document.createElement("img")
    movieImage.src = movie.image 
    movieList.appendChild(movieImage)

    movieImage.addEventListener("click", () => {
        displayMovieDetails(movie)
    })
}

function displayMovieDetails(movie) {
    currentMovie = movie

    movieDetailTitle.textContent = currentMovie.title 
    movieDetailYear.textContent = currentMovie.release_year
    movieDetailDescription.textContent = currentMovie.description 
    movieDetailImage.src = currentMovie.image 
    movieDetailWatched.textContent = currentMovie.watched? "Watched" : "Unwatched"
    movieDetailBlood.textContent = currentMovie.blood_amount 
}

function toggleWatchedButton() {
   // const movieDetailWatched = document.querySelector("#watched")
    movieDetailWatched.addEventListener("click", () => {
        currentMovie.watched = !currentMovie.watched 
        movieDetailWatched.textContent = currentMovie.watched? "Watched" : "Unwatched"

    })
}

function addBloodToForm() {
    bloodForm.addEventListener("submit", (event) => {
        event.preventDefault()

        const amountToAdd = event.target['blood-amount'].value
        currentMovie.blood_amount += parseInt(amountToAdd)

        movieDetailBlood.textContent = currentMovie.blood_amount 

        event.target.reset ()

    })
}