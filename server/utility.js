var pool = require('./pool')
const TAXRATE = 0.0775;


async function calculateOrderAmount(body) {
    const cart = body.Cart;
    var tips = body.tips;
    var serverSubtotal = 0;

    var context = {};
    const clients = await pool.connect();

    try {
        for (let i = 0; i < cart.length; i++) {
            const query = getQuery(cart[i]);
            var { rows } = await clients.query(query);

            rows.forEach((i) => {
                serverSubtotal += i.Price;
            });
        }
        context = calculateTotal(serverSubtotal, tips);
    } catch {
        (err) => {
            context.error = 500;
            next(err);
        };

        context.error = 500;
    } finally {
        clients.release();
    }

    return context;
}

function getQuery(cartItem) {
    const { item, mods } = cartItem;
    var query = "";
    for (let i = 0; i < mods.length; i++) {
        query += `SELECT m."ID", m."Price" FROM public."Modifiers" AS M WHERE M."ID" = ${mods[i].ID} UNION `;
    }

    query += `SELECT i."ID", i."Price" FROM public."MenuItems" AS I WHERE i."ID" = ${item.ID}`;

    return query;
}


function calculateTotal(subtotal = 0, tips = 0) {
    tips ? null : (tips = 0);

    const tax = TAXRATE * subtotal;
    const total = subtotal + tax + tips;

    return {
        subtotal: subtotal.toFixed(2),
        tip: tips.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
    };
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
module.exports = {calculateOrderAmount, calculateTotal, getRandomInt};