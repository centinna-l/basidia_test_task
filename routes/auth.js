const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require('../middlewares/auth');
const path = require('path')

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



router.post('/signup', uploads.single("image"), userController.signup);
router.post('/login', uploads.none(), userController.login);
router.put('/forgotpassword', userController.forgotPassword);
router.get('/getprofile', auth, userController.getProfile);
router.put('/updateprofile', uploads.single("image"),auth, userController.updateProfile);
router.post('/check', uploads.single("image"), userController.checkImage);
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