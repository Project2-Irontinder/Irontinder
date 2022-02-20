const express = require('express');
const router = express.Router();
const User = require("../models/User.model")
const Match = require("../models/Match.model");
const isLoggedIn = require('../middleware/isLoggedIn');


router.get('/show/:userId', isLoggedIn, (req, res) => {

  const filter = req.session.filter || "none"

  User.findById(req.params.userId)
    .then(user => {

      const liked = user.liked;
      const disliked = user.disliked

      User.find({
        $and: [
          { "_id": { $nin: liked } },
          { "_id": { $nin: disliked } },
          { "_id": {$ne: user._id}},
          {campus : {$eq: filter}}
        ]
      })
        .then(users => {
          const randomUser = users[Math.floor(Math.random() * users.length)]
          res.render("pages/swipe", { randomUser, user })
        })




    })
});



router.post("/like/:userId/:likedId", (req, res) => {

  User.findById(req.params.likedId)
    .then(likedUser => {
      User.findByIdAndUpdate(req.params.userId, { $push: { liked: likedUser._id } })
        .then(user => {
          checkMatch(user._id, likedUser._id)
        })
    })
    .then(() => res.redirect(`/swipe/show/${req.session.userId}`))
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
  console.log(req.session.filter)

  res.redirect(`/swipe/show/${req.params.userId}`)
})




const checkMatch = (firstUserId, secondUserId) => {

  User.findById(secondUserId)
    .then(secondUser => {

      const liked = secondUser.liked

      if (liked.includes(firstUserId)) {

        Match.create({ firstUser: firstUserId, secondUser: secondUserId })
          .then(match => {

            User.findByIdAndUpdate(firstUserId, { $push: { matches: match._id } })
              .then(() => {

                User.findByIdAndUpdate(secondUserId, { $push: { matches: match_id } })
              })


          })

      }

    })
}

module.exports = router;
