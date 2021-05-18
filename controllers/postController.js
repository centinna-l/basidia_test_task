//JWT and Bcrypt
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

//Importing Models
const User = require("../models/user");
const Post = require("../models/post");


//To Make a random ID for the user
const makeid = (length) => {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//get all the posts of the USER
exports.getAllPosts = async (req, res) => {
    let user_id = req.uid;
    try {
        Post.findAll({
            where: {
                user_id: user_id
            }
        }).then((post) => {
            return res.status(200).json({
                post
            })
        }).catch((e) => {
            return res.status(400).json({
                "message": "No Posts avaiable"
            })
        });
    } catch (error) {
        return res.status(503).json({ error });
    }
}

exports.createPost = async (req, res) => {
    let user_id = req.uid;
    const { post_title, post_desc, post_image } = req.body
    let post_id = makeid(32);
    console.log(post_id);
    if (!(post_title && post_desc)) {
        return res.status(403).json({
            "error": "Enter all the fields"
        });
    } else {
        console.log(req.body);
        Post.create({
            post_id: post_id,
            user_id: user_id,
            post_title: post_title,
            post_image: post_image,
            post_desc: post_desc,
        }).then(async (post) => {
            return res.status(200).json({
                "message": "Post Created Sucessfully"
            });
        }).catch((e) => {
            return res.status(500).json({ e })
        });
    }
}

//Deleting  a Post
exports.deletePost = async (req, res) => {
    let user_id = req.uid;
    let post_id = req.params.postID;
    try {
        Post.destroy({
            where: {
                post_id: post_id
            }
        }).then((post) => {
            return res.status(200).json({
                "message": "Post Deleted Sucessfully"
            })
        }).catch((e) => {
            return res.status(503).json({
                e
            });
        });
    } catch (error) {
        return res.status(503).json({
            error
        });
    }
}
