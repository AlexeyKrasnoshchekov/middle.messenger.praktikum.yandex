// server.js
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const routes = {
  Main: '/messenger',
  Profile: '/profile/',
  Login: '/',
  Signin: '/signin/',
  ChangeProfile: '/profile_change/',
  ChangePassword: '/profile_password/',
};

Object.values(routes).forEach((route) => {
  app.use(route, express.static(`${__dirname}/dist`));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
