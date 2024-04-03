const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const dialogflow = require("./dialogflow");

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

//receive message from client in twilio
module.exports.recvMessage = async function (req, res) {
  try {
    const incomingMsg = req.body.Body;
    const from = req.body.From;
    const result = await dialogflow.processQuery(incomingMsg);
    const sendResult = await module.exports.sendSMS(result, from);
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
