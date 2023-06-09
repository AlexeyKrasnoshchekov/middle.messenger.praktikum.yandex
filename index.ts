import './src/styles/index.less';
import { toggleAttachMenu } from './src/utils/ui';

import LoginPage from './src/pages/login/index';
import SigninPage from './src/pages/signin/index';
import ProfilePage from './src/pages/profile/index';
import ProfileChangePage from './src/pages/profile_change/index';
import ProfilePasswordPage from './src/pages/profile_password/index';
import MainPage from './src/pages/main/index';
import Error500Page from './src/pages/500/index';
import NotFoundPage from './src/pages/404/index';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');
  const path = window.location.pathname;

  const loginPage = new LoginPage();
  const signinPage = new SigninPage();
  const profilePage = new ProfilePage({ firstName: 'Виктор' });
  const profileChangePage = new ProfileChangePage({ firstName: 'Виктор' });
  const profilePasswordChangePage = new ProfilePasswordPage({ firstName: 'Виктор' });
  const mainPage = new MainPage();
  const error500Page = new Error500Page();
  const notFoundPage = new NotFoundPage();

  const routes = {
    Main: '/',
    Profile: '/profile/',
    Login: '/login/',
    Signin: '/signin/',
    ChangeProfile: '/profile_change/',
    ChangePassword: '/profile_password/',
    Error500: '/error_500/',
  };

  if (routes.Main.match(path)) {
    root?.append(mainPage.getContent()!);
    toggleAttachMenu();
  } else if (routes.Login.match(path)) {
    root?.append(loginPage.getContent()!);
  } else if (routes.Signin.match(path)) {
    root?.append(signinPage.getContent()!);
  } else if (routes.Profile.match(path)) {
    root?.append(profilePage.getContent()!);
    // profilePage.dispatchComponentDidMount();
  } else if (routes.ChangeProfile.match(path)) {
    root?.append(profileChangePage.getContent()!);
  } else if (routes.ChangePassword.match(path)) {
    root?.append(profilePasswordChangePage.getContent()!);
  } else if (routes.Error500.match(path)) {
    root?.append(error500Page.getContent()!);
  } else {
    root?.append(notFoundPage.getContent()!);
  }
});
