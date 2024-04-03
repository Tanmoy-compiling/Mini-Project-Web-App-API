const db = require("../../config/postgres");

/*
CREATE TABLE IF NOT EXISTS notes (
    notesid SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    groupid INT,
    FOREIGN KEY (groupid) REFERENCES groups(groupid) ON DELETE CASCADE
);
*/
/*
CREATE TABLE groups(
  groupid SERIAL PRIMARY KEY,
  name varchar(50)
);
*/

/* to insert a note
form data: title, content */

module.exports.insertNote = async function (req, res) {
  try {
    var group =
      await db`SELECT * FROM groups WHERE groupid=${req.query.groupid}`;
    if (group.length === 0) {
      return res.json(404, { message: "Group not found" });
    }

    const content = req.fileUrl ? req.fileUrl : req.body.content; // Use the file URL if available

    var note =
      await db`INSERT INTO notes(title, content, groupid) VALUES(${req.body.title}, ${content}, ${req.query.groupid}) RETURNING *`;
    return res.json(201, {
      message: "Successfully created new note",
      data: { note: note[0] },
    });
  } catch (err) {
    console.log("*****************ERROR in creating new note:", err);
    return res.json(500, { message: "Error in creating new note" });
  }
};

// to delete a note
module.exports.deleteNote = async function (req, res) {
  try {
    var note =
      await db`DELETE FROM notes WHERE notesid=${req.query.notesid} RETURNING *`;
    console.log("NOTE DELETED:", note);
    return res.json(201, {
      message: "Successfully deleted note",
      data: {
        note: note[0],
      },
    });
  } catch (err) {
    console.log("*****************ERROR in deleting note:", err);
    return res.json(500, {
      message: "Error in deleting note",
    });
  }
};

//fetch all notes where groupid = groupid and title like %title%
module.exports.fetchNotes = async function (title, userid) {
  try {
    console.log(title, userid);
    var notes =
      await db`SELECT n.content FROM notes AS n INNER JOIN groupmembers AS g ON n.groupid = g.groupid WHERE g.userid=${userid} AND n.title LIKE '%' || ${title} || '%'`;
    console.log("FETCHED NOTES:", notes);
    return notes;
  } catch (err) {
    console.log("*****************ERROR in fetching notes:", err);
  }
};
