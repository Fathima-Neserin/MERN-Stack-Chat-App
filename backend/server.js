const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require('cors');
require("dotenv").config();
const connectDB = require("./config/db.config");

const  {app, server} = require("./socket/socket");
const authRoutes = require("./routes/auth.routes");
const messageRoutes = require("./routes/message.routes");
const userRoutes = require("./routes/user.routes");

const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan("dev"));
  }
  
app.use(cors({
    origin: process.env.FRONTEND_URL
}));


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes)

server.listen(PORT,() => {
 console.log('Server is listening on 5000');
 connectDB()
})
