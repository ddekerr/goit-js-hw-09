import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  delay: document.querySelector('[name=delay]'),
  step: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
  createBtn: document.querySelector('button')
}

document.querySelector('.form').addEventListener('submit', showPromises);

function showPromises(e) {
  e.preventDefault();

  // call for loop after tne number of ms that the refs.delay contains
  for(let i = 1; i <= Number(refs.amount.value); i += 1) {
    // create i promises and pass them sequence number and delay before calling
    // use Notify lib to inform Success or Failure
    createPromise(i, Number(refs.delay.value), Number(refs.step.value))
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }

  document.querySelector('.form').reset();
}

// creating Promise with random resolve or reject result
function createPromise(position, delay, step) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const promiseCalingDelay = position === 1 ? delay : delay + step * (position - 1);
    // call the Promise in delay after calling the previous Promise
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay: promiseCalingDelay});
      } else {
        reject({position, delay: promiseCalingDelay});
      }
    }, promiseCalingDelay)
  });
}
