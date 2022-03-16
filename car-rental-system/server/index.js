// TO RUN SERVER, TYPE IN THE TERMINAL, "npm run server"

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const { request } = require("express");

const db = mysql.createPool({
    host: "proj-mysql.uopnet.plymouth.ac.uk",
    user: "COMP3000_AJose",
    password: "nmDWHI9kZGC13Etd",
    database: "comp3000_ajose"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const { name, email, contact } = req.body;
    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = 
        "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});



app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, contact } = req.body;
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

// Insert into customer database

app.post("/api/postcustomer", (req, res) => {
    const { firstName, lastName, age, email, password } = req.body;
    const sqlInsertCustomer = "INSERT INTO customer (FirstName, LastName, Age, EmailAddress, Password) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsertCustomer, [firstName, lastName, age, email, password], (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

// Get Customer data for Admin

app.get("/api/getcustomer", (req, res) => {
    const sqlGetCustomer = "SELECT CustomerID, FirstName, LastName, EmailAddress FROM customer";
    db.query(sqlGetCustomer, (error, result) => {
        res.send(result);
    });  
});


app.get("/", (req, res) => {
//     const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('john doe', 'johndoe@gmail.com', 34534123124)";
//     db.query(sqlInsert, (error, result) => {
//         console.log("error", error);
//         console.log("result", result);
//         res.send("Hello Express");
//     });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})