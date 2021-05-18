const { Sequelize } = require("sequelize");
const sequelize = require("../db");

const FriendRequests = sequelize.define("friend_requests_tables", {
    user_id: {
        type: Sequelize.STRING,
    },
    request_ids: {
        type: Sequelize.STRING,
    }
});

FriendRequests.sync({ alter: false }).then(() => {
    console.log("Friend Request table created");
});

module.exports = FriendRequests;