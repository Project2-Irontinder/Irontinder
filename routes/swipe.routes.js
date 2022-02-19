const express = require('express');
const router = express.Router();
const User = require("../models/User.model")


/* GET users listing. */
router.get('/show/:userId', (req,res)=>{
  User.findById(req.params.userId)
  .then(user => getRandomUser(user))
});

router.post("/like/:userId/:likedId", (req,res)=>{

})

router.post("/dislike/:userId/:dislikedId",(req,res)=>{

})

router.post("/filter/:userId", (req,res)=>{

})

const getRandomUser = (user)=>{
  const liked = user.liked;
  const disliked = user.disliked

  return User.findOne({"_id": {$nin: liked}})
}

module.exports = router;