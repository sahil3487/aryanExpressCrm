const express = require('express')
const app = express()
const mongoose = require('mongoose')
const employee = require('./controller/employeeController')
const cors = require('cors');
const bodyParser = require("body-parser")



app.use(cors());
app.use(express.json());
// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());



//? Imports routes 

const Employee = require("./routes/employee_routes");
const admin  =  require('./routes/admin_routes')
const freelancer = require('./controller/freeLancerComponents')




app.use("/api/v1", Employee);
app.use("/api/v1", admin);
// app.use("/api/v1", freelancer);





module.exports = app