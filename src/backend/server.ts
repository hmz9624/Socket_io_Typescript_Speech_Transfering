import express from "express";
let app = express();
import fs from "fs";
import path from "path";
import http from "http";
let server = http.createServer(app);
import { Server } from "socket.io";
let io = new Server(server);

let __dirname = path.dirname(process.argv[1]);
app.use(express.static(path.join(__dirname, "/../")));

app.get("/", (req, res) => {
  fs.readFile(
    __dirname + "/../frontend/html/index.html",
    "utf8",
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        res.end("");
      }
    }
  );
});

io.on("connection", (socket) => {
  console.log("One connection started : " + socket.id);
  socket.on("disconnect", () => {
    console.log("One connection finished : " + socket.id);
  });
});

server.listen(80, () => {
  console.log("listening on *:3000");
});
