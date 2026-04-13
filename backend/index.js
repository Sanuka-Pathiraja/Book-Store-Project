const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT, mongoDBURL } = require("./config.js");
const booksRoutes = require("./Routes/booksRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Book Store API is running");
});

app.use("/books", booksRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
    })
    .catch((error) => {
        console.error("Database connection failed:", error.message);
    });

app.listen(PORT, () => {
    console.log(`app is listening to port: ${PORT}`);
});

