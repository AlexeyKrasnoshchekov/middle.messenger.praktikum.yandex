import Handlebars from 'handlebars/runtime';

//pages import
import SigninPage from '../pages/signin/signin.hbs';
import LoginPage from '../pages/login/login.hbs';
import MainPage from '../pages/main/main.hbs';
import ProfilePage from '../pages/profile/profile.hbs';
import NotFound from '../pages/404/notFound.hbs';

//partials import
import Button from '../partials/button.hbs';

//partials registration
Handlebars.registerPartial('button', Button);

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, '', event.target.href);
  handleLocation();
};

document.addEventListener('DOMContentLoaded', () => {
  const handleLocation = async () => {
    const path = window.location.pathname;
    console.log('first', path);

    const routes = {
      Main: '/',
      Profile: '/profile',
      Login: '/login',
      Signin: '/signin',
    };

    if (routes.Main.match(path)) {
      const html = MainPage();
      document.getElementById('app').innerHTML = html;
    } else if (routes.Profile.match(path)) {
      const html = ProfilePage();
      document.getElementById('app').innerHTML = html;
    } else if (routes.Login.match(path)) {
      const html = LoginPage();
      document.getElementById('app').innerHTML = html;
    } else if (routes.Signin.match(path)) {
      const html = SigninPage();
      document.getElementById('app').innerHTML = html;
    } else {
      const html = NotFound();
      document.getElementById('app').innerHTML = html;
    }
  };

  window.onpopstate = handleLocation;
  handleLocation();
});

export default route;
