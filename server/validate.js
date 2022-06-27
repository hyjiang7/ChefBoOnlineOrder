var express = require('express');
var router = express.Router();

var Isemail = require("isemail");
const authToken = "2a34c5071ec26f5f6d4332cd32ec99d0";
const accountSid = "AC88d2321c51846005b0ff2b9dd34fb055";
const client = require("twilio")(accountSid, authToken);

// app.use('/validate', router);

router.post("/validate/email", (req, res) => {
    console.log("validate email")
    try{
        Isemail.validate(req.body.email)
        res.send(true)
    }
    catch (error){
        res.send(error)
    }
    
});

router.post("/validate/phone", (req, res) => {
    console.log("validate phone")
    client.lookups.v1
        .phoneNumbers(req.body.phone)
        .fetch({ countryCode: "US" })
        .then((phone_number) => res.json(true))
        .catch((error) => {
            res.json(false);
        });
});

module.exports = router;