import { noticeData } from './data.js';
import { Appearance } from './appearance.js';
import { CollapseY, CollapseX } from './collapse.js';
import { Autoplay, Navigation } from './slider.js';
import { createMarkup, addAttribute, innerContent } from './createMarkup.js';

window.addEventListener('load', () => {
  const appearanceMain = new Appearance(document.getElementById('mainBanner').querySelectorAll('.main__item'));
  appearanceMain.removeClass();

  if (matchMedia('screen and (max-width: 767px)').matches) {
    const footerCollapseY = new CollapseY(document.getElementById('footerCollapse'));
  } else if (matchMedia('screen and (max-width: 1023px)').matches) {
    const collapseY = new CollapseY(document.getElementById('sidebar'));
    const collapseX = new CollapseX(document.getElementById('sidebar'));
  } else if (matchMedia('screen and (min-width: 1024px)').matches) {
    document.querySelectorAll('.header__gnb-link').forEach((elment) => {
      elment.addEventListener('mouseenter', (event) => {
        const nextSibling = event.target.nextElementSibling;
        const firstChildHeight = nextSibling.firstElementChild.clientHeight;
        const lastChildHeight = nextSibling.lastElementChild.clientHeight;
        const nextSiblingHeight = firstChildHeight + lastChildHeight;
        nextSibling.style.height = `${nextSiblingHeight}px`;
        nextSibling.style.opacity = 1;
      });
      elment.parentElement.addEventListener('mouseleave', (event) => {
        event.target.lastElementChild.style.height = 0;
        event.target.lastElementChild.style.opacity = 0;
      });
    });

    document.getElementById('search').addEventListener('click', (event) => {
      event.preventDefault();
      if (event.currentTarget.parentElement.classList.contains('_actived')) {
        return;
      } else {
        event.currentTarget.parentElement.classList.add('_actived');
      }
    });
  }

  document.getElementById('angleBtn').addEventListener('click', (event) => {
    const targetElem = document.getElementById('promotion');

    if (event.currentTarget.classList.contains('icon-angle-down')) {
      event.currentTarget.classList.replace('icon-angle-down', 'icon-angle-up');
      targetElem.classList.remove('_hidden');
    } else if (event.currentTarget.classList.contains('icon-angle-up')) {
      event.currentTarget.classList.replace('icon-angle-up', 'icon-angle-down');
      targetElem.classList.add('_hidden');
    }
  });

  //noticeSlide
  for (let i = 0; i < noticeData.length; i++) {
    const div = createMarkup('div', ['keen-slider__slide']);
    const a = addAttribute(createMarkup('a', ['notice__link', 'icon-volume', 'icon-plus']), {
      href: '#',
    });
    const span = createMarkup('span', ['notice__link-cont']);

    a.appendChild(span);
    div.appendChild(a);
    document.getElementById('noticeKeenSlider').appendChild(div);
  }

  const noticeSlider = new KeenSlider(
    '#noticeKeenSlider',
    {
      initial: 0,
      loop: true,
      mode: 'free-snap',
      detailsChanged: (s) => {
        s.track.details.slides.map((slide) => {
          s.slides[s.track.absToRel(slide.abs)].querySelector('.notice__link-cont').innerHTML =
            noticeData[s.track.absToRel(slide.abs)];
        });
      },
      slides: {
        number: noticeData.length,
        perView: 1,
      },
      vertical: true,
    },
    [
      (slider) => {
        const autoplay = new Autoplay(slider);
      },
    ]
  );

  const promotionSlider = new KeenSlider(
    '#promotionKeenSlider',
    {
      loop: true,
      breakpoints: {
        '(min-width: 768px)': {
          slides: { perView: 2, spacing: 5, origin: 'center' },
        },
        '(min-width: 1024px)': {
          slides: { perView: 3, spacing: 10, origin: 'center' },
        },
      },
      slides: { perView: 1, origin: 'center' },
    },
    [
      (slider) => {
        const navigationAutoplay = new Navigation(slider);
        slider.on('created', () => {
          navigationAutoplay.markup();
          navigationAutoplay.updateClasses();
        });
        slider.on('optionsChanged', () => {
          console.log(2);
          navigationAutoplay.markup(true);
          navigationAutoplay.markup();
          navigationAutoplay.updateClasses();
        });
        slider.on('slideChanged', () => {
          navigationAutoplay.updateClasses();
        });
        slider.on('destroyed', () => {
          navigationAutoplay.markup(true);
        });
      },
    ]
  );

  //awardSlider
  const imgLength = 6;
  const divs2 = [];
  for (let i = 0; i < imgLength; i++) {
    divs2[i] = createMarkup('div', ['keen-slider__slide']);
    divs2[i].appendChild(
      addAttribute(createMarkup('img'), { src: `./imgs/footer_award_${i}.jpg` })
    );
    document.getElementById('awardKeenSlider').appendChild(divs2[i]);
  }
  const awardSlider = new KeenSlider(
    '#awardKeenSlider',
    {
      loop: true,
      breakpoints: {
        '(min-width: 768px)': {
          slides: { perView: 3, spacing: 0, origin: 'auto' },
        },
        '(min-width: 1024px)': {
          slides: { perView: 3, spacing: 0, origin: 'center' },
        },
      },
      slides: { perView: 1, origin: 'center' },
    },
    [
      (slider) => {
        const navigationAutoplay2 = new Navigation(slider);

        slider.on('created', () => {
          navigationAutoplay2.markup();
          navigationAutoplay2.updateClasses();
        });
        slider.on('optionsChanged', () => {
          console.log(2);
          navigationAutoplay2.markup(true);
          navigationAutoplay2.markup();
          navigationAutoplay2.updateClasses();
        });
        slider.on('slideChanged', () => {
          navigationAutoplay2.updateClasses();
        });
        slider.on('destroyed', () => {
          navigationAutoplay2.markup(true);
        });
      },
    ]
  );
});

