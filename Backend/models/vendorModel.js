const mongoose = require('mongoose')




const mongoose = require('mongoose');

const venderSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please Enter Your Firstname"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    lastname: {
        type: String,
        required: [true, "Please Enter Your LastName"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
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
    currentaddress: {
        type: String,
        required: [true, "Please Enter your Current Address"],
    },
    permanentaddress: {
        type: String,
        required: [true, "Please Enter your Permanent Address"],
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // New fields for attendance management
    attendance: [{
        date: {
            type: Date,
            required: true,
        },
        inTime: {
            type: String,
            required: true,
        },
        outTime: {
            type: String,
        },
        status: {
            type: String,
            enum: ["Present", "Absent", "On Leave"],
            required: true,
        },
    }],

    // New fields for leave management
    leave: [{
        leaveType: {
            type: String,
            enum: ["Sick Leave", "Casual Leave", "Paid Leave", "Unpaid Leave"],
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            required: true,
        },
    }],

    // ? New fields for salary management
    salary: {
        amount: {
            type: Number,
            required: true,
        },
        payDate: {
            type: Date,
            default: Date.now,
        },
        salarySlip: {
            url: {
                type: String,
            },
            public_id: {
                type: String,
            },
        },
    },

    //! New fields for branch and location management
    branch: {
        type: String,
        required: [true, "Please Enter the Branch Name"],
    },
    location: {
        type: String,
        required: [true, "Please Enter the Location Name"],
    },

});

module.exports = mongoose.model("vender", employeSchema);