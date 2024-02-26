const COLORS = ["red", "green", "yellow", "blue"]; 

const buttons = document.querySelectorAll(".square"); 
const title = document.querySelector(".title"); 
const body = document.querySelector("body"); 

let level = 0; 
let isGameOver = false; 

let randomColors = []; 
let userGuess = []; 
let currentIndex = 0; 

document.addEventListener("keydown", function start(event) {
    if(event.key == "a") {
        startGame(); 
        document.removeEventListener("keydown", start); 
    }; 
}); 

document.addEventListener("keydown", function restart(event){
    if(event.key == "w") {
        randomColors = []; 
        level = 0; 
        startGame(); 
    }
})

function randomNumber() {
    return Math.floor(Math.random() * COLORS.length); 
}

function randomColor() {
    return COLORS[randomNumber()]; 
}

function checkGuess(guess, answer){
    return guess === answer ? true: false; 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function playSound(key) {
    let audio = new Audio(`./sounds/${key}.mp3`)
    audio.play(); 
}

async function playAnimation(randomBtn) {
    button = document.querySelector(`.${randomBtn}`); 
    button.classList.add("pressed"); 
    await sleep(500); 
    button.classList.remove("pressed");  
}

async function startGame() {
    userGuess = [];
    currentIndex = 0; 
    level++; 
    title.innerHTML = `Level ${level}`; 
    randomColors.push(randomColor()); 
    for(i=0; i<buttons.length; i++) {
        buttons[i].removeEventListener("click", getUserInput)
    }
    await sleep(1000); 
    for (i = 0; i< randomColors.length; i++) {
        playAnimation(randomColors[i]); 
        playSound(randomColors[i]); 
        await sleep(1000); 
    }
    
    for(i=0; i<buttons.length; i++) {
        buttons[i].addEventListener("click", getUserInput)
    }
}

function getUserInput() {
    if(userGuess.length < randomColors.length) {
        guessedColor = this.classList[1]; 
        playSound(guessedColor);
        userGuess.push(guessedColor); 
        if(!checkGuess(userGuess[currentIndex], randomColors[currentIndex])){         
            title.innerHTML = "You lose! Press W to restart."; 
            for(i=0; i<buttons.length; i++){
                buttons[i].removeEventListener("click", getUserInput); 
            }
        } else if (userGuess.length === randomColors.length) {
            startGame(); 
        } else {
            currentIndex++; 
        }
    }
}