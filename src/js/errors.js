import { hideSpinner } from './spinner';

export function renderError(error) {
  hideSpinner();
  const form = document.querySelector('.search');
  form.insertAdjacentHTML('afterend', `<p class = "search-error">${error}</p>`);
  form.insertAdjacentHTML(
    'afterend',
    `<p class = "search-error">No results for "${window.state.searchValue}"</p>`,
  );
}
