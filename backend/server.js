const app = require('./app')
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config({
    path:path.join(__dirname,`config/${process.env.NODE_ENV || 'config'}.env`)
});

connectDB()

app.listen(process.env.PORT, () => {
    console.log(`Server listing to the port ${process.env.PORT} in ${process.env.NODE_ENV}`);  
})
  