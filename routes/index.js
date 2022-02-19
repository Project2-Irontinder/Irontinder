

const express = require('express');
const router = express.Router();

const User = require("../models/User.model");
const Api = require("../apis/api");
const isLoggedIn = require('../middleware/isLoggedIn');
const isNotLoggedIn = require('../middleware/isNotLoggedIn');

/* GET home page. */
router.get('/', isNotLoggedIn, (req, res)=> {
  res.render("index");
});



/* GET from API */
router.get('/api', (req, res)=> {
  Api.getAll().then((entity)=>
  res.render('index', { title: 'Express', users: entity})
);
});

module.exports = router;
