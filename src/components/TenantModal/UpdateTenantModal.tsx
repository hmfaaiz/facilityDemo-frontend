// import React, { useState, useEffect } from "react";
// import SelectGroupOne from "../SelectGroup/SelectGroupOne";
// import { base_url } from "@/utils/api";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";

// import { toast } from "react-toastify";
// import SelectProperty from "../SelectGroup/SelectProperty";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   user: any;
// }

// const UpdateTenantModal: React.FC<ModalProps> = ({ isOpen, onClose, user }) => {
//   console.log("user", user);

//   const [isAlertOpen, setAlertOpen] = useState(false);

//   const [userId, setuserId] = useState<number>(6);
//   const [start_date, setstart_date] = useState<string>("");
//   const [end_date, setend_date] = useState<string>("");
//   const [mobile, setmobile] = useState<string>("");
//   const [name, setname] = useState<string>("");
//   const [email, setemail] = useState<string>("");
//   const [cnic, setcnic] = useState<string>("");
//   const [password, setpassword] = useState<string>("");
//   const [address, setaddress] = useState<string>("");
//   const [alertMessage, setAlertMessage] = useState("");

//   const dispatch = useDispatch();
//   const reduxData = useSelector((state: any) => state.data);

//   useEffect(() => {
//     if (user) {
//       const formatDate = (date: string) => {
//         if(date){
//           const d = new Date(date);
//           console.log("d",d)
//           return d.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM'
//         }
//         return ""

//       };

//       setuserId(user?.id || "");
//       setstart_date(formatDate(user?.profile?.start_date) || "");
//       setend_date(formatDate(user?.profile?.end_date) || "");
//       setmobile(user?.profile?.mobile || "");
//       setname(user?.name || "");
//       setemail(user?.email || "");
//       setcnic(user?.profile?.cnic || "");
//       setaddress(user?.profile?.address || "");
//       setpassword(user?.password || "");
//     }
//   }, [user]);

//   const Allocate = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     console.log(
//       "tart_date && end_date && mobile && name && email && cnic && address && password",
//       start_date,
//       end_date,
//       mobile,
//       name,
//       email,
//       cnic,
//       address,
//       password,
//     );
//     if (start_date && end_date && mobile && name && email && cnic && password) {
//       try {
//         const response = await axios.put(
//           `${base_url}tenant/${user?.id}`,
//           {
//             userId,
//             start_date,
//             end_date,
//             mobile,
//             name,
//             email,
//             cnic,
//             address,
//             password,
//           },
//           {
//             headers: {
//               Authorization: localStorage.getItem("saudit") || "",
//             },
//           },
//         );

//         if (response.status === 200) {
//           toast.success("Successfully updated");
//           onClose();
//         }
//       } catch (error: any) {
//         // Handle both response and request errors
//         const errorMessage =
//           error.response?.data?.message || "Something went wrong";

//         toast.error(errorMessage);
//       }
//     } else {
//       toast.error("Please fill in all fields");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 z-50 mt-8 flex items-center justify-center bg-black bg-opacity-50">
//         <div className="relative max-h-[80vh] w-full max-w-4xl overflow-auto rounded-lg bg-white p-6 shadow-lg">
//           <button
//             onClick={onClose}
//             className="absolute right-2 top-2 text-2xl text-black dark:text-white"
//           >
//             &times;
//           </button>

//           <form action="#">
//             <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
//               <div className="w-full xl:w-2/5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Contact Name
//                 </label>
//                 <input
//                   value={name}
//                   onChange={(e) => setname(e.target.value)}
//                   type="text"
//                   placeholder="Enter your first name"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                 />
//               </div>

//               <div className="w-full xl:w-2/5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Contact Number
//                 </label>
//                 <input
//                   value={mobile}
//                   onChange={(e) => setmobile(e.target.value)}
//                   type="text"
//                   placeholder="Enter your contact number"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                 />
//               </div>

//               <div className="w-full xl:w-2/5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Contact Email <span className="text-meta-1">*</span>
//                 </label>
//                 <input
//                   value={email}
//                   onChange={(e) => setemail(e.target.value)}
//                   type="email"
//                   placeholder="Enter your email address"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                 />
//               </div>

