const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    trim: true,
    validate: {
      validator: function(value) {
        const nameRegex = /^[A-Za-z]+$/;
        return nameRegex.test(value);
      },
      message: "First name must contain only alphabetic characters"
    }
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    trim: true,
    validate: {
      validator: function(value) {
        const nameRegex = /^[A-Za-z]+$/;
        return nameRegex.test(value);
      },
      message: "Last name must contain only alphabetic characters"
    }
  },
  email : {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: "Email must be a valid email address"
    }
  },
  age : {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Contact', contactSchema);

