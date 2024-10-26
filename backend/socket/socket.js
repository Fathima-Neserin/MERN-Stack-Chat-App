const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = new express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:process.env.FRONTEND_URL,
        methods: ["GET", "POST"]
    }
});

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
} 

const userSocketMap = {};

io.on('connection', (socket) =>{
    console.log('A user connected', socket.id);

    const userId = socket.handshake.query.userId;
    if(userId != 'undefined') userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        delete userSocketMap[userId];  
    
        //to sent the socket io events emit function is used
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    })
    
})

module.exports = { 
    app,
    io,
    server,
    getReceiverSocketId
};


