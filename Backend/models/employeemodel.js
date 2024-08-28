const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    unique: true,
  },
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    sparse: true ,
    lowercase: true,
  },
  password: {
    type: String,
  },
  mobile: {
    type: String,
    unique: true,
    trim: true,
  },
  currentaddress: {
    type: String,
  },
  permanentaddress: {
    type: String,
  },
  role: {
    type: String,
    default: 'Select',
  },
  branch: {
    type: String,
    default: 'Select',
  },
  location: {
    type: String,
  },
  identityType: {
    type: String,
    // enum: ['Aadhar', 'PAN', 'Passport', 'Select'],
    default: 'Select',
  },
  identityNumber: {
    type: String,
    unique: true,
    trim: true,
  },
  amount: {
    type: Number,
  },
  payDate: {
    type: Date,
  },
  accountNumber: {
    type: String,
    unique: true,
    trim: true,
  },
  ifsc: {
    type: String,
    trim: true,
  },
  count: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Model for counter
const employeeCounterSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0
  }
});

const EmployeeCounter = mongoose.model('EmployeeCounter', employeeCounterSchema);

// Pre-save hook to auto-increment the employeeId with format "AE01"
employeeSchema.pre('save', async function(next) {
  if (!this.isNew) return next();

  const counter = await EmployeeCounter.findOneAndUpdate(
    {},
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );

  // Format employeeId as "AE" followed by a zero-padded number
  this.employeeId = `AE${String(counter.count).padStart(2, '0')}`;

  next();
});

module.exports = mongoose.model('Employee', employeeSchema);
