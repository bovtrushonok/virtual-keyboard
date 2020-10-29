const Keyboard = {
    elements: {
        main: null, //keyboard itself
        keysContainer: null, //wrapper for keys
        keys: [], // keys
    },

    properties: {
        value: "",
        capsLock: false,
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
 
    },

    createKeys() { //make HTML&CSS
        let fragment = new DocumentFragment();
        const keysLayoutEn = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "en",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "'", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "shift",
            "space"];
        
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
                        keyElement.classList.add("keyboard__key--wide");
                        keyElement.innerHTML = createIconHTML("backspace");
                        keyElement.addEventListener("click", () => {
                            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                            this.updateDisplay();
                        });

                        break;

                        case "caps":
                        keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                        keyElement.innerHTML = createIconHTML("keyboard_capslock");

                        keyElement.addEventListener("click", () => {
                            this.toggleCapsLock();
                            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                        });
                        break;

                        case "shift":
                        keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                        keyElement.textContent = 'Shift';
                        keyElement.addEventListener("click", () => {
                            //this.shiftFunctions();
                            keyElement.classList.toggle("keyboard__key--active");
                        });
                        break;

                        case "enter":
                        keyElement.classList.add("keyboard__key--wide");
                        keyElement.innerHTML = createIconHTML("keyboard_return");
                        keyElement.addEventListener("click", () => {
                            this.properties.value += "\n";
                            this.updateDisplay();
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

                        case "space":
                        keyElement.classList.add("keyboard__key--extra-wide");
                        keyElement.innerHTML = createIconHTML("space_bar");

                        keyElement.addEventListener("click", () => {
                            this.properties.value += " ";
                            this.updateDisplay();
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
                            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                            this.updateDisplay();
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
            "space"];
        
        const keysLayoutRu = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",  "ru",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
        "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?", "shift",
        "space"];

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
    },

    updateDisplay() {
       textDisplay.textContent = this.properties.value;
    },

    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0 && key.textContent !== "Shift") key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
    },

    open() { //showKeyboard
        this.elements.main.classList.remove('keyboard--hidden');
    },

    close() { //hide Keyboard
        this.elements.main.classList.add('keyboard--hidden');
    },
}

window.addEventListener('load', () => Keyboard.init());

let textDisplay = document.querySelector('.use-keyboard-input');
textDisplay.addEventListener('click', () => Keyboard.open());