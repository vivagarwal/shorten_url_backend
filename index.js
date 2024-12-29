const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {DBConnection} = require("./database/db.js");
const urlRoutes = require('./routes/url.js');

dotenv.config();

DBConnection(); //db connection

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors({
    origin:['http://localhost:5173'],//your frontend url
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/',urlRoutes);

//testing the route
app.get('/',(req,res) => {
    res.json({ message: "Welcome to the URL Shortner" });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
