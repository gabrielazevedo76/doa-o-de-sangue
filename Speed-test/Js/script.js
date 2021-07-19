window.addEventListener("load", init)

//Globals

// Avaukabke Levels

const levels = {
    easy: 5,
    medium: 3,
    hard: 2
}

// to change level

let currentLevel = levels.easy

let time = currentLevel
let score = 0
let attScore = 0
let isPlaying

//DOM Elements

const wordInput = document.querySelector("#word-input")
const currentWord = document.querySelector("#current-word")
const scoreDisplay = document.querySelector("#score")
const timeDisplay = document.querySelector("#time")
const message = document.querySelector("#message")
const seconds = document.querySelector("#seconds")
const highScore = document.querySelector("#highscore")

const words = [
    'hat',
    'river',
    'lucky',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway',
    'joke',
    'developer',
    'establishment',
    'hero',
    'javascript',
    'nutrition',
    'revolver',
    'echo',
    'siblings',
    'investigate',
    'horrendous',
    'symptom',
    'laughter',
    'magic',
    'master',
    'space',
    'definition'
];


// Initialize game
function init() {
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel
    //Carrega a palavra do array
    showWord(words)
    // Start matching on word input
    wordInput.addEventListener("input", startMatch)
    // Call countdown every second
    setInterval(countdown, 1000)
    // Check game status
    setInterval(checkStatus, 50)
    //Check High Score
    
}

//Start match
function startMatch() {
    if (matchWords()) {
        isPlaying = true
        time = currentLevel + 1
        showWord(words)
        wordInput.value = ''
        score++
        changeLevel(score)
    }

    // If score is -1 display 0
    if ( score === -1) {
        scoreDisplay.innerHTML = 0
    } else {
        scoreDisplay.innerHTML = score
    }
    
}

// Match currentWord to WordInput
function matchWords() {
    if(wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!'
        return true
    } else {
        message.innerHTML = ''
        return false
    }
}

// Escolhe e mostra a palavra aleatoria
function showWord() {
    // Generate random array index
    const randIndex = Math.floor(Math.random() * words.length)
    // Output random word
    currentWord.innerHTML = words[randIndex]
}

// Count timer
function countdown() {
    //Make sure time is not run out
    if (time > 0) {
        // Decrement time
        time--;
    }else if(time === 0) {
        // Game is over
        isPlaying = false
        //Atualiza o HighScore
        checkHighscore()
    }
    // show time
    timeDisplay.innerHTML = time
}

// Check game status

function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = "Game is Over!!!"
        score = -1
    }
}

function checkHighscore() {
    if (score > attScore) {
        attScore = score
        highScore.innerHTML = attScore
    }
}

function changeLevel(score) {
    if (score < 5) {
        currentLevel = levels.easy
    } else if (score > 5 && score < 10) {
        currentLevel = levels.medium
    } else if (score > 10) {
        currentLevel = levels.hard
    }
}