export class Collapse {
  constructor(Id) {
    this.container = Id;
  }

  addClass(param, className) {
    param.classList.add(className);
  }

  removeClass(param, className) {
    param.classList.remove(className);
  }
}

export class CollapseY extends Collapse {
  constructor(Id) {
    super(Id);
    this.items = this.container.querySelectorAll('.collapse-tab');
    this.items.forEach((elem) => {
      this.active(elem);
    });
  }

  active(param) {
    param.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.currentTarget.parentNode;
      const parent = target.parentNode;
      const arry = [...parent.children];

      if (target.classList.contains('_actived')) {
        super.removeClass(target, '_actived');
      } else {
        if (parent.classList.contains('gnb')) {
          this.container.querySelectorAll('li').forEach((elem) => {
            super.removeClass(elem, '_actived');
          });
        } else {
          arry.forEach((elem) => {
            super.removeClass(elem, '_actived');
          });
        }
        super.addClass(target, '_actived');
      }
    });
  }
}

export class CollapseX extends Collapse {
  constructor(Id) {
    super(Id);
    this.openBtn = document.getElementById('openBtn');
    this.closeBtn = document.getElementById('closeBtn');
    this.open(this.openBtn);
    this.close(this.closeBtn);
  }

  open(param) {
    param.addEventListener('click', () => {
      super.addClass(this.container, '_actived');
    });
  }

  close(param) {
    param.addEventListener('click', () => {
      super.removeClass(this.container, '_actived');
      this.container.querySelectorAll('li').forEach((elem) => {
        super.removeClass(elem, '_actived');
      });
    });
  }
}