export class Appearance {
  constructor(elment) {
    this.item = elment;
  }

  removeClass() {
    for (let i = 0; i < this.item.length; i++) {
      this.item[i].classList.remove('_hidden');
    }
  }

  addClass() {
    for (let i = 0; i < this.item.length; i++) {
      this.item[i].classList.add('_hidden');
    }
  }
}