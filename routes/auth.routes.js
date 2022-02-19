const express = require('express');
const router = express.Router();

const saltRounds = 5;
const bcrypt = require("bcrypt")

const User = require("../models/User.model")

const isLoggedIn = require("..middleware/isLoggedIn.js")
const isNotLoggedIn = require("..middleware/isLoggedOut.js")

router.route("/signup")
.get(isNotLoggedIn, (req, res) => {
  res.render("auth/signup")
})
.post((req, res, next) => {
  const {username, password, age, name, interests, aboutMe, campus} = req.body;
  const profileImg = req.file.path;

  if(!username || !password || !age || !name || !campus || !profileImg) {
    return res.render("auth/signup", { errorMessage: "Please provide the mandatory fields"})
  }

  User.findOne({ username })
  .then((user) => {
    if (user && user.username) {
      return res.render("auth/signup", { errorMessage: "User already taken"})
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPwd = bcrypt.hashSync(password, salt);

    User.create({ username, password: hashedPwd, age, name, interests, aboutMe, campus, profileImg})
    .then((user) => {
      req.session.userId = user._id
      res.redirect(`/swipe/show/${req.session.userId}`)
    })
    .catch((err) => console.log(err))
  })
  .catch((err) => console.log(err))
})

router.route("/login")
.get(isNotLoggedIn, (req, res) => {
  res.render("auth/login")
})
.post((req, res) => {
  const {username, password} = req.body;

  if(!username || !password) {
    return res.render("auth/login", {errorMessage: "All fields are required"})
  }

  User.findOne({ username })
  .then((user) => {
    if(!user) {
      return res.render("auth/login", { errorMessage: "Incorrect credentials"})
    }
    const isPwCorrect = bcrypt.compareSync(password, user.password)

    if(isPwCorrect) {
      req.session.userId = user._id
      res.redirect(`/swipe/show/${req.session.userId}`)
    } else {
      res.render("auth/login", { errorMessage: "Incorrect credentials"})
    }
  })
  .catch((err) => console.log(err))

})

router.get("/logout", (req, res) => {
  req.session.destroy((err) => res.redirect("/auth/login"))
})




module.exports = router;