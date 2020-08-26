import { preloadImage } from './utils';


export function search(value) {
  return fetch(
    `https://www.omdbapi.com/?s=${value}&apikey=3ed64303`,
  ).then((response) => response.json());
}

export function getNextPage(value, page) {
  return fetch(
    `https://www.omdbapi.com/?s=${value}&page=${page}&apikey=3ed64303`,
  ).then((response) => response.json());
}

export function translate(value) {
  return fetch(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200430T174415Z.94c9f3226ea096eb.c4acabe6e27aed0278302f73c6d262cf332eff35&text=${value}&lang=ru-en`,
  )
    .then((response) => response.json())
    .then((data) => data.text);
}

export function rating(imdb) {
  return fetch(`https://www.omdbapi.com/?i=${imdb}&apikey=3ed64303`)
    .then((response) => response.json())
    .then((data) => data.imdbRating);
}

export async function getRatingForFilm(film) {
  const imdb = await rating(film.imdbID);
  return {
    ...film,
    imdb,
  };
}

export async function searchWithRating(value, page) {
  const result = page ? await getNextPage(value, page) : await search(value);
  if (result.Error) {
    throw new Error(result.Error);
  }
  await Promise.all(
    result.Search.map(async (movie) => {
      if (movie.Poster !== 'N/A') {
        await preloadImage(movie.Poster);
      }
    }),
  );
  const resultWithRating = await Promise.all(
    result.Search.map(getRatingForFilm),
  );
  return {
    ...result,
    Search: resultWithRating,
  };
}
