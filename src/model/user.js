const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  userName: {
    type: String,
    trim: true,
    lowercase: true,
    default: null
  },
  emailId: {
      type : String,
      default : null
  },
  role : {
    type : Number,
    default : 0
  },
  status: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('users', userSchema);
