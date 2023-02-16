const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
//   mongoose.connect(process.env.MONGO_URI,{
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//         }).then(()=>{
//       console.log('conencted successfuly');
//   }).catch((err)=>{
//       console.log("Error received= " + err)
//   })
};

module.exports = connectDB;
