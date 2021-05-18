const { Sequelize } = require("sequelize");
const sequelize = require("../db");

const Post = sequelize.define("post_tables", {
    post_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.STRING,
    },
    post_title: {
        type: Sequelize.STRING
    },
    post_image: {
        type: Sequelize.STRING
    },
    post_desc: {
        type: Sequelize.STRING
    },
    likes: {
        type: Sequelize.INTEGER
    },
    comments: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
});

Post.sync({ alter: false }).then(() => {
    console.log("Post table created");
});

module.exports = Post;