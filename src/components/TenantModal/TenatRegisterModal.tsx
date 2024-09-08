"use client";

import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { base_url } from "@/utils/api";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Contact {
  name: string;
  email: string;
  mobile: string;
}

const TenatRegisterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [type, settype] = useState<string>("");
  const [cnic, setcnic] = useState<string>("");
  const [ntn, setntn] = useState<string>("");
  const [name, setname] = useState<string>("");
  const [adminName, setAdminName] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [returnData, setReturnData] = useState<string>("");
  const [returnAdmin, setReturnAdmin] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([
    { name: "", email: "", mobile: "" },
  ]);

  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);

  const handleContactChange = (index: number, field: string, value: string) => {
    const newContacts = contacts.map((contact, i) =>
      i === index ? { ...contact, [field]: value } : contact,
    );
    setContacts(newContacts);
  };

  const addContact = () => {
    setContacts([...contacts, { name: "", email: "", mobile: "" }]);
  };

  const Allocate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (type && name && (ntn || cnic)) {
      try {
        const response = await axios.post(
          `${base_url}tenant/RegisterOrg`,
          {
            type,
            cnic,
            ntn,
            name,
          },
          {
            headers: {
              Authorization: localStorage.getItem("saudit") || "",
            },
          },
        );

        if (response.status === 200) {
          console.log("response.data", response.data.data);
          setReturnData(response.data.data);
          dispatch({
            type: "refresh",
            payload: !reduxData.refresh,
          });
          toast.success("Successfully Added", {
            autoClose: 1000,
          });
          //   onClose();
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";

        toast.error(errorMessage, {
          autoClose: 1000,
        });
      }
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const RegisterOrgContact = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("returnData", returnData);
    if (contacts.length > 0) {
      try {
        const response = await axios.post(
          `${base_url}tenant/RegisterMultiOrgContact`,
          {
            contacts,
            returnData, // Send the contacts array along with the other data
          },
          {
            headers: {
              Authorization: localStorage.getItem("saudit") || "",
            },
          },
        );

        if (response.status === 200) {
          setReturnData(response.data);
          dispatch({
            type: "refresh",
            payload: !reduxData.refresh,
          });
          toast.success("Successfully Added", {
            autoClose: 1000,
          });
          onClose();
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";

        toast.error(errorMessage, {
          autoClose: 1000,
        });
      }
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const AddTenantAdmin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email && adminName) {
      try {
        const response = await axios.post(
          `${base_url}tenant/`,
          {
            email,
            name: adminName,
            returnData,
          },
          {
            headers: {
              Authorization: localStorage.getItem("saudit") || "",
            },
          },
        );

        if (response.status === 200) {
          setReturnAdmin(response.data.data);
          dispatch({
            type: "refresh",
            payload: !reduxData.refresh,
          });
          toast.success("Successfully Added", {
            autoClose: 1000,
          });
          // onClose();
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";

        toast.error(errorMessage, {
          autoClose: 1000,
        });
      }
    } else {
      toast.error("Please fill in all fields");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 mt-8 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-h-[80vh] w-full max-w-5xl overflow-auto rounded-lg bg-white p-6 shadow-lg">
      <h3 className="p-2 mb-6 text-lg font-medium text-slate-100 dark:text-white bg-slate-900">
              Add Tenant
            </h3>
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-2xl text-black dark:text-white"
        >
          &times;
        </button>

        <form action="#">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            {/* Type Selection */}
            <div className="w-full xl:w-2/5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => settype(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Type</option>
                <option value="Independent">Independent</option>
                <option value="Company">Company</option>
              </select>
            </div>
            {/* Conditional Fields */}
            {type === "Independent" && (
              <>
                <div className="w-full xl:w-2/5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-2/5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    CNIC
                  </label>
                  <input
                    value={cnic}
                    onChange={(e) => setcnic(e.target.value)}
                    type="text"
                    placeholder="Enter your CNIC number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </>
            )}
            {type === "Company" && (
              <>
                <div className="w-full xl:w-2/5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    type="text"
                    placeholder="Enter company name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-2/5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    NTN
                  </label>
                  <input
                    value={ntn}
                    onChange={(e) => setntn(e.target.value)}
                    type="text"
                    placeholder="Enter NTN number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </>
            )}

            {returnData ? (
              <div className="mt-7 flex items-center justify-center">
                <button
                  disabled
                  onClick={Allocate}
                  className="hover:bg-primary-dark mr-4 rounded  bg-blue-400  px-4 py-2 text-white"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="mt-7 flex items-center justify-center">
                <button
                  onClick={Allocate}
                  className="hover:bg-primary-dark mr-4 rounded bg-primary  px-4 py-2 text-white"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Contacts Section */}
          <div className="mb-12">
            <h3 className="p-2 mb-6 text-lg font-medium text-slate-100 dark:text-white bg-slate-900">
              Tenant Admin
            </h3>

            <div className="mb-4 flex w-full gap-4">
              <div className="w-full xl:w-1/3">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Name
                </label>
                <input
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  type="text"
                  placeholder="Enter contact name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-1/3">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-1/3">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Password
                </label>
                <input
                  value={returnAdmin}
                disabled
                  type="text"
                  placeholder="System generated"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="flex justify-end">
                {returnData ? (
                  <div className="mt-7 flex items-center justify-center">
                    <button
                      onClick={AddTenantAdmin}
                      className="hover:bg-primary-dark mr-4 rounded  bg-primary px-4 py-2 text-white"
                    >
                      Save 
                    </button>
                  </div>
                ) : (
                  <div className="mt-7 flex items-center justify-center">
                    <button
                      disabled
                      onClick={AddTenantAdmin}
                      className="hover:bg-primary-dark mr-4 rounded  bg-blue-500  px-4 py-2 text-white"
                    >
                      Save
                    </button>
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="bg-gray-500 hover:bg-gray-700 rounded px-4 py-2 text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Contacts Section */}
          <div className="mb-8">
            <h3 className="p-2 mb-6 text-lg font-medium text-slate-100 dark:text-white bg-slate-900">
              Contacts
            </h3>
            {contacts.map((contact, index) => (
              <div key={index} className="mb-4 flex w-full gap-4">
                <div className="w-full xl:w-1/3">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Contact Name
                  </label>
                  <input
                    value={contact.name}
                    onChange={(e) =>
                      handleContactChange(index, "name", e.target.value)
                    }
                    type="text"
                    placeholder="Enter contact name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    value={contact.email}
                    onChange={(e) =>
                      handleContactChange(index, "email", e.target.value)
                    }
                    type="email"
                    placeholder="Enter email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Contact Number
                  </label>
                  <input
                    value={contact.mobile}
                    onChange={(e) =>
                      handleContactChange(index, "mobile", e.target.value)
                    }
                    type="text"
                    placeholder="Enter contact number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addContact}
              className="hover:bg-primary-dark mt-4 rounded bg-primary px-4 py-2 text-white"
            >
              Add More Contact
            </button>
          </div>

          <div className="flex justify-end">
            {returnData && returnAdmin ? (
              <div className="mt-7 flex items-center justify-center">
                <button
                  onClick={RegisterOrgContact}
                  className="hover:bg-primary-dark mr-4 rounded  bg-primary px-4 py-2 text-white"
                >
                  Submit Contact
                </button>
              </div>
            ) : (
              <div className="mt-7 flex items-center justify-center">
                <button
                  disabled
                  onClick={RegisterOrgContact}
                  className="hover:bg-primary-dark mr-4 rounded  bg-blue-500  px-4 py-2 text-white"
                >
                  Submit Contact
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 rounded px-4 py-2 text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default TenatRegisterModal;
