const dgram = require("dgram")
const server = dgram.createSocket("udp4")
const sockServer = require("socket.io")({
    path: "/sock"
})

sockServer.on("connection", socket => {
    console.log("New socket connection")
    console.log(socket)
})

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {

    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    sockServer.emit(msg)
});

server.on('listening', () => {
    var address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);