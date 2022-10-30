const app = {
  pathToLibsFiles: './assets/libs',
};
window.app = app;

// polyfills
// before polyfills
(function (arr) {
  arr.forEach((item) => {
    if (item.hasOwnProperty('before')) {
      return;
    }
    Object.defineProperty(item, 'before', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function before() {
        // eslint-disable-next-line prefer-rest-params
        const argArr = Array.prototype.slice.call(arguments);
        const docFrag = document.createDocumentFragment();
        argArr.forEach((argItem) => {
          const isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        this.parentNode.insertBefore(docFrag, this);
      },
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

// forEach polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    // eslint-disable-next-line no-param-reassign
    thisArg = thisArg || window;
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

const activateSliders = () => {
  const bw = document.body.clientWidth;
  const mainBannersSlider = new Swiper('.main-banners-slider', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    speed: 800,
    loop: true,
    navigation: {
      nextEl: '.arrow-next',
      prevEl: '.arrow-prev',
    },
    autoplay: true,
  });

  const goodsSlider = new Swiper('.goods-slider', {
    loop: true,
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: 20,
    speed: 650,
    navigation: {
      nextEl: '.arrow-goods__next',
      prevEl: '.arrow-goods__prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 8,
      },
      576: {
        slidesPerView: 3,
      },
      911: {
        slidesPerView: 4,
      },
    },
  });

  const bannersSlide = new Swiper('.banners', {
    slidesPerView: 2,
    slidesPerGroup: 1,
    spaceBetween: 20,
    speed: 800,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1.1,
      },
      576: {
        slidesPerView: 2,
      },
      911: {
        slidesPerView: 2,
      },
    },
  });

  const articlesSlide = new Swiper('.articles', {
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 20,
    speed: 800,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      911: {
        slidesPerView: 3,
      },
    },
  });

  if (bw < 900) {
    const menuSlide = new Swiper('.header-bottom__navbar', {
      slidesPerView: 5,
      slidesPerGroup: 1,
      speed: 800,
      spaceBetween: 40,
      breakpoints: {
        320: {
          spaceBetween: 20,
          slidesPerView: 'auto',
        },
        576: {
          slidesPerView: 'auto',
        },
      },
    });
  }

  const swiper = new Swiper('.detail-good__slider_small', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    speed: 500,
  });

  const swiper2 = new Swiper('.details-good__slider', {
    speed: 500,
    spaceBetween: 10,
    navigation: {
      nextEl: '.arrow-good__next',
      prevEl: '.arrow-good__prev',
    },
    thumbs: {
      swiper,
    },
  });

  const swiper1 = new Swiper('.detail-good__slider_small_fancy', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  const swiper3 = new Swiper('.details-good__slider_fancy', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.arrow-good__next',
      prevEl: '.arrow-good__prev',
    },
    thumbs: {
      swiper: swiper1,
    },
  });

  const detailsGoodSliderPopup = new Swiper('.details-good__slider_popup', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    speed: 800,
    navigation: {
      nextEl: '.arrow-good__next',
      prevEl: '.arrow-good__prev',
    },
    pagination: {
      el: '.swiper-pagination_popup',
      type: 'bullets',
      clickable: true,
    },
  });

  const interestingSliderSwiper = new Swiper('.interesting-slider', {
    slidesPerView: 4,
    slidesPerGroup: 1,
    speed: 800,
    spaceBetween: 20,
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 10,
      },
      576: {
        slidesPerView: 3.5,
      },
      890: {
        slidesPerView: 4,
        slidesPerGroup: 1,
        speed: 800,
        spaceBetween: 20,
      },
    },
  });

  // if (bw < 576) {
  // const goodTabSlider = new Swiper('.good-detail__tab-links', {
  //     slidesPerView: 3,
  //     slidesPerGroup: 1,
  //     speed: 800,
  //     breakpoints: {
  //         320: {
  //             slidesPerView: 'auto',
  //             spaceBetween: 20,
  //         },
  //         576: {
  //             slidesPerView: '3',
  //         },
  //     },
  // });
  // }
};

const scrollTo = () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('a[href^="#"]')) {
      e.preventDefault();
      const target = e.target.closest('a[href^="#"]').getAttribute('href');
      document.querySelector(target).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
};

const navigatorTabsBlock = () => {
  const mainTab = () => {
    const navigatorHeadTabs = document.querySelector('.navigator-head__tabs');
    const navigatorHeadTab = document.querySelectorAll('.navigator-head__tab');
    const navigatorContentItem = document.querySelectorAll('.navigator-content__item');

    const toggleMainTab = (index) => {
      for (let i = 0; i < navigatorContentItem.length; i++) {
        if (index === i) {
          navigatorHeadTab[i].classList.add('active');
          navigatorContentItem[i].classList.add('active');
        } else {
          navigatorHeadTab[i].classList.remove('active');
          navigatorContentItem[i].classList.remove('active');
        }
      }
    };

    if (navigatorHeadTabs) {
      navigatorHeadTabs.addEventListener('click', (e) => {
        /* eslint-disable-next-line */
        const target = e.target;

        if (target.closest('.navigator-head__tab')) {
          navigatorHeadTab.forEach((item, i) => {
            if (item === target) {
              toggleMainTab(i);
            }
          });
        }
      });
    }
  };

  const humanTab = () => {
    const navigatorContent = document.querySelector('.navigator-content');
    const data = document.querySelectorAll('[data-part]');
    const bw = document.body.clientWidth;
    const arr = [];

    if (navigatorContent) {
      /* eslint-disable-next-line */
      data.forEach((data) => {
        arr.push(data);
      });

      navigatorContent.addEventListener('click', (e) => {
        e.preventDefault();

        const target = e.target.closest('[data-part]').dataset.part;
        if (target) {
          /* eslint-disable-next-line */
          arr.find((item) => {
            /* eslint-disable-next-line */
            if (item.dataset.part == target) {
              if (bw < 700) {
                item.classList.toggle('active-tab');
              } else {
                item.classList.add('active-tab');
              }
            } else {
              item.classList.remove('active-tab');
            }
          });
        }
      });

      if (bw > 700) {
        navigatorContent.addEventListener('mouseover', (e) => {
          e.preventDefault();
          const target = e.target.closest('[data-part]').dataset.part;
          if (target) {
            /* eslint-disable-next-line */
            arr.find((item) => {
              /* eslint-disable-next-line */
              if (item.dataset.part == target) {
                item.classList.add('active-tab');
              } else {
                item.classList.remove('active-tab');
              }
            });
          }
        });
      } else if (bw < 700) {
        data.forEach((item) => {
          item.classList.remove('active-tab');
        });
      }

      // data.forEach((item) => {
      //   const removeActive = () => {
      //     item.classList.remove('active');
      //   };

      //   personTitleWrapper.forEach((hover) => {
      //     hover.addEventListener('mouseover', () => {
      //       hover.classList.add('active');
      //       /* eslint-disable-next-line */
      //       if (item.dataset.part == hover.dataset.part) {
      //         item.classList.add('active');
      //       } else {
      //         removeActive();
      //       }
      //     });

      //     hover.addEventListener('mouseout', () => {
      //       removeActive();
      //     });
      //   });

      //   humanPartWrapper.forEach((hover) => {
      //     hover.addEventListener('mouseover', () => {
      //       hover.classList.add('active');
      //       /* eslint-disable-next-line */
      //       if (item.dataset.part == hover.dataset.part) {
      //         item.classList.add('active');
      //       } else {
      //         removeActive();
      //       }
      //     });

      //     hover.addEventListener('mouseout', () => {
      //       removeActive();
      //     });
      //   });
      // });
    }
  };
  mainTab();
  humanTab();
};

