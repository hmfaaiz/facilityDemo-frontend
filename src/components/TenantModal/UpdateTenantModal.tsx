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
    }
  }, [user]);

  const handleContactChange = (index: number, field: string, value: string) => {
    const newContacts = contacts.map((contact, i) =>
      i === index ? { ...contact, [field]: value } : contact,
    );
    setContacts(newContacts);
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
            {user?.TenantOrgContacts.map((contact, index) => (
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
          
              <div className="mt-7 flex items-center justify-center">
                <button
                  onClick={UpdateOrgContact}
                  className="hover:bg-primary-dark mr-4 rounded  bg-primary px-4 py-2 text-white"
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
        </form>
      </div>
    </div>
  );
};
export default UpdateTenantModal;
