const express = require('express');
const router = express.Router();
const User = require("../models/User.model")
const Match = require("../models/Match.model");
const isLoggedIn = require('../middleware/isLoggedIn');


router.get('/show/:userId', isLoggedIn, (req, res) => {

  const inputFilter = req.session.filter || "All"

  const filter = inputFilter === "All" ? ["Madrid", "Barcelona", "Miami", "Berlin", "Paris", "Amsterdam"] : req.session.filter;

  
  User.findById(req.params.userId)
    .then(user => {

      const liked = user.liked;
      const disliked = user.disliked

      User.find({
        $and: [
          { "_id": { $nin: liked } },
          { "_id": { $nin: disliked } },
          { "_id": {$ne: user._id}},
          {campus : {$in: filter}},
        ]
      })
        .then(users => {
          const randomUser = users[Math.floor(Math.random() * users.length)]
          res.render("pages/swipe", { randomUser, user, inputFilter, inSwipe: true})
        })




    })
});



router.post("/like/:userId/:likedId", (req, res) => {

  User.findById(req.params.likedId)
  .then(likedUser => {
    User.findByIdAndUpdate(req.params.userId, { $push: { liked: likedUser._id } })
    .then((user) => {
      handleMatch(user, likedUser);
      return res.redirect(`/swipe/show/${req.session.userId}`)
    })
  })
})




router.post("/dislike/:userId/:dislikedId", (req, res) => {

  User.findById(req.params.dislikedId)
    .then(dislikedUser => {
      User.findByIdAndUpdate(req.params.userId, { $push: { disliked: dislikedUser._id } })
      .then(() => res.redirect(`/swipe/show/${req.params.userId}`))
    })
    
})



router.post("/filter/:userId", (req, res) => {
  req.session.filter = req.body.campus
  res.redirect(`/swipe/show/${req.params.userId}`)
})




const handleMatch = (firstUser, secondUser) => {

    const liked = secondUser.liked

    if (liked.includes(firstUser._id)) {

      Match.create({ firstUser: firstUser._id, secondUser: secondUser._id })
      .then(async (match) => {

        firstUser.matches.push(match._id);
        secondUser.matches.push(match._id);

        try{
          await firstUser.save();
          await secondUser.save();
        }
        catch(err){console.log(err)}
      })
    }
  }

module.exports = router;
