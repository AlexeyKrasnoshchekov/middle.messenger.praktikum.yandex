import './src/styles/index.less';
import LoginPage from './src/pages/login/index';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');

  const loginPage = new LoginPage();

  root?.append(loginPage.getContent()!);
});
