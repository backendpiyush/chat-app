const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use("/", express.static(__dirname + "/public"))

io.on('connection', (socket) => {
    console.log('a user connected' + " " + socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected' + " " + socket.id);
    });

    socket.on("from_client", () => {
        console.log("received form client")
    })

    setInterval(() => {
        socket.emit("from_server");
    }, 3000)
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});

