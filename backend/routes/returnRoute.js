const express = require('express');
const router = express.Router();

const { isAuthenticated, authRole } = require('../middleWares/auth');
const { createReturnRequest, getAllReturnRequest, getSingleReturnRequest, changeReturnRequestStatus } = require('../controllers/returnController');

router.route("/me/return").post(isAuthenticated,createReturnRequest);
router.route("/seller/return/req").get(isAuthenticated,getAllReturnRequest);
router.route("/seller/return/req/:id").get(isAuthenticated,getSingleReturnRequest);
router.route("/seller/return/req/status/:id").put(isAuthenticated, changeReturnRequestStatus);


module.exports = router;