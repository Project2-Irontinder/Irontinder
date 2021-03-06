const express = require('express');

const logger = require('morgan');

const cookieParser = require("cookie-parser");

const favicon = require("serve-favicon");

const path = require("path");

const session = require('express-session');
const MongoStore = require('connect-mongo');

const hbs = require('hbs');

hbs.registerHelper('includes', function (string, array) {
  if(array.includes(string)){return true}
  else return false
});

hbs.registerHelper('equals', function (firstId, secondId) {
  if(firstId.toString() !== secondId.toString()){return true}
  else return false
});

// Swipe helper

hbs.registerHelper('isEqual', function (value1, value2) {
  return value1 === value2
});

//To JSON helper

hbs.registerHelper('json', function (content) {
  return JSON.stringify(content);
});



// Middleware configuration
module.exports = (app) => {
  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Normalizes the path to the views folder
  app.set("views", path.join(__dirname, "../views"));
  // Sets the view engine to handlebars
  app.set("view engine", "hbs");

  hbs.registerPartials(path.join(__dirname ,'../views/partials'))

  // Handles access to the public folder
  app.use(express.static(path.join(__dirname, "..", "public")));

  // Handles access to the favicon
  app.use(favicon(path.join(__dirname, "..", "public", "images", "favicon.ico")));

  app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: true,
			cookie: {
				maxAge: 24 * 60 * 60 * 1000
			},
			store: MongoStore.create({
				mongoUrl: process.env.MONGODB_URI
			})
		})
	);

};
