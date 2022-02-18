

const express = require('express');
const router = express.Router();

const User = require("../models/User.model");
const Api = require("../apis/api");
const isLoggedIn = require('../middleware/isLoggedIn');

/* GET home page. */
router.get('/', isLoggedIn, (req, res)=> {
  res.redirect(`/swipe/show/${   ____req.session.userId____   }`);
});

/* GET from API */
router.get('/api', (req, res)=> {
  Api.getAll().then((entity)=>
  res.render('index', { title: 'Express', users: entity})
);
});

module.exports = router;
