"use client"; // Ensure this is at the top to make this a Client Component

import { base_url } from "@/utils/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface UserDetail {
  id: number;
  roleId: number;
  start_date: string;
  end_date: string;
  name: string;
  mobile: string;
  email: string;
  address: string;
  cnic: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDetail; // `booking` holds the entire booking data, including `room`
}

const UpdateEmpDate: React.FC<ModalProps> = ({
    isOpen,
    onClose,
}) => {
  if (!isOpen) return null;
  const [dayData, setDayData] = useState([]);
  const [empId, setempId] = useState();

  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);

  const formatTimeWithAmPm = (date: string | undefined): string => {
    if (!date) return "";

    const d = new Date(date);

    // Extract hours, minutes, and determine AM/PM
    let hours = d.getUTCHours();
    const minutes = String(d.getUTCMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format hours as two digits
    const formattedHours = String(hours).padStart(2, "0");

    return `${formattedHours}:${minutes} ${ampm}`;
  };







  return (
    <div className="fixed inset-0 top-5 z-50 flex items-center justify-center bg-black bg-opacity-60 ">
      <div className="relative max-h-[80vh] w-full max-w-4xl overflow-auto rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="text-gray-700 dark:text-gray-300 absolute right-3 top-3 text-3xl font-semibold"
        >
          &times;
        </button>
        <h3 className="text-gray-900 dark:text-gray-100 mb-6 text-2xl font-semibold">
          Update Date
        </h3>
        <div className="space-y-6">


          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                    S.No.
                  </th>
                  <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Day
                  </th>
                  <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Start
                  </th>
                  <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                    End
                  </th>
                  {/* <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Today
                  </th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      1
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      Monday
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                

                    <input
                      type="date"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="date"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      2
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      Tuesday
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="date"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="date"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      3
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      Wednesday
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="date"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="date"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      4
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      Thursday
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="date"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="date"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      5
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      Friday
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="date"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="date"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      6
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      Saturday
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="date"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="date"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      7
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      Sunday
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="date"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="date"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
        
           
          </div>
        </div>
      </div>
    </div>

  );
};

export default UpdateEmpDate;