const mapBlock = () => {
  /* eslint-disable-next-line */
  ymaps.ready(init);
  /* eslint-disable-next-line */
  var placemarks = [
      {
        latitude: 53.92830138,
        longitude: 27.55861644,
        hintContent: ` <div class="map__baloon_wrapper map__baloon_hint">
        <div class="baloon-img">
              <img src="./assets/images/baloon-logo.png" alt="">
        </div>
        <div class="ballon-content">
              <div class="baloon-text">
                    <span>Адрес:</span>ул.Красная 158, Минск
              </div>
              <div class="baloon-text">
                    <span>Время работы:</span>пн-вск с 10:00 до 20:00
              </div>
              <div class="baloon-text">
                    <span>Телефон:</span>+375 17 393 23 16
              </div>
              <div class="baloon-text">
                    <span>E-mail:</span>post@email.ru
              </div>
              <button class="btn balloon-btn btn--border" type="button">Выбрать</button>
        </div>
      </div>`,
        balloonContent: `
          <div class="map__baloon_wrapper">
            <div class="baloon-img">
                  <img src="./assets/images/baloon-logo.png" alt="">
            </div>
            <div class="ballon-content">
                  <div class="baloon-text">
                        <span>Адрес:</span>ул.Красная 158, Минск
                  </div>
                  <div class="baloon-text">
                        <span>Время работы:</span>пн-вск с 10:00 до 20:00
                  </div>
                  <div class="baloon-text">
                        <span>Телефон:</span>+375 17 393 23 16
                  </div>
                  <div class="baloon-text">
                        <span>E-mail:</span>post@email.ru
                  </div>
                  <button class="btn balloon-btn btn--border" type="button">Выбрать</button>
            </div>
          </div>
        `,
      },

      {
        latitude: 53.72030019,
        longitude: 23.80129222,
        hintContent: ` <div class="map__baloon_wrapper map__baloon_hint">
        <div class="baloon-img">
              <img src="./assets/images/baloon-logo.png" alt="">
        </div>
        <div class="ballon-content">
              <div class="baloon-text">
                    <span>Адрес:</span>ул.Красная 158, Минск
              </div>
              <div class="baloon-text">
                    <span>Время работы:</span>пн-вск с 10:00 до 20:00
              </div>
              <div class="baloon-text">
                    <span>Телефон:</span>+375 17 393 23 16
              </div>
              <div class="baloon-text">
                    <span>E-mail:</span>post@email.ru
              </div>
              <button class="btn balloon-btn btn--border" type="button">Выбрать</button>
        </div>
      </div>`,
        balloonContent: `
          <div class="map__baloon_wrapper">
            <div class="baloon-img">
                  <img src="./assets/images/baloon-logo.png" alt="">
            </div>
            <div class="ballon-content">
                  <div class="baloon-text">
                        <span>Адрес:</span>ул.Притыцкого 158, Минск
                  </div>
                  <div class="baloon-text">
                        <span>Время работы:</span>пн-вск с 09:00 до 20:00
                  </div>
                  <div class="baloon-text">
                        <span>Телефон:</span>+375 17 393 23 16
                  </div>
                  <div class="baloon-text">
                        <span>E-mail:</span>post@email.ru
                  </div>
                  <button class="btn balloon-btn btn--border" type="button">Выбрать</button>
            </div>
          </div>
        `,
      },

      {
        latitude: 53.94126702,
        longitude: 27.62453441,
        hintContent: ` <div class="map__baloon_wrapper map__baloon_hint">
        <div class="baloon-img">
              <img src="./assets/images/baloon-logo.png" alt="">
        </div>
        <div class="ballon-content">
              <div class="baloon-text">
                    <span>Адрес:</span>ул.Красная 158, Минск
              </div>
              <div class="baloon-text">
                    <span>Время работы:</span>пн-вск с 10:00 до 20:00
              </div>
              <div class="baloon-text">
                    <span>Телефон:</span>+375 17 393 23 16
              </div>
              <div class="baloon-text">
                    <span>E-mail:</span>post@email.ru
              </div>
              <button class="btn balloon-btn btn--border" type="button">Выбрать</button>
        </div>
      </div>`,
        balloonContent: `
          <div class="map__baloon_wrapper">
            <div class="baloon-img">
                  <img src="./assets/images/baloon-logo.png" alt="">
            </div>
            <div class="ballon-content">
                  <div class="baloon-text">
                        <span>Адрес:</span>ул.Притыцкого 158, Минск
                  </div>
                  <div class="baloon-text">
                        <span>Время работы:</span>пн-вск с 09:00 до 20:00
                  </div>
                  <div class="baloon-text">
                        <span>Телефон:</span>+375 17 393 23 16
                  </div>
                  <div class="baloon-text">
                        <span>E-mail:</span>post@email.ru
                  </div>
                  <button class="btn balloon-btn btn--border" type="button">Выбрать</button>
            </div>
          </div>
        `,
      },

      {
        latitude: 54.23836102,
        longitude: 28.52541331,
        hintContent: `<div class="map__baloon_wrapper map__baloon_hint">
        <div class="baloon-img">
              <img src="./assets/images/baloon-logo.png" alt="">
        </div>
        <div class="ballon-content">
              <div class="baloon-text">
                    <span>Адрес:</span>ул.Красная 158, Минск
              </div>
              <div class="baloon-text">
                    <span>Время работы:</span>пн-вск с 10:00 до 20:00
              </div>
              <div class="baloon-text">
                    <span>Телефон:</span>+375 17 393 23 16
              </div>
              <div class="baloon-text">
                    <span>E-mail:</span>post@email.ru
              </div>
              <button class="btn balloon-btn btn--border" type="button">Выбрать</button>
        </div>
      </div>`,
        balloonContent: `
          <div class="map__baloon_wrapper">
            <div class="baloon-img">
                  <img src="./assets/images/baloon-logo.png" alt="">
            </div>
            <div class="ballon-content">
                  <div class="baloon-text">
                        <span>Адрес:</span>ул.Притыцкого 158, Минск
                  </div>
                  <div class="baloon-text">
                        <span>Время работы:</span>пн-вск с 09:00 до 20:00
                  </div>
                  <div class="baloon-text">
                        <span>Телефон:</span>+375 17 393 23 16
                  </div>
                  <div class="baloon-text">
                        <span>E-mail:</span>post@email.ru
                  </div>
                  <button class="btn balloon-btn btn--border" type="button">Выбрать</button>
            </div>
          </div>
        `,
      },

      {
        latitude: 52.07288967,
        longitude: 29.29445628,
        hintContent: `<div class="map__baloon_wrapper map__baloon_hint">
        <div class="baloon-img">
              <img src="./assets/images/baloon-logo.png" alt="">
        </div>
        <div class="ballon-content">
              <div class="baloon-text">
                    <span>Адрес:</span>ул.Красная 158, Минск
              </div>
              <div class="baloon-text">
                    <span>Время работы:</span>пн-вск с 10:00 до 20:00
              </div>
              <div class="baloon-text">
                    <span>Телефон:</span>+375 17 393 23 16
              </div>
              <div class="baloon-text">
                    <span>E-mail:</span>post@email.ru
              </div>
              <button class="btn balloon-btn btn--border" type="button">Выбрать</button>
        </div>
      </div>`,
        balloonContent: `
          <div class="map__baloon_wrapper">
            <div class="baloon-img">
                  <img src="./assets/images/baloon-logo.png" alt="">
            </div>
            <div class="ballon-content">
                  <div class="baloon-text">
                        <span>Адрес:</span>ул.Притыцкого 158, Минск
                  </div>
                  <div class="baloon-text">
                        <span>Время работы:</span>пн-вск с 09:00 до 20:00
                  </div>
                  <div class="baloon-text">
                        <span>Телефон:</span>+375 17 393 23 16
                  </div>
                  <div class="baloon-text">
                        <span>E-mail:</span>post@email.ru
                  </div>
                  <button class="btn balloon-btn btn--border" type="button">Выбрать</button>
            </div>
          </div>
        `,
      },
    ],
    geoObjects = [];

  function init() {
    /* eslint-disable-next-line */
    var map = new ymaps.Map('map', {
      center: [53.92830138, 27.55861644],
      zoom: 6,
      controls: ['zoomControl'],
      behaviors: ['drag'],
    });

    placemarks.forEach((item, index) => {
      geoObjects[index] = new ymaps.Placemark([item.latitude, item.longitude], {
        hintContent: item.hintContent,
        balloonContent: item.balloonContent,
      }, {
        iconLayout: 'default#image',
        iconImageHref: './assets/images/map.svg',
        iconImageSize: [32, 40],
      });
    });
    /* eslint-disable-next-line */
    var clusterer = new ymaps.Clusterer({
      clusterIcons: [
        {
          href: './assets/images/map.svg',
          size: [50, 50],
          offset: [-25, -50],
        },
      ],
      clusterIconContentLayout: null,
    });
    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
  }
};

