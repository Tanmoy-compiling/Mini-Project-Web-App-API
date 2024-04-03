const dotenv = require("dotenv").config();

const dialogflow = require("dialogflow");

const uuid = require("uuid");

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const credentialsPath = process.env.DIALOGFLOW_CREDENTIALS_PATH;

process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

// Updated to accept a text parameter for processing
module.exports.processQuery = async function (text) {
  try {
    // A unique identifier for the given session
    const sessionId = uuid.v4();

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request with the passed text parameter
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text, // Use the passed text parameter
          languageCode: "en-US",
        },
      },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult.fulfillmentText;
    return result;
  } catch (err) {
    console.log("Error in fetching response: ", err);
    throw err; // Throw the error so the caller can handle it
  }
};
