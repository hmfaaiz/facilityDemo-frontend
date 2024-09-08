import React, { useState, useEffect } from "react";
import { base_url } from "@/utils/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import UpdateFieldSupervisorModal from "../FieldSupervisor/UpdateFieldSupervisorModal";
import UpdateFieldModal from "./UpdateFieldModal";

const AddFieldModal = ({ isOpen, onClose }) => {
  
  const [fieldData, setFieldData] = useState(null); // Update to 'null' initially
  const [filedName, setFieldName] = useState("");
  const [selectedField, setSelectedField] = useState("");



  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);



  const openModal = (field: any) => {
    setSelectedField(field);
    setIsModalOpen(true);
  };




  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);

  const AddField = async (e: any) => {
    e.preventDefault();

    if (filedName) {
      try {
        const response = await axios.post(
          `${base_url}field`,
          {
            name: filedName,
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
          toast.success("Successfully Added", { autoClose: 1000 });
          onClose();
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        toast.error(errorMessage, { autoClose: 2000 });
      }
    } else {
      toast.error("Incomplete Data", { autoClose: 1000 });
    }
  };

  const deleteField = async (fieldId: any) => {
    try {
      const response = await axios.delete(`${base_url}field/${fieldId}`, {
        headers: {
          Authorization: localStorage.getItem("saudit") || "",
        },
      });

      if (response.status === 200) {
        dispatch({
          type: "refresh",
          payload: !reduxData.refresh,
        });
        toast.success("Successfully Deleted", {
            autoClose: 1000, // Duration in milliseconds
          });
         
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const fetchFieldData = async () => {
      try {
        const response = await axios.get(`${base_url}field/`, {
          headers: {
            Authorization: localStorage.getItem("saudit") || "",
          },
        });

        if (response.status === 200) {
          const data = response.data.data;
          if (Array.isArray(data) && data.length > 0) {
            setFieldData(data);
          } else {
            toast.error("Data not found", { autoClose: 1000 });
          }
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        toast.error(errorMessage, { autoClose: 1500 });
      }
    };

    fetchFieldData();
  }, [reduxData.refresh]);

  if (!isOpen) return null;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return (
    <>
      <div className="fixed inset-0 z-50 mt-8 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative max-h-[80vh] w-full max-w-4xl overflow-auto rounded-lg bg-white p-6 shadow-lg">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-2xl text-black dark:text-white"
          >
            &times;
          </button>

          <label className="mt-4 block text-sm font-medium text-black dark:text-white">
            Current Fields <span className="text-meta-1">*</span>
          </label>

          <div>
            <div>
              <table className="mb-5 min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-[#d0d0d0] px-6 py-4 ">
                      SNo.
                    </th>
                    <th className="border-b border-[#d0d0d0] px-6 py-4 ">
                      Field Id
                    </th>
                    <th className="border-b border-[#d0d0d0] px-6 py-4 ">
                      Field Name
                    </th>
                    <th className="border-b border-[#d0d0d0] px-6 py-4 ">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fieldData.map((field: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="items-center justify-center border-b border-[#eee] px-6 py-4 text-center dark:border-strokedark ">
                          {index + 1}
                        </td>
                        <td className="items-center justify-center border-b border-[#eee] px-6 py-4 text-center dark:border-strokedark ">
                          {field.id}
                        </td>

                        <td className="items-center justify-center border-b border-[#eee] px-6 py-4 text-center dark:border-strokedark ">
                          {field.name}
                        </td>
                        <td className="items-center justify-center border-b border-[#eee] px-6 py-4 text-center dark:border-strokedark ">
                          <div className=" space-x-3.5">
                        
                            <button
                              className="hover:text-primary"
                              onClick={() => deleteField(field.id)}
                            >
                              <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
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
                            </button>

                            <button
                              className="hover:text-primary"
                              onClick={() => openModal(field)}
                            >
                              <svg
                                className="fill-current"
                                width="16"
                                height="16"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g
                                  opacity="0.8"
                                  clipPath="url(#clip0_88_10224)"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                    fill=""
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                    fill=""
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_88_10224">
                                    <rect width="20" height="20" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className=" flex items-center justify-center p-5">
            <div className=" flex w-1/3 items-center  gap-4 rounded-[12px] bg-whiter">
              <input
                value={filedName}
                onChange={(e) => setFieldName(e.target.value)}
                type="text"
                placeholder="Enter new field"
                className="rounded border-[0.5px] border-stroke  bg-transparent bg-white px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <div onClick={AddField} className="cursor-pointer">
                Add
              </div>
            </div>
          </div>
          {/* <form action="#">
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Name
                </label>
                <input
                  disabled
                  value={fieldData?.name || ""}
                  type="text"
                  placeholder="Tenant name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Email
                </label>
                <input
                  disabled
                  value={fieldData?.email || ""}
                  type="text"
                  placeholder="Tenant email"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Contact Number
                </label>
                <input
                  disabled
                  value={fieldData?.profile?.mobile || ""}
                  type="text"
                  placeholder="Tenant contact number"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  CNIC
                </label>
                <input
                  disabled
                  value={fieldData?.profile?.cnic || ""}
                  type="number"
                  placeholder="Tenant CNIC"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mt-6 w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Start Date <span className="text-meta-1">*</span>
                </label>
                <input
                  value={start_time}
                  type="date"
                  onChange={(e) => setstart_time(e.target.value)}
                  placeholder="Enter start date"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mt-6 w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  End Date
                </label>
                <input
                  value={end_time}
                  type="date"
                  onChange={(e) => setend_time(e.target.value)}
                  placeholder="Enter end date"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <button
              onClick={Allocate}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Allocate
            </button>
          </form> */}
        </div>
        <UpdateFieldModal
        isOpen={isModalOpen}
        onClose={closeModal}
        field={selectedField}
      />
   
      </div>

      
    </>
  );
};

export default AddFieldModal;
