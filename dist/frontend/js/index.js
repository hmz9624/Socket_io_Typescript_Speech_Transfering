jQuery(function () {
    let socket = io();
    socket.disconnect();

    $("#deneme1").on("click", async function (e) {
        await socket.connect()
        socket.emit("connectedOne", {
            userName: "Hamza aygün"
        })
    })

    socket.on("connect", function (e) {
        console.log("My Socket Id:", socket.id);
    })

    $("#deneme2").on("click", function (e) {
        socket.disconnect();
    })

    $("#deneme3").on("click", function (e) {
        socket.volatile.emit("getAllSockets", {
            socketId: socket.id,
            socketDeneme: "hamza",
        }, (response) => {
            console.log("All active sockets: ",response.text)
        })
    })

    socket.on("newConnection", (...arg) => {
        console.log("One connection started: " + arg[0] + " || " + arg[1]);
    })


});