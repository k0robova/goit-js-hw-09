function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const bodyDocument = document.body;
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

const buttonsObj = {
  start() {
    this.idSetInterval = setInterval(() => {
      btnStart.disabled = true;
      const changeColor = getRandomHexColor();
      bodyDocument.style.backgroundColor = changeColor;
    }, 1000);
  },

  stop() {
    clearInterval(this.idSetInterval);
    btnStart.disabled = false;
  },
};

btnStart.addEventListener('click', () => {
  buttonsObj.start();
});

btnStop.addEventListener('click', () => {
  buttonsObj.stop();
});
