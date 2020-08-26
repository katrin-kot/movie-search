import '../style.css';
import { init } from './search';
import 'swiper/css/swiper.min.css';
import { renderSpinner } from './spinner';
import { renderSwiper } from './swiper';
import { renderKeyboard } from './keyboard';

const header = document.createElement('header');
header.classList.add('header');
const body = document.querySelector('body');
body.appendChild(header);
const headerLogo = document.createElement('h1');
headerLogo.classList.add('header-logo');
headerLogo.innerHTML = 'MovieSearch';
header.appendChild(headerLogo);
const main = document.createElement('main');
main.classList.add('main-container');
body.appendChild(main);
const searchForm = document.createElement('form');
searchForm.classList.add('search');
searchForm.innerHTML = '<input class="search-input" type="text" placeholder="Search movie" autofocus=""><button class="search-btn" type="submit"><span>Search</span></button><span data-name="Clear" class="search-clear tooltip"></span><span data-name="Keyboard" class="search-tia tooltip"></span>';
main.appendChild(searchForm);
document
  .querySelector('.search-tia')
  .addEventListener('click', () => document.querySelector('.keyboard').classList.toggle('keyboard--hidden'));
document.querySelector('.search-clear').addEventListener('click', () => {
  document.querySelector('input').value = '';
});
renderSwiper();

renderSpinner();

init();
const footer = document.createElement('footer');
footer.classList.add('footer');
footer.innerHTML = '<a href="https://rs.school/" class="rss">RS School 2020q1</a><a href="https://github.com/katrin-kot" class="github">katrin-kot</a>';
body.appendChild(footer);
renderKeyboard();
