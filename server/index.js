const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const db = require('../db/mongo');

app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//Unsure about Native implementation
app.use(express.static(path.join(__dirname, '../client/dist/')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.post('/api/send/message', (req, res) => {
  const message = req.body.message;
});

const PORT = 7888;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));