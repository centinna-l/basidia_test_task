const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const friendController = require("../controllers/friendController");


router.get('/get-all-friends', auth, friendController.getAllFriends);
router.delete('/remove-friend/:fid', auth, friendController.removeFriend);
router.get('/get-mutual-friends/:fid', auth, friendController.mutualFriend);
router.get('/get-friends-of-friends/:fid', auth, friendController.viewMyFriendsFriends);



module.exports = router;