const express = require('express');
const Employee = require('../models/employeemodel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const mongoose = require('mongoose');
const files =  require('../config/multer')


//! Register Employee Api 



exports.registerEmployee = catchAsyncErrors(async (req, res, next) => {
    const {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
        mobile,
        currentAddress,
        permanentAddress,
        role,
        branch,
        location,
        identityType,
        identityNumber,
        amount,
        payDate,
        accountNumber,
        ifsc,
        bankName,
        bankBranch,
        accountName,
        companyEmail,
        companyMobile,
        gendar,
        taxPayerId
    } = req.body;

    // Log request body for debugging
    console.log("Request Body:", req.body);

    // Validate required fields
    if (!firstname || !lastname || !email || !password || !confirmPassword || !mobile || !currentAddress || !permanentAddress || !role || !branch || !location || !identityType || !identityNumber || !amount || !payDate || !accountNumber || !ifsc || !bankName || !bankBranch || !accountName || !companyEmail || !companyMobile) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
        });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'Passwords do not match',
        });
    }

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
        return res.status(400).json({
            success: false,
            message: 'Email already in use',
        });
    }

    // Check if mobile number already exists
    const existingMobile = await Employee.findOne({ mobile });
    if (existingMobile) {
        return res.status(400).json({
            success: false,
            message: 'Mobile number already in use',
        });
    }

    // Create new employee
    const employee = new Employee({
        firstname,
        lastname,
        email,
        password,
        mobile,
        currentAddress,
        permanentAddress,
        role,
        branch,
        location,
        identityType,
        identityNumber,
        amount,
        payDate,
        accountNumber,
        ifsc,
        bankName,
        bankBranch,
        accountName,
        companyEmail,
        companyMobile,
        gendar,
        taxPayerId
    });

    // Update employee with uploaded documents if present
    if (req.files && req.files['aadharDocument']) {
        employee.aadharDocument = req.files['aadharDocument'][0].path; // Save file path or URL
    }
    if (req.files && req.files['panCardDocument']) {
        employee.panCardDocument = req.files['panCardDocument'][0].path; // Save file path or URL
    }

    await employee.save();

    res.status(201).json({
        success: true,
        message: 'Employee created successfully',
        employee,
    });
});

// !  Update Employee Api 



exports.updateEmployee = catchAsyncErrors(async (req, res, next) => {
    const employeeId = req.params.id; // Use 'id' to match the route parameter

    const {
        firstname,
        lastname,
        email,
        password,
        mobile,
        currentaddress,
        permanentaddress,
        avatar,
        role,
        attendance,
        leave,
        salary,
        branch,
        location,
        isFreelancer,
        commissionPercentage,
    } = req.body;

    // Check if passwords match, if password is being updated
    if (password && password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'Passwords do not match',
        });
    }

    // Construct the update object
    let updateFields = {
        firstname,
        lastname,
        email,
        mobile,
        currentaddress,
        permanentaddress,
        avatar,
        role,
        attendance,
        leave,
        salary,
        branch,
        location,
        isFreelancer,
        commissionPercentage,
    };

    if (password) {
        updateFields.password = password;
    }

    // Remove any fields that are undefined
    Object.keys(updateFields).forEach(key => {
        if (updateFields[key] === undefined) {
            delete updateFields[key];
        }
    });

    // Find and update the employee
    const employee = await Employee.findByIdAndUpdate(employeeId, updateFields, {
        new: true,  // Return the updated document
        runValidators: true,  // Run schema validation on update
    });

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: 'Employee not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Employee updated successfully',
        employee,
    });
});


//? get all employee by id and List of the employee 


exports.readEmployee = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    if (id && !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid employee ID',
        });
    }

    let employee;

    if (id) {
        // Fetch a specific employee by ID
        employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found', 
            });
        }
    } else {
        // Fetch all employees
        employee = await Employee.find();
    }

    res.status(200).json({
        success: true,
        employees: Array.isArray(employee) ? employee : [employee],
    });
});

//! Remove the employee

exports.removeEmployee = catchAsyncErrors(async (req, res, next) => {
    const employeeId = req.params.id;

    // Find and delete the employee by ID
    const result = await Employee.findByIdAndDelete(employeeId);

    if (!result) {
        return res.status(404).json({
            success: false,
            message: 'Employee not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Employee deleted successfully',
    });
});




//? attandance recourd 


exports.getAttendance = catchAsyncErrors(async (req, res, next) => {
    const employeeId = req.params.id;

    // Find the employee by ID and select the attendance field
    const employee = await Employee.findById(employeeId).select('attendance');

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: 'Employee not found',
        });
    }

    res.status(200).json({
        success: true,
        attendance: employee.attendance,
    });
});


//? Mark Cheacked in 

exports.markCheckInOrOut = catchAsyncErrors(async (req, res, next) => {
    const employeeId = req.params.id;

    // Find the employee by ID
    const employee = await Employee.findById(employeeId);

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: 'Employee not found',
        });
    }

    // Get the current date and time
    const now = new Date();

    // Find the attendance record for today
    let attendanceRecord = employee.attendance.find(record => 
        record.date.toDateString() === now.toDateString()
    );

    if (!attendanceRecord) {
        // If no attendance record exists for today, create a new one and mark it as check-in
        attendanceRecord = {
            date: now,
            inTime: now.toTimeString().split(' ')[0], // Extract time in HH:MM:SS format
            outTime: null,
            status: 'Present'
        };
        employee.attendance.push(attendanceRecord);
        message = 'Check-in time marked successfully';
    } else if (!attendanceRecord.outTime) {
        // If the employee has checked in but not checked out, mark the check-out time
        attendanceRecord.outTime = now.toTimeString().split(' ')[0];
        message = 'Check-out time marked successfully';
    } else {
        return res.status(400).json({
            success: false,
            message: 'Employee has already checked out today',
        });
    }

    // Save the updated employee document
    await employee.save();

    res.status(200).json({
        success: true,
        message: message,
        attendance: attendanceRecord,
    });
});


// Controller function to submit a leave request
exports.submitLeaveRequest = catchAsyncErrors(async (req, res, next) => {
    const employeeId = req.params.id;

    // Find the employee by ID
    const employee = await Employee.findById(employeeId);

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: 'Employee not found',
        });
    }

    const { leaveType, startDate, endDate } = req.body;

    // Validate leaveType, startDate, and endDate
    if (!leaveType || !startDate || !endDate) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required leave details',
        });
    }

    // Create a new leave request
    const leaveRequest = {
        leaveType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: 'Pending', // Initially, the leave request will be in the 'Pending' status
    };

    // Add the leave request to the employee's record
    employee.leave.push(leaveRequest);

    // Save the updated employee document
    await employee.save();

    res.status(200).json({
        success: true,
        message: 'Leave request submitted successfully',
        leave: leaveRequest,
    });
});