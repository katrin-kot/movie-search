import { translate, searchWithRating } from './api';
import { appendSlides } from './slides';
import 'swiper/css/swiper.min.css';
import { renderError } from './errors';
import { hideSpinner, showSpinner } from './spinner';

window.state = {
  language: null,
  searchValue: 'movie',
  apiPage: 1,
};

export async function handleSearch(event) {
  const input = document.querySelector('input');
  event.preventDefault();
  const form = document.querySelector('.search');
  const valueText = document.querySelector('.search-value');
  const errorText = document.querySelectorAll('.search-error');
  if (errorText.length !== 0) {
    errorText.forEach((elem) => elem.remove());
  }
  if (valueText) {
    valueText.remove();
  }
  window.state.searchValue = input.value;
  try {
    if (window.state.language === 'ru') {
      window.state.searchValue = await translate(window.state.searchValue);
    }
    const result = await searchWithRating(window.state.searchValue);
    if (result.Error) {
      throw new Error(result.Error);
    } else {
      if (window.state.language === 'ru') {
        form.insertAdjacentHTML(
          'afterend',
          `<p class = "search-value">Showing results for "${window.state.searchValue}"</p>`,
        );
      }
      window.swiper.removeAllSlides();
      hideSpinner();
      appendSlides(result);
    }
  } catch (error) {
    renderError(error);
  }
}

export async function init() {
  const input = document.querySelector('input');
  const rusLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const rusUpper = rusLower.toUpperCase();
  const rus = rusLower + rusUpper;
  const getChar = (event) => String.fromCharCode(event.keyCode || event.charCode);
  input.addEventListener('keypress', (e) => {
    const char = getChar(e);
    if (rus.includes(char)) {
      window.state.language = 'ru';
    } else {
      window.state.language = 'en';
    }
  });

  input.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      window.state.position = 0;
      showSpinner();
      handleSearch(event);
    }
  });

  const find = document.querySelector('.search-btn');
  find.addEventListener('click', (event) => {
    window.state.position = 0;
    showSpinner();
    handleSearch(event);
  });

  try {
    showSpinner();
    const result = await searchWithRating(window.state.searchValue);
    hideSpinner();
    appendSlides(result);
  } catch (err) {
    renderError(err);
  }
}
