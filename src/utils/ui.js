import ProfileForm from '../components/profile_form/profile_form.hbs';

export const toggleAttachMenu = () => {
  let addAttachmentButton = document.querySelector('.button_attach');
  document.querySelector('.chat_attachment_choice').classList.toggle('hide');
  addAttachmentButton.addEventListener('click', () => {
    document.querySelector('.chat_attachment_choice').classList.toggle('hide');
    document.querySelector('.chat_attachment_choice').classList.toggle('show');
  });
};
