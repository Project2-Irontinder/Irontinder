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
        .then(usersArray => {
          
          const shuffledArray = usersArray;
          shuffle(shuffledArray)
          const firstRandom = shuffledArray[0]
          shuffledArray.shift()

          
          
          return res.render("pages/swipe", { firstRandom,shuffledArray,user, inputFilter, inSwipe: true})
        })




    })
});



router.post("/like/:userId/:likedId", (req, res) => {

  User.findById(req.params.likedId)
  .then(likedUser => {
    User.findByIdAndUpdate(req.params.userId, { $push: { liked: likedUser._id } })
    .then((user) => {
      checkMatch(user._id, likedUser._id);
      //return res.redirect(`/swipe/show/${req.session.userId}`)      
    })
  })
})




router.post("/dislike/:userId/:dislikedId", (req, res) => {

  User.findById(req.params.dislikedId)
    .then(dislikedUser => {
      User.findByIdAndUpdate(req.params.userId, { $push: { disliked: dislikedUser._id } })
      .then(()=>{return})
      //.then(() => res.redirect(`/swipe/show/${req.params.userId}`))
    })
    
})




router.post("/filter/:userId", (req, res) => {
  req.session.filter = req.body.campus
  res.redirect(`/swipe/show/${req.params.userId}`)
})




const checkMatch = (firstUserId, secondUserId) => {

  User.findById(secondUserId)
  .then(secondUser => {

    const liked = secondUser.liked

    if (liked.includes(firstUserId)) {

      Match.create({ firstUser: firstUserId, secondUser: secondUserId })
      .then(async (match) => {
        try{
          await User.findByIdAndUpdate(firstUserId, { $push: { matches: match._id } });
          await User.findByIdAndUpdate(secondUserId, { $push: { matches: match._id } });

        }
        catch(err){console.log(err)}
      })
    }
  })
}


const shuffle = (array) =>{
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

module.exports = router;
