const { Sequelize } = require("sequelize");
const sequelize = require("../db");

const Friend = sequelize.define("friend_tables", {
    user_id: {
        type: Sequelize.toString,
        primaryKey: true,
    },
    friend_ids: {
        type: Sequelize.STRING,
    }
});

Friend.sync({ alter: false }).then(() => {
    console.log("Friend table created");
});

module.exports = Friend;