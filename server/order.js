
const TIMEZONE = "America/Los_Angeles";

const moment = require('moment')
const momentz = require('moment-timezone')
const express = require('express')
const router = express.Router()
var pool = require('./pool')
const util = (require('./utility'))
const dotenv = require('dotenv')
dotenv.config();

const RESTAURANT = "RESTAURANT";
const CUSTOMER = "CUSTOMER";
const RESTAURANTADDRESS = `<div style="padding:0; margin: 0;">
<p>Chef Bo</p>
<p>2310 Fair Oaks Blvd</p>
<p>Sacramento, CA 95825</p>
<p>(916) 568-6088</p>
</div>`;


const nodemailer = require("nodemailer");

const sendEmail = async (email, password, recipientEmail, subject, message) => {
    try {
        var transporter = nodemailer.createTransport({
            //   host: "smtp.mailtrap.io",
            //   port: 2525,
            //   auth: {
            //     user: "6f872850d92a76",
            //     pass: "d843659c71176e",
            //   },
            host: "smtp.gmail.com",
            auth: {
                user: email,
                pass: password,
            },
        });

        await transporter.sendMail({
            from: `"Chef Bo Online Order" <${email}>`,
            to: recipientEmail, //you can change this to any other e-mail address and it should work!
            subject: subject,
            html: message,
        });
        console.log("success!");
        return {
            status: 200,
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            error,
        };
    }
};

function generateItemsHTML(cart, type) {
    const { item, mods, quantity } = cart;
    var name;

    type == RESTAURANT ? (name = item.ChineseName) : (name = item.Name);
    var html = `<tr>

                <td >${quantity}x</td>
                <td >${name}</td>
                <td >${item.Price}</td>
                       
                </tr>`;

    mods.forEach((mod) => {
        const { ChineseName, Name, Price } = mod;
        var price = "";
        Price === 0 ? null : (price = Price);
        type == RESTAURANT ? (name = ChineseName) : (name = Name);

        html += `<tr>
            <td ></td>
            <td >${name}</td>
            <td >${price}</td>
        </tr>`;
    });

    return html;
}

router.post("/order/total", async (req, res) => {
    const costs = await util.calculateOrderAmount(req.body);

    if(!costs.error){
        costs.total = Math.round(costs.total * 100) / 100;
        if (costs.total < 0.5 || costs.subtotal != req.body.subtotal.toFixed(2)) {
            res.json({ error: "503: ERROR CALCULATING TOTAL...REDIRECTING..." });
        }
    }
    
    res.json(costs);
});

async function saveOrder(data, orderNum) {
    const clients = await pool.connect();

    const { Cart, customer } = data;
    const costs = await util.calculateOrderAmount(data);
    var itemBody = "";

    Cart.forEach((i) => {
        itemBody += generateItemsHTML(i, CUSTOMER);
    });

    var html = ` 
        ${itemBody}
        <tr style="font-weight: bold;">
            <td></td>
            <td style="text-align: right; ">Subtotal: </td>
            <td>${costs.subtotal}</td>
        </tr>
        <tr style="font-weight: bold;">
            <td></td>
            <td style="text-align: right; ">Tax: </td>
            <td>${costs.tax}</td>
        </tr>
        <tr style="font-weight: bold;">
            <td></td>
            <td style="text-align: right; ">Tips: </td>
            <td>${costs.tip}</td>
        </tr>
        <tr style="font-weight: bold;">
            <td></td>
            <td style="text-align: right; ">Total: </td>
            <td>${costs.total}</td>
        </tr>
        </table>
    </div>`;

    var query = `INSERT INTO public."Orders" ("ID", "CustomerName", "CustomerPhone", "Time","PickupDate",
    "Subtotal", "Tax", "Tip", "Total", "Items", "CustomerEmail")
    VALUES (
        '${orderNum}',
        '${customer.fname} ${customer.lname}',
        '${customer.phone}',
        '${customer.time}',
        '${customer.date}',
        '${costs.subtotal}',
        '${costs.tax}',
        '${costs.tip}',
        '${costs.total}',
        '${html}',
        '${customer.email}'
    )`;

    try {
        await clients.query(query);
    } catch (error) {
        console.log("save order error")
        return error;
    } finally {
        clients.release();
    }
}

async function getOrderNum() {
    const query = 'SELECT MAX("ID") FROM public."Orders";';
    const clients = await pool.connect();

    try {
        var { rows } = await clients.query(query);
        return rows[0].max + 1;
    } catch (error) {
        return getRandomInt(23445,3457481357);
    } finally {
        clients.release();
    }
}

