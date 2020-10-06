const User = require("../models/user");
const Joi = require("@hapi/joi");
const express = require("express")
const {validateRecover, sendResetMail} = require("../middleware/resetpass");

const router = express.Router();


