const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();
const postController = require("../controllers/postController");
const path = require('path');
const multer = require('multer');
//Storage location
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        req.pathname = "./uploads/"
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        req.filename = Date.now() + path.extname(file.originalname);
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
});

let uploads = multer({ storage: storage });


router.get('/get-all-posts', auth, postController.getAllPosts);
router.post('/create-post', uploads.single("post_image"), auth, postController.createPost);
router.delete('/delete-post/:postID', auth, postController.deletePost);


module.exports = router;