const ortosTAbBlock = () => {
  const ortosTabs = document.querySelector('.ortos-tabs');
  const ortosTabLink = document.querySelectorAll('.ortos-tab__link');
  const ortosTabContentItem = document.querySelectorAll('.ortos-tab__content-item');
  const bw = document.body.clientWidth;

  if (bw < 700) {
    for (let i = 0; i < ortosTabContentItem.length; i++) {
      ortosTabLink[i].classList.remove('active');
      ortosTabContentItem[i].classList.remove('active');
    }
  }

  const toggleOrtosTab = (index) => {
    for (let i = 0; i < ortosTabContentItem.length; i++) {
      if (index === i) {
        if (bw < 700) {
          ortosTabLink[i].classList.toggle('active');
          ortosTabContentItem[i].classList.toggle('active');
        } else {
          ortosTabLink[i].classList.add('active');
          ortosTabContentItem[i].classList.add('active');
        }
      } else {
        ortosTabLink[i].classList.remove('active');
        ortosTabContentItem[i].classList.remove('active');
      }
    }
  };

  if (ortosTabs) {
    ortosTabs.addEventListener('click', (e) => {
      const target = e.target.closest('.ortos-tab__link');

      if (target) {
        ortosTabLink.forEach((item, i) => {
          if (target === item) {
            toggleOrtosTab(i);
          }
        });
      }
    });
  }
};

const showSearch = () => {
  const headerMain = document.querySelector('.header-main');
  const headerSearch = document.querySelector('.header-search');

  headerMain.addEventListener('click', (e) => {
    if (e.target.closest('.mobile-search')) {
      headerSearch.classList.toggle('active');
    } else if (e.target.closest('.input-btn')) {
      headerSearch.classList.remove('active');
    }
  });
};

const mobileMenu = () => {
  const header = document.querySelector('#header');
  const popupMenu = document.querySelector('.popup-menu');
  const headerPhoneNumber = document.querySelector('.header-phone__number');
  const headerPhonePopup = document.querySelector('.header-phone__popup');
  const footerPhoneNumber = document.querySelector('.footer-phone__number');
  const footerPhonePopup = document.querySelector('.footer-phone__popup');
  const headerCompanyItem = document.querySelector('.header-company__item');
  const headerCompany = document.querySelector('.header-company');
  const cart = document.querySelector('.cart.personal-issues__content ');
  const cartPopup = document.querySelector('.cart-popup');
  const headerCatalog = document.querySelector('.header-catalog');
  const catalog = document.querySelector('#catalog');
  const mobileCatalogWrapper = document.querySelector('.mobile-catalog__wrapper');
  const catalogMobileMenuLink = document.querySelectorAll('.catalog-mobile__menu_link');
  const hedaerBottomNavLinkMore = document.querySelector('.header-bottom__nav-link_more');
  const smallCatalog = document.querySelector('.small-catalog');
  const footerFormWrapper = document.querySelector('.footer-form__wrapper');
  const bw = document.body.clientWidth;

  header.addEventListener('click', (e) => {
    /* eslint-disable-next-line */
    const target = e.target;
    if (target.closest('.header-mob__menu')) {
      popupMenu.classList.add('active');
      document.body.classList.add('open-mobile-menu');
    } else if (target.closest('.header-phone__number')) {
      headerPhonePopup.classList.toggle('active');
      headerPhoneNumber.classList.toggle('active');
    } else if (target.closest('.header-company__item')) {
      headerCompany.classList.toggle('active');
      headerCompanyItem.classList.toggle('active');
    } else if (!target.closest('.header-phone__popup')) {
      headerPhonePopup.classList.remove('active');
      headerPhoneNumber.classList.remove('active');
      headerCompany.classList.remove('active');
      headerCompanyItem.classList.remove('active');
    }
  });

  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.cart.personal-issues__content')) {
      if (bw > 700) {
        const cartPopupGood = document.querySelectorAll('.cart-popup__good');

        cartPopup.classList.toggle('active-cart');
        cart.classList.toggle('active-cart');
      }
    } else if (!e.target.closest('.cart-popup')) {
      cartPopup.classList.remove('active-cart');
      cart.classList.remove('active-cart');
    }
  });

  headerCatalog.addEventListener('click', () => {
    headerCatalog.classList.toggle('active');
    catalog.classList.toggle('active');
  });

  if (hedaerBottomNavLinkMore) {
    hedaerBottomNavLinkMore.addEventListener('click', () => {
      hedaerBottomNavLinkMore.classList.toggle('active');
      smallCatalog.classList.toggle('active');

      if (!hedaerBottomNavLinkMore.classList.contains('active')) {
        smallCatalog.classList.remove('active');
      }
    });
  }

  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.footer-phone__number')) {
      footerPhonePopup.classList.toggle('active-phone');
      if (bw < 576) {
        footerFormWrapper.classList.toggle('active-phone');
      }
      footerPhoneNumber.classList.toggle('active-phone');
    } else if (!e.target.closest('.footer-phone__popup')) {
      footerPhonePopup.classList.remove('active-phone');
      footerFormWrapper.classList.remove('active-phone');
      footerPhoneNumber.classList.remove('active-phone');
    }
  });

  if (popupMenu) {
    popupMenu.addEventListener('click', (e) => {
      if (e.target.closest('.mobile-menu__company')) {
        e.target.closest('.mobile-menu__company').classList.toggle('active');
      } else if (e.target.closest('.mobile-cross')) {
        popupMenu.classList.remove('active');
        mobileCatalogWrapper.classList.remove('open-mobile-catalog');
        document.body.classList.remove('open-mobile-menu');

        catalogMobileMenuLink.forEach((item) => {
          if (item) {
            item.classList.remove('open');
          }
        });
      }
    });
  }
};

// const cart = () => {
//   const cartPopupGood = document.querySelectorAll('.cart-popup__good');
//   const totalPrice = document.querySelectorAll('.total-price__count');
//   const cartPopupWrapper = document.querySelector('.cart-popup__wrapper');
//   const cartGoodsValue = document.querySelector('.personal-area__text .cart-span');
//   const cartPopupTitle = document.querySelector('.cart-popup__title span');
//
//   const changeCartItem = () => {
//     /* eslint-disable-next-line */
//     const cartPopupGood = document.querySelectorAll('.cart-popup__good');
//     /* eslint-disable-next-line */
//     const cart = document.querySelector('.cart');
//     const cartPopup = document.querySelector('.cart-popup');
//
//     cartGoodsValue.textContent = cartPopupGood.length;
//     cartPopupTitle.textContent = cartPopupGood.length;
//
//     if (cartPopupGood.length === 0) {
//       cartPopup.classList.remove('active');
//       cart.classList.remove('active');
//     }
//   };
//   /* eslint-disable-next-line */
//   // const handleCounts = (cartPopupGood) => {
//   //   const plus = cartPopupGood.querySelector('.buttonCountPlus');
//   //   const minus = cartPopupGood.querySelector('.buttonCountMinus');
//   //   const number = cartPopupGood.querySelector('.buttonCountNumber');
//   //   const price = cartPopupGood.querySelector('.cart-popup__price span');
//   //   const cross = cartPopupGood.querySelector('.cart-cross');
//   //   const totalPriceCount = cartPopupGood.querySelector('.total-price__count');
//   //
//   //   cross.addEventListener('click', () => {
//   //     number.innerText = 1;
//   //     totalPriceCount.value = 0;
//   //     cartPopupGood.remove();
//   //     changeCartItem();
//   //   });
//   // };
// };

const cookies = () => {
  const cookie = document.querySelector('.cookies');

  if (!cookie) {
    return;
  }

  if (sessionStorage.cookie === 'none') {
    cookie.style.display = 'none';
  } else {
    cookie.style.display = 'flex';
  }

  cookie.addEventListener('click', (e) => {
    if (e.target.closest('.cookies-btn')) {
      cookie.style.display = 'none';
      sessionStorage.cookie = cookie.style.display;
    }
  });
};

const toggleFooterTab = () => {
  const footerMain = document.querySelector('.footer-main');

  footerMain.addEventListener('click', (e) => {
    const target = e.target.closest('.footer-mob__tab');
    if (target) {
      target.classList.toggle('active');
    }
  });
};

const arrtowTop = () => {
  const arrowToTop = document.querySelector('.arrow-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPos > 300) {
      arrowToTop.style.display = 'block';
    } else {
      arrowToTop.style.display = 'none';
    }
  });

  arrowToTop.addEventListener('click', () => {
    scrollTo();
  });
};

