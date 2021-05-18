const Friend = require("../models/friend");
const User = require("../models/user");
const { Op } = require("sequelize");
const _ = require("lodash");



exports.getAllFriends = async (req, res) => {
    let user_id = req.uid;
    console.log(user_id);
    try {
        Friend.findAll({
            where: {
                user_id: user_id
            }
        }).then((friend) => {
            let friend_ids = [];
            // console.log(friend.dataValues)
            friend.forEach(element => {
                console.log(element.dataValues.friend_id)
                friend_ids.push(element.dataValues.friend_id);
            });
            console.log(friend_ids)
            if (friend_ids.length === 0) {
                return res.status(404).json({
                    "error": "You need to get out and get Laid! :("
                });
            }
            User.findAll({
                where: {
                    user_id: {
                        [Op.or]: friend_ids
                    }
                },
                attributes: {
                    exclude: ['user_password']
                }
            }).then((user) => {
                return res.json({ user })
            });
        }).catch((e) => { return res.status(500).json({ "error": "TRY CATCH ERROR" }) })
    } catch (error) {
        return res.status(500).json({ "error": "TRY CATCH ERROR" })
    }
}

exports.removeFriend = async (req, res) => {
    let user_id = req.uid;
    let fid = req.params.fid;
    try {
        Friend.destroy({
            where: {
                [Op.and]: [{ user_id: user_id }, { friend_id: fid }]
            }
        }).then((data) => {
            return res.status(200).json({
                "message": "Removed your Friend, Wont be Stalking You!"
            });
        }).catch((e) => {
            return res.status(404).json({
                e
            });
        });
    } catch (error) {
        return res.status(500).json({
            "error": "TRY CATCH ERROR"
        });
    }
}

exports.mutualFriend = async (req, res) => {
    let user_id = req.uid;
    let fid = req.params.fid;
    try {
        const my_friends = await Friend.findAll({
            where: {
                user_id
            }
        });

        const my_friends_friends = await Friend.findAll({
            where: {
                user_id: fid
            }
        });
        let my_friends_list = []
        let my_friends_friends_list = [];
        my_friends.forEach(element => {
            console.log(element.dataValues.friend_id);
            my_friends_list.push(element.dataValues.friend_id);
        });
        my_friends_friends.forEach(element => {
            console.log(element.dataValues.friend_id);
            my_friends_friends_list.push(element.dataValues.friend_id);
        });
        const mutual_friends = _.intersection(my_friends_list, my_friends_friends_list);
        console.log(mutual_friends);
        if (mutual_friends.length === 0) {
            return res.status(200).json({ "message": "No Mutual Friends" })
        }
        User.findAll({
            where: {
                user_id: {
                    [Op.or]: mutual_friends
                }
            }, attributes: {
                exclude: ['user_password']
            }
        }).then((user) => {
            return res.status(200).json({ user })
        }).catch((e) => { return res.jaon({ e }) })
    } catch (error) {
        return res.json({
            error
        })
    }
}

exports.viewMyFriendsFriends = async (req, res) => {
    let user_id = req.uid;
    let fid = req.params.fid
    try {
        let count = await Friend.count({
            where: {
                [Op.and]: [{ user_id }, { friend_id: fid }]
            }
        });
        if (count < 1) {
            return res.json({
                "error": "You cannot view if your arent friends"
            })
        }
        Friend.findAll({
            where: {
                user_id: fid
            }
        }).then((friends) => {
            let friend_ids = [];
            friends.forEach(element => {
                friend_ids.push(element.dataValues.friend_id);
            });
            User.findAll({
                where: {
                    user_id: {
                        [Op.or]: friend_ids
                    },
                }, attributes: {
                    exclude: ['user_password']
                }
            }).then((user) => {
                return res.json({ user })
            }).catch((e) => {
                return res.json({ "e": "2 err" })
            })
        }).catch((e) => { return res.json({ "e": "1 err" }) });
    } catch (error) {

    }
}