const express = require('express');
const router = express.Router();
const { registerEmployee, updateEmployee, readEmployee, removeEmployee,getAttendance, markCheckInOrOut,submitLeaveRequest } = require('../controller/employeeController'); // Adjust the path


router.post('/registerEmployee', registerEmployee);


router.put('/updateEmployee/:id', updateEmployee);


router.get('/getallEmployee/:id?', readEmployee);


router.delete('/removeEmployee/:id', removeEmployee);


// Route for fetching attendance records
router.get('/attendance/:id', getAttendance);


router.post('/inout/:id', markCheckInOrOut);

router.post('/leave/:id', submitLeaveRequest);



module.exports = router;
