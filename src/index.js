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
    movieData.map(movie => {
        addMovieToPage(movie)
    })
    showMovieDetails(movieData[0])
})

function addMovieToPage(movie) {
    const movieImage = document.createElement("img")
    movieImage.src = movie.image 
    movieList.appendChild(movieImage)


    movieImage.addEventListener("click", () => {
        showMovieDetails(movie)
    })
}

function showMovieDetails(movie) {

    currentMovie = movie 

    movieDetailTitle.textContent = currentMovie.title
    movieDetailYear.textContent = currentMovie.release_year
    movieDetailDescription.textContent = currentMovie.description 
    movieDetailImage.src = currentMovie.image 
    movieDetailWatched.textContent = currentMovie.watched? "Watched" : "Unwatched"
    movieDetailBlood.textContent = currentMovie.blood_amount

    }

    function toggleWatchedButton () {
        // pull movieDetailWatched element
        movieDetailWatched.addEventListener("click", () => {
            //add click event
            currentMovie.watched = !currentMovie.watched
            // current movie watched = not current movie watched
            movieDetailWatched.textContent = currentMovie.watched? "Watched" : "Unwatched"
        })

    }

    function addBloodForm() {
        //pull the blood form from the DOM
        // add submit event listener
        bloodForm.addEventListener("submit", (event) => {
            //event prevent default
            event.preventDefault()
            // console.log(event)

            //grab event value
            const amountToAdd = event.target['blood-amount'].value

            //increase amount of current movie with parseInt
            currentMovie.blood_amount += parseInt(amountToAdd)

            movieDetailBlood.textContent = currentMovie.blood_amount

            event.target.reset()

        })

    }
