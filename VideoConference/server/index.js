const { Server } = require("socket.io");
//socket io  is used to create a socket server and for signaling
const io = new Server(8000, {
   cors: true, //it is used to allow the cors origin
});

const emailToSocketIdMap = new Map();//it is used to map the email to socket id
const socketidToEmailMap = new Map();//this is a reverse mapping from where we can fetech the email id from socket id
//basically it is used to decide which email id is in which socket id

io.on("connection", (socket) => {
   console.log("connected", socket.id);

   socket.on("room:join", (data) => {//it is used to join the room or dependency required for socket io
      const { email, room } = data;
      emailToSocketIdMap.set(email, socket.id);
      socketidToEmailMap.set(socket.id, email);
      //user has requested to join the room in this function
      io.to(room).emit("user:joined", { email, id: socket.id });//but if there is any existing user then this event will be emitted to all the users in the room
      socket.join(room);//its a room join function
      io.to(socket.id).emit("room:join", data);//socket.id is the user so emit him to the roomjoin then it goes to the useEffect of the client side in the lobby.js
      //pushed the user to the room
   });


   //when you call someone what data will come
   socket.on("user:call", ({ to, offer }) => {
      //to is the user to whom you are calling and offer is the offer that you are sending in the Room.js
      io.to(to).emit("incomming:call", { from: socket.id, offer });
    });

    //when you accept the call what data will come
    socket.on("call:accepted", ({ to, ans }) => {
      io.to(to).emit("call:accepted", { from: socket.id, ans });
      
    });

    //offer the peer negotiation
    socket.on("peer:nego:needed", ({ to, offer }) => {
      console.log("peer:nego:needed", offer);
      io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });
  
    //reply to the peer negotiation
    socket.on("peer:nego:done", ({ to, ans }) => {
      console.log("peer:nego:done", ans);
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });
  

});

