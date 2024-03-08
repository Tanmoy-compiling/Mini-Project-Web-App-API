const db = require('../../config/postgres');


/*
creating new user through sign up details
userid = phone_no
name = name
reg_no = reg_no
password = password
confirm_password - just to validate
*/
module.exports.create_user = async function(req, res){
    try {
        if (req.body.password != req.body.confirm_password) {
            console.log('*****************ERROR: Confirm password does not match password')
            return res.json(422, {
                message: "Confirm password does not match password"
            })
        }
        var user = await db`SELECT * FROM users where userid=${req.body.phone_no}`;
        if (!user[0]){
            user = await db`INSERT INTO users(userid, name, reg_no, password) VALUES(${req.body.phone_no}, ${req.body.name}, ${req.body.reg_no}, ${req.body.password}) RETURNING *`;
            console.log("NEW USER CREATED:", user);
            return res.json(201, {
                message: "Successfully created new user",
                data:{
                    user: user
                }
            })
        }
        else {
            console.log('*****************ERROR: Username not unique')
            return res.json(422, {
                message: "Username not unique"
            })
        }
    } catch (err) {
        console.log('*****************ERROR: in creating new user', err);
        return res.json(500, {
            message: "Error in creating new user"
        })
    }
};


