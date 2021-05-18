const { Sequelize } = require("sequelize");
const sequelize = require("../db");

const Friend = sequelize.define("friend_tables", {
    user_id: {
        type: Sequelize.STRING,
    },
    friend_id: {
        type: Sequelize.STRING
    }
});

Friend.sync({ alter: true }).then(() => {
    console.log("Friend table created");
});

module.exports = Friend;