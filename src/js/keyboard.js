export class Keyboard {
  #switchElement;
  #fontSelectElement;
  #containerElement;
  #keyboardElement;
  #inputGroupElement;
  #inputElement;
  #keyMouseElement;
  #keyPress;
  #mousePress;

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
    document.addEventListener('keydown', this.#onKeydown);
    document.addEventListener('keyup', this.#onKeyup.bind(this));
    this.#inputElement.addEventListener('input', this.#onInput.bind(this));
    document.addEventListener('mousedown', this.#onMouseDown.bind(this));
    document.addEventListener('mouseup', this.#onMouseUp.bind(this));
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

  #onKeydown = (event) => {
    if (this.#mousePress) return;
    this.#keyPress = true;
    const key = this.#getKeyboardKey(event);
    key?.classList.add('active');
  };

  //   #onKeydown(event) {
  //     console.log(this);
  //     // const key = this.#getKeyboardKey(event);
  //     // key?.classList.add('active');
  //   }

  #onKeyup(event) {
    if (this.#mousePress) return;
    this.#keyPress = false;
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

  #onMouseDown(event) {
    if (this.#keyPress) return;
    this.#mousePress = true;
    // 해당 키 밖에서 mouseup을 했을 때를 위해 필드로 저장
    this.#keyMouseElement = this.#getKeyFromMouse(event);
    this.#keyMouseElement?.classList.add('active');
  }

  #onMouseUp() {
    // const isActive = this.#keyMouseElement?.classList.contains('active');
    // if (isActive) {

    // }
    if (this.#keyPress) return;
    this.#mousePress = false;
    const val = this.#keyMouseElement?.dataset.val;
    if (!!val && val !== 'Space' && val !== 'Backspace') {
      this.#inputElement.value += val;
    } else if (val === 'Space') {
      this.#inputElement.value += ' ';
    } else if (val === 'Backspace') {
      this.#inputElement.value = this.#inputElement.value.slice(0, -1); // (0, length - 1)
    }

    this.#keyMouseElement?.classList.remove('active');
  }

  #getKeyboardKey(event) {
    return this.#keyboardElement.querySelector(`[data-code=${event.code}]`);
  }

  #isKorean(inputValue) {
    const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
    return koreanRegex.test(inputValue);
  }

  #getKeyFromMouse(event) {
    return event.target.closest('div.key');
  }
}