const catalog = () => {
  /* eslint-disable-next-line */
  const catalog = document.querySelector('.catalog');
  const catalogFirstListItem = document.querySelectorAll('.catalog-first__list-item');
  const catalogSecondList = document.querySelectorAll('.catalog-second__list');
  const catalogThirdList = document.querySelectorAll('.catalog-third__list');
  const catalogSecondListItem = document.querySelectorAll('.catalog-second__list-item');

  const catalogDesktop = () => {
    const toggleCatalog = (index) => {
      for (let i = 0; i < catalogSecondList.length; i++) {
        if (index === i) {
          catalogFirstListItem[i].classList.add('active');
          catalogSecondList[i].classList.add('active');
        } else {
          catalogFirstListItem[i].classList.remove('active');
          catalogSecondList[i].classList.remove('active');
          // catalogThirdList[i].classList.remove('active');
          catalogSecondListItem[i].classList.remove('active');
        }
      }
    };

    const toggleCatalogSecond = (index) => {
      for (let i = 0; i < catalogThirdList.length; i++) {
        if (index === i) {
          catalogSecondListItem[i].classList.add('active');
          catalogThirdList[i].classList.add('active');
        } else {
          catalogSecondListItem[i].classList.remove('active');
          catalogThirdList[i].classList.remove('active');
        }
      }
    };

    catalog.addEventListener('mouseover', (e) => {
      const targetFirstMenu = e.target.closest('.catalog-first__list-item');
      const targetSecondMenu = e.target.closest('.catalog-second__list-item');

      if (targetFirstMenu) {
        catalogFirstListItem.forEach((item, i) => {
          if (targetFirstMenu === item) {
            toggleCatalog(i);
          }
        });
      } else if (targetSecondMenu) {
        catalogSecondListItem.forEach((item, i) => {
          if (targetSecondMenu === item) {
            toggleCatalogSecond(i);
          }
        });
      }
    });
  };

  const catalogMobile = () => {
    /* eslint-disable-next-line */
    const catalogMobile = document.querySelector('.catalog-mobile');
    const mobileCatalogWrapper = document.querySelector('.mobile-catalog__wrapper');
    const catalogMobileBack = document.querySelector('.catalog-mobile__back');
    const catalogMobileMenuWrapper = document.querySelector('.catalog-mobile__menu-wrapper');

    if (catalogMobile) {
      catalogMobile.addEventListener('click', (e) => {
        mobileCatalogWrapper.classList.add('open-mobile-catalog');
      });
    }

    if (catalogMobileBack) {
      catalogMobileBack.addEventListener('click', (e) => {
        mobileCatalogWrapper.classList.remove('open-mobile-catalog');
      });
    }

    if (catalogMobileMenuWrapper) {
      catalogMobileMenuWrapper.addEventListener('click', (e) => {
        const target = e.target.closest('.catalog-mobile__menu_link');
        if (target) {
          target.classList.add('open');
        } else if (e.target.closest('.catalog-mobile__menu_list-back')) {
          e.target.closest('.catalog-mobile__menu_list-back').parentNode.parentNode.children[0].classList.remove('open');
        }
      });
    }
  };

  catalogDesktop();
  catalogMobile();
};

const goodDetailCounter = () => {
  const plus = document.querySelector('.conter-input__good-plus');
  const minus = document.querySelector('.conter-input__good-minus');
  const number = document.querySelector('.conter-input__good-number');

  if (plus) {
    plus.addEventListener('click', () => {
      number.innerText++;
    });
  }

  if (minus) {
    minus.addEventListener('click', () => {
      number.innerText--;
      if (number.innerText < 1) {
        number.innerText = 1;
      }
    });
  }
};

const goodDetailsTab = () => {
  const goodTab = document.querySelector('.good-detail__tab-links');
  const goodDetailTab = document.querySelector('.good-detail__tab-content_buttons');
  const goodTabLink = document.querySelectorAll('.good-detail__tab-link');
  const goodDetailTabContent = document.querySelectorAll('.good-detail__tab-content_item');
  const buttonContent = document.querySelectorAll('.button-content');
  const secondContent = document.querySelectorAll('.good-detail__tab-content_tab-item');
  const goodDetailSliderTabs = document.querySelector('.good-detail__slider-tabs');
  const goodDetailSliderTab = document.querySelectorAll('.good-detail__slider-tab');
  const goodsSlider = document.querySelectorAll('.goods-slider');

  const toggleDetailTab = (index) => {
    for (let i = 0; i < goodDetailTabContent.length; i++) {
      if (index === i) {
        goodTabLink[i].classList.add('active');
        goodDetailTabContent[i].classList.add('active');
        goodTabLink[i].scrollIntoView({
          block: 'center', behavior: 'smooth',
        });
      } else {
        goodTabLink[i].classList.remove('active');
        goodDetailTabContent[i].classList.remove('active');
      }
    }
  };

  const toggleDetailTabTab = (index) => {
    for (let i = 0; i < secondContent.length; i++) {
      if (index === i) {
        buttonContent[i].classList.add('active');
        secondContent[i].classList.add('active');
      } else {
        buttonContent[i].classList.remove('active');
        secondContent[i].classList.remove('active');
      }
    }
  };

  const toggleDetailSliderTab = (index) => {
    for (let i = 0; i < goodsSlider.length; i++) {
      if (index === i) {
        goodDetailSliderTab[i].classList.add('active');
        goodsSlider[i].classList.add('active');
      } else {
        goodDetailSliderTab[i].classList.remove('active');
        goodsSlider[i].classList.remove('active');
      }
    }
  };

  if (goodTab) {
    goodTab.addEventListener('click', (e) => {
      const target = e.target.closest('.good-detail__tab-link');

      if (target) {
        goodTabLink.forEach((item, i) => {
          if (target === item) {
            toggleDetailTab(i);
          }
        });
      }
    });
  }

  if (goodDetailTab) {
    goodDetailTab.addEventListener('click', (e) => {
      const target = e.target.closest('.button-content');

      if (target) {
        buttonContent.forEach((item, i) => {
          if (target === item) {
            toggleDetailTabTab(i);
          }
        });
      }
    });
  }

  if (goodDetailSliderTabs) {
    goodDetailSliderTabs.addEventListener('click', (e) => {
      const target = e.target.closest('.good-detail__slider-tab');

      if (target) {
        goodDetailSliderTab.forEach((item, i) => {
          if (target === item) {
            toggleDetailSliderTab(i);
          }
        });
      }
    });
  }
};

const togglePopup = () => {
  const popup = document.querySelectorAll('.popup');
  const addToCart = document.querySelector('.add-to-cart');
  const oneClickPopup = document.querySelector('.one-click__popup');
  const countSize = document.querySelector('.count-size');
  const popupSize = document.querySelector('.popup-size');

  const closePopup = (target) => {
    if (target.closest('.popup-cross') || target.matches('.popup')) {
      oneClickPopup.classList.remove('active');
      popupSize.classList.remove('active');
      document.body.classList.remove('open-mobile-menu');
    }
  };

  const openPopup = (clickElem) => {
    clickElem.classList.add('active');
    document.body.classList.add('open-mobile-menu');
  };

  if (addToCart) {
    addToCart.addEventListener('click', () => {
      openPopup(oneClickPopup);
    });
  }

  popup.forEach((item) => {
    item.addEventListener('click', (e) => {
      closePopup(e.target);
    });
  });

  if (countSize) {
    countSize.addEventListener('click', () => {
      openPopup(popupSize);
    });
  }
};

const useCatalogFilter = () => {
  const catalogFilterWrapper = document.querySelector('.catalog-filter__wrapper');
  const catalogFilterBtnResult = document.querySelector('.catalog-filter__btn-result');

  if (!catalogFilterWrapper) {
    return;
  }

  if (!catalogFilterBtnResult) {
    return;
  }

  const showDropdownContent = (dropdown) => {
    const showMore = dropdown.querySelector('.show-more');
    if (showMore) {
      showMore.classList.add('active');

      showMore.addEventListener('click', () => {
        if (showMore.textContent.includes('Показать все')) {
          // eslint-disable-next-line no-param-reassign
          dropdown.style.height = 'auto';
          showMore.textContent = 'Свернуть';
          showMore.classList.add('show-less');
        } else {
          showMore.classList.remove('show-less');
          showMore.textContent = 'Показать все';
          /* eslint-disable-next-line */
          dropdown.style.height = 181 + 'px';
        }
      });
    }
  };

  const open = (button, dropdown) => {
    /* eslint-disable-next-line */
    dropdown.style.height = 181 + 'px'
    button.classList.add('active');
    dropdown.classList.add('active');
  };

  const close = (button, dropdown) => {
    button.classList.remove('active');
    /* eslint-disable-next-line */
    dropdown.classList.remove('active');
    /* eslint-disable-next-line */
    dropdown.style.height = '';
    const showMore = dropdown.querySelector('.show-more');
    if (showMore) {
      showMore.classList.remove('show-less');
      showMore.textContent = 'Показать все';
      // eslint-disable-next-line no-param-reassign
      dropdown.style.height = '';
    }
  };

  if (catalogFilterWrapper) {
    catalogFilterWrapper.addEventListener('click', (e) => {
      /* eslint-disable-next-line */
      const target = e.target;
      if (target.closest('.catalog-filter__title-wrapper')) {
        const parent = target.closest('.catalog-filter__item');
        const button = target.closest('.catalog-filter__title-wrapper');
        const dropdown = parent.querySelector('.catalog-filter__content');
        /* eslint-disable-next-line */
        dropdown.classList.contains('active') ? close(button, dropdown) : open(button, dropdown);
        showDropdownContent(dropdown);
      }
    });
  }

  if (catalogFilterBtnResult) {
    catalogFilterBtnResult.addEventListener('click', () => {
      const filterTypeCheckbox = document.querySelectorAll('.catalog-filter__wrapper input:checked');
      filterTypeCheckbox.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.checked = false;
      });
    });
  }
};

