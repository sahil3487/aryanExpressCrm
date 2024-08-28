const Freelancer = require('../models/freelancermodel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.registerFreelancer = catchAsyncErrors(async (req, res, next) => {
  const { firstname, email, password, mobile, role, skills, bio, location, hourlyRate, commission } = req.body;

  const newFreelancer = new Freelancer({
    firstname,
    email,
    password,
    mobile,
    role,
    skills,
    bio,
    location,
    hourlyRate,
    commission,
  });

  await newFreelancer.save();

  res.status(201).json({ msg: 'Freelancer registered successfully', freelancer: newFreelancer });
});

exports.getAllFreelancers = catchAsyncErrors(async (req, res, next) => {
  const freelancers = await Freelancer.find();
  res.status(200).json({ freelancers });
});

exports.removeFreelancer = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const freelancer = await Freelancer.findByIdAndDelete(id);

  if (!freelancer) {
    return res.status(404).json({ msg: 'Freelancer not found' });
  }

  res.status(200).json({ msg: 'Freelancer removed successfully' });
});
