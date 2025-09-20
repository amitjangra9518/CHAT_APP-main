const express=require("express")
const app=express();
const cors=require('cors');
const http=require("http");
// This creates an HTTP server that delegates all incoming requests to the app (Express) to handle.
const {Server}=require("socket.io");
app.use(cors());
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:' http://localhost:5173',
        methods:['GET','POST']
    }
})
//making a connection on client
io.on("connection",(socket)=>{
    console.log(`user connected:${socket.id}`);
    socket.on("send-message",(message)=>{
    io.emit("received-message",message);
})
socket.on("disconnect",()=>{
    console.log("user Disconnected");
})
})


server.listen(3000,()=>{
    console.log("server is running on port 3000")
})
