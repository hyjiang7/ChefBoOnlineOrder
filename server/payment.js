var express = require('express');
var router = express.Router();
const dotenv = require('dotenv')
dotenv.config();

const util = (require('./utility'))
const stripe = require("stripe")(
    process.env.STRIPE
);

router.post("/create-payment-intent", async (req, res) => {
    console.log("payment-intent");

    const num = await util.calculateOrderAmount(req.body);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(num.total * 100),
            currency: "usd",
        });
        res.send({
            costs: num,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
