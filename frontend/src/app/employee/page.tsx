"use client"
import React, { useState } from 'react';
import axios from 'axios';

const EmployeeRegister = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    currentaddress: '',
    permanentaddress: '',
    role: '',
    branch: '',
    location: '',
    identityType: '',
    identityNumber: '',
    amount: '',
    payDate: '',
    accountNumber: '',
    ifsc: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/registerEmployee', formData);
      console.log('Employee registered successfully:', response.data);
    } catch (error) {
      console.error('Error registering employee:', error);
    }
  };

  const handleReset = () => {
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: '',
      currentaddress: '',
      permanentaddress: '',
      role: '',
      branch: '',
      location: '',
      identityType: '',
      identityNumber: '',
      amount: '',
      payDate: '',
      accountNumber: '',
      ifsc: '',
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Employee Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} className="border p-2 rounded" />
          <input name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} className="border p-2 rounded" />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="border p-2 rounded" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="border p-2 rounded" />
          <input name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} className="border p-2 rounded" />
          <input name="currentaddress" placeholder="Current Address" value={formData.currentaddress} onChange={handleChange} className="border p-2 rounded" />
          <input name="permanentaddress" placeholder="Permanent Address" value={formData.permanentaddress} onChange={handleChange} className="border p-2 rounded" />
          <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} className="border p-2 rounded" />
          <input name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} className="border p-2 rounded" />
          <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="border p-2 rounded" />
          <input name="identityType" placeholder="Identity Type" value={formData.identityType} onChange={handleChange} className="border p-2 rounded" />
          <input name="identityNumber" placeholder="Identity Number" value={formData.identityNumber} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" name="amount" placeholder="Salary Amount" value={formData.amount} onChange={handleChange} className="border p-2 rounded" />
          <input type="date" name="payDate" placeholder="Pay Date" value={formData.payDate} onChange={handleChange} className="border p-2 rounded" />
          <input name="accountNumber" placeholder="Account Number" value={formData.accountNumber} onChange={handleChange} className="border p-2 rounded" />
          <input name="ifsc" placeholder="IFSC Code" value={formData.ifsc} onChange={handleChange} className="border p-2 rounded" />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
          <button type="button" onClick={handleReset} className="bg-gray-500 text-white p-2 rounded">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegister;
