export class Autoplay {
  constructor(keenSlider) {
    this.slider = keenSlider;
    this.timeout;
    this.mouseOver = false;

    this.slider.on('created', () => {
      this.slider.container.addEventListener('mouseover', () => {
        this.mouseOver = true;
        this.clearNextTimeout();
      });
      this.slider.container.addEventListener('mouseout', () => {
        this.mouseOver = false;
        this.nextTimeout();
      });
      this.nextTimeout();
    });
    this.slider.on('dragStarted', this.clearNextTimeout.bind(this));
    this.slider.on('animationEnded', this.nextTimeout.bind(this));
    this.slider.on('updated', this.nextTimeout.bind(this));
  }

  clearNextTimeout() {
    clearTimeout(this.timeout);
  }

  nextTimeout() {
    clearTimeout(this.timeout);
    if (this.mouseOver) return;
    this.timeout = setTimeout(() => {
      this.slider.next();
    }, 2000);
  }
}

export class Navigation extends Autoplay {
  constructor(keenSlider) {
    super(keenSlider);

    this.wrapper;
    this.dots;
    this.arrowLeft;
    this.arrowRight;
    this.pagination;
    this.toggleBtn;

    // this.slider.on('created', () => {
    //   this.markup();
    //   this.updateClasses();
    // });
    // this.slider.on('optionsChanged', () => {
    //   console.log(2);
    //   this.markup(true);
    //   this.markup();
    //   this.updateClasses();
    // });
    // this.slider.on('slideChanged', () => {
    //   this.updateClasses();
    // });
    // this.slider.on('destroyed', () => {
    //   this.markup(true);
    // });
  }

  markup(remove) {
    this.wrapperMarkup(remove);
    this.arrowMarkup(remove);
    this.toggleBtnMarkup(remove);
    this.dotMarkup(remove, this.pagination);
  }

  removeElement(elment) {
    elment.parentNode.removeChild(elment);
  }

  createDiv(className) {
    const div = document.createElement('div');
    const classNames = className.split(' ');
    classNames.forEach((name) => div.classList.add(name));
    return div;
  }

  wrapperMarkup(remove) {
    if (remove) {
      const parent = this.wrapper.parentNode;
      while (this.wrapper.firstChild) parent.insertBefore(this.wrapper.firstChild, this.wrapper);
      this.removeElement(this.wrapper);
      return;
    }
    this.wrapper = this.createDiv('navigation');
    this.slider.container.parentNode.appendChild(this.wrapper);
    this.wrapper.appendChild(this.slider.container);
  }

  arrowMarkup(remove) {
    if (remove) {
      this.removeElement(this.arrowLeft);
      this.removeElement(this.arrowRight);
      return;
    }
    this.arrowLeft = this.createDiv('arrow arrow--left');
    this.arrowLeft.addEventListener('click', () => this.slider.prev());
    this.arrowRight = this.createDiv('arrow arrow--right');
    this.arrowRight.addEventListener('click', () => this.slider.next());

    this.wrapper.appendChild(this.arrowLeft);
    this.wrapper.appendChild(this.arrowRight);
  }

  dotMarkup(remove, wrapper = this.wrapper) {
    if (remove) {
      this.removeElement(this.dots);
      return;
    }
    this.dots = this.createDiv('dots');
    this.slider.track.details.slides.forEach((_e, idx) => {
      const dot = this.createDiv('dot');
      dot.addEventListener('click', () => this.slider.moveToIdx(idx));
      this.dots.appendChild(dot);
    });
    wrapper.appendChild(this.dots);
  }

  toggleBtnMarkup(remove) {
    if (remove) {
      this.removeElement(this.toggleBtn);
      return;
    }
    this.pagination = this.createDiv('pagination');
    this.toggleBtn = this.createDiv('toggle-btn');
    this.toggleBtn.addEventListener('click', (event) => {
      const target = event.currentTarget;
      target.classList.toggle('stop');
      if (target.classList.contains('stop')) {
        super.clearNextTimeout();
      } else {
        super.nextTimeout();
      }
    });
    this.wrapper.appendChild(this.pagination);
    this.pagination.appendChild(this.toggleBtn);
  }

  updateClasses() {
    const slide = this.slider.track.details.rel;
    addClass.call(this, this.slider.slides, slide, 'slide__active')
    slide === 0
      ? this.arrowLeft.classList.add('arrow--disabled')
      : this.arrowLeft.classList.remove('arrow--disabled');
    slide === this.slider.track.details.slides.length - 1
      ? this.arrowRight.classList.add('arrow--disabled')
      : this.arrowRight.classList.remove('arrow--disabled');
    Array.from(this.dots.children).forEach(function (dot, idx) {
      idx === slide ? dot.classList.add('dot--active') : dot.classList.remove('dot--active');
    });
  }
}

function addClass(container, index, className) {
  container.forEach((elment) => {
    elment.classList.remove(className);
  });
  container[index].classList.add(className);
}
