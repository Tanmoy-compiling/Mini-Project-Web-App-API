const db = require('../../config/postgres');

/* To add member to the group
using groupid and userid(phone no)
both provided in query params */
module.exports.addMember = async function(req, res){
    try{
        var user = await db`SELECT * FROM groupMembers WHERE userid=${req.query.userid} AND groupid=${req.query.groupid}`;
        if(!user[0]){
            user = await db`INSERT INTO groupMembers(userid, groupid) VALUES(${req.query.userid}, ${req.query.groupid}) RETURNING *`;
            console.log("Member added successfully: ", user);
            return res.json(201, {
                message: "Member added successfully"
            })
        }
        else{
            console.log("****************ERROR: Member already exist in the group");
            return res.json(422, {
                message: "Member already exist in the group"
            })
        }
    }
    catch(err){
        console.log("***************ERROR in adding member: ", err);
        return res.json(500,{
            message: "Internal Server Error"
        })
    }
}

/* To remove a member from the group
using groupid and userid(phone no)
both provided in query params */

module.exports.removeMember = async function(req, res){
    try{
        var user = await db`SELECT * FROM groupMembers WHERE userid=${req.query.userid} AND groupid=${req.query.groupid}`;
        if(user[0]){
            await db`DELETE FROM groupMembers WHERE userid=${req.query.userid} AND groupid=${req.query.groupid}`;
            console.log("Member removed successfully");
            return res.json(201, {
                message: "Member removed successfully"
            })
        }
        else{
            console.log("****************ERROR: Member does not exist in the group");
            return res.json(422, {
                message: "Member does not exist in the group"
            })
        }
    }
    catch(err){
        console.log("***************ERROR in removing member: ", err);
        return res.json(500,{
            message: "Internal Server Error"
        })
    }
}