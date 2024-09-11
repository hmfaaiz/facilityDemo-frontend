import React, { useState, useEffect } from "react";
import { base_url } from "@/utils/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllocateBookingModal = ({ isOpen, onClose, property }) => {
  const [detail, setDetail] = useState("");
  const [tenantData, setTenantData] = useState(null); // Update to 'null' initially
  const [searchCNIC, setSearchCNIC] = useState("");
  const [property_id, setproperty_id] = useState("");
  const [start_time, setstart_time] = useState("");
  const [end_time, setend_time] = useState("");
  const [tenantId, settenantId] = useState("");

  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);


  useEffect(() => {
    if (property) {
      setDetail(property.detail || {});
      setstart_time(formatDate(property.start_time));
      setend_time(formatDate(property.end_time));
    }
  }, [property]);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (property) {
      setDetail(property?.detail || "");
      console.log("update property", property.assignTo.name);
    }
  }, [property]);

  const Update = async (e: any) => {
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
        const response = await axios.put(
          `${base_url}propertymanagement/UpdateBooking`,
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


     
          <form action="#">
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Name
                </label>
                <input
                  disabled
                  value={property?.assignTo?.name
                    || ""}
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
                  value={property?.assignTo?.type || ""}
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
                  value={property?.assignTo?.cnic ||detail?.assignTo?.ntn}
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
              onClick={Update}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AllocateBookingModal;
