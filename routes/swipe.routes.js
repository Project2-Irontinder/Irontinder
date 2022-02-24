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
      console.log(user.username, likedUser.username)
      const liked = likedUser.liked

        if (liked.includes(req.params.userId)) {
          
          Match.create({ firstUser: user._id, secondUser: likedUser._id })
          .then( match=>{
            console.log(match._id)
            User.findByIdAndUpdate(req.params.userId, { $push: { matches: match._id } })
            .then(()=>{
              User.findByIdAndUpdate(req.params.likedId, { $push: { matches: match._id } })
              .then(()=>{
                return res.send({matched: true})
              })
            })
          })
        }
        return res.send({matched:false})
      })
  })
})



router.post("/dislike/:userId/:dislikedId", (req, res) => {

  User.findById(req.params.dislikedId)
    .then(dislikedUser => {
      User.findByIdAndUpdate(req.params.userId, { $push: { disliked: dislikedUser._id } })
      .then(user=>{
        res.send("DISLIKE-OK")
      })
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
      .then( match=>{
        firstUser.matches.push(newMatch._id);
        secondUser.matches.push(newMatch._id);
        console.log(firstUser._id, secondUser._id)
        return newMatch
      })
    }
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
