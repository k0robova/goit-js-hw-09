import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

function convertMs(ms) {
  // Кількість мілісекунд на одиницю часу
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Залишкові дні
  const days = pad(Math.floor(ms / day));
  // Залишкові години
  const hours = pad(Math.floor((ms % day) / hour));
  // Залишкові хвилини
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Залишкові секунди
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

const inputDate = document.getElementById('datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

btnStart.disabled = true;
btnStart.addEventListener('click', onBtnStart);

let selectedUserTime = 0;
const currentDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentDate,
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',

  onClose(selectedDates) {
    selectedUserTime = new Date(selectedDates[0]).getTime();

    if (selectedUserTime < currentDate.getTime()) {
      //   window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    btnStart.disabled = false;
  },
};

let intervalId;
function onBtnStart() {
  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedUserTime - currentTime;

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      //   window.alert('Time is up!');
      Notiflix.Notify.success('Time is up!');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

    console.log(`${days}:${hours}:${minutes}:${seconds}`);
  }, 1000);
}

const fp = flatpickr(inputDate, options);