const catalogTagsHandle = () => {
  const catalogTags = document.querySelector('.catalog-tags');
  const catalogContent = document.querySelector('.catalog-content');
  const catalogTagsActive = document.querySelector('.catalog-tags__tabs-wrapper');
  const removeTags = document.querySelector('.remove-tags');
  const removeTagsMobile = document.querySelector('.remove-tags__mobile');
  const showMoreTag = document.querySelector('.show-more__tag');
  const bw = document.body.clientWidth;

  if (bw < 576 && catalogTags) {
    if (catalogTags.offsetHeight >= 160) {
      const catalogTag = document.querySelectorAll('.catalog-tag');
      if (catalogTag.length >= 6) {
        catalogTags.classList.add('show');
      }
      // showMoreTag.style.display = 'block'
    }
  }

  if (!catalogTags) {
    return;
  }

  if (!catalogTagsActive) {
    return;
  }

  catalogTags.addEventListener('click', (e) => {
    if (e.target.closest('.catalog-tag')) {
      if (bw > 576) {
        removeTags.classList.add('active');
      } else if (bw < 576) {
        removeTagsMobile.classList.add('active');
      }

      if (bw > 576) {
        e.target.classList.add('active');
        const activeTag = document.createElement('div');
        activeTag.classList.add('active-tag');
        activeTag.textContent = e.target.textContent;
        catalogTagsActive.append(activeTag);
      } else if (bw < 576) {
        e.target.classList.toggle('active');
      }
    }
  });

  catalogTagsActive.addEventListener('click', (e) => {
    if (e.target.closest('.active-tag')) {
      const catalogTag = document.querySelectorAll('.catalog-tag');
      catalogTag.forEach((item) => {
        if (item.textContent === e.target.textContent) {
          item.classList.remove('active');
        }
      });
      e.target.remove();
    }

    const activeTag = document.querySelectorAll('.active-tag');

    if (activeTag.length === 0) {
      removeTags.classList.remove('active');
      removeTagsMobile.classList.remove('active');
    }
  });

  catalogContent.addEventListener('click', (e) => {
    if (e.target.closest('.remove-tags') || e.target.closest('.remove-tags__mobile')) {
      const activeTag = document.querySelectorAll('.active-tag');
      const catalogTag = document.querySelectorAll('.catalog-tag');

      catalogTag.forEach((tag) => {
        tag.classList.remove('active');
      });

      activeTag.forEach((item) => {
        // eslint-disable-next-line no-shadow
        const catalogTag = document.querySelectorAll('.catalog-tag');

        catalogTag.forEach((tag) => {
          tag.classList.remove('active');
        });
        item.remove();
        removeTags.classList.remove('active');
        removeTagsMobile.classList.remove('active');
      });
      removeTags.classList.remove('active');
      removeTagsMobile.classList.remove('active');
    }
  });

  showMoreTag.addEventListener('click', () => {
    // eslint-disable-next-line no-shadow
    const catalogTags = document.querySelector('.catalog-tags');
    showMoreTag.style.display = 'none';
    catalogTags.classList.add('active');
  });
};

const useUISelect = () => {
  $(() => {
    $('.catalog-filter__pagination-item select').selectmenu();
    $('.select').selectmenu();
  });
};

const counter = () => {
  $(document).on('click', '.buttonCountMinus ', function (e) {
    e.preventDefault();
    const $btn = $(this);
    const $input = $btn.next();
    // eslint-disable-next-line
    let value = parseInt($input.text());
    while (value > 1) {
      value -= 1;
      break;
    }
    $input.text(value);
  });

  $(document).on('click', '.buttonCountPlus ', function (e) {
    e.preventDefault();
    const $btn = $(this);
    const $input = $btn.prev();
    // eslint-disable-next-line
    let value = parseInt($input.text());
    value += 1;
    $input.text(value);
  });
};

// Селект
$('.phone-select__drop').on('click', function () {
  const $phoneSelectDrop = $(this);
  const $phoneSelect = $phoneSelectDrop.closest('.phone-select');

  $phoneSelect.toggleClass('active');
});

$.fn.setCursorPosition = function (pos) {
  if ($(this).get(0).setSelectionRange) {
    $(this).get(0).setSelectionRange(pos, pos);
  } else if ($(this).get(0).createTextRange) {
    const range = $(this).get(0).createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
};

if ($('.phone-select__input').length) {
  $('.phone-select__input').setCursorPosition(4);
  $('.phone-select__input').mask('+375 (99) 999-99-99');
}

// выбор option
$('.phone-select__label').on('click', function () {
  const $phoneSelectLabel = $(this);
  const $phoneSelect = $phoneSelectLabel.closest('.phone-select');
  const $phoneSelectTitle = $phoneSelect.find('.phone-select__title');
  const $phoneSelectDrop = $phoneSelectTitle.find('.phone-select__drop');
  const $phoneSelectFlag = $phoneSelectDrop.find('.phone-select__flag');
  const $phoneSelectInput = $phoneSelectTitle.find('.phone-select__input');

  $phoneSelect.removeClass('active');

  if ($phoneSelectLabel.attr('data-value') === '+375') {
    $phoneSelectFlag.show();
    $phoneSelectDrop.find('span').empty();
    $phoneSelectInput.removeClass('any');
    $phoneSelectInput.val('');
    $phoneSelectInput.attr('placeholder', '+375');
    $phoneSelectInput.setCursorPosition(4);
    $phoneSelectInput.mask('+375 (99) 999-99-99');
  } else {
    $phoneSelectFlag.hide();
    $phoneSelectDrop.find('span').text($phoneSelectLabel.attr('data-value'));

    $phoneSelectInput.addClass('any');
    $phoneSelectInput.val('');
    $phoneSelectInput.attr('placeholder', '+375');
    $phoneSelectInput.mask('+');
    $phoneSelectInput.setCursorPosition(0);
    $phoneSelectInput.unmask('+');
  }
});

// Клик по кнопке ввести промокод в оформлении заказа
const showPromocode = () => {
  const promocodeBtn = document.querySelector('.checkout-total__promocode-btn');
  const promocodeInput = document.querySelector('.checkout-total__promocode');

  if (!promocodeBtn) {
    return;
  }

  if (!promocodeInput) {
    return;
  }

  promocodeBtn.addEventListener('click', () => {
    promocodeBtn.style.display = 'none';
    promocodeInput.style.display = 'flex';
  });
};

const tabs = () => {
  // eslint-disable-next-line
  const tabs = document.querySelectorAll('.tab:not(.shops-page__tab)');

  if (!tabs) {
    return;
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const dataAttr = tab.getAttribute('data-tab');
      const tabsWrap = tab.closest('.tabs-wrap');

      tabsWrap.querySelector('.tab.active').classList.remove('active');
      tabsWrap.querySelector('.tabs-content.active').classList.remove('active');

      tab.classList.add('active');
      document.getElementById(dataAttr).classList.add('active');
    });
  });
};

