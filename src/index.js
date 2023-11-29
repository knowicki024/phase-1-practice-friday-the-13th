
let movieData
let currentMovie

const movieList = document.querySelector("#movie-list")

const movieDetailImage = document.querySelector("img#detail-image")
const movieDetailTitle = document.querySelector("h1#title")
const movieDetailYear = document.querySelector("h3#year-released")
const movieDetailDescription = document.querySelector("p#description")

const watchedButton = document.querySelector("button#watched")

const bloodForm = document.querySelector("form#blood-form")


function getMovies(){
fetch("http://localhost:3000/movies")
.then(response => response.json())
.then(json => {
    movieData = json

    movieData.forEach(movie => {
        addMovieToPage(movie)
    })
    movieDetails(movieData[0])

    toggleWatchedButton()

    addBloodAmountForm()
})
}

function addMovieToPage(movie) {
    const movieImage = document.createElement("img")
    movieImage.src = movie.image 
    movieList.append(movieImage)

    movieImage.addEventListener("click", () => {
        movieDetails(movie)
    })
}

function movieDetails(movie) {

   currentMovie = movie
    
    movieDetailImage.src = currentMovie.image 
    movieDetailTitle.textContent = currentMovie.title 
    movieDetailYear.textContent = currentMovie.release_year
    movieDetailDescription.textContent = currentMovie.description 
}

function toggleWatchedButton() {
        watchedButton.addEventListener("click", () => {
        currentMovie.watched = !currentMovie.watched;
        watchedButton.textContent = currentMovie.watched? "Watched": "Unwatched"
    })
}

function addBloodAmountForm() {

    bloodForm.addEventListener("submit", (event) => {
        event.preventDefault()
        console.log(event)
        const amountToAdd = event.target['blood-amount'].value //grabbing event value
        console.log(event.target['blood-amount'].value)
        
        currentMovie.blood_amount += parseInt(amountToAdd)
        console.log(currentMovie.blood_amount)

        document.querySelector("span#amount").textContent = currentMovie.blood_amount;

        event.target['blood-amount'].value = ""

    })
}
getMovies()