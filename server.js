const express = require("express")
const app = express();
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
const path = require("path")

// app.use(express.json());
app.use(express.static("build"));
app.use(cors())
const server = http.createServer(app)

const io = new Server(server , {
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
})

// app.get(`/:room`, (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// })
app.get(`/room/:route`, (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
})


let rooms={}

io.on("connection",(socket)=>{

    socket.on("join",(data)=>{
        const room = data.room
        if(!rooms[room]){
            rooms[room]=[]
            rooms[room].push({...data,id:socket.id})
        }else{
            rooms[room].push({...data,id:socket.id})
        }
        socket.join(data.room)
        io.to(data.room).emit("userJoined",rooms[room])
    })
    
    socket.on("canvasImage",(data)=>{
        console.log(data.room)
        socket.to(data.room).emit("newCanvas",data)
    })
    socket.on("eraseImage",(data)=>{
        console.log("erase",data)
        socket.to(data.room).emit("erase",data)
    })
    socket.on("sendMessage",(data)=>{
        console.log(data)
        socket.to(data.room).emit("receiveMessage",data)
    })
})

server.listen(3001,()=>{
    console.log("server is running")
})