import { renderSpinner, hideSpinner } from '../spinner';

describe('renderSpinner', () => {
  it('Should add spinner to swiper-container', () => {
    document.body.innerHTML = `
    <div class="search-clear"></div>
  `;
    renderSpinner();
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

describe('hideSpinner', () => {
  it('Shold hide spinner with class visible', () => {
    document.body.innerHTML = `
    <div class = "search-clear hidden"></div>
        <div class = "spinner visible"></div>
        `;
    hideSpinner();
    expect(document.querySelector('.visible')).toBeFalsy();
    expect(document.querySelector('.hidden')).toBeFalsy();
  });
});
