import Swiper from 'swiper';
import { searchWithRating } from './api';
import { appendSlides } from './slides';
import { showSpinner, hideSpinner } from './spinner';


export function renderSwiper() {
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper');
  const main = document.querySelector('main');
  main.append(swiperContainer);
  swiperContainer.innerHTML = `
  <div class ='swiper-container'>
<div class="swiper-wrapper">
</div>
</div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
`;

  const mySwiper = new Swiper('.swiper-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,
    slidesPerGroup: 1,
    speed: 600,
    spaceBetween: 10,
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
      470: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
      },
      660: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
      },
      920: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20,
      },
    },
  });
  window.swiper = mySwiper;

  mySwiper.on('slideChange', () => {
    if (mySwiper.slides.length - mySwiper.realIndex <= 7) {
      window.state.apiPage += 1;
      showSpinner();
      searchWithRating(window.state.searchValue, window.state.apiPage)
        .then((result) => {
          appendSlides(result);
          hideSpinner();
        })
        .catch(() => {
        });
    }
  });
}
