const padNumbers = (num) => {

  return num < 10 ? `0${num}` : `${num}`;
};

let stopperTime = 0;
let stopperIsRunning = false;

setInterval(() => {
  stopperTime++;
  const seconds = padNumbers(stopperTime % 60);
  const minutes = padNumbers(Math.floor(stopperTime / 60) % 60);
  const hours = padNumbers(Math.floor(stopperTime / 3600));
  const time = `${[hours, minutes, seconds].join(':')}`;
  const stopperFace = document.querySelector('.stopper-face');
  stopperFace.textContent = time;
}, 1000);

document.querySelector('.memory-card').addEventListener('click', () => {
  if (stopperIsRunning) {
    stopperIsRunning = false;
    stopperTime = 0;
  } else {
    stopperIsRunning = true;
  }
});

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {

  this.classList.toggle('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.image ===
    secondCard.dataset.image) {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classlist.remove('flip');
      lockBoard = false;
    }, 1500);

  }

}
function turnBack() {
  cards.forEach(card => {
    let randomCards = Math.floor(Math.random() * 10);
    card.style.order = randomCards;
  });
}
cards.forEach(card => card.addEventListener('click', flipCard));
