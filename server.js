// -------------------------------
// Import Node Modules
// -------------------------------
require("dotenv").config();
const cors = require("cors");
const Pusher = require("pusher");
const express = require("express");
const bodyParser = require("body-parser");

// ------------------------------
// Create express app
// ------------------------------
const app = express();
// ------------------------------
// Load the middlewares
// ------------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pusher = new Pusher({
    appId: `${process.env.PUSHER_APP_ID}`,
    key: `${process.env.PUSHER_API_KEY}`,
    secret: `${process.env.PUSHER_API_SECRET}`,
    cluster: `${process.env.PUSHER_APP_CLUSTER}`,
    encrypted: true
});

app.post("/pusher/auth", (req, res) => {
    console.log("Trying to auth");
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const authReponse = pusher.authorizeChannel(socketId, channel);
    res.send(authReponse);
});


const port = process.env.PORT || 3001;
app.listen(port);

console.log("App listening: " + port);