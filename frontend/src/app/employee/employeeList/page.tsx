"use client"
import React, { useEffect, useState } from "react";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { FaEye, FaEdit, FaTrash , FaPlus } from 'react-icons/fa';

interface Employee {
  _id: string;
  employeeId: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  currentAddress: string;
  permanentAddress: string;
  role: string;
  branch: string;
  location: string;
  identityType: string;
  identityNumber: string;
  amount: number;
  payDate: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
  bankBranch: string;
  accountName: string;
  aadharDocument: string;
  panCardDocument: string;
  companyEmail: string;
  companyMobile: string;
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/getallEmployee');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.employees) {
          setEmployees(data.employees);
        } else {
          console.error('Employees data is not available in the response');
        }
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/removeEmployee/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEmployees(employees.filter(employee => employee._id !== id));
        setShowConfirmDelete(false);
        setDeleteId(null);
      } else {
        console.error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  return (
    <DefaultLayout>
      <div className="top_item mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb pageName="Employee" />
        <Link
          href="/employee/employeeadd"
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4"
        >
          <FaPlus className="text-white" />
          Add Employee
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-100">
              <th className="py-3 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">ID</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Mobile</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Role</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Location</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Bank Name</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee._id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                <td className="py-4 px-6 text-sm text-gray-800">{employee.employeeId}</td>
                <td className="py-4 px-6 text-sm text-gray-800">{`${employee.firstname} ${employee.lastname}`}</td>
                <td className="py-4 px-6 text-sm text-gray-800">{employee.email}</td>
                <td className="py-4 px-6 text-sm text-gray-800">{employee.mobile}</td>
                <td className="py-4 px-6 text-sm text-gray-800">{employee.role}</td>
                <td className="py-4 px-6 text-sm text-gray-800">{employee.location}</td>
                <td className="py-4 px-6 text-sm text-gray-800">{employee.bankName}</td>
                <td className="py-4 px-6 text-sm text-gray-800">
                  <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                    employee.role === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {employee.role}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-800">
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-600 hover:text-primary transition duration-150 ease-in-out" onClick={() => console.log('View', employee._id)}>
                      <FaEye className="text-gray-600 hover:text-primary" />
                    </button>
                    <button className="text-gray-600 hover:text-primary transition duration-150 ease-in-out" onClick={() => console.log('Edit', employee._id)}>
                      <FaEdit className="text-gray-600 hover:text-primary" />
                    </button>
                    <button className="text-gray-600 hover:text-primary transition duration-150 ease-in-out" onClick={() => {
                      setDeleteId(employee._id);
                      setShowConfirmDelete(true);
                    }}>
                      <FaTrash className="text-gray-600 hover:text-primary" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this employee?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-150 ease-in-out"
                onClick={() => handleDelete(deleteId!)}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition duration-150 ease-in-out"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default EmployeeList;
