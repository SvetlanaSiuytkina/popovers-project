export class Popover {
  constructor(btn) {
    this.btn = btn;
    this.title = btn.getAttribute('data-popover-title');
    this.content = btn.getAttribute('data-popover-content');
    this.popoverElement = null;
    this.init();
  }

  init() {
    const popoverElement = document.createElement('div');
    this.popoverElement = popoverElement;
    this.popoverElement.className = 'popover';

    const innerElement = document.createElement('div');
    innerElement.className = 'popover-inner';

    const titleElement = document.createElement('div');
    titleElement.className = 'popover-title';
    titleElement.textContent = this.title;

    const contentElement = document.createElement('div');
    contentElement.className = 'popover-content';
    contentElement.textContent = this.content;

    innerElement.append(titleElement, contentElement);

    const arrowElement = document.createElement('div');
    arrowElement.className = 'popover-arrow';

    this.popoverElement.append(innerElement, arrowElement);
    document.body.append(this.popoverElement);

    this.btn.addEventListener('click', () => this.toggle());
  }

  toggle() {
    if (this.popoverElement.classList.contains('visible')) {
      this.hide();
    } else {
      this.show();
    }
  }
  
  show() {
    this.popoverElement.classList.add('visible');
    this.position();
  }
  
  hide() {
    this.popoverElement.classList.remove('visible');
  }

  position() {
    const btnRect = this.btn.getBoundingClientRect();
    const popoverRect = this.popoverElement.getBoundingClientRect();

    const top = btnRect.top - popoverRect.height - 7;
    const left = (btnRect.left + btnRect.width / 2) - (popoverRect.width / 2);

    this.popoverElement.style.top = `${top}px`;
    this.popoverElement.style.left = `${left}px`; 
  }
}