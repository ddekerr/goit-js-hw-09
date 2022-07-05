let idInterval = null;
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', startChangeBodyColor);
btnStop.addEventListener('click', stopChangeBodyColor);

// start changing body color every second
function startChangeBodyColor() {
  idInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor()
  }, 1000);
  toogleDisabledButton();
}

// stop changing body color
function stopChangeBodyColor() {
  clearInterval(idInterval);
  toogleDisabledButton();
}

// disabling button if clicked and undisabling another button
function toogleDisabledButton() {
  if(btnStart.hasAttribute('disabled')) {
    btnStart.removeAttribute('disabled');
    btnStop.setAttribute('disabled', true);
  } else {
    btnStart.setAttribute('disabled', true);
    btnStop.removeAttribute('disabled');
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}