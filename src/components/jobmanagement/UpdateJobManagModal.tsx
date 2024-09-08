import React, { useState, useEffect } from "react";
import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import { base_url } from "@/utils/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import SelectJobEmp from "../SelectGroup/SelectJobEmp";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobData: any;
}

const UpdateJobManagModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  jobData,
}) => {
  console.log("user update", jobData);

  const [isAlertOpen, setAlertOpen] = useState(false);

  const [userId, setuserId] = useState<number>();
  const [start_date, setstart_date] = useState<string>("");
  const [end_date, setend_date] = useState<string>("");
  const [complain, setcomplain] = useState<string>("");
  const [name, setname] = useState<string>("");
  const [job_status, setjob_status] = useState<string>("");
  const [cnic, setcnic] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [address, setaddress] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState("");
  const [emp_id, setemp_id] = useState("");

  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);
  console.log("jobData", jobData);
  useEffect(() => {
    if (jobData) {
      // const formatDate = (date: string) => {
      //   const d = new Date(date);
      //   return d.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM'
      // };

      setuserId(jobData?.id || "");
      // setstart_date(formatDate(user?.profile?.start_date) || "");
      // setend_date(formatDate(user?.profile?.end_date) || "");
      setcomplain(jobData?.complain || "");
      setname(jobData?.name || "");
      setjob_status(jobData?.job_status || "");
      setcnic(jobData?.profile?.cnic || "");
      setaddress(jobData?.profile?.address || "");
      setpassword(jobData?.password || "");
    }
  }, [jobData]);

  const Allocate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (complain && name && job_status && password) {
      try {
        const response = await axios.put(
          `${base_url}jobmanagement/GetJob?id=${jobData?.id}`,
          {
            complain,
            name,
            job_status,
          },
          {
            headers: {
              Authorization: localStorage.getItem("saudit") || "",
            },
          },
        );

        if (response.status === 200) {
          toast.success("Successfully updated");
          onClose();
        }
      } catch (error: any) {
        // Handle both response and request errors
        const errorMessage =
          error.response?.data?.message || "Something went wrong";

        toast.error(errorMessage);
      }
    } else {
      toast.error("Please fill in all fields");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 mt-8 flex items-center justify-center bg-black bg-opacity-50 p-5">
        <div className="relative max-h-[80vh] w-3/4 max-w-4xl overflow-auto rounded-lg bg-white p-6 shadow-lg">
      

          <h3 className="mb-4 font-medium text-black dark:text-white">
            Update Job
          </h3>
          <form action="#">
            <div className="mb-4 w-3/4 items-center justify-center gap-4 xl:w-full ">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Complain
              </label>
              <textarea
                value={complain}
                onChange={(e) => setcomplain(e.target.value)}
                placeholder="Enter your job"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Job Status
                </label>
                <input
                  value={job_status}
                  onChange={(e) => setjob_status(e.target.value)}
                  type="text"
                  placeholder="Enter your contact number"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-2/5">
        
          
                            <SelectJobEmp setemp_id={setemp_id} />
                   
                {/* <input
                  value={job_status}
                  onChange={(e) => setjob_status(e.target.value)}
                  type="job_status"
                  placeholder="Enter your job_status address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                /> */}
              </div>

              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Select Contractor
                </label>
                <input
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type="text"
                  placeholder="Enter your password "
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Select Contractor
                </label>
                <input
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type="text"
                  placeholder="Enter your password "
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <button
              onClick={Allocate}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateJobManagModal;
