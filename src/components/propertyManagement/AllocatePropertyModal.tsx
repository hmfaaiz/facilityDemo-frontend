import React, { useState, useEffect } from "react";
import { base_url } from "@/utils/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllocatePropertyModal = ({ isOpen, onClose, property }) => {
  const [detail, setDetail] = useState("");
  const [tenantData, setTenantData] = useState(null); // Update to 'null' initially
  const [searchCNIC, setSearchCNIC] = useState("");
  const [property_id, setproperty_id] = useState("");
  const [start_time, setstart_time] = useState("");
  const [end_time, setend_time] = useState("");
  const [tenantId, settenantId] = useState("");

  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);
  console.log("property", property);
  useEffect(() => {
    if (property) {
      setDetail(property?.detail || "");
    }
  }, [property]);

  const Allocate = async (e: any) => {
    e.preventDefault();
    console.log(
      "property_id",
      property.id,
      "start_time",
      start_time,
      "tenantData",
      tenantData,
    );
    if (property.id && start_time && tenantData) {
      try {
        const response = await axios.post(
          `${base_url}propertymanagement`,
          {
            property_id: property.id,
            start_time,
            tenantId: tenantData.id,
            end_time,
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
          toast.success("Successfully Booked", { autoClose: 1000 });
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

  const SearchTenant = async (e: any) => {
    e.preventDefault();
    if (searchCNIC) {
      try {
        const response = await axios.get(
          `${base_url}tenant/?cnic=${searchCNIC}`,
          {
            headers: {
              Authorization: localStorage.getItem("saudit") || "",
            },
          },
        );
        if (response.status === 200) {
          const data = response.data.data;
          if (Array.isArray(data) && data.length > 0) {
            setTenantData(data[0] || {});
          } else {
            toast.error("Data not found", { autoClose: 1000 });
         
          }
        
       // Access the first tenant or an empty object
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        toast.error(errorMessage, { autoClose: 1500 });
      }
    } else {
      toast.error("Incomplete Data", { autoClose: 1500 });
    }
  };

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

          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Detail <span className="text-meta-1">*</span>
            </label>
            <textarea
              disabled
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Enter detail"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
    
          
          <label className="mt-4 block text-sm font-medium text-black dark:text-white">
            Booking <span className="text-meta-1">*</span>
          </label>

          <div>
            <div>
              <table className="mb-5 min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-[#d0d0d0] px-6 py-4 ">
                      Booking Id
                    </th>
                    <th className="border-b border-[#d0d0d0] px-6 py-4 ">
                      Start Date
                    </th>
                    <th className="border-b border-[#d0d0d0] px-6 py-4 ">
                      End Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {property.bookings
                    .filter((date: any) => {
                      const bookingStartDate = new Date(date.start_time);
                      bookingStartDate.setUTCHours(0, 0, 0, 0);
                      let bookingEndDate = new Date(
                        date.end_time || Date.now(),
                      );
                      bookingEndDate.setUTCHours(0, 0, 0, 0);

                      return (
                        // date.is_active === true && bookingStartDate >= today

                        date.is_active &&
                        bookingStartDate <= today &&
                        bookingEndDate >= today ||
                        bookingStartDate >= today
                      );
                    })
                    .map((date: any, index: number) => {
                      const formattedStartDate = new Date(date.start_time)
                        .toISOString()
                        .split("T")[0];
                      const formattedEndDate = date.end_time
                        ? new Date(date.end_time).toISOString().split("T")[0]
                        : "N/A";

                      return (
                        <>
                          <tr key={index}>
                            <td className="items-center justify-center border-b border-[#eee] px-6 py-4 text-center dark:border-strokedark ">
                              {date.id}
                            </td>
                            <td className="flex items-center justify-center border-b border-[#eee] px-6 py-4 text-center dark:border-strokedark ">
                              {formattedStartDate}
                            </td>
                            <td className="items-center justify-center border-b border-[#eee] px-6  py-4  text-center dark:border-strokedark ">
                              {formattedEndDate}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        
          
        


          <div className=" flex items-center justify-center p-5">
            <div className=" flex w-1/3 items-center  gap-4 rounded-[12px] bg-whiter">
              <input
                value={searchCNIC}
                onChange={(e) => setSearchCNIC(e.target.value)}
                type="text"
                placeholder="Enter CNIC"
                className="rounded border-[0.5px] border-stroke  bg-transparent bg-white px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <div onClick={SearchTenant} className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.35-1.35L21 21z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <form action="#">
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Name
                </label>
                <input
                  disabled
                  value={tenantData?.name || ""}
                  type="text"
                  placeholder="Tenant name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                 Type
                </label>
                <input
                  disabled
                  value={tenantData?.type || ""}
                  type="text"
                  placeholder="Tenant email"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                 CNIC / NTN
                </label>
                <input
                  disabled
                  value={tenantData?.cnic ||tenantData?.ntn}
                  type="text"
                  placeholder="Tenant contact number"
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
          </form>
        </div>
      </div>
    </>
  );
};

export default AllocatePropertyModal;
