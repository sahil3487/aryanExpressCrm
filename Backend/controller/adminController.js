const express = require('express');
const Admin = require('../models/adminmodel')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');



//? register admin login 


exports.registerAdmin = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  // Check if the admin already exists
  let admin = await Admin.findOne({ email });
  if (admin) {
    return res.status(400).json({ msg: 'Admin already exists' });
  }

  // Create a new admin instance
  admin = new Admin({
    username,
    email,
    password,
    role
  });

  // Hash the password before saving
  // const salt = await bcrypt.genSalt(10);
  // admin.password = await bcrypt.hash(password, salt);

  // Save the admin to the database
  await admin.save();

  res.status(201).json({ msg: 'Admin registered successfully' });
});

//? Login admin api 


// exports.loginAdmin = catchAsyncErrors(async (req, res, next) => {
//   const { email, password } = req.body;

//   // Check if the admin exists
//   let admin = await Admin.findOne({ email });
//   if (!admin) {
//     return res.status(400).json({ msg: 'Invalid credentials' });
//   }

//   // Compare the provided password with the hashed password
//   const isMatch = await bcrypt.compare(password, admin.password);
//   if (!isMatch) {
//     return res.status(400).json({ msg: 'Invalid credentials' });
//   }

//   // If credentials are correct, generate a JWT
//   const payload = {
//     admin: {
//       id: admin.id,
//       role: admin.role
//     }
//   };

//   jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
//     if (err) throw err;
//     res.json({ token });
//   });
// });


exports.loginAdmin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if the email and password are provided
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide both email and password' });
  }

  // Check if the admin exists
  let admin = await Admin.findOne({ email, password });
  if (!admin) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  // If credentials are correct, just return a success message
  res.json({ msg: 'Login successful' });
});
