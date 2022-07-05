import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


// config for flatPickr instance
const flatpickOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(chooseRightDate(selectedDates[0]));
  },
};

// config for Notify pop-up
const notifyOptions = {
  timeout: 2000,
  clickToClose: true,
  useIcon: false,
  fontSize: '16px',
  cssAnimationStyle: 'from-right',
}

// flatpickr instance
const flatPickr = flatpickr('#datetime-picker', flatpickOptions);
const btnStart = document.querySelector('[data-start]');
let deadlineDate = null;

const timerRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

//event click for start timer button
btnStart.addEventListener('click', setTimer);

// choosing date after Date.now() and undisabling start button or Notify failure
function chooseRightDate(date) {
  if(date < Date.now()) {
    Notify.failure('Please choose a date in the future!', notifyOptions);
    return null;
  }
  if(btnStart.hasAttribute('disabled')) {
    btnStart.removeAttribute('disabled');
  }
  deadlineDate = date;
  return date;
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
  timerRefs.days.textContent = addLeadingZero(timer.days); 
  timerRefs.hours.textContent = addLeadingZero(timer.hours); 
  timerRefs.minutes.textContent = addLeadingZero(timer.minutes); 
  timerRefs.seconds.textContent = addLeadingZero(timer.seconds); 
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