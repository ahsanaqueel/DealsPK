const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const DB = process.env.DATABASE_URI_2;


const connectDB = async () => {
    try {
      const conn = await mongoose.connect(DB);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
module.exports = connectDB;
// const connectDB=()=>{
//     mongoose.connect('mongodb://localhost:27017/Testing', (err, connection)=>{

//     if(connection){
//         console.log("Database Connected");
//     }
//     else{
//         console.log(err);
//     }
//     })
// }

// // connectDB();

