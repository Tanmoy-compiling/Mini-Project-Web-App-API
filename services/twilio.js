const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports.sendSMS = async function(req, res) {
    try{
        const message = await client.messages.create({
        body: req.body.message,
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        to: `whatsapp:${req.body.to}` //CLIENT'S PHONE NUMBER
        });
        console.log("SMS sent successfully: ", message);
        return res.json(201, {
        message: "SMS sent successfully",
        data: {
            message: message
        }
        });
    }
    catch(err){
        console.log("******************ERROR in sending SMS: ", err);
        return res.json(500, {
        message: "Error in sending SMS"
        })
    }
    }


