import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

formEl.addEventListener('submit', handleSubmitClick);

function handleSubmitClick(event) {
  event.preventDefault();

  let delayPromise = Number(delayEl.value);
  let stepDelay = Number(stepEl.value);
  let quantityPromise = Number(amountEl.value);

  for (let i = 0; i <= quantityPromise - 1; i += 1) {
    let position = i + 1;
    let delay = delayPromise + stepDelay * i;

    createPromise(position, delay)
      .then(value =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${value.position} in ${value.delay}ms`
        )
      )
      .catch(value =>
        Notiflix.Notify.failure(
          `❌ Rejected promise ${value.position} in ${value.delay}ms`
        )
      );
  }
  event.target.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      const promiseObj = { position, delay };

      if (shouldResolve) {
        resolve(promiseObj);
      } else {
        reject(promiseObj);
      }
    }, delay);
  });
}
