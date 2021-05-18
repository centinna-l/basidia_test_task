const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

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

exports.signup = async (req, res) => {
    const { name, email, phone, dob, gender, password } = req.body;
    //Make a Random ID
    let id = makeid(32);

    if (!(id && name && email && phone && dob && gender && password)) {
        console.log(id);
        console.log(req.body);
        return res.status(400).json({
            "error": "All Fields should be entered"
        })
    } else {
        console.log(req.body);
        const token = jwt.sign({ uid: id, iat: Math.floor(Date.now() / 1000) }, "1234567890");
        bcrypt.hash(password, 10, async (err, hash) => {
            // Store hash in your password DB.
            console.log(hash);
            const count = await User.count({
                where: {
                    user_email: email
                }
            });
            console.log(count);
            if (count == 0) {
                User.create({
                    user_id: id,
                    user_name: name,
                    user_email: email,
                    user_dob: new Date(dob.split("-").reverse().join("-")),
                    gender: gender,
                    user_password: hash
                }).then(async (user) => {
                    // console.log(user)
                    return res.status(200).json({
                        "message": "User Created Sucessfully",
                        token
                    })
                }).catch((e) => {
                    console.log(e)
                });
            }
            else {
                return res.status(403).json({
                    "error": "User Already Exists"
                })
            }
        });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    User.findAll({
        where: {
            user_email: email
        }
    }).then((user) => {
        // console.log(user);
        let hashPassword = user[0].user_password;
        bcrypt.compare(password, hashPassword).then((data) => {
            if (!data) {
                return res.status(200).json({
                    "message": "Invalid User Credentials"
                });
            }
            // console.log(data[0].user_email);
            const token = jwt.sign({ uid: user[0].user_id, iat: Math.floor(Date.now() / 1000) }, "1234567890");
            return res.status(200).json({
                "message": "Sucessfully Logged in.",
                token
            })
        });
    }).catch((e) => {
        return res.status(404).json({
            "message": "No User Exists."
        })
    });
}

exports.forgotPassword = async (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashPassword) => {
        if (err) return res.status(400).json({ err });
        const count = await User.count({
            where: {
                user_email: email
            }
        });
        if (count == 1) {
            User.update({
                user_password: hashPassword
            }, {
                where: {
                    user_email: email
                }
            }).then((result) => {
                console.log(result);
                return res.status(200).json({
                    "message": "Password Changed Sucessfully"
                })
            }).catch((e) => {
                return res.status(404).json({ "error": "Email Not Found" });
            });
        } else {
            return res.status(403).json({ "error": "Email Not found" });
        }

    });
}

exports.getProfile = async (req, res) => {
    let id = req.uid;
    console.log(req.uid)
    User.findAll({
        where: {
            user_id: id
        }
    }).then((user) => {
        console.log(user[0].user_email);
        return res.status(200).json({
            "profile": {
                "name": user[0].user_name,
                "email": user[0].user_email,
                "dob": user[0].user_dob,
                "profile_pic": user[0].image,
            }
        })
    }).catch((e) => { return res.status(404).json({ "error": "Cannot Fetch Details at the moment" }) });
}

exports.updateProfile = async (req, res) => {
    let id = req.uid;
    console.log(req.uid);
    //Name
    //Check if email exists or not if exists then return err otherwise update
    //dob
    //update profile image
    const updatedData = req.body;

    //check for email
    console.log(updatedData.user_email);
    const count = await User.count({
        where: {
            user_email: updatedData.user_email
        }
    });
    if (count != 0) {
        return res.status(200).json({
            "error": "Email is already associated with another account, try using a different email"
        })
    }

    //if image is there - simulating as a path file for now
    let data = {}
    data = { ...updatedData }
    User.update(data, {
        where: {
            user_id: id
        }
    }).then((data) => {
        return res.status(200).json({
            "message": "Profile Updated Successfully"
        })
    }).catch((e) => {
        return res.status(404).json({ "error": "Cannot Update Profile at the moment" })
    });
}
