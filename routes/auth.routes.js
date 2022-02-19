const express = require('express');
const router = express.Router();

const saltRound = 5;
const bcrypt = require("bcrypt")

const User = require("../models/User.model")

const isLoggedIn = require("..middleware/isLoggedIn.js")
const isNotLoggedIn = require("..middleware/isLoggedOut.js")

router.get("/signup", isNotLoggedIn, (req, res) => {
  res.render("auth/signup")
})

router.post("/signup", isNotLoggedIn, (req, res, next) => {
  const {username, password, age, name, campus, profileImg} = req.body;

  if(!username || !password || !age || !name || !campus || !profileImg) {
    return res.render("auth/signup", { errorMessage: "Please provide the mandatory fields"})
  }

  User.findOne({ username }).then((user) => {
    if (user && user.username) {
      {
        res.render("auth/signup", { errorMessage: "User already taken"})
      }
    }
  })

})




module.exports = router;