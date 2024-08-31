const app = require('./app')
const connectDatabase = require("./config/dbconfig")
const cors = require('cors');
PORT = 3001


//? cors implememtation 

app.use(cors());
 
 
//? connecting database 

connectDatabase()


//? Creating server 

const server = app.listen(PORT, () => {
    console.log(`aryaanexpresscrm is running on ${PORT} `)
})
