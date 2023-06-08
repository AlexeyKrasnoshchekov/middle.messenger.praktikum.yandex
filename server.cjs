// server.js
const express = require('express');

const app = express();
const PORT = 3000;

const routes = {
  Main: '/',
  Profile: '/profile/',
  Login: '/login/',
  Signin: '/signin/',
  ChangeProfile: '/change_profile/',
  ChangePassword: '/change_password/'
};

Object.values(routes).forEach((route) => {
  app.use(route, express.static(`${__dirname}/dist`));
})

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 