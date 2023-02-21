const app = require('./app')
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config({
    path:path.join(__dirname,`config/${(process.NODE_ENV) || 'development'}.env`)
});

connectDB()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listing to the port ${process.env.PORT} in ${process.env.NODE_ENV}`);  
})

process.on('unhandledRejection', (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled rejection error`);
    server.close(()=>{
        process.exit(1)
    })
})

process.on('uncaughtException', (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception error`);
    server.close(()=>{
        process.exit(1)
    })
})