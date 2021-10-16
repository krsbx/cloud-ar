const cors = require('cors');
const express = require('express');
const userRoutes = require('../routes/users');
const tokenRoutes = require('../routes/token');
const markerRoutes = require('../routes/markers');

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  app.use('/api/users', userRoutes);
  app.use('/api/markers', markerRoutes);
  app.use('/api/token', tokenRoutes);
};
