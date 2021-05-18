const User = require("../models/user");
const FriendRequests = require("../models/friend_requests");
const { Op } = require("sequelize");
const Friend = require("../models/friend");

exports.getAllRequest = async (req, res) => {
    let user_id = req.uid;
    console.log(user_id);
    try {
        FriendRequests.findAll({
            where: {
                user_id: user_id
            }
        }).then(async (post) => {
            console.log(post);
            let req_ids = [];
            post.forEach(element => {
                req_ids.push(element.request_ids);
            });
            console.log(req_ids);
            if (req_ids.length === 0) {
                return res.status(200).json({
                    "message": "No Friend Requests"
                });
            }
            // console.log(req_ids);
            // let req_list = [];
            // req_ids.forEach(async (element) => {
            //     console.log(element)
            //     let user = await 
            //     req_list.push(user);
            // });
            // console.log(req_list)
            // return res.status(200).json({ "req_list": req_list })

            User.findAll({
                where: {
                    user_id: {
                        [Op.or]: req_ids
                    }
                },
                attributes: {
                    exclude: ['user_password']
                }
            }).then((user) => {
                return res.json({ user })
            });

            // return res.status(200).json({
            //     "user_profile": post
            // })
        }).catch((e) => {
            return res.status(400).json({
                "message": "No Requests avaiable"
            })
        });
        // const count = await FriendRequests.count({
        //     where: {
        //         user_id: user_id
        //     }
        // });
        // console.log(count);
    } catch (error) {
        return res.status(500).json({ "message": "No Friend Requests" })
    }
}

exports.searchFriends = async (req, res) => {
    const name = req.body;
    console.log(name.name);
    try {
        User.findAll({
            where: {
                user_name: {
                    [Op.iLike]: `%${name.name}`
                }
            },
            attributes: {
                exclude: ['user_password']
            }
        }).then((users) => {
            return res.status(200).json(users)
        }).catch((e) => {
            return res.status(404).json(e)
        })
    } catch (error) {
        return res.status(500).json({
            "error": "Something went wrong"
        })
    }
}

exports.sendRequests = async (req, res) => {
    let user_id = req.uid;
    let prospect_friend_id = req.params.pfid
    if (user_id === prospect_friend_id) {
        return res.status(403).json({
            "error": "You cannot send a request to yourself"
        })
    }
    try {
        FriendRequests.create({
            user_id: prospect_friend_id,
            request_ids: user_id
        }).then((data) => {
            return res.status(200).json({
                "message": "Request sent "
            })
        }).catch((e) => {
            return res.status(403).json(e)
        })
    } catch (error) {
        return res.status(200).json({ error })
    }
}

exports.deleteRequest = async (req, res) => {
    let user_id = req.uid;
    let pfid = req.params.pfid
    console.log(pfid)
    try {
        FriendRequests.destroy({
            where: {
                [Op.and]: [{ user_id: user_id }, { request_ids: pfid }]
            }
        }).then((data) => {
            return res.status(200).json({
                "message": "deleted"
            });
        }).catch((e) => {
            return res.status(404).json({
                "error": "Entry Not found"
            });
        });

    } catch (error) {
        return res.status(503).json({
            "error": "Something went wrong"
        });
    }
}

exports.acceptRequest = async (req, res) => {
    let user_id = req.uid;
    let pfid = req.params.pfid;
    try {
        Friend.create({
            user_id: user_id,
            friend_id: pfid
        }).then((friend) => {
            console.log(friend);
            FriendRequests.destroy({
                where: {
                    [Op.and]: [{ user_id: user_id }, { request_ids: pfid }]
                }
            }).then((update) => {
                return res.status(500).json({ "messaage": "Added to your Friend List" });
            }).catch((e) => { return res.status(500).json({ "error": "Not Able to Delete from Request Table" }) });
        }).catch((e) => { return res.status(500).json({ "error": "Not able to Add Friend" }) })

    } catch (error) {
        return res.status(500).json({ "error": "TRY CATCH ERROR" })
    }
}

// const updateOrCreate=async(model, where, newItem) =>{
//     // First try to find the record
//     return model
//         .findOne({ where: where })
//         .then(function (foundItem) {
//             if (!foundItem) {
//                 // Item not found, create a new one
//                 return model
//                     .create(newItem)
//                     .then(function (item) { return { item: item, created: true }; })
//             }
//             // Found an item, update it
//             return model
//                 .update(newItem, { where: where })
//                 .then(function (item) { return { item: item, created: false } });
//         }
// }