const validateFooter = () => {
  const footerForm = document.querySelector('#footer .footer-form .input-wrap');
  const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
  }

  // footerForm.addEventListener('input', (e) => {
  //   const target = e.target.closest('.input-wrap__input');
  //   const inputWrapper = e.target.closest('.input-wrap');
  //
  //   if (isEmailValid(target.value)) {
  //     inputWrapper.classList.remove('error');
  //     // inputWrapper.classList.add('success');
  //   } else if (target.value.length >= 1) {
  //     inputWrapper.classList.remove('success');
  //     inputWrapper.classList.add('error');
  //     e.preventDefault();
  //   } else if (target.value.length < 1) {
  //     inputWrapper.classList.remove('error');
  //   }
  // });

  footerForm.addEventListener('click', (e) => {
    e.preventDefault();
    const inputWrapper = document.querySelector('#footer .input-wrap');
    const input = document.querySelector('#footer .input-wrap__input');

    if (e.target.closest('.input-wrap__btn')) {
      if (!isEmailValid(input.value)) {
        inputWrapper.classList.add('error');
        setTimeout(() => {
          inputWrapper.classList.remove('error');
        }, 1000);
        // inputWrapper.classList.add('success');
      } else if (inputWrapper.classList.contains('error')) {
        e.preventDefault();
        // input.value = '';
        // inputWrapper.classList.remove('error');
      } else if (!inputWrapper.classList.contains('error')) {
        inputWrapper.classList.add('success');
        setTimeout(() => {
          inputWrapper.classList.remove('success');
        }, 1000);

        inputWrapper.classList.remove('error');
        input.value = '';
      }
    }
  });
};

$('.submit-form .input-wrap__input').on('input', function () {
  const $inputWrapInput = $(this);
  const $inputWrap = $inputWrapInput.closest('.input-wrap');
  const $inputWrapBtn = $inputWrap.find('.input-wrap__btn');

  if ($inputWrapInput.val() !== '') {
    $inputWrapBtn.prop('disabled', false);
  } else {
    $inputWrapBtn.prop('disabled', true);
  }
});

// validation

const phoneSelectInput = document.querySelectorAll('.phone-select__input');
phoneSelectInput.forEach((phone) => {
  phone.addEventListener('input', () => {
    // eslint-disable-next-line no-param-reassign
    phone.value = phone.value.replace(/[^+0-9]/g, '');
  });
});

$.validator.addMethod('minlenghtphone', (value, element) => value.replace(/\D+/g, '').length > 1);

// validation
$.validator.addMethod('loyaltyCardLength', (value, element) => value.replace(/\D+/g, '').length === 12);

$.validator.addMethod('requiredphone', (value, element) => value.replace(/\D+/g, '').length > 1);

$.validator.addMethod('cyrillic', (value) => {
  const result = true;
  const iChars = '!@#$%^&*()+=-[]\\\';,./{}|":<>?"+"абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"+" ';
  for (let i = 0; i < value.length; i++) {
    if (iChars.indexOf(value.charAt(i)) !== -1) {
      return false;
    }
  }
  return result;
}, '');

$.validator.addMethod('defis_only_symbol', (value) => {
  const result = true;
  const iChars = '!@#$%^&*()+=[]\\\'`~;,./{}|":<>?"';
  for (let i = 0; i < value.length; i++) {
    if (iChars.indexOf(value.charAt(i)) !== -1) {
      return false;
    }
  }
  return result;
}, '');

$.validator.addMethod('notNumber', (value, element, param) => {
  const reg = /[0-9]/;
  if (reg.test(value)) {
    return false;
  }
  return true;
});

$.validator.addMethod('numberPlus', (value, element, param) => {
  const reg = /\+?\d+/;
  if (reg.test(value)) {
    return true;
  }
  return false;
});

$.validator.addMethod('emailfull', function (value, element) {
  // eslint-disable-next-line
  return this.optional(element) || /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i.test(value);
});

function fieldRequired() {
  return $('.input').val().length > 0;
}

function validateForms(form) {
  $(form).validate({
    rules: {
      name: {
        required: true,
        defis_only_symbol: true,
        notNumber: true,
      },
      surname: {
        required: true,
        defis_only_symbol: true,
        notNumber: true,
      },
      profile_name: {
        required: true,
        defis_only_symbol: true,
        notNumber: true,
      },
      profile_surname: {
        required: true,
        defis_only_symbol: true,
        notNumber: true,
      },
      phone: {
        requiredphone: true,
        minlenghtphone: true,
        // number: true
      },
      random_phone: {
        required: true,
        numberPlus: true,
      },
      email: {
        email: true,
        emailfull: true,
        required: true,
      },
      personal_email: {
        email: true,
        emailfull: true,
      },
      // loyalty_card: {
      //   loyaltyCardLength: {
      //     param: true,
      //     depends: fieldRequired,
      //   },
      // },
      delivery_placement: 'required',
      delivery_street: 'required',
      delivery_home: 'required',
      checkout_public_agree: 'required',
      checkout_personal_agree: 'required',
    },
    messages: {
      name: {
        required: 'Обязательное поле для заполнения*',
        defis_only_symbol: 'Некорректные данные*',
        notNumber: 'Некорректные данные*',
      },
      surname: {
        required: 'Обязательное поле для заполнения*',
        defis_only_symbol: 'Некорректные данные*',
        notNumber: 'Некорректные данные*',
      },
      phone: {
        requiredphone: 'Обязательное поле для заполнения*',
        minlenghtphone: 'Некорректные данные*',
        // number: "Некорректные данные*",
      },
      random_phone: {
        required: 'Обязательное поле для заполнения*',
        numberPlus: 'Некорректные данные*',
      },
      email: {
        required: 'Обязательное поле для заполнения*',
        email: 'Некорректные данные*',
        emailfull: 'Некорректные данные*',
      },
      personal_email: {
        email: 'Некорректные данные*',
        emailfull: 'Некорректные данные*',
      },
      loyalty_card: {
        loyaltyCardLength: 'Некорректные данные: необходимо ввести 12 цифр*',
      },
      // birthday: "Обязательное поле для заполнения*",
      delivery_placement: 'Обязательное поле для заполнения*',
      delivery_street: 'Обязательное поле для заполнения*',
      delivery_home: 'Обязательное поле для заполнения*',
    },
  });
}

/* $('input[name=loyalty_card]').on('click', function () {
    $(this).setCursorPosition(0);
}).mask("9999 9999 9999"); */

const checkoutSubmit = () => {
  const checkoutSubmitBtn = document.querySelector('.checkout-total__submit.disabled');

  checkoutSubmitBtn.addEventListener('click', () => {
    window.scrollTo({
      top: document.querySelector('#curier').getBoundingClientRect().top,
      behavior: 'smooth',
    });
  });
};

validateForms('#checkout-form');
validateForms('#personal-form');

$(document).on('click', '.personal-form__btn[type=button]', function () {
  const $personalFormBtn = $(this);
  const $personalForm = $personalFormBtn.closest('form');
  const $personalFormSubmitBtn = $personalForm.find('button[type=submit]');
  const $personalFormCheck = $personalForm.find('.personal-form__check');
  const $phoneSelectDrop = $('.phone-select__drop');

  $personalForm.find('input').removeAttr('disabled');
  $phoneSelectDrop.prop('disabled', false);
  $personalFormBtn.hide();
  $personalFormCheck.removeClass('disabled');
  $personalFormSubmitBtn.show();
});

$('.loyalty-card input').on('keyup input change', function () {
  const $inputWrapInput = $(this);
  const $inputWrap = $inputWrapInput.closest('.input-wrap');
  const $inputWrapReset = $inputWrap.find('.input-wrap__reset'); // кнопка удалить (сбросить = пустой value)
  const $inputWrapBtn = $inputWrap.find('.input-wrap__btn'); // кнопка сабмита
  if ($inputWrapInput.val() !== '') {
    $inputWrapBtn.show();
    $inputWrapInput.css('padding-right', '65px');
  } else {
    $inputWrapBtn.hide();
    $inputWrapInput.css('padding-right', '16px');
  }

  if ($inputWrap.hasClass('error')) {
    if ($inputWrapInput.val().length === 3) {
      $inputWrap.removeClass('error');
      $inputWrap.addClass('success');
      $inputWrapReset.addClass('active');
    } else {
      $inputWrap.addClass('error');
    }
  }
});

$(document).on('click', '.input-wrap__reset', function (e) {
  const $inputWrapReset = $(this);
  const $inputWrap = $inputWrapReset.closest('.input-wrap');
  const $inputWrapBtn = $inputWrap.find('.input-wrap__btn');
  const $inputWrapInput = $inputWrap.find('.input-wrap__input');

  $inputWrap.removeClass('active');
  $inputWrap.removeClass('success');

  $inputWrapInput.val('');
  $inputWrapInput.css('padding-right', '16px');
  $inputWrapReset.removeClass('active');
  $inputWrapBtn.hide();
});

