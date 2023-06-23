import Handlebars from 'handlebars/runtime';
import '../styles/index.less';

import '../utils/helpers';

import { toggleAttachMenu } from '../utils/ui';

// pages import
import SigninPage from '../pages/signin/signin.hbs';
import LoginPage from '../pages/login/login.hbs';
import MainPage from '../pages/main/main.hbs';
import ProfilePage from '../pages/profile/profile.hbs';
import ProfileChange from '../pages/profile/profile_change.hbs';
import ProfilePassword from '../pages/profile/profile_password.hbs';
import NotFound from '../pages/404/notFound.hbs';
import Error500 from '../pages/500/500.hbs';

// partials import
import Button from '../components/button/button.hbs';
import Input from '../components/input/input.hbs';
import ChatItem from '../components/chatItem/chatItem.hbs';
import Avatar from '../components/avatar/avatar.hbs';
import Form from '../components/form/form.hbs';
import Link from '../components/link/link.hbs';
import ProfileForm from '../components/profile_form/profile_form.hbs';

// partials registration
Handlebars.registerPartial('button', Button);
Handlebars.registerPartial('input', Input);
Handlebars.registerPartial('chatItem', ChatItem);
Handlebars.registerPartial('avatar', Avatar);
Handlebars.registerPartial('form', Form);
Handlebars.registerPartial('link', Link);
Handlebars.registerPartial('profile_form', ProfileForm);

const handleLocation = async () => {
  const path = window.location.pathname;

  const routes = {
    Main: '/',
    Profile: '/profile/',
    Login: '/login/',
    Signin: '/signin/',
    ChangeProfile: '/change_profile/',
    ChangePassword: '/change_password/',
    Error500: '/error_500/',
  };

  if (routes.Main.match(path)) {
    const html = MainPage();
    document.getElementById('app').innerHTML = html;
    toggleAttachMenu();
  } else if (routes.Profile.match(path)) {
    const html = ProfilePage();
    document.getElementById('app').innerHTML = html;
  } else if (routes.Login.match(path)) {
    const html = LoginPage();
    document.getElementById('app').innerHTML = html;
  } else if (routes.ChangeProfile.match(path)) {
    const html = ProfileChange();
    document.getElementById('app').innerHTML = html;
  } else if (routes.ChangePassword.match(path)) {
    const html = ProfilePassword();
    document.getElementById('app').innerHTML = html;
  } else if (routes.Signin.match(path)) {
    const html = SigninPage();
    document.getElementById('app').innerHTML = html;
  } else if (routes.Error500.match(path)) {
    const html = Error500();
    document.getElementById('app').innerHTML = html;
  } else {
    const html = NotFound();
    document.getElementById('app').innerHTML = html;
  }
};

window.onpopstate = handleLocation;
handleLocation();

const route = (event) => {
  // event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, '', event.target.href);
  handleLocation();
};

export default route;
