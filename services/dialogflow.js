const dotenv = require("dotenv").config();

const dialogflow = require("dialogflow");

const uuid = require("uuid");

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const credentialsPath = process.env.DIALOGFLOW_CREDENTIALS_PATH;

process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

module.exports.processQuery = async function (req, res) {
  try {
    // A unique identifier for the given session
    const sessionId = uuid.v4();

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: req.body.Body,
          // The language used by the client (en-US)
          languageCode: "en-US",
        },
      },
    };
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult.fulfillmentText;
    return result;
  } catch (err) {
    console.log("******************ERROR in fetching response: ", err);
  }
};