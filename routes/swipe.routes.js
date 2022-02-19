const express = require('express');
const router = express.Router();
const User = require("../models/User.model")


/* GET users listing. */
router.get('/show/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      //console.log(random)
      res.render("pages/swipe", getRandomUser(user))
    
    })
});

router.post("/like/:userId/:likedId", (req, res) => {

})

router.post("/dislike/:userId/:dislikedId", (req, res) => {

})

router.post("/filter/:userId", (req, res) => {

})

const getRandomUser = (user) => {
  const liked = user.liked;
  const disliked = user.disliked

  console.log(liked)
  console.log(disliked)

  User.find({
    $and: [
      { "_id": { $nin: liked } },
      { "_id": { $nin: disliked } }
    ]
  })
    .then(users => {
      const randomUser = Math.floor(Math.random() * users.length)
      //console.log(users[randomUser])
      return users[randomUser]
    })
}

module.exports = router;
