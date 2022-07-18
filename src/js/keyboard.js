export class Keyboard {
  #switchElement;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#switchElement = document.getElementById('switch');
  }
  #addEvent() {
    this.#switchElement.addEventListener('change', (event) => {
      document.documentElement.setAttribute(
        'theme',
        event.target.checked ? 'dark-mode' : ''
      );
    });
  }
}
