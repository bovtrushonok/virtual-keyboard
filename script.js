const Keyboard = {
    elements: {
        main: null, //keyboard itself
        keysContainer: null, //wrapper for keys
        keys: [], // keys
    },

    properties: {
        value: "",
        capsLock: false,
        shift: false,
        sound: false
    },

    init() { //fires onload, making HTML&CSS for main elements
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        this.elements.main.classList.add('keyboard', 'keyboard--hidden', 'english');
        this.elements.keysContainer.classList.add('keyboard__keys');
        
      
        this.elements.main.append(this.elements.keysContainer);
        document.body.append(this.elements.main);
        this.createKeys();
        
        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
        this.realKeyboard();
 
    },

    createKeys() { //make HTML&CSS
        let fragment = new DocumentFragment();
        const keysLayoutEn = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "en",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "'", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "shift",
            "volume_down", "space", "fast_rewind", "fast_forward"];
        
        const createIconHTML = (icon_name) => (`<i class="material-icons">${icon_name}</i>`);
        let chosenKeysLayout;
        if(this.elements.main.classList.contains('english')) chosenKeysLayout = keysLayoutEn;
        else  chosenKeysLayout = keysLayoutRu;

        
        chosenKeysLayout.forEach(key => {
                const keyElement = document.createElement("button");
                 const insertLineBreak = ["backspace", "en", "enter", "shift"].indexOf(key) !== -1;

                    // Add attributes/classes
                    keyElement.setAttribute("type", "button");
                    keyElement.classList.add("keyboard__key");

                    switch (key) {
                        case "backspace":
                        keyElement.classList.add("keyboard__key--wide", "backspace");
                        keyElement.innerHTML = createIconHTML("backspace");
                        keyElement.addEventListener("click", () => {
                            let changeValue = this.properties.value.split('');
                            let cursorPos = textDisplay.selectionStart - 1;
                            changeValue.splice(textDisplay.selectionStart - 1, 1);
                            this.properties.value = changeValue.join('');
                            textDisplay.textContent = this.properties.value;
                          
                            textDisplay.focus();
                            textDisplay.selectionStart = textDisplay.selectionEnd = cursorPos;
                            if (this.properties.sound) this.playSound('backspace');
                           
                        });

                        break;

                        case "caps":
                        keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "caps");
                        keyElement.innerHTML = createIconHTML("keyboard_capslock");

                        keyElement.addEventListener("click", () => {
                            this.toggleCapsLock();
                            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                            if (this.properties.sound) this.playSound('caps');
                        });
                        break;

                        case "shift":
                        keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "shift");
                        keyElement.textContent = 'Shift';
                        keyElement.addEventListener("click", () => {
                            this.properties.shift = !this.properties.shift;
                            if (this.properties.shift) this.shiftMode(true);
                            else this.shiftMode(false); // numbers to Symbols in keyboard, some letters to symbols
                               
                            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
                            if (this.properties.sound) this.playSound('shift');
                        });
                        break;

                        case "enter":
                        keyElement.classList.add("keyboard__key--wide", "enter");
                        keyElement.innerHTML = createIconHTML("keyboard_return");
                        keyElement.addEventListener("click", () => {
                            let changeValue = this.properties.value.split('');
                            let cursorPos = textDisplay.selectionStart;
                            changeValue.splice(textDisplay.selectionStart, 0, '\n');
                            this.properties.value = changeValue.join('');
                            textDisplay.textContent = this.properties.value;
                          
                            textDisplay.focus();
                            textDisplay.selectionStart = textDisplay.selectionEnd = cursorPos + 2;
                            if (this.properties.sound) this.playSound('enter');
                        });

                        break;
                       
                        case "en":
                            keyElement.classList.add("keyboard__key--wide");
                            keyElement.textContent = key;
                            keyElement.addEventListener("click", (e) => {
                                this.elements.main.classList.toggle('english');
                                if(this.elements.main.classList.contains('english')) e.target.innerHTML = 'en';
                                else e.target.innerHTML = 'ru';
                                this.switchKeyboardLang();
                            });
    
                        break;
                        
                        case "volume_down":
                            keyElement.classList.add("keyboard__key--dark", "keyboard__key--activatable");
                            keyElement.innerHTML = createIconHTML("volume_down");
    
                            keyElement.addEventListener("click", () => {
                                keyElement.classList.toggle("keyboard__key--active");
                                this.properties.sound = !this.properties.sound;
                            });
                        break

                        case "space":
                        keyElement.classList.add("keyboard__key--extra-wide", "space");
                        keyElement.innerHTML = createIconHTML("space_bar");

                        keyElement.addEventListener("click", () => {
                            let changeValue = this.properties.value.split('');
                            let cursorPos = textDisplay.selectionStart;
                            changeValue.splice(textDisplay.selectionStart, 0, ' ');
                            this.properties.value = changeValue.join('');
                            textDisplay.textContent = this.properties.value;
                          
                            textDisplay.focus();
                            textDisplay.selectionStart = textDisplay.selectionEnd = cursorPos + 1;
                        });

                        
                        break;

                        case "fast_rewind":
                        keyElement.classList.add("keyboard__key--wide");
                        keyElement.innerHTML = createIconHTML("fast_rewind");

                        keyElement.addEventListener("click", () => {
                            textDisplay.selectionStart = textDisplay.selectionEnd = --textDisplay.selectionStart;
                            textDisplay.focus();
                        });
                        
                        break;

                        case "fast_forward":
                        keyElement.classList.add("keyboard__key--wide");
                        keyElement.innerHTML = createIconHTML("fast_forward");

                        keyElement.addEventListener("click", () => {
                            textDisplay.selectionStart = textDisplay.selectionEnd = ++textDisplay.selectionStart;
                            textDisplay.focus();
                        });

                        break;
                      
                        case "done":
                        keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                        keyElement.innerHTML = createIconHTML("check_circle");

                        keyElement.addEventListener("click", () => {
                            this.close();
                        });

                        break;

                        default:
                        keyElement.textContent = key.toLowerCase();
                        keyElement.addEventListener("click", () => {
                            if (this.properties.sound) this.playSound();
                            let changeValue = this.properties.value.split('');
                            let cursorPos = textDisplay.selectionStart;
                            if (this.properties.shift) {
                                
                                if (this.properties.capsLock) changeValue.splice(textDisplay.selectionStart, 0, `${keyElement.textContent.toLowerCase()}`);
                                else changeValue.splice(textDisplay.selectionStart, 0, `${keyElement.textContent.toUpperCase()}`);
                                
                            
                            }
                            else {
                                if (this.properties.capsLock) changeValue.splice(textDisplay.selectionStart, 0, `${keyElement.textContent.toUpperCase()}`);
                                else changeValue.splice(textDisplay.selectionStart, 0, `${keyElement.textContent.toLowerCase()}`);
                            }
                            this.properties.value = changeValue.join('');
                            textDisplay.textContent = this.properties.value;
                            textDisplay.focus();
                            textDisplay.selectionStart = textDisplay.selectionEnd = cursorPos + 1;
                     
                        });
                      
                        break;
                };
            
                              

           
               fragment.append(keyElement);
                if (insertLineBreak) {
                    fragment.append(document.createElement("br"));
                }
          
            });
        return this.elements.keysContainer.append(fragment);
    },

    switchKeyboardLang() {
        const keysLayoutEn = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "en",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "'", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "shift",
            "volume_down",  "space", "fast_rewind", "fast_forward"];
        
        const keysLayoutRu = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",  "ru",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
        "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?", "shift",
        "volume_down", "space", "fast_rewind", "fast_forward"];

        let i = 0;

        this.elements.keys.forEach(key => {
            if (key.classList.length > 1)  i++;
            else {
                if (this.elements.main.classList.contains('english')) {
                    key.innerHTML = keysLayoutEn[i];
                    i++;
                }
            else { 
                    key.innerHTML = keysLayoutRu[i];
                    i++;
                }
            }
        });
        if(this.properties.shift) this.shiftMode(true);
    },

    shiftMode(mode) {
        if(mode) { //shift active
            if(this.elements.main.classList.contains('english')) { //for english language
                const shiftLayout = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
                for (let i = 0; i < 10; i++ ) {
                    this.elements.keys[i].textContent = shiftLayout[i];
                }
            }
            else { //for russian language
                const shiftLayout = ["!", "\"", "№", ";", "%", ":", "?", "*", "(", ")"];
                for (let i = 0; i < 10; i++ ) {
                    this.elements.keys[i].textContent = shiftLayout[i];
                }
                this.elements.keys[47].textContent = ",";
            }
        }
        else { //shift inactive
            const regLayout = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
                for (let i = 0; i < 10; i++ ) {
                    this.elements.keys[i].textContent = regLayout[i];
                }
            this.elements.keys[47].textContent = "?";
        }
    },

    updateDisplay() {
       textDisplay.textContent = this.properties.value;
       this.setFocusTextarea();
    },

    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0 && key.textContent !== "Shift") key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
    },

    playSound(type) {
        let audio;
        if (type) {
            audio = document.querySelector(`audio[data-key=${type}]`);
        }
        else {
            if (this.elements.main.classList.contains('english')) audio = document.querySelector(`audio[data-lang="en"]`);
            else audio = document.querySelector(`audio[data-lang="ru"]`);
        }
        audio.currentTime = 0;
        audio.play();
    },

    setFocusTextarea() {
        textDisplay.selectionStart = textDisplay.selectionEnd = this.properties.value.length;
        textDisplay.focus();
    },

    open() { //showKeyboard
        this.elements.main.classList.remove('keyboard--hidden');
    },

    close() { //hide Keyboard
        this.elements.main.classList.add('keyboard--hidden');
    },

    realKeyboard () {
        textDisplay.addEventListener('keydown', (e) => {
            this.elements.keys.forEach(key => {
                if (e.key == key.textContent) key.classList.add("active");
      
                
                switch(e.code) {
                    case 'Space':
                    this.elements.keysContainer.querySelector('.space').classList.add("active");
                    break
                    case 'ShiftRight':
                        this.properties.shift = !this.properties.shift;
                        if (this.properties.shift) this.shiftMode(true);
                        else this.shiftMode(false); // numbers to Symbols in keyboard, some letters to symbols
                        this.elements.keysContainer.querySelector('.shift').classList.add("active");
                        this.elements.keysContainer.querySelector('.shift').classList.toggle("keyboard__key--active", this.properties.shift);
                    break
                    case 'ShiftLeft':
                        this.properties.shift = !this.properties.shift;
                        if (this.properties.shift) this.shiftMode(true);
                        else this.shiftMode(false); // numbers to Symbols in keyboard, some letters to symbols
                        this.elements.keysContainer.querySelector('.shift').classList.add("active");
                        this.elements.keysContainer.querySelector('.shift').classList.toggle("keyboard__key--active", this.properties.shift);
                    break
                    case 'Enter':
                        let changeValue = this.properties.value.split('');
                        let cursorPos = textDisplay.selectionStart;
                        changeValue.splice(textDisplay.selectionStart, 0, '\n');
                        this.properties.value = changeValue.join('');
                        textDisplay.textContent = this.properties.value;
                        this.elements.keysContainer.querySelector('.enter').classList.add("active");
                    break
                    case 'CapsLock':
                        this.toggleCapsLock();
                        this.elements.keysContainer.querySelector('.caps').classList.add("active");
                        this.elements.keysContainer.querySelector('.caps').classList.toggle("keyboard__key--active", this.properties.capsLock);
                    break
                    case 'Backspace':
                        let changedValue = this.properties.value.split('');
                        let cursorPosition = textDisplay.selectionStart - 1;
                        changedValue.splice(textDisplay.selectionStart - 1, 1);
                        this.properties.value = changedValue.join('');
                        textDisplay.textContent = this.properties.value;
                        this.elements.keysContainer.querySelector('.backspace').classList.add("active");
                    break
                    default:
                    return;
                }
            
            })
        });
        textDisplay.addEventListener('keyup', (e) => {
            this.elements.keys.forEach(key => {
                if (e.key == key.textContent) key.classList.remove("active");
                switch(e.code) {
                    case 'Space':
                    this.elements.keysContainer.querySelector('.space').classList.remove("active");
                    break
                    case 'ShiftRight':
                    this.elements.keysContainer.querySelector('.shift').classList.remove("active");
                       
                    break
                    case 'ShiftLeft':
                    this.elements.keysContainer.querySelector('.shift').classList.remove("active");
                    break
                    case 'Enter':
                    this.elements.keysContainer.querySelector('.enter').classList.remove("active");
                    textDisplay.focus();
                    textDisplay.selectionStart = textDisplay.selectionEnd = cursorPos + 2;
                    break
                    case 'CapsLock':
                    this.elements.keysContainer.querySelector('.caps').classList.remove("active");
                    break
                    case 'Backspace':
                    this.elements.keysContainer.querySelector('.backspace').classList.remove("active");
                    textDisplay.focus();
                    textDisplay.selectionStart = textDisplay.selectionEnd = cursorPosition;
                    break
                    default:
                    return;
                }
            })
        });
    },
}

window.addEventListener('load', () => Keyboard.init());

let textDisplay = document.querySelector('.use-keyboard-input');
textDisplay.addEventListener('click', () => Keyboard.open());





