// Node server which will handel socket.io connection
const io= require('socket.io')(8000)
const users ={};
 io.on('connection',socket => {
     //If new user joins ,let other user connected to server know!
    socket.on('new-user-joined',name =>{
        //console.log("New user",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });
    //if someone send a message broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message:message, name:users [socket.id]})
    });
    //if someone leaves the chat other known!

    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];    
 
    });
})

