const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

// Vehicle Router
const vehicleRouter = require('./routes/Vehicles');
app.use("/vehicles", vehicleRouter);

// Reviews Router
const reviewsRouter = require('./routes/Reviews');
app.use("/reviews", reviewsRouter);

// Customers Router
const customersRouter = require('./routes/Customers');
app.use("/auth", customersRouter);

// Admins Router
const adminsRouter = require('./routes/Admins');
app.use("/admins", adminsRouter);

// Rentals Router
const rentalsRouter = require('./routes/Rentals');
app.use("/rentals", rentalsRouter);

// Feedback Router
const feedbackRouter = require('./routes/Feedback');
app.use("/feedback", feedbackRouter);

// Agents Router
const agentsRouter = require('./routes/Agents');
app.use("/agents", agentsRouter);

// Agents Router
const billingRouter = require('./routes/billing');
app.use("/billing", billingRouter);



// Running on port 3001   *TO RUN SERVER, TYPE "cd server" in terminal, then "npm start"*
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});