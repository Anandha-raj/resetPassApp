const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/users", userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("the server is running.");
})
