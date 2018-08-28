var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.connect('mongodb://mae:materia7@ds029017.mLab.com:29017/heroku_123456');

const db = mongoose.connection;
db.on('error', () => console.log('Error connecting to mongo'));
db.once('open', () => console.log('Connected to mongo'));


const messageSchema = mongoose.Schema({
  messageId: ObjectId,
  userName: String,
  message: String,
  time: Date,
  address: String,
  // xCoord: Number,
  // yCoord: Number
  //maybe store users nearby that can receive message
});

const roomSchema = mongoose.Schema({
  _id: Number,
  messages: [messageSchema],
});

const Room = mongoose.model('Room', roomSchema);

//Write out the message methods.
const saveMessage = (message, arenaId, callback) => {
  Room.updateOne(
    { _id: arenaId },
    { $push: { messages : message } },
    callback
  );
};

const getExistingMessages = (arenaId, callback) => {
  Room.findOne({ _id: arenaId }, (error, room) => {
    if (error) {
      console.log(error);
    } 
    else {
      let messages = room.messages;
      let sorted = messages.sort({time: 1}).reverse();
      callback(null, JSON.stringify(sorted, null, 2));
    }
  })
};

let testMessages = [{
  messageId: mongoose.Types.ObjectId(),
  userName: 'Res',
  message: 'Oh hi again',
  time: new Date(),
  address: '222 Market St.',
}]

let testRoom = {
  _id: 3,
  messages: testMessages
}

//getExistingMessages test
// getExistingMessages(3, (err, messages) => {
//   if (err) {
//     console.log('E',err)
//   } else {
//     console.log('CB S', messages);
//   }
// })

// Save message in server
// saveMessage(testMessages, 3, (error, message) => {
//   if (error) return error;
//   console.log(message);
// })

// getExistingMessages(3, null)
// console.log(db.collection('rooms'))

module.exports = {
  saveMessage,
  getExistingMessages
};