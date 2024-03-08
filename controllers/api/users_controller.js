const db = require('../../config/postgres');
const jwt = require('jsonwebtoken');
let {JWT_SECRET} = process.env;

/*
creating new user through sign up details
userid = phone_no
name = name
reg_no = reg_no
password = password
confirm_password - just to validate
*/
module.exports.createUser = async function(req, res){
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
                    user: user[0]
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
        console.log('*****************ERROR in creating new user:', err);
        return res.json(500, {
            message: "Error in creating new user"
        })
    }
};




/*
Login for an existing user
req.body:
    phone_no, match with userid in db
    password, match with password in db
return jwt token 
*/
module.exports.createSession = async function(req, res){
    try{
        let user = await db`SELECT * FROM users WHERE userid=${req.body.phone_no}`;
        if(!user[0] || user[0].password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            })
        }
        console.log("Login Successful ", user[0]);
        return res.json(200, {
            message: "Login successful!",
            data:{
                token: jwt.sign({
                    userid: user[0].userid, 
                    name: user[0].name, 
                    reg_no: user[0].reg_no
                }, JWT_SECRET, {expiresIn: '600000'})
            }
        })
        
    }catch(err){
        console.log("*****************ERROR in logging in:", err);
        return res.json(500,{
            message: "Internal Server Error"
        })
    }
}

