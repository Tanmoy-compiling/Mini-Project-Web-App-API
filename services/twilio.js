const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const dialogflow = require("./dialogflow");
const notesController = require("../controllers/api/notes_controller");

module.exports.sendSMS = async function (text, to) {
  try {
    const message = await client.messages.create({
      body: text,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: to, //CLIENT'S PHONE NUMBER
    });
    console.log("SMS sent successfully: ", message.sid);
    return { success: true, message: "SMS sent successfully", data: message };
  } catch (err) {
    console.log("Error in sending SMS: ", err);
    throw new Error("Error in sending SMS"); // Throw the error to be caught by the caller
  }
};

module.exports.sendMedia = async function (url, to) {
  try {
    const message = await client.messages.create({
      mediaUrl: url,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: to, //CLIENT'S PHONE NUMBER
    });
    console.log("Media sent successfully: ", message.sid);
    return { success: true, message: "Media sent successfully", data: message };
  } catch (err) {
    console.log("Error in sending SMS: ", err);
    throw new Error("Error in sending SMS"); // Throw the error to be caught by the caller
  }
};

//receive message from client in twilio
module.exports.recvMessage = async function (req, res) {
  try {
    const incomingMsg = req.body.Body;
    const from = req.body.From;
    const result = await dialogflow.processQuery(incomingMsg);
    const number = from.slice(12, 12+10)
    var sendResult;
    const title = result.queryResult.fulfillmentText;
    if(result.queryResult.intent.displayName == "Default Fallback Intent" || result.queryResult.intent.displayName == "Default Welcome Intent"){
      sendResult = await module.exports.sendSMS(title, from);
    }
    else{
      //fetch link from database
      const notes = await notesController.fetchNotes(title, number);
      if(!notes || notes.length === 0){
        var err = "Looks like you dont have any notes with that title. Please try again. ;(";
        console.log("**********ERROR: ", err);
        sendResult = await module.exports.sendSMS(err, from);
      }
      else{
        for(let i=0; i<notes.length; i++){
          sendResult = await module.exports.sendMedia(notes[i].content, from);
        }
      }
    }
    if (sendResult.success) {
      res
        .status(200)
        .json({ message: "Message received and response sent successfully" });
    } else {
      res.status(500).json({ message: "Failed to send response SMS" });
    }
  } catch (err) {
    console.log("Error in receiving or responding to message: ", err);
    res
      .status(500)
      .json({ message: "Error in receiving or responding to message" });
  }
};