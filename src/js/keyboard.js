export class Keyboard {
  #switchElement;
  #fontSelectElement;
  #containerElement;
  #keyboardElement;
  #inputGroupElement;
  #inputElement;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerElement = document.getElementById('container');
    this.#switchElement = this.#containerElement.querySelector('#switch');
    this.#fontSelectElement = this.#containerElement.querySelector('#font');
    this.#keyboardElement = this.#containerElement.querySelector('#keyboard');
    this.#inputGroupElement =
      this.#containerElement.querySelector('#input-group');
    this.#inputElement = this.#containerElement.querySelector('#input');
  }

  #addEvent() {
    this.#switchElement.addEventListener('change', this.#onChangeTheme);
    this.#fontSelectElement.addEventListener('change', this.#onChangeFont);
    document.addEventListener('keydown', this.#onKeydown.bind(this));
    document.addEventListener('keyup', this.#onKeyup.bind(this));
    this.#inputElement.addEventListener('input', this.#onInput.bind(this));
  }

  #onChangeTheme(event) {
    document.documentElement.setAttribute(
      'theme',
      event.target.checked ? 'dark-mode' : ''
    );
  }

  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
  }

  #onKeydown(event) {
    console.log(this);
    const key = this.#getKeyboardKey(event);
    key?.classList.add('active');
  }

  #onKeyup(event) {
    const key = this.#getKeyboardKey(event);
    key?.classList.remove('active');
  }

  #onInput(event) {
    const inputValue = event.target.value;
    const result = this.#isKorean(inputValue);

    this.#inputGroupElement.classList.toggle('error', result);
    const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
    event.target.value = inputValue.replace(koreanRegex, '');
  }

  #getKeyboardKey(event) {
    return this.#keyboardElement.querySelector(`[data-code=${event.code}]`);
  }

  #isKorean(inputValue) {
    const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
    return koreanRegex.test(inputValue);
  }
}
