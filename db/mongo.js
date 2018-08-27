var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.connect('http://localhost:2233/arena');

const db = mongoose.connection;
db.on('error', () => console.log('Error connecting to mongo'));
db.once('open', () => console.log('Connected to mongo'));

const messageSchema = mongoose.Schema({
  messageId: ObjectId,
  userName: { type: String, unique: True },
  message: String,
  time: Date,
  address: String,
  xCoord: Number,
  yCoord: Number
  //maybe store users nearby that can receive message
});

const Message = mongoose.model('Message', messageSchema);

//Write out the message methods.
const saveMessage;
const getMessage;

module.exports = {
  saveMessage,
  getMessage
};