$(document).on('click', '.order-item__toggle-btn', function () {
  const $orderItemToggleBtn = $(this);
  const $orderItem = $orderItemToggleBtn.closest('.order-item');
  const $orderItemToggleContent = $orderItem.find('.order-item__toggle-content');

  if ($orderItemToggleBtn.attr('aria-expanded') === 'true') {
    $orderItemToggleBtn.attr('aria-expanded', false);
    $orderItemToggleContent.slideUp();
  } else {
    $orderItemToggleBtn.attr('aria-expanded', true);
    $orderItemToggleContent.slideDown();
  }
});

$(document).on('click', '.favorite-btn', function () {
  const $favoriteBtn = $(this);
  const $favoriteGood = $favoriteBtn.closest('.goods-slide');

  $favoriteGood.toggleClass('favorite');

  if ($favoriteGood.hasClass('favorite')) {
    $favoriteBtn.attr('aria-label', 'Убрать из избранного');
  } else {
    $favoriteBtn.attr('aria-label', 'Добавить в избранное');
  }
});

$(document).on('click', '.js-phone-code-back', () => {
  $.fancybox.close({
    src: '#code-phone',
    type: 'inline',
  });
  $.fancybox.open({
    src: '#enter',
    type: 'inline',
  });
});

const filterShopsTable = () => {
  const shopsTabs = document.querySelectorAll('.shops-page__tab');
  const shopsTable = document.querySelector('.shops-page__table');
  const shopsTableRows = shopsTable && shopsTable.querySelector('.shops-table__body').querySelectorAll('.shops-table__row');

  shopsTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      const tabAttr = tab.getAttribute('data-city-tab');

      document.querySelector('.shops-page__tab.active').classList.remove('active');
      tab.classList.add('active');

      if (i === 0) {
        shopsTableRows.forEach((row) => {
          // eslint-disable-next-line no-param-reassign
          row.style.display = 'grid';
        });
      } else {
        shopsTableRows.forEach((row) => {
          if (row.getAttribute('data-city') === tabAttr) {
            // eslint-disable-next-line no-param-reassign
            row.style.display = 'grid';
          } else {
            // eslint-disable-next-line no-param-reassign
            row.style.display = 'none';
          }
        });
      }
    });
  });
};

$(document).on('mouseup', (e) => {
  const $cartPopup = $('.cart-popup');
  const $smallCatalog = $('.small-catalog');

  // eslint-disable-next-line max-len
  if (!$cartPopup.is(e.target) && !$smallCatalog.is(e.target) && $smallCatalog.has(e.target).length === 0 && $cartPopup.has(e.target).length === 0) {
    $cartPopup.removeClass('active');
    $('.cart').removeClass('active');
    $smallCatalog.removeClass('active');
  }
});

$(document).on('mouseup', (e) => {
  const $footerPhonePopup = $('.footer-phone__popup');

  if (!$footerPhonePopup.is(e.target) && !$footerPhonePopup.is(e.target)) {
    $footerPhonePopup.removeClass('active');
    $footerPhonePopup.closest('.footer-phone__number').removeClass('active');
  }
});

$(document).on('mouseup', (e) => {
  const $phoneSelect = $('.phone-select');

  if (!$phoneSelect.is(e.target) && $phoneSelect.has(e.target).length === 0) {
    $phoneSelect.removeClass('active');
  }
});

const fixHeader = () => {
  window.addEventListener('scroll', () => {
    // eslint-disable-next-line no-restricted-globals
    if (scrollY > 112 && window.innerWidth > 1100) {
      $('.header-main').addClass('fixed');
      $('.header-bottom').addClass('active');
    } else {
      $('.header-main').removeClass('fixed');
      $('.header-bottom').removeClass('active');
    }
  });
};

$(document).on('click', '.personal-form__btn[type=button]', function () {
  const $personalFormBtn = $(this);
  const $personalForm = $personalFormBtn.closest('form');
  const $personalFormSubmitBtn = $personalForm.find('button[type=submit]');
  const $phoneSelectDrop = $('.phone-select__drop');

  $personalForm.find('input').removeAttr('readonly');
  $phoneSelectDrop.prop('disabled', false);
  $personalFormBtn.hide();
  $personalFormSubmitBtn.show();
});

$('.loyalty-card input').on('keyup input change', function () {
  const $inputWrapInput = $(this);
  const $inputWrap = $inputWrapInput.closest('.input-wrap');
  const $inputWrapReset = $inputWrap.find('.input-wrap__reset'); // кнопка удалить (сбросить = пустой value)
  const $inputWrapBtn = $inputWrap.find('.input-wrap__btn'); // кнопка сабмита
  if ($inputWrapInput.val() !== '') {
    $inputWrapBtn.show();
    $inputWrapInput.css('padding-right', '65px');
  } else {
    $inputWrapBtn.hide();
    $inputWrapInput.css('padding-right', '16px');
  }

  if ($inputWrap.hasClass('error')) {
    if ($inputWrapInput.val().length === 3) {
      $inputWrap.removeClass('error');
      $inputWrap.addClass('success');
      $inputWrapReset.addClass('active');
    } else {
      $inputWrap.addClass('error');
    }
  }
});

$(document).on('click', '.input-wrap__btn', function () {
  const $inputWrapBtn = $(this);
  const $inputWrap = $inputWrapBtn.closest('.input-wrap');
  const $inputWrapInput = $inputWrap.find('.input-wrap__input');
  const $inputWrapReset = $inputWrap.find('.input-wrap__reset');

  if ($inputWrapInput.val().length === 3) {
    $inputWrap.addClass('success');
    $inputWrapReset.addClass('active');
  } else {
    // $inputWrap.addClass('error');
  }
});

$(document).on('click', '.personal-form__field .input-wrap__btn', function () {
  const $inputWrapBtn = $(this);
  const $inputWrap = $inputWrapBtn.closest('.input-wrap');
  const $inputWrapInput = $inputWrap.find('.input-wrap__input');
  const $inputWrapReset = $inputWrap.find('.input-wrap__reset');
  $inputWrapInput.prop('readonly', true);

  if ($inputWrapInput.val().length === 3) {
    $inputWrap.addClass('success');
    $inputWrapReset.addClass('active');
  } else {
    // $inputWrap.addClass('error');
  }
});

$(document).on('click', '.input-wrap__reset', function () {
  const $inputWrapReset = $(this);
  const $inputWrap = $inputWrapReset.closest('.input-wrap');
  const $inputWrapBtn = $inputWrap.find('.input-wrap__btn');
  const $inputWrapInput = $inputWrap.find('.input-wrap__input');

  $inputWrap.removeClass('active');
  $inputWrap.removeClass('success');

  $inputWrapInput.val('');
  $inputWrapInput.css('padding-right', '16px');
  $inputWrapReset.removeClass('active');
  $inputWrapBtn.hide();
});

/* $(document).on('click', ['data-fancybox'], function () {
    if ($('body').hasClass('fancybox-active')) {
        $('html').addClass('no-scroll');
    } else {
        $('html').removeClass('no-scroll');
    }
}); */

// paginator
const element = document.querySelector('.pagination ul');
const totalPages = 20;
const page = 1;
const bw = document.body.clientWidth;

if (element) {
  // eslint-disable-next-line no-use-before-define
  element.innerHTML = createPagination(totalPages, page);
}

