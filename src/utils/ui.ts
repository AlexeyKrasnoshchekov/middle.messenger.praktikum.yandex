const toggleAttachMenu = () => {
  const addAttachmentButton = document.querySelector('.button_attach');
  document.querySelector('.chat_attachment_choice')!.classList.toggle('hide');
  addAttachmentButton!.addEventListener('click', () => {
    document.querySelector('.chat_attachment_choice')!.classList.toggle('hide');
    document.querySelector('.chat_attachment_choice')!.classList.toggle('show');
  });
};

const TestLogin = (str:string):boolean => {
  if (/^[a-zA-Z]{1}[a-zA-Z1-9-_]{2,19}$/.test(str) === false) {
    return false;
  }
  return true;
};
const TestPhone = (str:string):boolean => {
  if (/^[+]{1}[1-9]{9,14}$/.test(str) === false) {
    return false;
  }
  return true;
};

const TestName = (str:string):boolean => {
  if (/^[A-ZА-Я]{1}[a-zа-я\\-]/.test(str) === false) {
    return false;
  }
  return true;
};
const TestEmail = (str:string):boolean => {
  if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(str) === false) {
    return false;
  }
  return true;
};

const TestPassword = (str:string):boolean => {
  if (/(?=.*[A-ZА-Я])[а-яА-Яa-zA-Z1-9!@#$%&]{8,40}/.test(str) === false) {
    return false;
  }
  return true;
};
const TestMessage = (str:string):boolean => {
  if (/(?=^.{1,}$)/.test(str) === false) {
    return false;
  }
  return true;
};

const errorMessage = (elem:HTMLInputElement, message:string) => {
  console.log('message', message);
  const error = document.getElementById(`error_${elem.id}`);
  error!.textContent = message;
  elem.classList.add('invalid');
};
const delErrorMessage = (elem:HTMLInputElement) => {
  const error = document.getElementById(`error_${elem.id}`);
  error!.textContent = '';

  if (elem.classList.contains('invalid')) {
    elem.classList.remove('invalid');
  }
};

export {
  toggleAttachMenu, TestLogin, TestPhone, TestEmail, TestName, TestPassword, TestMessage,
  errorMessage, delErrorMessage,
};
