'use strict';

const score_P1 = document.getElementById('score--0');
const score_P2 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');

// ----- initially condition -----

let randNum;
let currentScore;
let activePlayer;
const score = [];
let playing;

const init = function () {
  score[0] = 0;
  score[1] = 0;
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  dice.classList.add('hidden');
  const scores = document.querySelectorAll('.score');
  for (const val of scores) val.textContent = 0;
  const current_Scores = document.querySelectorAll('.current-score');
  for (const val of current_Scores) val.textContent = 0;
};
init();

// ----- Roll Dice Functionality -----

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
};

roll.addEventListener('click', function () {
  if (playing) {
    randNum = Math.trunc(Math.random() * 6 + 1);
    dice.src = `dice-${randNum}.png`;
    dice.classList.remove('hidden');

    if (randNum !== 1) {
      currentScore += randNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.toggle('hidden');
    } else {
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', init);
