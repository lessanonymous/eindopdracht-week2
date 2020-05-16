// import movie data
import { movies } from './db.js';
// get HTML elements
const mainElement = document.querySelector('main');
const filterMoviesButtons = document.querySelectorAll('.filter-movies-button');
const searchField = document.querySelector('.search');
// helper functions
const createMovieElement = movieData => {
    const aElement = document.createElement('a');
    const imgElement = document.createElement('img');
    aElement.appendChild(imgElement);
    aElement.href = `https://www.imdb.com/title/${movieData.imdbID}/`;
    aElement.target = '_blank';
    aElement.className = 'movie';
    imgElement.src = movieData.Poster;
    imgElement.className = 'movie-img';
    return aElement;
};
const filterMovies = (movies, filter) => {
    if (filter === 'New') {
        return movies.filter(movie => {
            let year;
            movie.Year.includes('-') ? year = movie.Year.split('-')[0] : year = movie.Year;
            return Number(year) >= 2014;
        });
    } else {
        return movies.filter(movie => movie.Title.toLowerCase().includes(filter.toLowerCase()));
    }
}
const addMovieElementsToDOM = movies => movies.forEach(movieData => mainElement.appendChild(createMovieElement(movieData)));
const removeAllMovieElementsFromDOM = () => {
    const movieElements = document.querySelectorAll('.movie');
    movieElements.forEach(element => mainElement.removeChild(element));
};
// eventhandlers
const handleMoviesEvent = e => {
    removeAllMovieElementsFromDOM();
    let filter;
    e.type === 'click' ? filter = e.target.innerHTML.split(' ')[0] : filter = searchField.value;
    const filteredMovies = filterMovies(movies, filter);
    filter === 'All' ? addMovieElementsToDOM(movies) : addMovieElementsToDOM(filteredMovies);
    filterMoviesButtons.forEach(button => button.classList.remove('active'));
    if (e.type === 'click') e.target.classList.add('active');
};
const handleMoviesButtonClickEvent = e => {
    if (!e.target.classList.contains('active')) handleMoviesEvent(e);
};
const handleKeyUpEvent = e => {
    if (e.key === 'Enter' && searchField.value) handleMoviesEvent(e);
};
// add eventlisteners
filterMoviesButtons.forEach(button => button.addEventListener('click', handleMoviesButtonClickEvent));
document.addEventListener('keyup', handleKeyUpEvent);
// add movie elements on page load
addMovieElementsToDOM(movies);