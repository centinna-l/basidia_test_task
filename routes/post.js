const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();
const postController = require("../controllers/postController");


router.get('/get-all-posts', auth, postController.getAllPosts);
router.post('/create-post', auth, postController.createPost);
router.delete('/delete-post/:postID', auth, postController.deletePost);


module.exports = router;