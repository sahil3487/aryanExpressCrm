const mongoose = require('mongoose');

// Employee Schema
const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    unique: true,
  },
  firstname: {
    type: String,
    trim: true,
    required: true,
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    sparse: true,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  currentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Select',
    required: true,
  },
  branch: {
    type: String,
    default: 'Select',
  },
  location: {
    type: String,
    required: true,
  },
  identityType: {
    type: String,
    default: 'Select',
    required: true,
  },
  identityNumber: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  payDate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  taxPayerId:{
    type:String

  },
  accountNumber: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  ifsc: {
    type: String,
    trim: true,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  bankBranch: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  aadharDocument: {
    type: String, // URL or file path
  },
  panCardDocument: {
    type: String, // URL or file path
  },
  count: {
    type: Number,
    default: 0,
  },
  companyEmail: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  companyMobile: {
    type: String,
    trim: true,
    required: true,
  },
}, {
  timestamps: true,
});

// Counter Schema
const employeeCounterSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  }
});

const EmployeeCounter = mongoose.model('EmployeeCounter', employeeCounterSchema);

// Pre-save hook to auto-increment the employeeId
employeeSchema.pre('save', async function(next) {
  if (!this.isNew) return next();

  const counter = await EmployeeCounter.findOneAndUpdate(
    {},
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );

  this.employeeId = `AE${String(counter.count).padStart(2, '0')}`;

  next();
});

module.exports = mongoose.model('Employee', employeeSchema);
