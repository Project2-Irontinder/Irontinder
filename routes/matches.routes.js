const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();
const User = require("../models/User.model");

router.get('/:userId', isLoggedIn, (req, res)=>{

  const id = req.params.userId;

  if(req.session.userId !== id){
    //return res.redirect(`/matches/${req.session.userId}`)
    console.log("ERROR: Someone tried to access other user matches.")
    req.session.destroy();
    return res.redirect("/login");
  }

  User.findById(id)
  .populate("matches")
  .then((user)=>{res.render("pages/matches", {user})})
  .catch((err)=>{console.log(err)});
});

module.exports = router;