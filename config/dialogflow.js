const dotenv = require("dotenv").config();

const dialogflow = require("dialogflow");

const uuid = require("uuid");

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const credentialsPath = process.env.DIALOGFLOW_CREDENTIALS_PATH;

process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

var sessionId, sessionClient, sessionPath;

var createDialogflowSession = async function (req, res) {
  try {
    // A unique identifier for the given session
    sessionId = uuid.v4();
    // Create a new session
    sessionClient = new dialogflow.SessionsClient();
    sessionPath = sessionClient.sessionPath(projectId, sessionId);

    if (sessionId && sessionClient && sessionPath) {
      console.log("Successfully connected to Dialogflow");
    } else throw new Error("failed to connect to dialogflow");
  } 
  catch (err) {
    console.log("***********ERROR ", err);
  }
};

createDialogflowSession();

module.exports = {sessionId, sessionClient, sessionPath};

module.exports.runsample = async function (req, res) {
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
          text: "hello",
          // The language used by the client (en-US)
          languageCode: "en-US",
        },
      },
    };
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult.fulfillmentText;
    const queryText = responses[0].queryResult.queryText;

    if (result) {
      return res.json(201, {
        message: "Successful response",
        data: {
          query: queryText,
          response: result,
        },
      });
    } else {
      console.log("***************ERROR: Invalid Query");
      return res.json(422, {
        message: "Invalid Query"
      })
    }
  } catch (err) {
    console.log("******************ERROR in fetching response: ", err);
    return res.json(500, {
      message: "Error in fetching response",
    });
  }
};