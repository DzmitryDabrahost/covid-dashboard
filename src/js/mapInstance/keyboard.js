import searchItem from '../search';

const letters = [
    {'q': 'й'}, {'w': 'ц'},  {'e': 'у'}, {'r': 'к'},
    {'t': 'е'}, {'y': 'н'}, {'u': 'г'}, {'i': 'ш'},
    {'o': 'щ'}, {'p': 'з'}, {'[': 'х'}, {']': 'ъ'}, {'a': 'х'}, 
    {'s': 'ы'}, {'d': 'в'}, {'f': 'а'}, {'g': 'п'}, {'h': 'р'},
    {'j': 'о'}, {'k': 'л'}, {'l': 'д'}, {'z': 'я'},
    {'x': 'ч'}, {'c': 'с'}, {'v': 'м'}, {'b': 'и'}, 
    {'n': 'т'}, {'m': 'ь'}, {';': 'ж'}, {"'": 'э'},
];
const nums = [
    {'1': {'en': '!', 'ru': '!'}}, {'2': {'en': '@', 'ru': '"'}}, {'3': {'en': '#', 'ru': '№'}},
    {'4': {'en': '$', 'ru': ';'}}, {'5': {'en': '%', 'ru': '%'}}, {'6': {'en': '^', 'ru': ':'}},
    {'7': {'en': '&', 'ru': '?'}}, {'8': {'en': '*', 'ru': '*'}}, {'9': {'en': '(', 'ru': '('}},
    {'0': {'en': ')', 'ru': ')'}}
];
class KeyBoardApp {
    constructor() {
        this.contentString = [];
        this.putStr = '';
        this.language = 'en';
        this.start = 0;
        this.end = 0;
        this.shift = false;
        this.audio = true;
        this.mute = true;
        this.opened = false;
        this.$textarea = document.querySelector('.searchField');
        this.$mute = document.querySelector('.mute');
        this.$audio = document.querySelector('audio');
        this.$shift = document.querySelector('.shift');
        this.$keyboard = document.querySelector('.keyboard');
        this.$keyboardBtn = document.querySelectorAll('.keyboard__btn')
        this.$capsLk = document.querySelector('.capsLk');
        this.$signal = document.querySelector('.signal');
        this.$lang = document.querySelector('.lang');
        this.$letter = document.querySelectorAll('.letter');
        this.$num = document.querySelectorAll('.num');
        this.selectedBtn;
        this.addListeners();
        this.changeLang();
    }
    handleEvent(e){
        if (e.target.matches('.showKeyboard')) {
            this.showKeyBoard();
        };
        if (e.target.matches(['.monitor', '.keyboard-container']) 
                && this.$keyboard.classList.contains('keyboard--active')) {
                    this.hideKeyBoard();
                };
        if (e.target.closest('.keyboard__row')) {
            this.getBtnValue(e);
            // this.playAudio(e)
        };
        if (e.target.matches('.lang')) {
            this.setLangValue();
        };
        if (e.target.matches('.shift')) {
            this.setShift();
        };
        if (e.target.matches('.keyboard__btn')) {
            this.turnOnTheLight(e.target);
            this.$textarea.focus();
        };
        // if (e.target.matches('.mute')) {
        //     this.setMute(e)
        // }   
    }
    turnOnTheLight(target) {
        if (this.selectedBtn) {
            this.selectedBtn.classList.remove('keyboard__btn--active');
        };
        this.selectedBtn = target;
        this.selectedBtn.classList.add('keyboard__btn--active');
    }
    // setMute(e) {
    //     if (this.audio) {
    //         this.audio = false;
    //         this.$mute.innerText = "Mute off";
    //     } else {
    //         this.audio = true;
    //         this.$mute.innerText = "Mute on"
    //     }
    //     this.playAudio(e)
    // }
    setLangValue() {
        if (this.language === 'en') {
            this.language = 'ru';
            this.$lang.textContent = 'ru';
        } else {
            this.language = 'en';
            this.$lang.textContent = 'en';
        };
        this.changeLang();
    }
    setShift() {
        if (this.shift === false) {
            this.shift = true;
            this.$shift.classList.add('shift--active');
        } else {
            this.shift = false;
            this.$shift.classList.remove('shift--active');
        }
        this.changeLetter();
    }
    changeLetter() {
        this.$num.forEach((num, i) => {
            if (this.language === 'en' && this.shift) {
                num.textContent = Object.values(nums[i])[0].en;
            } else if (this.language === "ru" && this.shift) {
                num.textContent = Object.values(nums[i])[0].ru;
            } else if(!this.shift) {
                num.textContent = Object.keys(nums[i])[0];
            };
        });
    }
    changeLang() {
       this.$letter.forEach((letter, i) => {
           if (this.language === 'en') {
               letter.textContent = Object.keys(letters[i])[0];
           }else {
               letter.textContent = Object.values(letters[i])[0]
           };
       });
    }
    // playAudio(e) {
    //     if(this.audio) {
    //         this.$audio.currentTime = 0;
    //         this.$audio.play();
    //     } 
    // }
    getBtnValue(e) {
        if (e.target.matches('.inputData')) {
            let symbol
            if (this.$capsLk.classList.contains('capsLk--active')) {
               symbol = e.target.innerText.toUpperCase()
            };
            if (this.shift) {
                symbol = e.target.innerText.toUpperCase()
            };
            if (this.shift && this.$capsLk.classList.contains('capsLk--active')) {
                symbol = e.target.innerText.toLowerCase()
            };
            if (!this.shift && !this.$capsLk.classList.contains('capsLk--active')) {
                symbol = e.target.innerText.toLowerCase()
            };

            if (this.$textarea.selectionStart === this.contentString.length) {
                this.contentString.push(symbol)
            } else {
                this.contentString.splice(this.$textarea.selectionStart, 0, symbol)
            };
            
        }
        if (e.target.matches('.whitespace')) {
            this.contentString.push(' ');
        };
        if (e.target.matches('.enter')) {
           this.contentString.push('\n');
        };
        if (e.target.matches('.capsLk')) {
            this.$signal.classList.toggle('signal--active');
            this.$capsLk.classList.toggle("capsLk--active");
        }; 
        if (e.target.matches('.delete-latest')) {
            if (this.contentString) {
                if (this.$textarea.selectionStart === this.contentString.length) {
                    this.contentString.pop()
                } else if (this.$textarea.selectionStart === this.$textarea.selectionEnd && this.$textarea.selectionStart !== this.contentString.length) {
                    this.contentString.splice(this.$textarea.selectionStart-1, 1)
                } else {
                    this.contentString.splice(this.$textarea.selectionStart, this.$textarea.selectionEnd - this.$textarea.selectionStart)
                };
            }
        };
        if (e.target.matches('.arrow-left')) {
            this.$textarea.selectionEnd -= 1
        };
        if (e.target.matches('.arrow-right')) {
            this.$textarea.selectionStart += 1
        };
        this.renderValue(this.contentString.join(''))
    }
    renderValue(str) {
        this.$textarea.value = str
        searchCountry(str)
    }
    addListeners() {
        document.body.addEventListener('click', e => {
            this.handleEvent(e)
        })
    }
}

new KeyBoardApp()

function searchCountry(str = '') {
    const input = document.querySelector('.searchField');
    const country = document.querySelectorAll('.country');
    country.forEach(element => {
      if (!element.innerText.toUpperCase().includes(str.toUpperCase())) {
        element.classList.add('hide');
      } else {
        element.classList.remove('hide');
      };
    });
}


















