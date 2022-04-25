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

// Running on port 3001   *TO RUN SERVER, TYPE "cd server" in terminal, then "npm start"*
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});