export class Roller {
  constructor(Id) {
    this.container = Id.container;
    this.speed = Id.speed;
    this.data = Id.data;
    this.list = this.container.querySelectorAll('li');
    this.first = this.container.querySelector('.js-first');
    this.second = this.container.querySelector('.js-second');
    this.third = this.container.querySelector('.js-third');
    this.change = 2;
    this.currData = 1;
    this.currIndex = 1;

    this.init();
  }

  init() {
    this.first.children[0].innerHTML = this.data[0];
    this.third.classList.add('js-top');

    this.intervalID = setInterval(() => {
      this.toTop.call(this);
      this.addData.call(this);
    }, this.speed);

    this.hover();
  }

  removeAll(param) {
    param.classList.remove('js-top');
    param.classList.remove('js-center');
  }
  removeTop(param) {
    param.classList.remove('js-top');
    param.classList.add('js-center');
  }
  removeCenter(param) {
    param.classList.remove('js-center');
    param.classList.add('js-top');
  }

  toTop() {
    switch (this.change) {
      case 2:
        this.removeCenter(this.first);
        this.removeTop(this.second);
        this.removeAll(this.third);
        this.change = 0;
        break;
      case 1:
        this.removeTop(this.first);
        this.removeAll(this.second);
        this.removeCenter(this.third);
        this.change = 2;
        break;
      case 0:
        this.removeAll(this.first);
        this.removeCenter(this.second);
        this.removeTop(this.third);
        this.change = 1;
        break;
    }
  }

  addData() {
    if (this.currData < this.data.length - 1) {
      this.container.children[this.currIndex].children[0].innerHTML = this.data[this.currData];
      this.currData++;
    } else if (this.currData === this.data.length - 1) {
      this.container.children[this.currIndex].children[0].innerHTML = this.data[this.currData];
      this.currData = 0;
    }

    if (this.currIndex < 2) {
      this.currIndex++;
    } else if (this.currIndex === 2) {
      this.currIndex = 0;
    }
  }

  stop() {
    clearInterval(this.intervalID);
  }

  hover() {
    this.list.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        this.stop();
      });
      element.addEventListener('mouseleave', () => {
        this.intervalID = setInterval(() => {
          this.toTop.call(this);
          this.addData.call(this);
        }, this.speed);
      });
    });
  }
}
