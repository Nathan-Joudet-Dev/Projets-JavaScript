let sequence = [];
let humanSequence = [];
let level = 0;


const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

function resetGame(text) {
  alert(text);
  sequence = [];
  humanSequence = [];
  level = 0;
  startButton.classList.remove('hidden');
  heading.textContent = 'Simon Game';
  info.classList.add('hidden');
  tileContainer.classList.add('unclickable');
}

//fonction humanTurn qui indique que l’ordinateur a terminé le tour, 
//et qu’il est temps pour le joueur de répéter la séquence :

//le contenu de l’élément info est modifié pour indiquer que le joueur peut commencer à répéter la séquence. 
//Il montre également combien de robinets doivent être entrés.
function humanTurn(level) {
  tileContainer.classList.remove('unclickable');
  info.textContent = `Your turn: ${level} Tap${level > 1 ? 's' : ''}`;
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add('activated');
  sound.play();

  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600); //Tps entre chaques boutons
  });
}

function nextStep() {
  const tiles = ['red', 'green', 'blue', 'yellow']; //Voir index.html
  const random = tiles[Math.floor(Math.random() * tiles.length)] //Renvoie un nombre aléatoire entre 0 et 1;

  return random;
}

function nextRound() {
  level += 1;

  tileContainer.classList.add('unclickable');
  info.textContent = 'Wait for the computer';
  heading.textContent = `Level ${level} of 20`;

  // copy all the elements in the `sequence` array to `nextSequence`
  const nextSequence = [...sequence];
  nextSequence.push(nextStep()); // Permet de push les différents nombres aléatoires.
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 1000);
}

function handleClick(tile) {
  const index = humanSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = sequence.length - humanSequence.length;

  if (humanSequence[index] !== sequence[index]) {
    resetGame('Oops! Game over, you pressed the wrong tile');
    return;
  }

  if (humanSequence.length === sequence.length) {
    if (humanSequence.length === 20) {
      resetGame('Congrats! You completed all the levels');
      return
    }

    humanSequence = [];
    info.textContent = 'Success! Keep going!';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `Your turn: ${remainingTaps} Tap${
    remainingTaps > 1 ? 's' : ''
  }`;
}

function startGame() {
  startButton.classList.add('hidden');
  info.classList.remove('hidden');
  info.textContent = 'Wait for the computer';
  nextRound();
}

startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
});