const express = require("express");
const app = express();
require("dotenv").config();
require('./Models/database');
const cors = require("cors");
const bodyParser = require("body-parser");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const ensureAuthenticated = require("./Middlewares/Auth");
const ExpenseRouter = require('./Routes/ExpenseRouter');

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);
app.use('/expenses',ensureAuthenticated,ExpenseRouter);


app.get("/ping",(req,res)=>{
      res.send("I am in ping"); 
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})