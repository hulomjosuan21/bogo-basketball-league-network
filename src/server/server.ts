import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const PORT = 2104;

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("message", (data: string) => {
        console.log(`Message received: ${data}`);
        socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

server.listen(PORT, () => {
    console.log(`Socket.IO server running at http://localhost:${PORT}`);
});
