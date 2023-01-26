import { options } from './options.js';
const message = document.getElementById('message');
const hintRef = document.querySelector('.hint-ref');
const mainArea = document.querySelector('.wrapper');
const controls = document.querySelector('.controls-container');
const startBtn = document.getElementById('start');
const lettersContainer = document.getElementById('letters-container');
const userInpSection = document.getElementById('user-input');
const resultText = document.getElementById('result');
const word = document.getElementById('word');
const words = Object.keys(options);
let randomWord = '',
  randomHint = '';
let winCount = 0,
  lossCount = 0;

//generate random value
const generateRandomValue = (arr) => Math.floor(Math.random() * arr.length);

//block all the buttons
const blocker = () => {
  let lettersButtons = document.querySelectorAll('letters');
  stopGame();
};

//start game
startBtn.addEventListener('click', () => {
  controls.classList.add('hidden');
  mainArea.classList.remove('hidden');
  init();
});

//stop game
const stopGame = () => {
  controls.classList.remove('hidden');
  mainArea.classList.add('hidden');
};

//generate word function
const generateWord = () => {
  userInpSection.innerText = '';
  randomWord = words[generateRandomValue(words)];
  randomHint = options[randomWord];

  hintRef.innerHTML = `<div id="wordHint"><span>Hint: </span>${randomHint}</div>`;
  let displayItem = '';
  randomWord
    .split('')
    .forEach((value) => (displayItem += `<span class="inputSpace">_ </span>`));

  userInpSection.innerHTML = displayItem;
  userInpSection.innerHTML += `<div id="chanceCount">Chances Left: ${lossCount}</div>`;
};

//init
const init = () => {
  winCount = 0;
  lossCount = 5;
  randomWord = '';
  word.innerText = '';
  randomHint = '';
  message.innerText = '';
  userInpSection.innerHTML = '';
  lettersContainer.classList.add('hidden');
  lettersContainer.innerHTML = '';

  generateWord();

  //letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement('button');
    button.classList.add('letter');

    button.innerText = String.fromCharCode(i);

    button.addEventListener('click', () => {
      let charArray = randomWord.toUpperCase().split('');
      let inputSpace = document.getElementsByClassName('inputSpace');
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, i) => {
          if (char == button.innerText) {
            message.innerText = 'Correct Letter';
            message.style.color = '#60993e';
            button.classList.add('correct');
            inputSpace[i].innerText = char;

            winCount += 1;
            if (winCount == charArray.length) {
              resultText.innerHTML = 'You Won';
              startBtn.innerText = 'Restart';
              blocker();
            }
          }
        });
      } else {
        button.classList.add('incorrect');
        lossCount -= 1;
        document.getElementById(
          'chanceCount'
        ).innerText = `Chances Left: ${lossCount}`;
        message.innerText = 'Incorrect Letter';
        message.style.color = '#ff0000';
        if (lossCount == 0) {
          word.innerHTML = `The word was: <span>${randomWord}</span>`;
          resultText.innerHTML = 'Game over';
          blocker();
        }
      }
      //disable clicked buttons
      button.disabled = true;
    });

    lettersContainer.appendChild(button);
  }
};
