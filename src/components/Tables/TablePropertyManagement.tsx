"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { base_url } from "@/utils/api";
import UpdateTenantModal from "../TenantModal/UpdateTenantModal";
import ViewTenantDetail from "../TenantModal/ViewTenantDetail";
import { toast } from "react-toastify";
import ViewPropertyDetail from "../property/ViewPropertyDetail";
import UpdatePropertyModal from "../property/UpdatePropertyModal";
import AllocatePropertyModal from "../propertyManagement/AllocatePropertyModal";

const TableProperty = () => {
  const formatDateTime = (dateTimeString: any) => {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Add leading zero if needed
    const period = hours >= 12 ? " PM" : " AM";
    const formattedHours = ((hours + 11) % 12) + 1; // Convert 24-hour time to 12-hour time

    return `${day}/${month}/${year} ${formattedHours}:${minutes}${period}`;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setselectedProperty] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [propertyData, setpropertyData] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const closeModal = () => setIsModalOpen(false);
  const closeViewModal = () => setIsViewModalOpen(false);

  const openViewModal = (property: any) => {
    setselectedProperty(property);
    setIsViewModalOpen(true);
  };

  const openModal = (property: any) => {
    setselectedProperty(property);
    setIsModalOpen(true);
  };

  const reduxData = useSelector((state: any) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "get",
      url: `${base_url}propertymanagement`,
      headers: {
        token: localStorage.getItem("saudit"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setpropertyData(res.data.data);
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";

        toast.error(errorMessage, {
          autoClose: 1000,
        });
      });
  }, [reduxData.refresh]);

  // Handle date filtering
  const filteredpropertyData = propertyData?.filter((booking: any) => {
    const bookingStart = new Date(booking.start_time);
    const bookingEnd = new Date(booking.end_time);
    const start = new Date(startDate);
    const end = new Date(endDate);

    // If no dates are selected, show all bookings
    if (!startDate && !endDate) return true;
    // Filter based on the selected date range
    return (
      (!startDate || bookingStart >= start) && (!endDate || bookingEnd <= end)
    );
  });

  const deleteProperty = async (propertyId: any) => {
    try {
      const response = await axios.delete(
        `${base_url}property/?id=${propertyId}`,
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
        toast.success("Successfully Deleted", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      toast.error(errorMessage, {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-4">
        <label htmlFor="start-date" className="mr-2">
          Start Date:
        </label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mr-4"
        />
        <label htmlFor="end-date" className="mr-2">
          End Date:
        </label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                SNo.
              </th>
              <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                Property No.
              </th>
              <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                Floor No.
              </th>
              <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                Capacity
              </th>
              <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                Is Engaged Right Now
              </th>
    

              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredpropertyData?.map((property: any, index: any) => (
              <tr key={property.id}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {index + 1}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {property.property_number}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {property.floor}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {property.capacity}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {property.engaged? "Yes":"NO"}
                  </h5>
                </td>


                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                   
                    <button
                      className="hover:text-primary"
                      onClick={() => openModal(property)}
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
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AllocatePropertyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        property={selectedProperty}
      />
      <ViewPropertyDetail
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        property={selectedProperty}
      />
    </div>
  );
};

export default TableProperty;
