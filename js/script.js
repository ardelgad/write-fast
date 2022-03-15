// Estado de la APP
let STATE = {
    currentWord: "", // Aquí debemos guardar el resultado de getNextWord()
    currentProgressWord: 0, // indica cual es la siguiente posición del "currentWord" a procesar

    // Si le pasas una letra, te dice si esa letra va justamente en la posición 'currentProgressWord'
    isCorrectLetter: function (inputLetter) {
        return this.currentWord[STATE.currentProgressWord] == inputLetter;
    },

    // Nos indica si hemos escrito ya toda la letra
    isWordFinished: function () {
        return this.currentProgressWord == this.currentWord.length;
    }
}

// Paso 1: al hacer click en el botón empezar, obtener la primera palabra a procesar. Debemos también ocultar el botón de empezar y mostrar el contenedor con la palabra a escribir. Añadir el listener de teclado

// Al hacer clic en EMPEZAR-->

//Selecciono el boton con query selector
let button = document.querySelector("#start-game button");

// Requisito 1: Ocultar el botón "Empezar"

button.addEventListener("click", function () {

    // button.style.display = "none";
    button.classList.add("w3-hide"); //Siempre que haya clases es mejor utilizarlas

    // Requisito 2: Mostrar el contenedor con id="next-word-card"
    document.querySelector("#next-word-card").classList.remove("w3-hide");

    // Requisito 3: Actualizar STATE.currentWord con el valor que devuelve getNextWord()
    STATE.currentWord = getNextWord();

    // Requisito 4. Actualizar la propiedad .textContent de id="next-word" con el valor de STATE.currentWord
    document.querySelector("#next-word").textContent = STATE.currentWord;
});

// PASO 2: Escuchar el teclado

// Requisito 1: Añadir un listener para detectar las letras introducidas por el usuario (solo letras). Mostrar por console.log
document.body.addEventListener("keydown", handleInput);

function handleInput(event) {
    //escuchar al teclado
    let inputLetter = event.key;

    //Solo letras
    if (event.keyCode < 65 || event.keyCode > 90) {
        return;
    }
    //console.log(inputLetter);

    // Requisito 2: Cada vez que el usuario pulsa una tecla:
    // A. Ver si la tecla pulsada, es la que toca: STATE.isCorrectLetter(teclaPulsadaPorElUsuario). Si NO es la que toca, terminar la función inmediatamente
    if (STATE.isCorrectLetter(inputLetter)) {
        console.log(inputLetter);

        // B. Si ha escrito correctamente la letra que toca
        // 1. Actualizar +1 la variable STATE.currentProgressWord
        STATE.currentProgressWord++

        // 2. Comprobar si ya hemos terminado la palabra con STATE.isWordFinished
        if (STATE.isWordFinished() == true) {
              // B. Obtener una nueva palabra con getNextWord() y asignarla a STATE.currentWord;
            STATE.currentWord = getNextWord();
            // C. Actualiar document.querySelector("#next-word") con la nueva palabra
            document.querySelector("#next-word").textContent = STATE.currentWord;
            // A. Resetear la variable STATE.currentProgressWord
            STATE.currentProgressWord = 0
            return;
        }

        // 3. Actualizar la UX. Os ayudará el método substring o slice. Podeis usar <span> para este cometido; partiendo la STATE.currentWord por el índice de currentProgressWord https://oscarm.tinytake.com/msc/NjYyMTUyOF8xOTE2NDI1NQ

        let written = STATE.currentWord.slice(0, STATE.currentProgressWord)
        let secretWord = STATE.currentWord.slice(STATE.currentProgressWord)

        document.querySelector("#next-word").innerHTML = `<span> ${written}</span> ${secretWord}`;

        document.querySelector("span").style.color = "green";

        console.log(STATE.isWordFinished());
        
    }
}