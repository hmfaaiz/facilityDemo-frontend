"use client";

import React, { useState, useEffect } from "react";
import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import { base_url } from "@/utils/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SelectJobEmp from "../SelectGroup/SelectJobEmp";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobData: any;
}

const  SelectionJobModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  jobData,
}) => {
  const [empId, setempId] = useState<string>("");
  const [complain, setcomplain] = useState<string>(jobData?.complain);
  const [selectedEmpType, setSelectedEmpType] = useState<string>("");
  const [employeeData, setEmployeeData] = useState<any[]>([]);
  const [contractorData, setContractorData] = useState<any[]>([]);

  // New state variables for toggling between Employee and Contractor
  const [showEmployeeSection, setShowEmployeeSection] = useState(false);
  const [showContractorSection, setShowContractorSection] = useState(false);

  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);
  console.log("modal jobData", jobData?.complain);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (selectedEmpType) {
        try {
          const response = await axios.get(
            `${base_url}jobmanagement/GetEmp/?type_name=${selectedEmpType}`,
            {
              headers: {
                Authorization: localStorage.getItem("saudit") || "",
              },
            },
          );
          if (response.status === 200) {
            console.log(response.data.data);
            setEmployeeData(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching employees:", error);
        }
      }
    };

    fetchEmployees();
  }, [selectedEmpType]);

  useEffect(() => {
    const fetchContractor = async () => {
      try {
        const response = await axios.get(
          `${base_url}jobmanagement/GetContractor`,
          {
            headers: {
              Authorization: localStorage.getItem("saudit") || "",
            },
          },
        );
        if (response.status === 200) {
          setContractorData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchContractor();
  }, [showContractorSection]);

  const Allocate = async (id: any) => {
    console.log("e", id);
    // setempId(e.target)
    // e.preventDefault();

    if (id) {
      try {
        const response = await axios.put(
          `${base_url}jobmanagement/Allocation?jobId=${jobData?.id}`,
          {
            empId: id,
          },
          {
            headers: {
              Authorization: localStorage.getItem("saudit") || "",
            },
          },
        );

        if (response.status === 200) {
          toast.success("Successfully updated", {
            autoClose: 1000,
          });
          onClose();
          dispatch({
            type: "refresh",
            payload: !reduxData.refresh,
          });
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        toast.error(errorMessage);
      }
    } else {
      toast.error("Please fill in all fields");
    }
  };

  useEffect(() => {
    if (jobData?.complain) {
      setcomplain(jobData.complain);
    }
  }, [jobData]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 mt-8 flex items-center justify-center bg-black bg-opacity-50 p-5">
        <div className="relative max-h-[80vh] w-3/4 max-w-4xl overflow-auto rounded-lg bg-white p-6 shadow-lg">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-2xl text-black dark:text-white"
          >
            &times;
          </button>

          <form>
            {jobData && (
              <>
                <div className="mb-4 w-3/4 items-center justify-center gap-4 xl:w-full">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Complain
                  </label>
                  <textarea
                    value={complain}
                    disabled
                    onChange={(e) => setcomplain(e.target.value)}
                    placeholder="Enter your job"
                    className="w-full h-[50vh] rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Employee and Contractor Toggle Buttons */}
                <div className="mb-4 flex gap-5">
                  <button
                    type="button"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    onClick={() => {
                      setShowEmployeeSection(true);
                      setShowContractorSection(false);
                    }}
                  >
                    Employee
                  </button>
                  <button
                    type="button"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    onClick={() => {
                      setShowContractorSection(true);
                      setShowEmployeeSection(false);
                    }}
                  >
                    Outsource (Contractor)
                  </button>
                </div>

                {/* Employee Section */}
                {showEmployeeSection && (
                  <div>
                    <h1>Select Employee Type</h1>
                    <select
                      value={selectedEmpType}
                   
                      onChange={(e) => setSelectedEmpType(e.target.value)}
                      className="mb-4 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="" disabled>
                        Select an Employee Type
                      </option>
                      <option value="Plumber">Plumber</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Janitorial">Janitorial</option>
                      <option value="HVAC">HVAC</option>
                    </select>
                  </div>
                )}

                {showEmployeeSection && employeeData.length > 0 && (
                  <div className="mb-4">
                    <table className="min-w-full table-auto">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Name</th>
                          <th className="px-4 py-2">Email</th>
                          <th className="px-4 py-2">Contact Number</th>
                          <th className="px-4 py-2">Is Engaged</th>
                          <th className="px-4 py-2">Employee Type</th>
                          <th className="px-4 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employeeData.map((emp) => (
                          <tr key={emp.id}>
                            <td className="border px-4 py-2">{emp.name}</td>
                            <td className="border px-4 py-2">{emp.email}</td>
                            <td className="border px-4 py-2">{emp.mobile}</td>
                            <td className="border px-4 py-2">
                              {emp.isEngaged ? "Yes" : "No"}
                            </td>
                            <td className="border px-4 py-2">
                              {emp.emp_type.type_name}
                            </td>

                            <td className="border px-4 py-2">
                              {emp.isEngaged ? (
                                <>
                                  {emp.isEngaged && emp.id === jobData.empId ? (
                                    <button
                                      onClick={() => Allocate(emp.id)}
                                      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                                    >
                                      Unassign
                                    </button>
                                  ) : (
                                    "..."
                                  )}
                                </>
                              ) : (
                                <button
                                  onClick={() => Allocate(emp.id)}
                                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                                >
                                  Assign
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Contractor Section */}
                {showContractorSection && (
                  <div className="mb-4">
                    <table className="min-w-full table-auto">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Cont. Id</th>
                          <th className="px-4 py-2">Name</th>
                          <th className="px-4 py-2">Email</th>
                          <th className="px-4 py-2">Contact Number</th>
                          <th className="px-4 py-2">Type</th>
                          <th className="px-4 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contractorData.map((cont) => (
                          <tr key={cont.id}>
                            <td className="border px-4 py-2">{cont.id}</td>
                            <td className="border px-4 py-2">{cont.name}</td>
                            <td className="border px-4 py-2">{cont.email}</td>
                            <td className="border px-4 py-2">
                              {cont?.profile?.mobile}
                            </td>
                            <td className="border px-4 py-2">
                              {cont?.role?.roleName}
                            </td>

                            <td className="border px-4 py-2">
                              <button
                                onClick={Allocate}
                                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                              >
                                Assign
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default SelectionJobModal;
