const mongoose = require('mongoose');

const User = require('../models/User.model');

require("dotenv/config")

// ℹ️ Connects to the database
require("../config/db");

// User.collection.drop();

const users = [
  {
    username: "raketen",
    password: "raketen",
    age: "20",
    name: "Luis",
    interests : ["Party", "Languages"],
    aboutMe : "I'm a web dev",
    campus : "Barcelona",
    profileImg : "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
  },
  {
    username: "carwels",
    password: "carwels",
    age: "21",
    name: "Carwi",
    interests : ["Software", "Party"],
    aboutMe : "I'm a web dev too",
    campus : "Madrid",
    profileImg : "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
  },
  {
    username: "dorkan",
    password: "dorkan",
    age: "22",
    name: "Fer",
    interests : ["Party", "Dance"],
    aboutMe : "I'm a web dev too too",
    campus : "Berlín",
    profileImg : "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
  },
  {
    username: "diego",
    password: "diego",
    age: "23",
    name: "Diego",
    interests : ["Software", "Music"],
    aboutMe : "I'm a web dev too too too",
    campus : "Paris",
    profileImg : "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
  },
  {
    username: "marco",
    password: "marco",
    age: "48",
    name: "Marco",
    interests : ["Pizza", "Estringa"],
    aboutMe : "I'm a web teacher",
    campus : "Amsterdam",
    profileImg : "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
  }
];

User.create(users)
  .then(users => {
    console.log(`Created ${users.length} users`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating fake users in the DB: ${err}`));
