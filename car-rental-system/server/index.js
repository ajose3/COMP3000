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

// Register into customer database (Customer interface)

app.post("/api/postcustomer", (req, res) => {
    const { firstName, lastName, age, email, password } = req.body;
    const sqlInsertCustomer = "INSERT INTO customer (FirstName, LastName, Age, EmailAddress, Password) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsertCustomer, [firstName, lastName, age, email, password], (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

// Get Customer data for Admin (Admin interface)

app.get("/api/getcustomer", (req, res) => {
    const sqlGetCustomer = "SELECT CustomerID, FirstName, LastName, EmailAddress FROM customer";
    db.query(sqlGetCustomer, (error, result) => {
        res.send(result);
    });  
});

// Add customer by Admin (Admin interface) 

app.post("/api/adminaddcustomer", (req, res) => {
    const { FirstName, LastName, Age, DrivingLicenseNumber, Address, PhoneNumber, EmailAddress, Password } = req.body;
    const sqlAdminAddCustomer = "INSERT INTO customer (FirstName, LastName, Age, DrivingLicenseNumber, Address, PhoneNumber, EmailAddress, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlAdminAddCustomer, [FirstName, LastName, Age, DrivingLicenseNumber, Address, PhoneNumber, EmailAddress, Password], (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

// Delete customer by Admin (Admin interface)

app.delete("/api/admindeletecustomer/:CustomerID", (req, res) => {
    const { CustomerID } = req.params;
    const sqlAdminDeleteCustomer = "DELETE FROM customer WHERE CustomerID = ?";
    db.query(sqlAdminDeleteCustomer, CustomerID, (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

// View single customer by Admin (Admin interface)  **NEED TO FIX

app.get("/api/getcustomer/:CustomerID", (req, res) => {
    const { CustomerID } = req.params;
    const sqlAdminGetCustomer = "SELECT * FROM customer WHERE CustomerID = ?";
    db.query(sqlAdminGetCustomer, CustomerID, (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});


// View all cars for car
app.get("/api/getallcars", (req, res) => {
    const sqlGetAllCars = "SELECT * FROM cars";
    db.query(sqlGetAllCars, (error, result) => {
        res.send(result);
    });  
});


// View single car for customer
app.get("/api/getcar/:RegPlate", (req, res) => {
    const { RegPlate } = req.params;
    const sqlGetCar = "SELECT * FROM cars WHERE RegPlate = ?";
    db.query(sqlGetCar, RegPlate, (error, result) => {
        if(error) {
            console.log(error);
        }
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