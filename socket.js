import io from "socket.io-client";

const socket = io("http://192.168.1.45:3002", { transports: ["websocket"] });

export default socket;
