var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

// User Schema
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    select: false
  }

});

userSchema.pre('save', function (next) {
  var user = this;
  // before saving a hashed version of the password is created and saved into the db
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      next();
    });
  });
});

// This utility function comes handy during authentication
userSchema.methods.comparePwd = function(password, done) {
  // Compare the password sent by the user with the one stored in the db
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

// Export the model
module.exports = mongoose.model('User', userSchema);
