const mongoose = require("mongoose");

const connect = async () =>{
    mongoose.connect(process.env.DB_CONNECT) ? console.log("db connected ...") : console.log("db error ...")
}
connect()