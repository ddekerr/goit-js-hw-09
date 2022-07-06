import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const btnStart = document.querySelector('[data-start]');
let deadlineDate = null;
const timerRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

// config for Notify pop-up
const notifyOptions = {
  timeout: 2000,
  clickToClose: true,
  cssAnimationStyle: 'from-right',
}

// config for flatPickr instance
const flatpickOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chooseRightDate(selectedDates[0])
    .then(() => {
      // activated start button
      btnStart.removeAttribute('disabled');
      // set dedline for timer
      deadlineDate = selectedDates[0];
    })
    .catch(() => {
      Notify.failure("Please choose a date in the future", notifyOptions);
    });
  },
};

// flatpickr instance
flatpickr('#datetime-picker', flatpickOptions);
//event click for start timer button
btnStart.addEventListener('click', setTimer);

// check the date and return success or error
function chooseRightDate(date) {
  return new Promise((resolve, reject) => {
    if(date < Date.now()) {
      reject();
    }
    resolve();
  });
}

// call timer every second if time left more then 1 second
function setTimer(event) {
  // disabled start button when timer starts
  event.target.setAttribute('disabled', true);
  // call timer every second
  const intervalId = setInterval(() => {
    const deltaTime = deadlineDate - Date.now();
    // stop timer if time less then 1 second
    if (deltaTime <= 1000) {
      clearInterval(intervalId);
    }
    showTimerOnHTML(convertMs(deltaTime));
  }, 1000);
}

// insert timer fields to html
function showTimerOnHTML(timer) {
  for (const key of Object.keys(timerRefs)) {
    timerRefs[key].textContent = addLeadingZero(timer[key]);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// add zero at the start if there isn`t
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}