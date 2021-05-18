const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const friendController = require("../controllers/friendController");


router.get('/get-all-friends', auth, friendController.getAllFriends)



module.exports = router;