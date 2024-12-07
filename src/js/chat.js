"use strict"
const socketIO = io();

socketIO.emit("chatting test","프론트에서 소켓통신 요청 보내봅니다.");
socketIO.on("chatting test", (data)=>{
  console.log("서버측 소켓통신 응답 확인");
  console.log(data);
});