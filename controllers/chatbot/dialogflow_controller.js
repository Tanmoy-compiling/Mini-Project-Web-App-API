const {sessionId, sessionClient, sessionPath} = require('../../config/dialogflow');


module.exports.processQuery = async function(req, res){
    try{
         // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.message,
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
            
            //method to download object from s3

            return res.json(201, {
            message: "Successful response",
            data: {
                query: queryText,
                //notes object
            },
            });
        } else {
            console.log("***************ERROR: Invalid Query");
            return res.json(422, {
                message: "Invalid Query"
            })
        }
    }
    catch(err){
        console.log("************************Error in processing query:", err);
        return res.json(500, {
            message: "Error in processing query"
        });
    }
}