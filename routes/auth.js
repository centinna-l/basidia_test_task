const express = require('express');
const router = express.Router();
const multer = require('multer');
var upload = multer();
const userController = require("../controllers/userController");
const auth = require('../middlewares/auth');



router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/forgotpassword', userController.forgotPassword);
router.get('/getprofile', auth, userController.getProfile);
router.put('/updateprofile', auth, userController.updateProfile);
module.exports = router;

// Using Pool - Client just for testing of PostgresSQL connections.

// router.get('/signin', (req, res) => {
//     pool.query('SELECT * from user_table', (error, data) => {
//         if (error) {
//             return res.status(404).json({ error });

//         }
//         console.log(data.rows[0])
//         const { email, password } = data.rows[0];
//         return res.status(200).json(data.rows);
//     });
// });

// router.post('/signin', upload.none(), (req, res) => {
//     const { email, password } = req.body;
//     try {
//         pool.query(`SELECT * from user_table where(${email} == email)`, (error, data)=>{})
//         // res.status(200).json({ email, password });
//     } catch (error) {
//         // res.status(500).json({ error })
//     }
// });