window.addEventListener('scroll', () => {
  let scrollVal = window.pageYOffset;
  console.log(scrollVal);

  const appearanceBean = new Appearance(document.getElementById('beanBanner').querySelectorAll('.bean__inner > * > *'));
  const appearanceProduct = new Appearance(
    document.getElementById('productBanner').querySelectorAll('.product__copy > *')
  );
  const appearanceStore = new Appearance(
    document.getElementById('storeInfo').querySelectorAll('.store__copy > *')
  );

  if (matchMedia('screen and (max-width: 767px)').matches) {
    if (scrollVal > 2500 && scrollVal < 4000) {
      appearanceProduct.removeClass();
    } else {
      appearanceProduct.addClass();
    }

    if (scrollVal > 4000 && scrollVal < 6000) {
      appearanceStore.removeClass();
    } else {
      appearanceStore.addClass();
    }
  } else if (matchMedia('screen and (max-width: 1023px)').matches) {
    if (scrollVal > 100 && scrollVal < 2000) {
      appearanceBean.removeClass();
    } else {
      appearanceBean.addClass();
    }

    if (scrollVal > 2500 && scrollVal < 4000) {
      appearanceProduct.removeClass();
    } else {
      appearanceProduct.addClass();
    }

    if (scrollVal > 4000 && scrollVal < 6000) {
      appearanceStore.removeClass();
    } else {
      appearanceStore.addClass();
    }
  } else if (matchMedia('screen and (min-width: 1024px)').matches) {
    if (scrollVal > 100 && scrollVal < 2000) {
      appearanceBean.removeClass();
    } else {
      appearanceBean.addClass();
    }

    if (scrollVal > 1000 && scrollVal < 2500) {
      appearanceProduct.removeClass();
    } else {
      appearanceProduct.addClass();
    }

    if (scrollVal > 1000 && scrollVal < 3000) {
      appearanceStore.removeClass();
    } else {
      appearanceStore.addClass();
    }
  }
});

window.addEventListener('resize', () => {
  document.location.reload();
});
