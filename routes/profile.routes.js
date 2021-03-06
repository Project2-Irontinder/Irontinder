const express = require('express');
const router = express.Router();
const fileUploader = require("../config/cloudinary");
const User = require("../models/User.model");
const Photo = require("../models/Photo.model");

router.post("/:userId/delete-photo/:photoId", (req, res)=>{
  const userId = req.params.userId;
  const photoId = req.params.photoId;
  User.findByIdAndUpdate(userId, {$pull: {photos: photoId}})
  .then(()=>{
    Photo.findByIdAndDelete(photoId)
    .then(()=>{res.redirect(`/profile/${userId}`)})
    .catch((err)=>{console.log(err)});
  })
  .catch((err)=>{console.log(err)});
});

router.post("/:userId/add-newPhoto", fileUploader.single("imgUrl"), (req, res)=>{
  const id = req.params.userId;
  const imgUrl = req.file.path;
  Photo.create({imgUrl, owner: id})
  .then((photo)=>{
    User.findByIdAndUpdate(id, {$push: {photos: photo._id}})
    .then(()=>{res.redirect(`/profile/${id}`)})
    .catch((err)=>{console.log(err)});
  })
  .catch((err)=>{console.log(err)});
});

router.post("/:userId/edit-imgProfile", fileUploader.single("profileImg"), (req, res)=>{
  const id = req.params.userId;
  const profileImg = req.file.path;

  User.findByIdAndUpdate(id, {profileImg})
  .then(()=>{res.redirect(`/profile/${id}`)})
  .catch((err)=>{console.log(err)});
});

router.post("/:userId/edit-infoProfile", (req, res)=>{
  const id = req.params.userId;
  const {name, interests, aboutMe} = req.body;
  User.findByIdAndUpdate(id, {name, interests, aboutMe})
  .then(()=>res.redirect(`/profile/${id}`))
  .catch((err)=>{console.log(err)});
});

router.get('/:userId', (req, res)=>{
  const id = req.params.userId;

  if(req.session.userId !== id){
    User.findById(id)
    .populate("photos")
    .then((user)=>{
      return res.render("pages/profile", {isNotTheOwner:true, user, sessionId: req.session.userId});
    })
    .catch((err)=>{console.log(err)});
  }else{

  User.findById(id)
  .populate("photos")
  .then((user)=>{
    res.render("pages/profile", {isTheOwner:true, user});
  })
  .catch((err)=>{console.log(err)});
  }
});

module.exports = router;
