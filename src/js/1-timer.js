import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';
import iconError from '../img/toast/Group.png';

const inp = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timerDisplay = document.querySelectorAll('.value');

let userSelectedDate = null;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = checkDate(selectedDates[0]);
  },
};

const optionsToast = {
  title: 'Error',
  message: 'Please choose a date in the future',
  position: 'topRight',
  close: true,
  timeout: 2000,
  pauseOnHover: false,
  iconUrl: iconError,
  backgroundColor: '#ef4040',
  progressBarColor: '#b51b1b',
  messageColor: '#ffffff',
  titleColor: '#ffffff',
  icon: null,
};

const fp = flatpickr(inp, options);

btnStart.addEventListener('click', onStartTimer);

function onStartTimer(event) {
  userSelectedDate = fp.selectedDates[0];
  const date = userSelectedDate.getTime();
  const diff = convertMs(date - Date.now());
  let timerID = null;

  updateTimer(diff);
  btnStart.disabled = true;
  inp.disabled = true;

  timerID = setInterval(() => {
    const diff = date - Date.now();
    const newDate = convertMs(diff);
    if (diff <= 0) {
      updateTimer(convertMs(0));
      clearInterval(timerID);
      inp.disabled = false;
      return;
    }
    updateTimer(newDate);
  }, 1000);
}

function checkDate(date) {
  const diff = date - Date.now();
  if (diff < 0) {
    btnStart.disabled = true;
    iziToast.error(optionsToast);
    return;
  }
  btnStart.disabled = false;
}

function updateTimer(date) {
  const { days, hours, minutes, seconds } = date;
  const timerItems = [
    addLeadingZero(days),
    addLeadingZero(hours),
    addLeadingZero(minutes),
    addLeadingZero(seconds),
  ];
  timerItems.forEach((item, idx) => {
    timerDisplay[idx].textContent = item;
  });
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, 0);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
