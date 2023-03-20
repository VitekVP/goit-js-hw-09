const btnStartEl = document.querySelector('[data-action-start]');
const btnStopEl = document.querySelector('[data-action-stop]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btnStartEl.addEventListener('click', handleStartClick);
btnStopEl.addEventListener('click', handleStopClick);

let intervalId = null;

function handleStartClick() {
  const startTime = Date.now();

  btnStartEl.setAttribute('disabled', '');

  intervalId = setInterval(() => {
    let deltaTime = Date.now() - startTime;

    const { hours, minutes, seconds } = convertMs(deltaTime);

    updateTimerFace(hours, minutes, seconds);

    // console.log(`${hours}: ${minutes}: ${seconds}`);
  }, 1000);
}

function handleStopClick() {
  btnStartEl.removeAttribute('disabled', '');

  setTimeout(() => {
    updateTimerFace('00', '00', '00');
  }, 3000);

  clearInterval(intervalId);
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
  return { hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerFace(hours, minutes, seconds) {
  // daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}
