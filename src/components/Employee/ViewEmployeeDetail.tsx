"use client"; // Ensure this is at the top to make this a Client Component

import { base_url } from "@/utils/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import UpdateEmpDate from "./UpdateEmpDate";

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

const ViewEmployeeDetail: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  if (!isOpen) return null;
  const [dayData, setDayData] = useState([]);
  const [empId, setempId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);
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

  const handleOpenModal = () => setIsModalOpen(true);

  const MarkAbsent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(empId);
    if (empId) {
      try {
        const response = await axios.put(
          `${base_url}emp/AbsentMark?empId=${empId}`,
          {}, // Request body goes here (empty object if there's no body)
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
          toast.success("Successfully Marked", {
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
    }
  };
  const MarkPresent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(empId);
    if (empId) {
      try {
        const response = await axios.put(
          `${base_url}emp/PresentMark?empId=${empId}`,
          {}, // Request body goes here (empty object if there's no body)
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
          toast.success("Successfully Marked", {
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
    }
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${base_url}emp/GetSchedular?empId=${user.id}`,
      headers: {
        token: localStorage.getItem("saudit"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("res.data.schedule", res.data.schedule);
          setDayData(res.data.schedule);
          setempId(res.data.schedule.empId);
        }
      })
      .catch((error) => {
        console.log(error);
        // const errorMessage =
        //   error.response?.data?.message || "Something went wrong";

        // toast.error(errorMessage, {
        //   autoClose: 1000,
        // });
      });
  }, [reduxData.refresh]);

  return (
    <div className="fixed inset-0 top-5 z-50 flex items-center justify-center bg-black bg-opacity-60 ">
      <div className="relative max-h-[80vh] w-full max-w-3xl overflow-auto rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="text-gray-700 dark:text-gray-300 absolute right-3 top-3 text-3xl font-semibold"
        >
          &times;
        </button>
        <h3 className="text-gray-900 dark:text-gray-100 mb-6 text-2xl font-semibold">
          User Details
        </h3>
        <div className="space-y-6">
          {/* Room Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              User Information:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Employee Number:</strong> {user?.id}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Name:</strong> {user?.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Password:</strong> {user?.password}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Contact Number:</strong> {user?.mobile}
            </p>
          </div>

          {/* <p className="text-gray-700 dark:text-gray-300">
              <strong>Today is Present/Absent:</strong> {dayData.isAbsent}
            </p> */}

          <p className="text-gray-700 dark:text-gray-300">
            <strong>Today is Present/Absent:</strong>{" "}
            {(() => {
              const dateFromData = new Date(dayData.isAbsent); // dayData.isAbsent contains the date string
              const today = new Date();

              // Normalize both dates to ignore time differences
              const isSameDay =
                dateFromData.toDateString() === today.toDateString();

              return isSameDay ? (
                <button
                  onClick={MarkPresent}
                  className="hover:bg-primary-dark mr-4 rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Mark Present
                </button>
              ) : (
                <button
                  onClick={MarkAbsent}
                  className="hover:bg-primary-dark mr-4 rounded bg-red px-4 py-2 text-white"
                >
                  Mark Absent
                </button>
              );
            })()}
          </p>

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
                    <h5 className="font-medium text-black dark:text-white">
                      {formatTimeWithAmPm(dayData.mondayStart)}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {formatTimeWithAmPm(dayData.mondayEnd)}
                    </h5>
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
                    <h5 className="font-medium text-black dark:text-white">
                      {formatTimeWithAmPm(dayData.tuesdayStart)}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {formatTimeWithAmPm(dayData.tuesdayEnd)}
                    </h5>
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
                    <h5 className="font-medium text-black dark:text-white">
                      {formatTimeWithAmPm(dayData.wednesdayStart)}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {formatTimeWithAmPm(dayData.wednesdayEnd)}
                    </h5>
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
                    <h5 className="font-medium text-black dark:text-white">
                      {formatTimeWithAmPm(dayData.thursdayStart)}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {formatTimeWithAmPm(dayData.thursdayEnd)}
                    </h5>
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
                    <h5 className="font-medium text-black dark:text-white">
                      {formatTimeWithAmPm(dayData.fridayStart)}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {formatTimeWithAmPm(dayData.fridayEnd)}
                    </h5>
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
                    <h5 className="font-medium text-black dark:text-white">
                      {formatTimeWithAmPm(dayData.saturdayStart)}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {formatTimeWithAmPm(dayData.saturdayEnd)}
                    </h5>
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
                    <h5 className="font-medium text-black dark:text-white">
                      {formatTimeWithAmPm(dayData.sundayStart)}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {formatTimeWithAmPm(dayData.sundayEnd)}
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handleOpenModal}
              className="btn btn-primary btn 
btn-primary m-4 mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
            >
              Set
            </button>
            ;
          </div>
        </div>
      </div>

      {isModalOpen && (
        <UpdateEmpDate
          dayData={dayData}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ViewEmployeeDetail;