//               <div className="w-full xl:w-2/5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   CNIC
//                 </label>
//                 <input
//                   value={cnic}
//                   onChange={(e) => setcnic(e.target.value)}
//                   type="text"
//                   placeholder="Enter your first name"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                 />
//               </div>

//               <div className="w-full xl:w-2/5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Address
//                 </label>
//                 <input
//                   value={address}
//                   onChange={(e) => setaddress(e.target.value)}
//                   type="text"
//                   placeholder="Enter your first name"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                 />
//               </div>
//               <div className="w-full xl:w-2/5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Password
//                 </label>
//                 <input
//                   value={password}
//                   onChange={(e) => setpassword(e.target.value)}
//                   type="text"
//                   placeholder="Enter your first name"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                 />
//               </div>

//               {/* <div className="w-full xl:w-2/5">
//                             <SelectGroupOne setroom_id={setroom_id} />
//                         </div> */}

//               <div className="w-full xl:w-2/5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Select Start Time
//                 </label>
//                 <input
//                   value={start_date}
//                   onChange={(e) => setstart_date(e.target.value)}
//                   type="datetime-local"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                 />
//               </div>

//               <div className="w-full xl:w-2/5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Select End Time
//                 </label>
//                 <input
//                   value={end_date}
//                   onChange={(e) => setend_date(e.target.value)}
//                   type="datetime-local"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                 />
//               </div>

//             </div>
//             <button
//               onClick={Allocate}
//               className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UpdateTenantModal;

"use client";

import React, { useEffect, useState } from "react";
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

