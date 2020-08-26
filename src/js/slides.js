export function appendSlides(result) {
  result.Search.forEach((element) => {
    const slide = document.createElement('div');

    slide.classList.add('swiper-slide');
    const poster = document.createElement('img');
    poster.classList.add('slide-poster');
    if (element.Poster === 'N/A') {
      poster.src = '/assets/images/no-image-found-360x250.png';
    } else {
      poster.src = element.Poster;
    }
    const filmLink = document.createElement('a');
    filmLink.innerHTML = element.Title;
    filmLink.href = `https://www.imdb.com/title/${element.imdbID}/videogallery/`;
    slide.appendChild(poster);
    slide.appendChild(filmLink);
    const year = document.createElement('p');
    year.innerHTML = element.Year;
    slide.appendChild(year);
    const imdb = document.createElement('div');
    imdb.classList.add('rating');
    imdb.innerHTML = `<img class = "rating-star" src = '/assets/images/icons8-rating-64.png' alt = 'star'/> <p class = "rating-text">${element.imdb}</p>`;
    slide.appendChild(imdb);
    window.swiper.appendSlide(slide);
  });
}
