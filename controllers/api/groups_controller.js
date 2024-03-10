const db = require('../../config/postgres');
/*
CREATE TABLE groups(
  groupid SERIAL PRIMARY KEY,
  name varchar(50)
);
*/


/* to create a group
form data: group_name, userid*/

module.exports.createGroup = async function(req, res){
  try {
      var group = await db`INSERT INTO groups(name) VALUES(${req.body.group_name}) RETURNING *`;
      await db`INSERT INTO groupMembers(userid, groupid) VALUES(${req.body.userid}, ${group[0].groupid})`;
      console.log("NEW GROUP CREATED:", group);
      return res.json(201, {
          message: "Successfully created new group",
          data:{
              group: group[0]
          }
      })
  } catch (err) {
      console.log('*****************ERROR in creating new group:', err);
      return res.json(500, {
          message: "Error in creating new group"
      })
  }
}

/* to delete a group
using groupid in params */
module.exports.deleteGroup = async function(req, res){
  try {
    console.log("check");
    console.log("GROUPID:", req.params.groupid);
      var group = await db`DELETE FROM groups WHERE groupid=${req.params.groupid} RETURNING *`;
      console.log("GROUP DELETED");
      return res.json(201, {
          message: "Successfully deleted group",
          data:{
              group: group[0]
          }
      })
  } catch (err) {
      console.log('*****************ERROR in deleting group:', err);
      return res.json(500, {
          message: "Error in deleting group"
      })
  }
}

/*to edit the group name
using groupid in params*/
module.exports.editGroup = async function(req, res){
  try {
      var group = await db`UPDATE groups SET name=${req.body.group_name} WHERE groupid=${req.params.groupid} RETURNING *`;
      console.log("GROUP EDITED:", group);
      return res.json(201, {
          message: "Successfully edited group",
          data:{
              group: group[0]
          }
      })
  } catch (err) {
      console.log('*****************ERROR in editing group:', err);
      return res.json(500, {
          message: "Error in editing group"
      })
  }
}