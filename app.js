const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const path = require("path");

// 정적 경로 제공해야 html에 script src 경로가 인식 됨
app.use(express.static(path.join(__dirname, "src/public")));
app.use("/js", express.static(path.join(__dirname, "src/js")));

server.listen(PORT, ()=>{
  console.log(`Server start : http://localhost:${PORT}`);
});

const io = require("socket.io")(server);



io.on("connect", (socket)=>{
  console.log(`서버측 소켓 생성확인: ${socket}`);
  socket.on("chatting test", (data)=>{
    console.log(data);
    //io.emit("chatting test", "요청 잘 받았구요 서버에서 응답드립니다.(전챗)");
    //socket.broadcast.emit("chatting test", "나제외하고 모두에게 보내기(전챗)");
    //socket.emit("chatting test", "특정소켓에만 보내기(갠쳇)");
    console.log(socket.id);
    socket.join("room1");
    socket.leave("room1");
    io.to(socket.id).emit("chatting test", Array.from(socket.rooms));
    
    //io.emit("chatting test", data);
  });
});

