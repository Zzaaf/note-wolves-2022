const express = require('express');
const ssr = require('../middleware/ssr');

module.exports = function serverConfig(app) {
  app.use(express.static('public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(ssr);
};