// eslint-disable-next-line no-shadow
function createPagination(totalPages, page) {
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPageValue = '';

  if (bw > 576) {
    afterPageValue = page + 3;
  } else if (bw < 576) {
    afterPageValue = page + 1;
  }

  let afterPage = afterPageValue;

  if (page > 1) {
    liTag += `<li class="btn numb prev" onclick="createPagination(totalPages, ${page - 1})"><span><i class="fas fa-angle-left"></i></span></li>`;
  } else if (page === 1) {
    liTag += `<li class="btn numb prev disabled" onclick="createPagination(totalPages, ${page - 1})"><span><i class="fas fa-angle-left"></i></span></li>`;
  }

  // if (page > 2) {
  // eslint-disable-next-line max-len
  //     liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
  //     // if (page > 4) {
  //     // liTag += '<li class="numb dots"><span>...</span></li>';
  //     // }
  // }

  if (page === totalPages) {
    beforePage -= 2;
  } else if (page === totalPages - 1) {
    beforePage -= 1;
  }

  if (page === 1) {
    afterPage += 1;
  }

  for (let plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (plength === 0) {
      plength += 1;
    }
    // eslint-disable-next-line max-len
    if (page === plength) {
      active = 'active';
    } else {
      active = '';
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
  }

  // eslint-disable-next-line max-len
  if (page < totalPages - 3) {
    // eslint-disable-next-line max-len
    if (page < totalPages - 2) {
      liTag += '<li class="numb dots"><span>...</span></li>';
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    liTag += `<li class="btn numb next" onclick="createPagination(totalPages, ${page + 1})"><span> <i class="fas fa-angle-right"></i></span></li>`;
  } else if (page === totalPages) {
    liTag += `<li class="btn numb next disabled" onclick="createPagination(totalPages, ${page + 1})"><span> <i class="fas fa-angle-right"></i></span></li>`;
  }

  if (element) {
    element.innerHTML = liTag;
  }

  return liTag;
}

// eslint-disable-next-line no-use-before-define
if (element) {
  element.innerHTML = createPagination(totalPages, page);
}

const openMobileFilter = () => {
  const filterBtnOpen = document.querySelector('.filter-btn__open');
  const catalogFilter = document.querySelector('.catalog-filter');
  const mobileFilterSortlist = document.querySelector('.mobile-filter__sortlist');
  const mobileFilterSortlistSpan = document.querySelector('.mobile-filter__sortlist span');
  const mobileFilterSortWrapper = document.querySelector('.mobile-filter__sort-wrapper');
  const catalogFilterMobileTitleWrapper = document.querySelector('.catalog-filter__mobile-title-wrapper');
  const options = document.querySelectorAll('.mobile-filter__sort-wrapper .radio');

  options.forEach((item) => {
    item.addEventListener('click', (e) => {
      const filterValue = item.querySelector('.filter-value');
      mobileFilterSortlistSpan.textContent = filterValue.textContent;
      mobileFilterSortWrapper.classList.remove('active');
      mobileFilterSortlist.classList.remove('active');
    });
  });

  if (mobileFilterSortlist) {
    mobileFilterSortlist.addEventListener('click', () => {
      mobileFilterSortWrapper.classList.toggle('active');
      mobileFilterSortlist.classList.toggle('active');
    });
  }

  if (filterBtnOpen) {
    filterBtnOpen.addEventListener('click', () => {
      catalogFilter.classList.add('popup');
      document.body.classList.add('open-mobile-menu');
    });
  }

  if (catalogFilterMobileTitleWrapper) {
    catalogFilterMobileTitleWrapper.addEventListener('click', () => {
      catalogFilter.classList.remove('popup');
      document.body.classList.remove('open-mobile-menu');
    });
  }
};

// Анимация улетающего товара в корзину быстрого просмотра
const addToCart = () => {
  $('.goods-btn').on('click', function () {
    const $goodsBtn = $(this);
    const $goodsSlide = $goodsBtn.closest('.goods-slide');

    $($goodsSlide).clone().css({
      position: 'absolute',
      top: `${$goodsSlide.offset().top}px`,
      left: `${$goodsSlide.offset().left}px`,
      'z-index': '9999',
      width: `${$goodsSlide.width()}px`,
      height: `${$goodsSlide.height()}px`,
    }).prependTo($('body'))
      .animate({
        width: $(this).width() / 3,
        height: $(this).height() / 3,
        left: $('.cart.personal-issues__content').offset().left,
        top: $('.cart.personal-issues__content').offset().top,
        opacity: 0.7,
      }, 1000)
      .hide(300, function () {
        $(this).remove();
      });
  });
};

const addToCartDetail = () => {
  $('.good-btn').on('click', function () {
    const $goodsBtn = $(this);
    const $goodsSlide = $('.details-good__slider-wrapper');

    $($goodsSlide).clone().css({
      position: 'absolute',
      top: `${$goodsSlide.offset().top}px`,
      left: `${$goodsSlide.offset().left}px`,
      'z-index': '9999',
      width: `${$goodsSlide.width()}px`,
      height: `${$goodsSlide.height()}px`,
    }).prependTo($('body'))
      .animate({
        width: $(this).width() / 3,
        height: $(this).height() / 3,
        left: $('.cart.personal-issues__content').offset().left,
        top: $('.cart.personal-issues__content').offset().top,
        opacity: 0.7,
      }, 1000)
      .hide(300, function () {
        $(this).remove();
      });
  });
};

const faq = () => {
  const faqAccordion = document.querySelector('.faq-accordion');

  const open = (button, dropdown) => {
    /* eslint-disable-next-line */
    dropdown.style.height = "".concat(dropdown.scrollHeight + 1, "px");
    button.classList.add('active');
    dropdown.classList.add('active');
  };

  const close = (button, dropdown) => {
    button.classList.remove('active');
    /* eslint-disable-next-line */
    dropdown.classList.remove('active');
    // eslint-disable-next-line no-param-reassign
    dropdown.style.height = '';
  };

  if (faqAccordion) {
    faqAccordion.addEventListener('click', (e) => {
      /* eslint-disable-next-line */
      const target = e.target;
      if (target.closest('.faq-title')) {
        const parent = target.closest('.faq-item');
        const button = target.closest('.faq-title');
        const dropdown = parent.querySelector('.faq-content');
        /* eslint-disable-next-line */
        dropdown.classList.contains('active') ? close(button, dropdown) : open(button, dropdown);
      }
    });
  }
};

const openVideo = () => {
  const videoPopup = document.querySelector('.video-popup');
  const videoPopupTitle = document.querySelector('.video-popup__title');
  const mobileCross = document.querySelector('.video-popup .mobile-cross');
  const videoItem = document.querySelectorAll('.video-item');
  const eqVideo = document.querySelector('.eq_video_popup');
  // eslint-disable-next-line no-shadow
  const bw = document.body.clientWidth;

  if (bw > 576) {
    videoItem.forEach((item) => {
      item.addEventListener('click', () => {
        videoPopup.classList.add('active');
        const videoTitle = item.querySelector('.video-title');
        eqVideo.src = item.dataset.video;
        videoPopupTitle.textContent = videoTitle.textContent;
      });
    });
  }

  if (mobileCross) {
    mobileCross.addEventListener('click', () => {
      videoPopup.classList.remove('active');
      eqVideo.src = '';
    });
  }

  if (videoPopup) {
    videoPopup.addEventListener('click', (e) => {
      if (e.target.matches('.popup')) {
        videoPopup.classList.remove('active');
        eqVideo.src = '';
      }
    });
  }
};

const articleTagFnc = () => {
  const articleTags = document.querySelector('.article-tags');

  if (articleTags) {
    articleTags.addEventListener('click', (e) => {
      if (e.target.closest('.article-tag')) {
        e.target.classList.toggle('active');
      }
    });
  }
};

const openFancy = () => {
  const fancyPopup = document.querySelector('.fancy-popup');
  const goodStatsTitle = document.querySelector('.good-stats__title');
  const fancyPopupTitle = document.querySelector('.fancy-popup__title');
  const mobileCross = document.querySelector('.fancy-popup .mobile-cross');
  const detailsGoodSlider = document.querySelector('.details-good__slider');

  if (detailsGoodSlider) {
    detailsGoodSlider.addEventListener('click', (e) => {
      if (e.target.closest('.favorite-btn')) {
        const target = e.target.closest('.favorite-btn');
        fancyPopup.classList.remove('active');
        target.classList.toggle('favorite');
      } else if (e.target.closest('.swiper-slide-active')) {
        document.body.classList.add('open-mobile-menu');
        fancyPopup.classList.add('active');
        fancyPopupTitle.textContent = goodStatsTitle.textContent;
      }
    });
  }

  if (mobileCross) {
    mobileCross.addEventListener('click', () => {
      fancyPopup.classList.remove('active');
      document.body.classList.remove('open-mobile-menu');
    });
  }

  if (fancyPopup) {
    fancyPopup.addEventListener('click', (e) => {
      if (e.target.matches('.popup')) {
        fancyPopup.classList.remove('active');
        document.body.classList.remove('open-mobile-menu');
      }
    });
  }
};

activateSliders();
navigatorTabsBlock();
// mapBlock(); // вылетает ошибка на других страницах
ortosTAbBlock();
showSearch();
mobileMenu();
// cart();
cookies();
toggleFooterTab();
arrtowTop();
catalog();
// Неуниверсальный скрипт каунтера - поменял на свой
// goodDetailCounter();
counter();
goodDetailsTab();
togglePopup();
useCatalogFilter();
catalogTagsHandle();
useUISelect();
openMobileFilter();
faq();
openVideo();
articleTagFnc();
openFancy();

// new
showPromocode();
tabs();
filterShopsTable();
fixHeader();
addToCart();
validateFooter();
addToCartDetail();
