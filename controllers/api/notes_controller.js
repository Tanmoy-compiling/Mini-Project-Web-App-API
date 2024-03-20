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

// module.exports.insertNote = async function (req, res) {
//   try {
//     //find groupid from group table if not valid return error
//     var group =
//       await db`SELECT * FROM groups WHERE groupid=${req.query.groupid}`;
//     if (group.length === 0) {
//       return res.json(404, {
//         message: "Group not found",
//       });
//     }
//     var note =
//       await db`INSERT INTO notes(title, content, groupid) VALUES(${req.body.title}, ${req.body.content}, ${req.query.groupid}) RETURNING *`;
//     console.log("NEW NOTE CREATED:", note);
//     return res.json(201, {
//       message: "Successfully created new note",
//       data: {
//         note: note[0],
//       },
//     });
//   } catch (err) {
//     console.log("*****************ERROR in creating new note:", err);
//     return res.json(500, {
//       message: "Error in creating new note",
//     });
//   }
// };

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
    console.log("NEW NOTE CREATED:", note);
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
module.exports.fetchNotes = async function (req, res) {
  try {
    var notes =
      await db`SELECT * FROM notes WHERE groupid=${req.body.groupid} AND title LIKE ${req.body.title}`;
    console.log("FETCHED NOTES:", notes);
    return res.json(200, {
      message: "Successfully fetched notes",
      data: {
        notes: notes,
      },
    });
  } catch (err) {
    console.log("*****************ERROR in fetching notes:", err);
    return res.json(500, {
      message: "Error in fetching notes",
    });
  }
};
