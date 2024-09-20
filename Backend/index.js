const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose= require("mongoose");
const expenseRoute=require("./routes/expense")

dotenv.config()
const app=express();
app.use(cors());
app.use(express.json());
app.use("/expenses",expenseRoute)

mongoose.connect(process.env.DB).then(() =>{
    console.log("DB connection is successfull")
}).catch((e) =>{
    console.log(e)
})

const PORT=process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})