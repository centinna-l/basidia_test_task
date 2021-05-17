const Sequelize = require('sequelize')

// const Sqeudata = {
//     user: 'jerry',
//     host: 'localhost',
//     database: 'smedia',
//     password: 'eagleFist',
//     port: 5432,
//     dialect: "postgres",
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false // <<<<<<< YOU NEED THIS
//         }
//     },
// }
// const sequelize = new Sequelize(Sqeudata);

const sequelize = new Sequelize('postgres://jerry:eagleFist@localhost:5432/smedia');

module.exports = sequelize;