const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "http://localhost:5173"
    }
});

let onlineUsers = []

io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    socket.on("addNewUser", (UserId)=>{
        !onlineUsers.some((user) => user.UserId === UserId) &&
            onlineUsers.push({
                UserId,
                socketId:socket.id,
            });
        console.log("onlineUsers", onlineUsers);

        io.emit("getOnlineUsers", onlineUsers);
    });

    socket.on("sendMessage",(message)=>{

        const user = onlineUsers.find(user => user.UserId === message.recipientId);

        if(user){
            io.to(user.socketId).emit("getMessage", message);
            io.to(user.socketId).emit("getNotification", {
                senderId: message.senderId,
                isRead: false,
                date: new Date(),
            });
        }
    });

    socket.on("disconnect", ()=>{
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);

        io.emit("getOnlineUsers", onlineUsers);
    });
});

io.listen(3000);
