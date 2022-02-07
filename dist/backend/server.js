import express from "express";
let app = express();
import fs from "fs";
import path from "path";
import http from "http";
let server = http.createServer(app);
import {
    Server
} from "socket.io";
let io = new Server(server);
let __dirname = path.dirname(process.argv[1]);
app.use(express.static(path.join(__dirname, "/../")));
app.get("/", (req, res) => {
    fs.readFile(__dirname + "/../frontend/html/index.html", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            res.end("");
        }
    });
});
io.on("connection", (socket) => {

    socket.on("connectedOne", (arg) => {
        console.log("One connection started: " + socket.id + " || " + arg.userName);
        socket.broadcast.emit("newConnection",socket.id,arg.userName)
    })

    socket.on("disconnect", () => {
        console.log("One connection finished : " + socket.id);
    });

    socket.on("getAllSockets", async (arg,method1) => {
        var allSocket = []
        await io.allSockets().then((result) => {
            result.forEach((socketOne) => {
                allSocket.push(socketOne)
            })
        })
        method1({
            text: allSocket
        })  
    })

    socket.onAny((eventName) => {
        console.log("'",eventName, "' was triggered...");
    })

});
server.listen(84, () => {
    console.log("listening on *:84");
});