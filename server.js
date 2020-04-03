const { PeerServer } = require("peer");

var port = process.env.PORT || "9000";

const peerServer = PeerServer({
  path: "/p2p",
  port: port
});

peerServer.on("connection", client => {
  console.log("connection:", client.id);
});
peerServer.on("disconnect", client => {
  console.log("disconnect:", client.id);
});
