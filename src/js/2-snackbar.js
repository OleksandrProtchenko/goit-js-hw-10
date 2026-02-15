import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../img/toast/Group.png';
import iconValid from '../img/toast/Group2.png';

const form = document.querySelector('.form');
let delay = null;

form.addEventListener('submit', onClickStartNotification);

function onClickStartNotification(event) {
  event.preventDefault();
  const isCheckedValue = [...form.elements].filter(el => el.checked)[0].value;
  delay = +document.querySelector('input[type="number"]').value;

  const optionsToastError = {
    title: 'Error',
    message: `Rejected promise in ${delay}ms`,
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

  const optionsToastValid = {
    title: 'OK',
    message: `Fulfilled promise in ${delay}ms`,
    position: 'topRight',
    close: true,
    timeout: 2000,
    pauseOnHover: false,
    iconUrl: iconValid,
    backgroundColor: '#59a10d',
    progressBarColor: '#59a10d',
    messageColor: '#ffffff',
    titleColor: '#ffffff',
    icon: null,
  };

  setTimeout(() => {
    new Promise((resolve, reject) => {
      if (isCheckedValue === 'fulfilled') {
        resolve(delay);
      }
      reject(delay);
    })
      .then(delay => {
        console.log(`✅ Fulfilled promise in ${delay}ms`);
        return iziToast.success({
          ...optionsToastValid,
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
      })
      .catch(delay => {
        console.log(`❌ Rejected promise in ${delay}ms`);
        return iziToast.error({
          ...optionsToastError,
          message: `❌ Rejected promise in ${delay}ms`,
        });
      });
  }, delay);
  form.reset();
}
