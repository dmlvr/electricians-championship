(function() {
  'use strict';

// Работа внопки наверх

headerScrollToTop.addEventListener('click', () => {
  window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  });
  history.pushState('', document.title, window.location.pathname);
  headerBottom.classList.remove('header__bottom--active'); // При нажатии на кнопку меню закрывается
})

// Мобильное меню

headerOpenMenu.addEventListener('click', () => {
  headerBottom.classList.add('header__bottom--active');

  document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        headerBottom.classList.remove('header__bottom--active');
      }
  });
});

headerCloseMenu.addEventListener('click', () => {
  headerBottom.classList.remove('header__bottom--active');
});


for(let link of headerBottom.querySelectorAll('a')) { // При нажатии на любую кнопку меню закрывается
  link.addEventListener('click', () => {
    headerBottom.classList.remove('header__bottom--active');
  })
}

// Фиксированное меню

document.addEventListener("scroll", () => {
  if (window.pageYOffset > headerTop.offsetHeight) {
    headerTop.classList.add('header__top--fixed');
    headerBottom.classList.add('header__bottom--fixed');
  } else {
    headerTop.classList.remove('header__top--fixed');
    headerBottom.classList.remove('header__bottom--fixed');
  }
});

// Обратный отсчет количества дней

if (document.querySelector('#day_count')) {
  const days = Math.round((new Date("2023-06-30").getTime() - new Date().getTime()) / 86400000);
  const lastDigit = days % 10;
  let wordForm = 'дней';

  if (lastDigit === 1) {
    wordForm = 'день';
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    wordForm = 'дня';
  }

  if (days > 0) {
    day_count.textContent = `Через ${days} ${wordForm}`;
  } else if (days === 0 || days >= -1) {
    day_count.textContent = `Проходит`;
  } else {
    console.log(days)
    day_count.textContent = `Прошло`;
  }  
}

//переключения расписания

const busFirstVsSecond = {
  one: {
    btn: document.querySelector('#btn-bus-first-day'),
    field: document.querySelector('#bus-first-day'),
  },
  two: {
    btn: document.querySelector('#btn-bus-second-day'),
    field: document.querySelector('#bus-second-day'),
  },
  active: {
    btn: 'program__schedule-date-item--active',
    field: 'program__schedule-table-wrapper--active'
  }
}

const champVsBus = {
  one: {
    btn: document.querySelector('#btn-championship'),
    field: document.querySelector('#championship'),
  },
  two: {
    btn: document.querySelector('#btn-business'),
    field: document.querySelector('#business'),
  },
  active: {
    btn: 'program__btns-type-item--active',
    field: 'program__schedule--active'
  }
}

const champFirstVsSecond = {
  one: {
    btn: document.querySelector('#bnt-champ-first-day'),
    field: document.querySelector('#champ-first-day'),
  },
  two: {
    btn: document.querySelector('#bnt-champ-second-day'),
    field: document.querySelector('#champ-second-day'),
  },
  active: {
    btn: 'program__schedule-date-item--active',
    field: 'program__schedule-table-wrapper--active'
  }
}

function toogler(obj) {

  obj.one.btn.addEventListener('click', () => {
    obj.one.field.classList.add(obj.active.field);
    obj.one.btn.classList.add(obj.active.btn);
    obj.two.field.classList.remove(obj.active.field);
    obj.two.btn.classList.remove(obj.active.btn);
  });

  obj.two.btn.addEventListener('click', () => {
    obj.one.field.classList.remove(obj.active.field);
    obj.one.btn.classList.remove(obj.active.btn);
    obj.two.field.classList.add(obj.active.field);
    obj.two.btn.classList.add(obj.active.btn);
  });

}

if (champVsBus.one.btn && champVsBus.two.btn && champVsBus.one.field && champVsBus.two.field) {
  toogler(champVsBus);
}

if (champFirstVsSecond.one.btn && champFirstVsSecond.two.btn && champFirstVsSecond.one.field && champFirstVsSecond.two.field) {
  toogler(champFirstVsSecond);
}

if (busFirstVsSecond.one.btn && busFirstVsSecond.two.btn && busFirstVsSecond.one.field && busFirstVsSecond.two.field) {
  toogler(busFirstVsSecond);
}

// Управление слайдерами

let flag_1280 = false;
let flag_768 = false;

function privilegeSlider () {
  flag_1280 = true;
  $('.privilege__list').slick({
    dots: true,
    prevArrow: '<button type="button"><svg width="35" height="35"><use xlink:href="img/sprite.svg#sprite-arrow-right"></use></svg></button>',
    nextArrow: '<button type="button"><svg width="35" height="35"><use xlink:href="img/sprite.svg#sprite-arrow-right"></use></svg></button>',
    appendArrows: '.privilege__arrows',
    appendDots: '.privilege__dots',
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    initialSlide: 5,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          initialSlide: 0,
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      },
    ]
  });
}

function zonesSlider () {
    flag_1280 = true;
    $('.zones__list').slick({
      dots: true,
      prevArrow: '<button type="button"><svg width="35" height="35"><use xlink:href="img/sprite.svg#sprite-arrow-right"></use></svg></button>',
      nextArrow: '<button type="button"><svg width="35" height="35"><use xlink:href="img/sprite.svg#sprite-arrow-right"></use></svg></button>',
      appendArrows: '.zones__arrows',
      appendDots: '.zones__dots',
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 3,
      initialSlide: 5,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            arrows: false,
          }
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 1,
            arrows: false,
          }
        },
      ]
    });
}

function historySlider () {
  flag_1280 = true;

  $('.history__gallery-list').slick({
    dots: true,
    arrows: false,
    appendDots: '.history__dots',
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
  });
}

function visitorsSlider () {
  flag_768 = true;
  $('.visitors__list').slick({
    prevArrow: '<button type="button"><svg width="35" height="35"><use xlink:href="img/sprite.svg#sprite-arrow-right"></use></svg></button>',
    nextArrow: '<button type="button"><svg width="35" height="35"><use xlink:href="img/sprite.svg#sprite-arrow-right"></use></svg></button>',
    appendArrows: '.visitors__arrows',
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          dots: true,
          appendDots: '.visitors__dots',
          arrows: false
        }
      }
    ]
  });
}

if (document.documentElement.clientWidth <= 1280) {
  privilegeSlider();
  zonesSlider();
  historySlider();
}

if (document.documentElement.clientWidth <= 768) {
  visitorsSlider();
}

window.addEventListener('resize', (evt) => {
  if (document.documentElement.clientWidth <= 1280 && !flag_1280) {
    privilegeSlider();
    zonesSlider();
    historySlider();
  } else if (document.documentElement.clientWidth >= 1280 && flag_1280) {
    flag_1280 = false;
    $('.privilege__list').slick('unslick');
    $('.zones__list').slick('unslick');
    $('.history__gallery-list').slick('unslick');
  };

  if (document.documentElement.clientWidth <= 768 && !flag_768) {
    visitorsSlider();
  } else if (document.documentElement.clientWidth >= 768 && flag_768) {
    flag_768 = false;
    $('.visitors__list').slick('unslick');
  };

});

})()