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
  dayData:any// `booking` holds the entire booking data, including `room`
}


const UpdateEmpDate: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    dayData,
}) => {
  if (!isOpen) return null;





const formatTimeWithAmPm = (dateTime) => {
    const date = new Date(dateTime);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;


  };
  const [mondayStart, setMondayStart] = useState(formatTimeWithAmPm(dayData.mondayStart));
  const [mondayEnd, setMondayEnd] = useState(formatTimeWithAmPm(dayData.mondayEnd));
  
  const [tuesdayStart, setTuesdayStart] = useState(formatTimeWithAmPm(dayData.tuesdayStart));
  const [tuesdayEnd, setTuesdayEnd] = useState(formatTimeWithAmPm(dayData.tuesdayEnd));
  
  const [wednesdayStart, setWednesdayStart] = useState(formatTimeWithAmPm(dayData.wednesdayStart));
  const [wednesdayEnd, setWednesdayEnd] = useState(formatTimeWithAmPm(dayData.wednesdayEnd));
  
  const [thursdayStart, setThursdayStart] = useState(formatTimeWithAmPm(dayData.thursdayStart));
  const [thursdayEnd, setThursdayEnd] = useState(formatTimeWithAmPm(dayData.thursdayEnd));
  
  const [fridayStart, setFridayStart] = useState(formatTimeWithAmPm(dayData.thursdayStart));
  const [fridayEnd, setFridayEnd] = useState(formatTimeWithAmPm(dayData.thursdayEnd));
  
  const [saturdayStart, setSaturdayStart] = useState(formatTimeWithAmPm(dayData.saturdayStart));
  const [saturdayEnd, setSaturdayEnd] = useState(formatTimeWithAmPm(dayData.saturdayEnd));
  
  const [sundayStart, setSundayStart] = useState(formatTimeWithAmPm(dayData.sundayStart));
  const [sundayEnd, setSundayEnd] = useState(formatTimeWithAmPm(dayData.sundayEnd));
  const [empId, setEmpId] = useState(dayData.empId);



  useEffect(() => {
    console.log("nun")
    setMondayStart(formatTimeWithAmPm(dayData.mondayStart));
    setMondayEnd(formatTimeWithAmPm(dayData.mondayEnd));

    setTuesdayStart(formatTimeWithAmPm(dayData.tuesdayStart));
    setTuesdayEnd(formatTimeWithAmPm(dayData.tuesdayEnd));

    setWednesdayStart(formatTimeWithAmPm(dayData.wednesdayStart));
    setWednesdayEnd(formatTimeWithAmPm(dayData.wednesdayEnd));

    setThursdayStart(formatTimeWithAmPm(dayData.thursdayStart));
    setThursdayEnd(formatTimeWithAmPm(dayData.thursdayEnd));

    setSaturdayStart(formatTimeWithAmPm(dayData.saturdayStart));
    setSaturdayEnd(formatTimeWithAmPm(dayData.saturdayEnd));

    setSundayStart(formatTimeWithAmPm(dayData.sundayStart));
    setSundayEnd(formatTimeWithAmPm(dayData.sundayEnd));
    setEmpId(dayData.empId);
  }, [dayData]); // Trigger effect when dayData changes


  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);


  const Update = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(empId);
    if (empId) {
      try {
        const response = await axios.put(
          `${base_url}emp/UpdateSchedular?empId=${empId}`,
          {mondayStart, mondayEnd, tuesdayStart, tuesdayEnd, wednesdayStart, wednesdayEnd,
            thursdayStart,thursdayEnd,fridayStart,fridayEnd,saturdayStart,saturdayEnd,sundayStart,sundayEnd}, 
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

  return (
    <div className="fixed inset-0 top-5 z-50 flex items-center justify-center bg-black bg-opacity-60 ">
  
      
      <div className="relative max-h-[80vh] w-full max-w-4xl overflow-auto rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="text-gray-700 dark:text-gray-300 absolute right-3 top-3 text-3xl font-semibold"
        >
          &times;
        </button>
        <div className="flex items-center justify-between">
        <h3 className="text-gray-900 dark:text-gray-100 mb-6 text-2xl font-semibold">
          Update Date
        </h3>
        <button
              onClick={(e)=>Update(e)}
              className="btn btn-primary btn end
btn-primary m-4 mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
            >
             Update Date
            </button>
        </div>
   
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
                      type="time"
                      value= {mondayStart}
                      onChange={(e) => setMondayStart(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="time"
                      placeholder="Enter your full name"
                    
                      value= {mondayEnd}
                      onChange={(e) => setMondayEnd(e.target.value)}
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
                      type="time"
                      placeholder="Enter your full name"
                      value= {tuesdayStart}
                      onChange={(e) => setTuesdayStart(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="time"
                      placeholder="Enter your full name"
                      value= {tuesdayEnd}
                      onChange={(e) => setTuesdayEnd(e.target.value)}
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
                      type="time"
                      placeholder="Enter your full name"
                      value= {wednesdayStart}
                      onChange={(e) => setWednesdayStart(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="time"
                      placeholder="Enter your full name"
                      value= {wednesdayEnd}
                      onChange={(e) => setWednesdayEnd(e.target.value)}
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
                      type="time"
                      placeholder="Enter your full name"
                      value= {thursdayStart}
                      onChange={(e) => setThursdayStart(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="time"
                      placeholder="Enter your full name"
                      value= {thursdayEnd}
                      onChange={(e) => setThursdayEnd(e.target.value)}
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
                      type="time"
                      placeholder="Enter your full name"
                      value= {fridayStart}
                      onChange={(e) => setFridayStart(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="time"
                      placeholder="Enter your full name"
                      value= {fridayEnd}
                      onChange={(e) => setFridayEnd(e.target.value)}
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
                      type="time"
                      placeholder="Enter your full name"
                      value= {saturdayStart}
                      onChange={(e) => setSaturdayStart(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="time"
                      placeholder="Enter your full name"
                      value= {saturdayEnd}
                      onChange={(e) => setSaturdayEnd(e.target.value)}
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
                      type="time"
                      placeholder="Enter your full name"
                      value= {sundayStart}
                      onChange={(e) => setSundayStart(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                      type="time"
                      placeholder="Enter your full name"
                      value= {sundayEnd}
                      onChange={(e) => setSundayEnd(e.target.value)}
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










