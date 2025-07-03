let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const scoreEls = document.querySelectorAll('.score');
const currentEls = document.querySelectorAll('.current-score');
const playerEls = document.querySelectorAll('.player');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

scoreEls[0].textContent = 0;
scoreEls[1].textContent = 0;
diceEl.classList.add('hidden');

function switchPlayer() {
  currentEls[activePlayer].textContent = 0;
  currentScore = 0;
  playerEls[activePlayer].classList.remove('active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEls[activePlayer].classList.add('active');
}

function showWinner(player) {
  const winnerEl = playerEls[player];
  playing = false;
  diceEl.classList.add('hidden');
  winnerEl.classList.add('winner');
  winnerEl.classList.remove('active');
  alert(`🎉 Player ${player + 1} wins!`);
  launchConfetti();
}

function launchConfetti() {
  const confettiScript = document.createElement('script');
  confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
  confettiScript.onload = () => {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };
  document.body.appendChild(confettiScript);
}

btnRoll.addEventListener('click', function () {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice${dice}.png`;
  diceEl.classList.remove('hidden');

  if (dice !== 1) {
    currentScore += dice;
    currentEls[activePlayer].textContent = currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  scoreEls[activePlayer].textContent = scores[activePlayer];

  if (scores[activePlayer] >= 30) {
    showWinner(activePlayer);
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreEls.forEach(el => (el.textContent = 0));
  currentEls.forEach(el => (el.textContent = 0));
  diceEl.classList.add('hidden');

  playerEls.forEach(el => {
    el.classList.remove('winner');
    el.classList.remove('active');
  });
  playerEls[0].classList.add('active');
});
