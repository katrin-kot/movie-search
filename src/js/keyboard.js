import '../keyboard.css';
import { handleSearch } from './search';

export function renderKeyboard() {
  const keyArr = [
    {
      ru: 'ё',
      en: '`',
      shift_en: '~',
    },
    {
      ru: '1',
      en: '1',
      shift_ru: '!',
      shift_en: '!',
    },
    {
      ru: '2',
      en: '2',
      shift_ru: '',
      shift_en: '@',
    },
    {
      ru: '3',
      en: '3',
      shift_ru: '№',
      shift_en: '#',
    },
    {
      ru: '4',
      en: '4',
      shift_ru: ';',
      shift_en: '$',
    },
    {
      ru: '5',
      en: '5',
      shift_ru: '%',
      shift_en: '%',
    },
    {
      ru: '6',
      en: '6',
      shift_ru: ':',
      shift_en: '^',
    },
    {
      ru: '7',
      en: '7',
      shift_ru: '?',
      shift_en: '&',
    },
    {
      ru: '8',
      en: '8',
      shift_ru: '*',
      shift_en: '*',
    },
    {
      ru: '9',
      en: '9',
      shift_ru: '(',
      shift_en: '(',
    },
    {
      ru: '0',
      en: '0',
      shift_ru: ')',
      shift_en: ')',
    },
    {
      ru: '-',
      en: '-',
      shift_ru: '_',
      shift_en: '_',
    },
    {
      ru: '=',
      en: '=',
      shift_ru: '+',
      shift_en: '+',
    },
    {
      ru: 'Backspace',
      en: 'Backspace',
    },
    {
      ru: 'Tab',
      en: 'Tab',
    },
    {
      ru: 'й',
      en: 'q',
    },
    {
      ru: 'ц',
      en: 'w',
    },
    {
      ru: 'у',
      en: 'e',
    },
    {
      ru: 'к',
      en: 'r',
    },
    {
      ru: 'е',
      en: 't',
    },
    {
      ru: 'н',
      en: 'y',
    },
    {
      ru: 'г',
      en: 'u',
    },
    {
      ru: 'ш',
      en: 'i',
    },
    {
      ru: 'щ',
      en: 'o',
    },
    {
      ru: 'з',
      en: 'p',
    },
    {
      ru: 'х',
      en: '[',
      shift_en: '{',
    },
    {
      ru: 'ъ',
      en: ']',
      shift_en: '}',
    },
    {
      ru: 'Backslash',
      en: 'Backslash',
      shift_ru: '/',
      shift_en: '|',
    },
    {
      ru: 'CapsLock',
      en: 'CapsLock',
    },
    {
      ru: 'ф',
      en: 'a',
    },
    {
      ru: 'ы',
      en: 's',
    },
    {
      ru: 'в',
      en: 'd',
    },
    {
      ru: 'а',
      en: 'f',
    },
    {
      ru: 'п',
      en: 'g',
    },
    {
      ru: 'р',
      en: 'h',
    },
    {
      ru: 'о',
      en: 'j',
    },
    {
      ru: 'л',
      en: 'k',
    },
    {
      ru: 'д',
      en: 'l',
    },
    {
      ru: 'ж',
      en: ';',
      shift_en: ':',
    },
    {
      ru: 'э',
      en: "'",
      shift_en: '',
    },
    {
      ru: 'Enter',
      en: 'Enter',
    },
    {
      ru: 'ShiftLeft',
      en: 'ShiftLeft',
    },
    {
      ru: 'я',
      en: 'z',
    },
    {
      ru: 'ч',
      en: 'x',
    },
    {
      ru: 'с',
      en: 'c',
    },
    {
      ru: 'м',
      en: 'v',
    },
    {
      ru: 'и',
      en: 'b',
    },
    {
      ru: 'т',
      en: 'n',
    },
    {
      ru: 'ь',
      en: 'm',
    },
    {
      ru: 'б',
      en: ',',
      shift_en: '<',
    },
    {
      ru: 'ю',
      en: '.',
      shift_en: '>',
    },
    {
      ru: '.',
      en: '/',
      shift_ru: ',',
      shift_en: '?',
    },
    {
      ru: 'ArrowUp',
      en: 'ArrowUp',
    },
    {
      ru: 'ShiftRight',
      en: 'ShiftRight',
    },
    {
      ru: 'ControlLeft',
      en: 'ControlLeft',
    },
    {
      ru: 'Meta',
      en: 'Meta',
    },
    {
      ru: 'AltLeft',
      en: 'AltLeft',
    },
    {
      ru: 'Space',
      en: 'Space',
    },
    {
      ru: 'AltRight',
      en: 'AltRight',
    },
    {
      ru: 'ArrowLeft',
      en: 'ArrowLeft',
    },
    {
      ru: 'ArrowDown',
      en: 'ArrowDown',
    },
    {
      ru: 'ArrowRight',
      en: 'ArrowRight',
    },
    {
      ru: 'ControlRight',
      en: 'ControlRight',
    },
  ];

  const Keyboard = {
    elements: {
      main: null,
      keysContainer: null,
      keys: [],
      input: null,
    },

    properties: {
      capsLock: false,
      shiftPressed: false,
      language: localStorage.getItem('language') || 'en',
    },

    init() {
      const input = document.querySelector('input');
      this.elements.input = input;
      this.elements.input.setAttribute('autofocus', 'autofocus');
      this.elements.main = document.createElement('div');
      this.elements.keysContainer = document.createElement('div');

      this.elements.main.classList.add('keyboard');
      this.elements.main.classList.add('keyboard--hidden');
      this.elements.keysContainer.classList.add('keyboard__buttons');
      this.elements.keysContainer.appendChild(this.createButtons());

      this.elements.keys = this.elements.keysContainer.querySelectorAll(
        '.keyboard__buttons',
      );

      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);

      document.addEventListener('keydown', (event) => {
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          this.properties.shiftPressed = true;
        }
        if (event.code === 'AltLeft' && this.properties.shiftPressed) {
          if (this.properties.language === 'en') {
            this.properties.language = 'ru';
          } else {
            this.properties.language = 'en';
          }
          localStorage.setItem('language', this.properties.language);
          this.elements.keysContainer.innerHTML = '';
          this.elements.keysContainer.appendChild(this.createButtons());
          this.properties.shiftPressed = false;
        }
      });

      document.addEventListener('keydown', (event) => {
        const button = document.querySelector(`[data-key="${event.code}"]`);
        if (button) {
          button.classList.add('clicked');
        }
      });
      document.addEventListener('keyup', (event) => {
        const button = document.querySelector(`[data-key="${event.code}"]`);
        if (button) {
          button.classList.remove('clicked');
        }
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          this.properties.shiftPressed = false;
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === '"') {
          return;
        }
        const button = document.querySelector(`[data-key="${event.key.toLowerCase()}"]`) || document.querySelector(
          `[data-shift_${this.properties.language}='${event.key}']`,
        );
        if (button) {
          button.classList.add('clicked');
        }
      });
      document.addEventListener('keyup', (event) => {
        if (event.key === '"') {
          return;
        }
        const button = document.querySelector(`[data-key="${event.key.toLowerCase()}"]`) || document.querySelector(
          `[data-shift_${this.properties.language}='${event.key}']`,
        );
        if (button) {
          button.classList.remove('clicked');
        }
      });
    },

    handleInput(value) {
      this.elements.input.focus();
      // eslint-disable-next-line no-param-reassign
      this.elements.input.value += value;
    },

    createButtons() {
      const fragment = document.createDocumentFragment();
      const { language } = this.properties;
      keyArr.forEach((item) => {
        const key = item[language];
        const button = document.createElement('button');
        button.classList.add(`${key}`);
        button.setAttribute('type', 'button');
        button.setAttribute('data-key', `${key}`);
        if (item[`shift_${language}`]) {
          button.setAttribute(
            `data-shift_${language}`,
            item[`shift_${language}`],
          );
        }
        button.classList.add('keyboard__button');

        switch (key) {
          case 'Backspace':
            button.classList.add('backspace');
            button.innerHTML = '<span>&lArr;</span>';
            button.addEventListener('click', () => {
              const cursorPosition = this.elements.input.selectionStart;
              let { value } = this.elements.input;
              value = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
              this.elements.input.value = value;
              this.elements.input.focus();
              this.elements.input.setSelectionRange(
                cursorPosition - 1,
                cursorPosition - 1,
              );
            });

            break;

          case 'CapsLock':
            button.innerHTML = 'CapsLock';
            button.addEventListener('click', () => {
              if (!this.properties.capsLock) {
                button.classList.add('clicked');
                this.properties.capsLock = true;
              } else {
                button.classList.remove('clicked');
                this.properties.capsLock = false;
              }
            });
            break;

          case 'Enter':
            button.classList.add('enter');
            button.innerHTML = 'Enter';
            button.addEventListener('click', (event) => {
              window.state.position = 0;
              const spinner = document.querySelector('.spinner');
              spinner.classList.add('visible');
              handleSearch(event);
            });

            break;

          case 'Space':
            button.innerHTML = ' ';
            button.addEventListener('click', () => {
              this.handleInput(' ');
            });

            break;

          case 'ArrowUp':
            button.innerHTML = '<span>&uarr;</span>';

            button.addEventListener('click', () => {
              this.elements.input.selectionStart = this.elements.input.selectionEnd;
              if (this.elements.input.selectionEnd - 90 < 0) {
                this.elements.input.selectionEnd = 0;
              } else {
                this.elements.input.selectionEnd -= 90;
              }
              this.elements.input.focus();
            });

            break;

          case 'ArrowDown':
            button.innerHTML = '<span>&darr;</span>';
            button.addEventListener('click', () => {
              this.elements.input.selectionStart += 90;
              this.elements.input.focus();
            });

            break;
          case 'ArrowLeft':
            button.innerHTML = '<span>&larr;</span>';
            button.addEventListener('click', () => {
              this.elements.input.selectionStart -= 1;
              this.elements.input.selectionEnd -= 1;
              this.elements.input.focus();
            });

            break;
          case 'ArrowRight':
            button.innerHTML = '<span>&rarr;</span>';
            button.addEventListener('click', () => {
              this.elements.input.selectionStart += 1;
              this.elements.input.focus();
            });

            break;
          case 'ShiftLeft':
          case 'ShiftRight':
            button.innerHTML = 'shift';

            break;

          case 'ControlRight':
          case 'ControlLeft':
            button.innerHTML = 'ctrl';
            break;
          case 'AltLeft':
          case 'AltRight':
            button.innerHTML = 'alt';

            break;
          case 'Tab':
            button.innerHTML = 'tab';
            button.addEventListener('click', () => {
              // eslint-disable-next-line no-tabs
              this.handleInput('	');
            });

            break;
          case 'Meta':
            button.innerHTML = `${this.properties.language}`;
            button.addEventListener('click', (event) => {
              event.preventDefault();
              if (this.properties.language === 'en') {
                this.properties.language = 'ru';
              } else {
                this.properties.language = 'en';
              }
              localStorage.setItem('language', this.properties.language);
              this.elements.keysContainer.innerHTML = '';
              this.elements.keysContainer.appendChild(this.createButtons());
            });

            break;

          case 'Backslash':
            button.innerHTML = '<span>\\</span>';
            button.addEventListener('click', () => {
              this.handleInput('\\');
            });

            break;
          default:
            button.textContent = key.toLowerCase();
            button.addEventListener('click', () => {
              const { shiftPressed, capsLock } = this.properties;
              const isUppercase = (shiftPressed && !capsLock) || (!shiftPressed && capsLock);
              const value = isUppercase ? key.toUpperCase() : key.toLowerCase();
              this.handleInput(value);
            });

            break;
        }

        fragment.appendChild(button);
      });

      return fragment;
    },
  };

  window.addEventListener('DOMContentLoaded', () => {
    Keyboard.init();
  });
}