const UpdateTenantModal: React.FC<ModalProps> = ({ isOpen, onClose, user }) => {
  console.log("user", user);
  const [id, setId] = useState<string>(user?.id);
  const [users, setUsers] = useState<string>(user?.users);
  const [type, settype] = useState<string>(user?.type);
  const [cnic, setcnic] = useState<string>(user?.cnic);
  const [ntn, setntn] = useState<string>(user?.ntn);
  const [name, setname] = useState<string>(user?.name);
  const [adminName, setAdminName] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [returnData, setReturnData] = useState<string>("");
  const [returnAdmin, setReturnAdmin] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([
    { name: "", email: "", mobile: "" },
  ]);

  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);

  useEffect(() => {
    if (user) {
      setId(user?.id);
      settype(user?.type);
      setcnic(user?.cnic);
      setntn(user?.ntn);
      setname(user?.name);
      setUsers(user?.users);
      setContacts(user?.TenantOrgContacts);
    }
  }, [user]);

  // const handleContactChange = (index: number, field: string, value: string) => {
  //   const newContacts = contacts.map((contact, i) =>
  //     i === index ? { ...contact, [field]: value } : contact,
  //   );
  //   setContacts(newContacts);
  // };

  const handleContactChange = (index: number, field: string, value: string) => {
   
    const updatedContacts = contacts.map((contact, i) =>
      i === index ? { ...contact, [field]: value } : contact,
    );
    console.log("field,value",updatedContacts);
    setContacts(updatedContacts);
  };

  const addContact = () => {
    setContacts([...contacts, { name: "", email: "", mobile: "" }]);
  };

  const UpdateTenantOrg = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (type && name && (ntn || cnic)) {
      try {
        const response = await axios.put(
          `${base_url}tenant/UpdateOrg`,
          {
            type,
            cnic,
            ntn,
            name,
            id,
          },
          {
            headers: {
              Authorization: localStorage.getItem("saudit") || "",
            },
          },
        );

        if (response.status === 200) {
          dispatch({
            type: "refresh",
            payload: !reduxData.refresh,
          });
          toast.success("Successfully Updated", {
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

  const UpdateOrgContact = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("UpdateMultiOrgContact", contacts);

    if (contacts.length > 0) {
      try {
        const response = await axios.put(
          `${base_url}tenant/UpdateMultiOrgContact`,
          {
            contacts,
            id, // Send the contacts array along with the other data
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

  const UpdateTenantAdmin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Assuming 'users' is your state holding the admin details
    if (user.users && user.users.length > 0) {
      try {
        const response = await axios.put(
          `${base_url}tenant/UpdateTenant`, // Your API endpoint
          {
            users: user.users.map((user) => ({
              id: user.id,
              name: user.name,
              email: user.email,
              password: user.password ? user.password : null, // If the password needs to be updated, else null
              address: user.address,
              mobile: user.mobile,
              cnic: user.cnic,
              start_date: user.start_date,
              end_date: user.end_date,
            })),
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
          toast.success("Successfully Updated", {
            autoClose: 1000,
          });
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

  const handleInputChange = (e, index, field) => {
    console.log("hit", e, index, field);
    const updatedUsers = [...users];
    updatedUsers[index][field] = e.target.value; // Directly update the specific field
    setUsers(updatedUsers); // Update the state
  };

  const removeContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 mt-8 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-h-[80vh] w-full max-w-5xl overflow-auto rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-6 bg-slate-900 p-2 text-lg font-medium text-slate-100 dark:text-white">
          Update Tenant
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
                  onClick={UpdateTenantOrg}
                  className="hover:bg-primary-dark mr-4 rounded  bg-blue-400  px-4 py-2 text-white"
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="mt-7 flex items-center justify-center">
                <button
                  onClick={UpdateTenantOrg}
                  className="hover:bg-primary-dark mr-4 rounded bg-primary  px-4 py-2 text-white"
                >
                  Update
                </button>
              </div>
            )}
          </div>

          <div className="mb-12">
            <h3 className="mb-6 bg-slate-900 p-2 text-lg font-medium text-slate-100 dark:text-white">
              Tenant Admins
            </h3>

            {user?.users.map((admin, index) => (
              <div key={admin.id} className="mb-4 flex w-full gap-4">
                <div className="w-full xl:w-1/3">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Name
                  </label>
                  <input
                    value={admin.name}
                    onChange={(e) => handleInputChange(e, index, "name")}
                    type="text"
                    placeholder="Enter contact name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    value={admin.email}
                    onChange={(e) => handleInputChange(e, index, "email")}
                    type="email"
                    placeholder="Enter email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Password
                  </label>
                  <input
                    value={admin.password}
                    type="text"
                    onChange={(e) => handleInputChange(e, index, "password")}
                    placeholder="System generated"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="flex justify-end">
                  <div className="mt-7 flex items-center justify-center">
                    <button
                      onClick={(e) => UpdateTenantAdmin(e, index)} // Pass the index for the specific user
                      className="hover:bg-primary-dark mr-4 rounded bg-primary px-4 py-2 text-white"
                    >
                      Update
                    </button>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-gray-500 hover:bg-gray-700 rounded px-4 py-2 text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Contacts Section */}
          <div className="mb-8">
            <h3 className="mb-6 bg-slate-900 p-2 text-lg font-medium text-slate-100 dark:text-white">
              Contacts
            </h3>
            {/* {user?.TenantOrgContacts.map((contact, index) => (
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
            ))} */}

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
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              <div className="flex items-center justify-center mt-6 ">
       

                  <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => removeContact(index)}
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>





              </div> 
              </div>
            ))}

            {/* <button
              type="button"
              onClick={addContact}
              className="hover:bg-primary-dark mt-4 rounded bg-primary px-4 py-2 text-white"
            >
              Add More Contact
            </button> */}


<svg
  className="fill-current rounded-full bg-slate-100"
  width="22"
  height="22"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  onClick={addContact} // Assuming this is the function to add more contacts
>
  <path
    d="M12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3C13 2.44772 12.5523 2 12 2Z"
    fill="currentColor"
  />
</svg>


            <div className="flex justify-end">
              <div className="mt-7 flex items-center justify-center">
                <button
                  onClick={UpdateOrgContact}
                  className="hover:bg-primary-dark mr-4 rounded bg-primary px-4 py-2 text-white"
                >
                  Submit Contact
                </button>
              </div>
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-700 rounded px-4 py-2 text-white"
              >
                Cancel
              </button>
            </div>



        
          </div>

   
        </form>
      </div>
    </div>
  );
};
export default UpdateTenantModal;
