import './src/styles/index.less';

import LoginPage from './src/pages/login/index';
import RegisterPage from './src/pages/signin/index';
import { ProfilePage } from './src/pages/profile/index';
import MainPage from './src/pages/main/index';
import Error500Page from './src/pages/500/index';
import NotFoundPage from './src/pages/404/index';
import Router from './src/utils/router';
import AuthController from './src/controllers/AuthController';
import Block from './src/utils/block';

enum Routes {
  Messenger = '/messenger',
  Profile = '/profile',
  Login = '/',
  Register = '/signin',
  ChangeProfile = '/profile_change',
  ChangePassword = '/profile_password',
  Error500 = '/error_500',
  Error404 = '/notFound',
}

window.addEventListener('DOMContentLoaded', async () => {
  const loginPage = new LoginPage();
  const registerPage = new RegisterPage();
  const profilePage = new ProfilePage({});
  const mainPage = new MainPage({});
  const error500Page = new Error500Page();
  const error404Page = new NotFoundPage();

  Router.use(Routes.Messenger, mainPage as Block);
  Router.use(Routes.Login, loginPage);
  Router.use(Routes.Register, registerPage);
  Router.use(Routes.Profile, profilePage as Block);
  Router.use(Routes.Error500, error500Page);
  Router.use(Routes.Error404, error404Page);

  // Router.start();

  let isProtectedRoute = true;

  // eslint-disable-next-line default-case
  switch (window.location.pathname) {
    case Routes.Login:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();
    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Messenger);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Login);
    }
  }
});
