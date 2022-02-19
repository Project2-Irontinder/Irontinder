const express = require('express');
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");

router.post(":userId/delete-photo/:photoId", (req, res)=>{});
router.post(":userId/add-newPhoto", (req, res)=>{});
router.post(":userId/edit-imgProfile", fileUploader.single("imgProfile"), (req, res)=>{
  const id = req.params.id;
  const imgProfile = req.file.path;

  
});

router.post(":userId/edit-infoProfile", (req, res)=>{
  const id = req.params.id;
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
      return res.render("pages/profile", {isNotTheOwner});
    })
    .catch((err)=>{console.log(err)});
  }

  User.findById(id)
  .populate("photos")
  .then((user)=>{
    res.render("pages/profile", {isTheOwner});
  })
  .catch((err)=>{console.log(err)});
});

module.exports = router;
