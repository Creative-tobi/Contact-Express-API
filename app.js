const express = require("express");
const dotenv = require("dotenv");
const connectedDB = require("./config/database");
const contactRoute = require('./routes/contact.routes');
dotenv.config();
connectedDB();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', contactRoute);

app.listen(PORT, () =>{
    console.log(`Server running at ${PORT}`);
    
})