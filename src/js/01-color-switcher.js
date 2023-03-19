const bodyEl = document.querySelector('body');
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');

btnStartEl.classList.add('btn');
btnStopEl.classList.add('btn');
const divEl = document.createElement('div');
divEl.classList.add('block');
divEl.append(btnStartEl, btnStopEl);
bodyEl.firstElementChild.after(divEl);

let intervalId = null;

btnStopEl.setAttribute('disabled', 'true');

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const handleStartClick = () => {
  intervalId = setInterval(() => {
    const color = getRandomHexColor();
    bodyEl.style.backgroundColor = color;
  }, 1000);

  btnStartEl.setAttribute('disabled', 'false');
  btnStopEl.disabled = false;
};

const handleStopClick = () => {
  clearInterval(intervalId);

  btnStopEl.disabled = true;
  btnStartEl.disabled = false;
};

btnStartEl.addEventListener('click', handleStartClick);
btnStopEl.addEventListener('click', handleStopClick);
