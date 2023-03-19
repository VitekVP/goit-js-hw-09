import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStartEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btnStartEl.setAttribute('disabled', 'true');
let finalData = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    finalData = selectedDates[0];
    if (finalData < new Date()) {
      Notiflix.Notify.info('Please choose a date in the future');
      return;
    }
    btnStartEl.disabled = false;
  },
};

const fp = flatpickr('#datetime-picker', options);

btnStartEl.addEventListener('click', handleStartReferenceClick);

function handleStartReferenceClick() {
  btnStartEl.disabled = true;

  const intervalId = setInterval(() => {
    const timeReference = finalData - new Date();
    const { days, hours, minutes, seconds } = convertMs(timeReference);

    if (timeReference <= 0) {
      clearInterval(intervalId);
      return;
    }
    updateTimerFace(days, hours, minutes, seconds);
    // console.log(`${days}: ${hours}: ${minutes}: ${seconds}`);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerFace(days, hours, minutes, seconds) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}
