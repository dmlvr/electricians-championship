(function() {
  'use strict';

$(document).ready(function(){
  $('.sheme__list').slick({
    dots: true,
    prevArrow: '<button type="button"><svg width="24" height="24"><use xlink:href="img/sprite.svg#sprite-arrow-right"></use></svg></button>',
		nextArrow: '<button type="button"><svg width="24" height="24"><use xlink:href="img/sprite.svg#sprite-arrow-right"></use></svg></button>',
    appendArrows: '.sheme__arrows',
    appendDots: '.sheme__dots',
  });
});

if (document.documentElement.clientWidth <= 900) {
  $(document).ready(function(){
    $('.privilege__list').slick({
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 2,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });
  });
}

const shchrnBtn = document.querySelector('#shchrn-btn');
const shchrvBtn = document.querySelector('#shchrv-btn');
const shchrnWrapper = document.querySelector('#shchrn');
const shchrvWrapper = document.querySelector('#shchrv');

shchrnBtn.addEventListener('click', () => {
  console.log('click')
  shchrnBtn.classList.add('documentation__management-btn--active');
  shchrvBtn.classList.remove('documentation__management-btn--active');
  shchrnWrapper.classList.remove('documentation__wrapper--hidden');
  shchrvWrapper.classList.add('documentation__wrapper--hidden');
});

shchrvBtn.addEventListener('click', () => {
  console.log('click')
  shchrnBtn.classList.remove('documentation__management-btn--active');
  shchrvBtn.classList.add('documentation__management-btn--active');
  shchrnWrapper.classList.add('documentation__wrapper--hidden');
  shchrvWrapper.classList.remove('documentation__wrapper--hidden');
});

})()