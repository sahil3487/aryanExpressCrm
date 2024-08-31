"use client";
import { useState, useEffect } from "react";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import axios from "axios";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; // Import Flatpickr CSS
const EmployeeRegister = () => {
  const [gender, setGender] = useState<string>("");
  //? this is select for branch
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  //? select Department
  const [selectedDeparment, setSelectedDepartment] = useState<string>("");
  const [isDepartmentSelected, setIsDepartmentSelected] =
    useState<boolean>(false);
  //? select Department
  const [selectedDagination, setSelectedDagination] = useState<string>("");
  const [isDaginationSelected, setIsDeginationSelected] =
    useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    currentAddress: "",
    permanentAddress: "",
    role: "tl",
    branch: "",
    location: "",
    identityType: "",
    identityNumber: "",
    amount: "",
    payDate: "",
    accountNumber: "",
    accountName: "",
    ifsc: "",
    bankName: "",
    bankBranch: "",
    aadharDocument: null,
    panCardDocument: null,
    gender: "",
    taxPayerId: "", // Add gender field
  });
  const changeTextColor = () => {
    setIsOptionSelected(true);
    setIsDepartmentSelected(true);
    setIsDeginationSelected(true);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      setFormData((prevState) => ({
        ...prevState,
        [name]: file, // Store the file itself
      }));
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/registerEmployee",
        formData,
      );
      console.log("Employee registered successfully:", response.data);
    } catch (error) {
      console.error("Error registering employee:", error);
    }
    const requiredFields = [
      "firstname",
      "lastname",
      "email",
      "password",
      "confirmPassword",
      "mobile",
      "currentAddress",
      "permanentAddress",
      "role",
      "branch",
      "location",
      "identityType",
      "identityNumber",
      "amount",
      "payDate",
      "accountNumber",
      "accountName",
      "ifsc",
      "bankName",
      "bankBranch",
      "aadharDocument",
      "panCardDocument",
      "gender",
      "taxPayerId", // Ensure gender is checked
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        console.error(`${field} is required.`);
        return;
      }
    }
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match.");
      return;
    }
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/registerEmployee",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("Employee registered successfully:", response.data);
    } catch (error) {
      console.error("Error registering employee:", error);
    }
  };
  const handleReset = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      currentAddress: "",
      permanentAddress: "",
      role: "",
      branch: "",
      location: "",
      identityType: "",
      identityNumber: "",
      amount: "",
      payDate: "",
      accountNumber: "",
      accountName: "",
      ifsc: "",
      bankName: "",
      bankBranch: "",
      aadharDocument: null,
      panCardDocument: null,
      gender: "",
      taxPayerId: "",
    });
  };
  useEffect(() => {
    // Initialize flatpickr
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
      <div className="top_item mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"></div>
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Add New Employee
          </h4>
        </div>
      </div>
      <form>
        <div className="grid grid-cols-1 gap-6 p-3 sm:grid-cols-2">
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
                      First Name
                    </label>
                    <input
                      name="firstname"
                      placeholder="First Name"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Last Name
                    </label>
                    <input
                      name="lastname"
                      placeholder="Last Name"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Phone
                    </label>
                    <input
                      name="mobile"
                      placeholder="Mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Gender
                    </label>
                    <div className="flex gap-2">
                      <label
                        htmlFor="radioMale"
                        className="flex cursor-pointer select-none items-center"
                      >
                        <div className="relative">
                          <input
                            type="radio"
                            id="radioMale"
                            name="gender"
                            value="Male"
                            className="sr-only"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                          />
                          <div
                            className={`mr-1 flex h-5 w-5 items-center justify-center rounded-full border ${
                              formData.gender === "Male" ? "border-primary" : ""
                            }`}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                                formData.gender === "Male" ? "!bg-primary" : ""
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
                            value="Female"
                            className="sr-only"
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                          />
                          <div
                            className={`mr-1 flex h-5 w-5 items-center justify-center rounded-full border ${
                              formData.gender === "Female"
                                ? "border-primary"
                                : ""
                            }`}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                                formData.gender === "Female"
                                  ? "!bg-primary"
                                  : ""
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
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Current Address
                  </label>
                  <input
                    name="currentaddress"
                    placeholder="Current Address"
                    value={formData.currentAddress}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Permanent Address
                  </label>
                  <input
                    name="permanentaddress"
                    placeholder="Permanent Address"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 p-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Company Detail
                </h3>
              </div>

              <div className="p-6.5" style={{ height: "76vh" }}>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    placeholder="#EMP0000014"
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Select Branch
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        value={selectedOption}
                        onChange={(e) => {
                          setSelectedOption(e.target.value);
                          changeTextColor();
                        }}
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          isOptionSelected ? "text-black dark:text-white" : ""
                        }`}
                      >
                        <option
                          value=""
                          disabled
                          className="text-body dark:text-bodydark"
                        >
                          Select Branch
                        </option>
                        <option
                          value="Nagpur Maharastra"
                          className="text-body dark:text-bodydark"
                        >
                          Nagpur Maharastra
                        </option>
                        <option
                          value="Bhopal Madhya Pradesh"
                          className="text-body dark:text-bodydark"
                        >
                          Bhopal Madhya Pradesh
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
                      Department
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        value={selectedDeparment}
                        onChange={(e) => {
                          setSelectedDepartment(e.target.value);
                          changeTextColor();
                        }}
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          isDepartmentSelected
                            ? "text-black dark:text-white"
                            : ""
                        }`}
                      >
                        <option value="">Select a Department</option>
                        <option value="operations">Operations</option>
                        <option value="transportation">Transportation</option>
                        <option value="warehouseManagement">
                          Warehouse Management
                        </option>
                        <option value="supplyChainManagement">
                          Supply Chain Management
                        </option>
                        <option value="customerService">
                          Customer Service
                        </option>
                        <option value="salesMarketing">
                          Sales and Marketing
                        </option>
                        <option value="hr">Human Resources (HR)</option>
                        <option value="financeAccounting">
                          Finance and Accounting
                        </option>
                        <option value="itSystems">IT and Systems</option>
                        <option value="qualityControl">Quality Control</option>
                        <option value="legalCompliance">
                          Legal and Compliance
                        </option>
                        <option value="procurement">Procurement</option>
                        <option value="riskManagement">Risk Management</option>
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
                      Select Designation
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        value={selectedDagination}
                        onChange={(e) => {
                          setSelectedDagination(e.target.value);
                          changeTextColor();
                        }}
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          isDaginationSelected
                            ? "text-black dark:text-white"
                            : ""
                        }`}
                      >
                        <option
                          value=""
                          disabled
                          className="text-body dark:text-bodydark"
                        >
                          Select Designation
                        </option>
                        <option value="logisticsManager">
                          Logistics Manager
                        </option>
                        <option value="operationsManager">
                          Operations Manager
                        </option>
                        <option value="transportationManager">
                          Transportation Manager
                        </option>
                        <option value="warehouseSupervisor">
                          Warehouse Supervisor
                        </option>
                        <option value="supplyChainAnalyst">
                          Supply Chain Analyst
                        </option>
                        <option value="customerServiceManager">
                          Customer Service Manager
                        </option>
                        <option value="salesExecutive">Sales Executive</option>
                        <option value="marketingManager">
                          Marketing Manager
                        </option>
                        <option value="hrManager">HR Manager</option>
                        <option value="financeManager">Finance Manager</option>
                        <option value="accountant">Accountant</option>
                        <option value="itManager">IT Manager</option>
                        <option value="qualityControlInspector">
                          Quality Control Inspector
                        </option>
                        <option value="legalAdvisor">Legal Advisor</option>
                        <option value="complianceOfficer">
                          Compliance Officer
                        </option>
                        <option value="procurementOfficer">
                          Procurement Officer
                        </option>
                        <option value="riskManager">Risk Manager</option>
                        <option value="inventoryManager">
                          Inventory Manager
                        </option>
                        <option value="fleetManager">Fleet Manager</option>
                        <option value="dispatchCoordinator">
                          Dispatch Coordinator
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
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="example@example.com"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234567890"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                    name="certificate"
                    onChange={handleFileChange}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Resume
                  </label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Aadhar Document
                    </label>
                    <input
                      type="file"
                      name="aadharDocument"
                      onChange={handleFileChange}
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      PAN Card Document
                    </label>
                    <input
                      type="file"
                      name="panCardDocument"
                      onChange={handleFileChange}
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Photo
                  </label>
                  <input
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
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
                      name="accountNumber"
                      placeholder="Account Number"
                      value={formData.accountNumber}
                      onChange={handleChange}
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
                      name="bankName"
                      placeholder="Enter Bank Name"
                      value={formData.bankName}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      IFSC Code
                    </label>
                    <input
                      name="ifsc"
                      placeholder="Enter IFSC Code"
                      value={formData.ifsc}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Account Number
                    </label>
                    <input
                      name="accountNumber"
                      placeholder="Enter Account Number"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Bank Branch
                    </label>
                    <input
                      name="bankBranch"
                      placeholder="Enter Bank Branch"
                      value={formData.bankBranch}
                      onChange={handleChange}
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
                      name="branch" // added name attribute
                      type="text"
                      placeholder="Enter Branch Location"
                      value={formData.branch} // added value attribute
                      onChange={handleChange} // added onChange attribute
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Tax Payer Id
                    </label>
                    <input
                      name="taxPayerId" // added name attribute
                      type="text"
                      placeholder="Enter Tax Payer Id"
                      value={formData.taxPayerId} // added value attribute
                      onChange={handleChange} // added onChange attribute
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 mt-6 flex justify-end gap-4">
          <button
            type="reset"
            onClick={handleReset}
            className="rounded bg-blue-500 p-2 text-white"
          >
            Reset
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded bg-blue-500 p-2 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </DefaultLayout>
  );
};
export default EmployeeRegister;
