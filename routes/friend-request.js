const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');
friendRequestController = require("../controllers/friendRequestController");


router.get('/get-all-requests', auth, friendRequestController.getAllRequest);
router.post('/search-friends', auth, friendRequestController.searchFriends);
router.post('/send-requests/:pfid', auth, friendRequestController.sendRequests);
router.post('/delete-request/:pfid', auth, friendRequestController.deleteRequest);
router.post('/accept-request/:pfid', auth, friendRequestController.acceptRequest);

module.exports = router;