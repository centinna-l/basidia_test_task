const { Sequelize } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("user_tables", {
    user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    user_name: {
        type: Sequelize.STRING,
    },
    user_email: {
        type: Sequelize.STRING,
    },
    user_password: {
        type: Sequelize.STRING,

    },
    user_dob: {
        type: Sequelize.DATE,
    },
    image: {
        type: Sequelize.STRING,
    },
});

User.sync({ alter: false }).then(() => {
    console.log("users table created");
});

module.exports = User;

