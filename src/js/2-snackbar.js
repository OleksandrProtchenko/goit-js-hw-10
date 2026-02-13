import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
let delay = 0;

const optionsToastError = {
  title: 'Error',
  message: `Rejected promise in ${delay}ms`,
  position: 'topRight',
  close: true,
  timeout: 2000,
  pauseOnHover: false,
  iconUrl: 'src/img/toast/Group.png',
  backgroundColor: '#ef4040',
  progressBarColor: '#b51b1b',
  messageColor: '#ffffff',
  titleColor: '#ffffff',
  icon: null,
};
const optionsToastValid = {
  title: 'OK',
  message: `Fulfilled promise in ${delay}ms`,
  position: 'topRight',
  close: true,
  timeout: 2000,
  pauseOnHover: false,
  iconUrl: 'src/img/toast/Group2.png',
  backgroundColor: '#59a10d',
  progressBarColor: '#59a10d',
  messageColor: '#ffffff',
  titleColor: '#ffffff',
  icon: null,
};

form.addEventListener('submit', onClickStartNotification);

function onClickStartNotification(event) {
  event.preventDefault();
  const isCheckedValue = [...form.elements].filter(el => el.checked)[0].value;
  delay = +document.querySelector('input[type="number"]').value;

  setTimeout(() => {
    new Promise((resolve, reject) => {
      if (isCheckedValue === 'fulfilled') {
        resolve();
      }
      reject();
    })
      .then(str => {
        console.log(`✅ Fulfilled promise in ${delay}ms`);
        return iziToast.success(optionsToastValid);
      })
      .catch(error => {
        console.log(`❌ Rejected promise in ${delay}ms`);
        return iziToast.error(optionsToastError);
      });
  }, delay);
  form.reset();
}
