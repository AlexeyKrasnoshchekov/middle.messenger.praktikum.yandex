const toggleAttachMenu = () => {
  const addAttachmentButton = document.querySelector('.button_attach');
  document.querySelector('.chat_attachment_choice').classList.toggle('hide');
  addAttachmentButton.addEventListener('click', () => {
    document.querySelector('.chat_attachment_choice').classList.toggle('hide');
    document.querySelector('.chat_attachment_choice').classList.toggle('show');
  });
};

export { toggleAttachMenu };