const validPickupTime = (time, date) =>{

   
    console.log(time, date)
    var today = moment(moment()).tz(TIMEZONE);

  
    var pickupFullTime = moment.tz(
        `${date} ${time}`,
        FULL12FORMAT,
        TIMEZONE
    );

    console.log(today, pickupFullTime)
    const validPickupTime = pickupFullTime.isBefore(today)

    console.log(validPickupTime)

    return validPickupTime;

}
router.post("/order/submit", async (req, res) => {

    //check if pickup time has passed current time 

    const { customer } = req.body;

    if(!validPickupTime(customer.time, customer.date)){
        res.json({error: 'Invalid Pickup Time selected'})

    }


  


    const orderID = await getOrderNum();

    const save = await saveOrder(req.body, orderID);

   
    const messageRest = generateEmailMessage( req.body, null,  null, null, null, null, orderID, RESTAURANT);
    // const messageCustomer = generateEmailMessage(req.body, orderNum, CUSTOMER);

    sendEmail(
        process.env.REST_EMAIL,
        process.env.REST_EMAIL_PW,
        process.env.REST_EMAIL,
        "Confirm New Online Order",
        messageRest
    );

    res.json("Please wait for confirmation email from restaurant");
});

function generateEmailMessage(orderInfo, customerName, customerPhone, time, pickupDate, items, orderNum, type) {

    var confirmation = confirmationLink= restaurantHeader = itemBody = costsHTML = "";
    
    itemBody = items;
    restaurantHeader = `
        ${RESTAURANTADDRESS}
        <div style="width: 100%; border-bottom: 2px solid black"></div>
        `;
    if (type == RESTAURANT) {
        confirmationLink= `${process.env.SERVER_DOMAIN}/order/confirm/${orderNum}`
        confirmation = `<div style="text-align: center;">
        <a href=${confirmationLink} style="text-decoration: none; border: 2px solid green; border-radius: 1em; background: green; color: white; padding: 10px 15px;">
        Confirm Order</a>
        </div>`;
        const { Cart, customer, subtotal, tips } = orderInfo;
        customerName = `${customer.fname} ${customer.lname}`
        customerEmail = customer.email
        customerPhone = customer.phone
        time = customer.time
        pickupDate = customer.date
        
        itemBody = "";
        Cart.forEach((i) => {
            itemBody += generateItemsHTML(i, type);
        });
        const costs = util.calculateTotal(subtotal, tips);
        costsHTML = `<tr style="font-weight: bold;">
            <td></td>
            <td style="text-align: right; ">Subtotal: </td>
            <td>${costs.subtotal}</td>
        </tr>
        <tr style="font-weight: bold;">
            <td></td>
            <td style="text-align: right; ">Tax: </td>
            <td>${costs.tax}</td>
        </tr>
        <tr style="font-weight: bold;">
            <td></td>
            <td style="text-align: right; ">Tips: </td>
            <td>${costs.tip}</td>
        </tr>
        <tr style="font-weight: bold;">
            <td></td>
            <td style="text-align: right; ">Total: </td>
            <td>${costs.total}</td>
        </tr>`

    }

    const messageTemplate = `
    <!DOCTYPE html>
    <html>
    
    <head>
        <meta charset='utf-8'>
        <title>Chef Bo Online Order</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
    </head>
    
    <header>
        <h2 style="text-align: center;" > Pickup Order #${orderNum}</h2>
    </header>

    <body style="max-width: 800px; margin-left: auto; margin-right: auto;">

        <div style="padding-left: 15px">
            <div>${restaurantHeader}</div>

            <p style="color: red">Time: ${pickupDate} ${time}</p>
            <p>Customer: ${customerName}</p>
            <p>Phone: ${customerPhone}</p>
            <p>Payment: PAID</p>
        </div>
        ${confirmation}
        <div style="margin-bottom: 20px;"></div>
    
        <div style="width: 90%; margin-left: auto; margin-right: auto;">
        <table style="width:100%; text-align: left; padding: 10px;">
            <tr>
                <th>Qx</th>
                <th>Item</th>
                <th>Price</th>
            </tr>
            ${itemBody}
            ${costsHTML}
            </table>
        </div>
    
    </body>
    </html>
  
  `;

    return messageTemplate;
}

router.get("/order/confirm/:order", async (req, res) => {
    const orderID = req.params.order;

    var query = `SELECT * FROM public."Orders" WHERE "ID" = ${orderID}`;
    var clients = await pool.connect();

    try {
        var { rows } = await clients.query(query);
    } catch (error) {
        console.log("error", error);
    } finally {
        clients.release();
    }
    
    var { Items, CustomerName, CustomerEmail, CustomerPhone, Time, PickupDate, Confirmed } =
        rows[0];


    if (Confirmed) {
        message = `Order #${orderID} already confirmed for pick up on ${PickupDate} at ${Time}`;
    } else {
        message = `Order #${orderID} confirmed for pick up on ${PickupDate} at ${Time}`;
       const htmlMessage =  generateEmailMessage(null, CustomerName, CustomerPhone, Time, PickupDate, Items, orderID, null)

        await sendEmail(
            process.env.REST_EMAIL,
            process.env.REST_EMAIL_PW,
            CustomerEmail,
            "Chef Bo Pickup Order Confirmed",
            htmlMessage
        );
        query = `UPDATE public."Orders"
        SET "CustomerEmail"='',"CustomerPhone"='', "Confirmed"='true'
        WHERE "ID" = ${orderID}`
        try {
            clients = await pool.connect();
            var { rows } = await clients.query(query);
        } catch (error) {
            console.log(error);
        }
        finally{
            clients.release()
        }
        //if success, delete email, and phone number on database
    }

    res.json(message);
});



module.exports = router
