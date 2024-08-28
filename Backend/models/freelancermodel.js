const mongoose = require('mongoose');
const { Schema } = mongoose;

const freelancerSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be at least 8 characters"],
    select: false,
  },
  
  mobile: {
    type: String,
    required: [true, "Please Enter Your Mobile"],
    unique: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: "Please Enter a valid Mobile Number",
    },
  },

  role: {
    type: String,
    enum: ['freelancer', 'client', 'admin'],
    required: true,
  },

  skills: {
    type: [String], // Array of skills for freelancers
  },
  
  bio: {
    type: String,
  },
  
  location: {
    type: String,
  },
  
  hourlyRate: {
    type: Number, // For freelancers
  },
  
  commission: {
    type: Number,
    default: 10, // Default commission rate if not specified
    min: [0, 'Commission must be at least 0%'],
    max: [100, 'Commission cannot be more than 100%'],
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
module.exports = mongoose.model('Freelancer', freelancerSchema);
