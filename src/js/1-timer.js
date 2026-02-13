import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const inp = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
let userSelectedDate = null;
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    checkDate(userSelectedDate);
  },
};

const optionsToast = {
  title: 'Error',
  message: 'Please choose a date in the future',
  position: 'topRight',
  close: true,
  timeout: 2000,
  pauseOnHover: false,
  iconUrl: '../img/toast/Group.png',
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
  const date = userSelectedDate;

  let timerID = null;

  updateTimer(convertMs(date.getTime() - Date.now()));

  btnStart.disabled = true;
  inp.disabled = true;

  timerID = setInterval(() => {
    const diffDate = date.getTime() - Date.now();

    if (diffDate <= 0) {
      updateTimer(convertMs(0));
      clearInterval(timerID);
      return;
    }

    const formattedDate = convertMs(diffDate);

    updateTimer(formattedDate);
  }, 1000);
}

function checkDate(date) {
  if (date < Date.now()) {
    btnStart.disabled = true;
    iziToast.error(optionsToast);
    return;
  }
  btnStart.disabled = false;
}

function updateTimer(date) {
  for (const key in date) {
    const el = document.querySelector(`[data-${key}]`);
    if (el) el.textContent = date[key];
  }
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
