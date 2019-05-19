const pushRouter = require('express').Router();
const q = require('q');
const webPush = require('web-push');
require('dotenv').config();
const User = require('../models/user');
const getUser = require('../services/userService');

//webpush.setGCMAPIKey(process.env.GOOGLE_API_KEY)
webPush.setVapidDetails(
  "mailto:eetu.hakkinen.01@gmail.com",
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
)

module.exports = pushRouter;