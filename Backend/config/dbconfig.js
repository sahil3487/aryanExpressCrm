const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb+srv://baghelsahil3487:sWbYZEyw6CeBqom8@crm01.hazz4.mongodb.net/", {
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;



// mongodb+srv://baghelsahil3487:sWbYZEyw6CeBqom8@crm01.hazz4.mongodb.net/