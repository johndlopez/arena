const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const db = require('../db/mongo');


// app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//Unsure about Native implementation
// app.use(express.static(path.join(__dirname, '../client/dist/')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const PORT = 7888;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const userConnected = (id, socket) => {
    console.log('This is the incoming data from userConnected: ',id, socket);
    //if there is no username, create a randome name
    //if there is no existing location match, make a new onex
    //find stored messages in the location and emit the list back to the user for rendering(another function)
  
  //send existing messages
}

io.on('connection', (socket) => {
  console.log('a user joined');
  //socket on join => submit username and locationId to join correct location
  socket.on('userConnected', (userId) => userConnected(userId, socket));
  //socket when message is received => send locationId, message, username, and time of message
  //socket when location is changed => join different matching id
});


//messageReceived
  //stow a new message to the corresponding locationId, with userName, date of message
  //emit message to connected clients

//locationChange
  //When location change happens, join a new room.
    //may be able to make event emitter for this case and reuse userJoined

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });

// app.post('/api/send/message', (req, res) => {
//   const message = req.body.message;
// });
