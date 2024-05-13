// express application setup
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyparser.json());



// postgres setup
const {Client} = require("pg");
const pgClient = new Client({
    user: 'admin',
    host: 'postgres',
    database: 'dbName',
    password: '1234',
    port: 5432,
});





// express route definitions
app.get("/api", async(req, res) => {
    res.send("hi");
    
});


 // pgClient connection to postgresql
setTimeout(function () {
    pgClient.connect()
    .then(() => {
        console.log('Connected to PostgreSQL')
    })
    .catch(err => console.error('Connection error', err.stack));
    }, 10000);

// post values to database

app.post("/api/form", async(req, res) => {
    // decompose object 
    const { firstName, lastName } = req.body.values;
    // check for nullability
    if(!firstName || !lastName){
        return res.send({ working: false, message: 'First name and last name are required.' });
    }

    try {
        // before posting data check for if the person exists
        const result = await pgClient.query("SELECT * FROM users WHERE firstname = $1 AND lastname = $2", [firstName, lastName]);
        // post person
        if (result.rows.length === 0) {
            await pgClient.query("INSERT INTO users (firstname, lastname) VALUES ($1, $2)", [firstName, lastName]);
            return res.send({ working: true, message: "Person with firstname and lastname added" });
        } else {
            return res.send({ working: false, message: 'User already exists.' });
        }
    } catch (error) {
        console.error('Error executing query:', error);
        return res.send({ working: false});
    }

});
// get all values from database
app.delete("/api/form/values", async(req, res) => {
    
    try{
        const result = await pgClient.query("SELECT * FROM users");
        return res.send(result.rows);
    }
    catch(error){
        console.error('Error executing query:', error);
        return res.send({ working: false});

    }
});

app.post("/api/form/delete", async(req,res) => {
    const user_id = req.body.values;

    if(!user_id){
        return res.send({ working: false, message: 'User id cannot be null' });
    }
    try{
        const result = await pgClient.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        if (result.rows.length === 0) {
            return res.send({ working: false, message: "Person with user id" + user_id + "does not exist"});
        } else {
            await pgClient.query("DELETE FROM users WHERE user_id = $1", [user_id]);
            return res.send({ working: true, message: "Person with user id" + user_id + "deleted" });
        }
    }
    catch (error) {
        console.error('Error executing query:', error);
        return res.send({ working: false});
    }

});

// delete users using user_id from database

app.post("/api/form/delete", async(req,res) => {
    const {user_id} = req.body.values;
    if(!user_id){
        return res.send({ working: false, message: 'User id cannot be null' });
    }
    try{
        const result = await pgClient.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        if (result.rows.length === 0) {
            return res.send({ working: false, message: "Person with user id" + user_id + "does not exist"});
        } else {
            await pgClient.query("DELETE FROM users WHERE user_id = $1", [user_id]);
            return res.send({ working: true, message: "Person with user id" + user_id + "deleted" });
        }
    }
    catch (error) {
        console.error('Error executing query:', error);
        return res.send({ working: false});
    }

});



app.listen(5001, err => {
    console.log("listening");
});


