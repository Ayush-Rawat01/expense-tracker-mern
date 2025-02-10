const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_CONN;

mongoose.connect(mongoUrl)
     .then(()=>{
          console.log("database connected successfully...");
     })
     .catch(
        (err)=>{
            console.log("database connection failed... : ",err);
        }
     )


