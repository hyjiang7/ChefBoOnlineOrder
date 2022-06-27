const express = require('express')
const router = express.Router()
var pool = require('./pool')


router.get("/categories", async (req, res) => {
    req.statusCode = 200;

    const query = 'SELECT "ID", "Name" FROM public."Category"';
    var context = {};
    const clients = await pool.connect();

    try {
        var { rows } = await clients.query(query);
        context.results = rows;
    } catch {
        (err) => {
            context.error = 500;

            next(err);
        };

        context.error = 500;
    } finally {
        clients.release();
    }

    res.json(context);
});

router.get("/popular", async (req, res) => {
    const query = `SELECT i."ID", i."Name", i."Spicy", i."Popular" FROM public."MenuItems" AS i
                 WHERE i."Popular" IS NOT NULL`;
    const clients = await pool.connect();
    var context ={};

    try{
        var {rows} = await clients.query(query)
        context.results = rows
    }
    catch{ 
        (err) =>{
            context.error = 5003432;
            next(err)
        }
    }
    finally{
        clients.release();
    }

    res.json(context);
});

router.get("/:categoryID", async (req, res) => {
    const categoryID = req.params.categoryID;
    const query = `SELECT M."ID", M."Name", M."Price", M."Spicy", M."Description", M."ChineseName", C."Name" As "Category"
	FROM public."Category" AS C
	LEFT JOIN public."MenuItems" AS M
	ON C."ID" = M."CategoryID"
	WHERE C."ID" = ${categoryID} AND M."IsActive" = 'True'
	ORDER BY M."ID"`;
    var context = {};
    const clients = await pool.connect();

    try {
        var { rows } = await clients.query(query);
        context.results = rows;
    } catch {
        (err) => {
            context.error = 500;
            next(err);
        };
        context.error = 500;
    } finally {
        clients.release();
    }

    res.json(context);
});

router.get("/details/:id", async (req, res, next) => {
    console.log("item details")
    const id = req.params.id;
    const context = {};
    const reqQuery = `SELECT public."Modifiers"."ID", public."Modifiers"."Name", public."Modifiers"."Price", public."Modifiers"."ChineseName" 
    FROM public."RequiredMods"  
    LEFT JOIN public."Modifiers" 
    ON public."RequiredMods"."ModifierID" = public."Modifiers"."ID" 
    WHERE public."RequiredMods"."MenuItemID" ='${id}'`;

    const optQuery = `SELECT public."Modifiers"."ID", public."Modifiers"."Name", public."Modifiers"."Price", public."Modifiers"."ChineseName" 
    FROM public."OptionalMods"  
    LEFT JOIN public."Modifiers" 
    ON public."OptionalMods"."ModifierID" = public."Modifiers"."ID" 
    WHERE public."OptionalMods"."MenuItemID" ='${id}'`;

    const sideQuery = `SELECT public."Modifiers"."ID", public."Modifiers"."Name", public."Modifiers"."Price", public."Modifiers"."ChineseName" 
    FROM public."RequiredSides"  
    LEFT JOIN public."Modifiers" 
    ON public."RequiredSides"."ModifierID" = public."Modifiers"."ID" 
    WHERE public."RequiredSides"."MenuItemID" ='${id}'`;

    const query = `SELECT i."ID", i."Name", i."Description", i."Price", i."Spicy", i."ChineseName" FROM public."MenuItems" AS i
                 WHERE i."ID" ='${id}'`;

    const clients = await pool.connect();

    try {
        var { rows } = await clients.query(reqQuery);
        context.RequiredMods = rows;
        var { rows } = await clients.query(optQuery);
        context.OptionalMods = rows;
        var { rows } = await clients.query(sideQuery);
        context.RequiredSides = rows;
        var { rows } = await clients.query(query);
        context.detail = rows[0];
        
    } catch {
        (err) => {
            context.error = 500;

            next(err);
        };

        context.error = 500;
    } finally {
        clients.release();
    }

    res.json(context);
});


module.exports = router