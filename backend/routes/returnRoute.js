const express = require('express');
const router = express.Router();

const { isAuthenticated, authRole } = require('../middleWares/auth');
const { createReturnRequest } = require('../controllers/returnController');

router.route("/me/return").post(isAuthenticated,createReturnRequest);