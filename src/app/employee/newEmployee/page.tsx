"use client"
import React, { useState, useEffect } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import axios from 'axios';
import Link from "next/link";
import flatpickr from "flatpickr";

const EmployeeRegister = () => {
    const [gender, setGender] = useState<string>("");

    const [selectedOption, setSelectedOption] = useState<string>("");
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);



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

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
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
        setGender("")
    };



    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    useEffect(() => {
        // Init flatpickr
        flatpickr(".form-datepicker", {
            mode: "single",
            static: true,
            monthSelectorType: "static",
            dateFormat: "M j, Y",
            prevArrow:
                '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
            nextArrow:
                '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        });
    }, []);

    return (
        <DefaultLayout>
            <div className="top_item mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Breadcrumb pageName="Employee" />
            </div>
            {/* <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        Add New Employee
                    </h4>
                </div>
            </div> */}
            <form>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                    <div className="flex flex-col gap-6">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Personal Detail
                                </h3>
                            </div>

                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter first name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your last name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Phone
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Enter employee phone"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Gender
                                        </label>
                                        <div className="flex gap-1">
                                            <label
                                                htmlFor="radioMale"
                                                className="flex cursor-pointer select-none items-center"
                                            >
                                                <div className="relative">
                                                    <input
                                                        type="radio"
                                                        id="radioMale"
                                                        name="gender"
                                                        className="sr-only"
                                                        onChange={() => {
                                                            setGender("Male");
                                                        }}
                                                    />
                                                    <div
                                                        className={`mr-1 flex h-5 w-5 items-center justify-center rounded-full border ${gender === "Male" && "border-primary"
                                                            }`}
                                                    >
                                                        <span
                                                            className={`h-2.5 w-2.5 rounded-full bg-transparent ${gender === "Male" && "!bg-primary"
                                                                }`}
                                                        ></span>
                                                    </div>
                                                </div>
                                                Male
                                            </label>
                                            <label
                                                htmlFor="radioFemale"
                                                className="flex cursor-pointer select-none items-center"
                                            >
                                                <div className="relative">
                                                    <input
                                                        type="radio"
                                                        id="radioFemale"
                                                        name="gender"
                                                        className="sr-only"
                                                        onChange={() => {
                                                            setGender("Female");
                                                        }}
                                                    />
                                                    <div
                                                        className={`mr-1 flex h-5 w-5 items-center justify-center rounded-full border ${gender === "Female" && "border-primary"
                                                            }`}
                                                    >
                                                        <span
                                                            className={`h-2.5 w-2.5 rounded-full bg-transparent ${gender === "Female" && "!bg-primary"
                                                                }`}
                                                        ></span>
                                                    </div>
                                                </div>
                                                Female
                                            </label>
                                        </div>
                                    </div>

                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Email <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Enter employee email"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Enter password"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Address
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Enter employee address"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Company Detail
                                </h3>
                            </div>

                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Employee ID
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="#EMP0000014"
                                        disabled
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                                    />
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            {" "}
                                            Select Branch{" "}
                                        </label>

                                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                                            <select
                                                value={selectedOption}
                                                onChange={(e) => {
                                                    setSelectedOption(e.target.value);
                                                    changeTextColor();
                                                }}
                                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? "text-black dark:text-white" : ""
                                                    }`}
                                            >
                                                <option value="" disabled className="text-body dark:text-bodydark">
                                                    Select Branch
                                                </option>
                                                <option value="USA" className="text-body dark:text-bodydark">
                                                    India
                                                </option>
                                                <option value="UK" className="text-body dark:text-bodydark">
                                                    UK
                                                </option>
                                                <option value="Canada" className="text-body dark:text-bodydark">
                                                    Canada
                                                </option>
                                            </select>

                                            <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                                                <svg
                                                    className="fill-current"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.8">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                            fill=""
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            {" "}
                                            Department{" "}
                                        </label>

                                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                                            <select
                                                value={selectedOption}
                                                onChange={(e) => {
                                                    setSelectedOption(e.target.value);
                                                    changeTextColor();
                                                }}
                                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? "text-black dark:text-white" : ""
                                                    }`}
                                            >
                                                <option value="" disabled className="text-body dark:text-bodydark">

                                                </option>
                                            </select>

                                            <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                                                <svg
                                                    className="fill-current"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.8">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                            fill=""
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            {" "}
                                            Select Designation{" "}
                                        </label>

                                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                                            <select
                                                value={selectedOption}
                                                onChange={(e) => {
                                                    setSelectedOption(e.target.value);
                                                    changeTextColor();
                                                }}
                                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? "text-black dark:text-white" : ""
                                                    }`}
                                            >
                                                <option value="" disabled className="text-body dark:text-bodydark">
                                                    Select Designation
                                                </option>
                                            </select>

                                            <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                                                <svg
                                                    className="fill-current"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.8">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                            fill=""
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Employee Code
                                        </label>
                                        <input
                                            type="Enter Employee Code"
                                            placeholder="Enter password"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Select date
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            placeholder="mm/dd/yyyy"
                                            data-class="flatpickr-right"
                                        />

                                        <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.0002 12.8249C8.83145 12.8249 8.69082 12.7687 8.5502 12.6562L2.08145 6.2999C1.82832 6.04678 1.82832 5.65303 2.08145 5.3999C2.33457 5.14678 2.72832 5.14678 2.98145 5.3999L9.0002 11.278L15.0189 5.34365C15.2721 5.09053 15.6658 5.09053 15.9189 5.34365C16.1721 5.59678 16.1721 5.99053 15.9189 6.24365L9.45019 12.5999C9.30957 12.7405 9.16895 12.8249 9.0002 12.8249Z"
                                                    fill="#64748B"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
                    <div className="flex flex-col gap-6">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Document
                                </h3>
                            </div>

                            <div className="flex flex-col gap-5.5 p-7.5">
                                <div>
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Certificate
                                    </label>
                                    <input
                                        type="file"
                                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Resume
                                    </label>
                                    <input
                                        type="file"
                                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Photo
                                    </label>
                                    <input
                                        type="file"
                                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Bank Account Detail
                                </h3>
                            </div>

                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Account Holder Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Account Holder Name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Account Number
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Enter Account Number"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Bank Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Bank Name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            IFSC Code
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter IFSC Code"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Branch Location <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Branch Location"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Tax Payer Id
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Tax Payer Id"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mb-4 mt-6">
                    <button type="reset" onClick={handleReset} className="bg-blue-500 text-white p-2 rounded">Reset</button>
                    <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">Submit</button>
                </div>
            </form>
        </DefaultLayout>
    );
};


export default EmployeeRegister;