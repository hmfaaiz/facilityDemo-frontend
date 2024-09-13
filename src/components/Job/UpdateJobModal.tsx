import React, { useState, useEffect } from "react";
import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import { base_url } from "@/utils/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  cureewntjob: any;
}

const UpdateJobModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  cureewntjob,
}) => {
  const [isAlertOpen, setAlertOpen] = useState(false);

  const [jobId, setjobId] = useState<number>();
  const [comp_job, setjob] = useState<string>("");
  console.log("cureewntjob", cureewntjob);
  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);

  useEffect(() => {
    if (cureewntjob) {
      setjob(cureewntjob?.complain || "");
    }
  }, [cureewntjob]);

  //   const Allocate = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault();
  // console.log("current job",comp_job)
  //     if (comp_job) {
  //       console.log("current job",comp_job)
  //       try {
  //         const response = await axios.put(
  //           `${base_url}job/${cureewntjob?.id}`,
  //           {
  //             comp_job,
  //           },
  //           {
  //             headers: {
  //               Authorization: localStorage.getItem("saudit") || "",
  //             },
  //           },
  //         );

  //         if (response.status === 200) {
  //           dispatch({
  //             type: "refresh",
  //             payload: !reduxData.refresh,
  //           });
  //           toast.success("Successfully updated", {
  //             autoClose: 1000, // Duration in milliseconds
  //           });
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

  const Allocate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("Current job:", comp_job);

    if (comp_job) {
      try {
        // First attempt with the 'job' path
        const response = await axios.put(
          `${base_url}job/${cureewntjob?.id}`,
          { comp_job },
          {
            headers: {
              Authorization: localStorage.getItem("saudit") || "",
            },
          },
        );

        if (response.status === 200) {
          handleSuccess();
        }
      } catch (error: any) {
        console.error(
          "Failed with path 'job'. Trying 'inspectionReport' path.",
        );

        // If the first path fails, attempt with the 'inspectionReport' path
        try {
          const response = await axios.put(
            `${base_url}inspectionReport/${cureewntjob?.id}`,
            { comp_job },
            {
              headers: {
                Authorization: localStorage.getItem("saudit") || "",
              },
            },
          );

          if (response.status === 200) {
            handleSuccess();
          }
        } catch (secondError: any) {
          const errorMessage = error.response?.data?.message || "Something went wrong";

          toast.error(errorMessage, {
            autoClose: 1000,
          });
          
        }
      }
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const handleSuccess = () => {
    dispatch({
      type: "refresh",
      payload: !reduxData.refresh,
    });
    toast.success("Successfully updated", {
      autoClose: 1000, // Duration in milliseconds
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 mt-8 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-h-[80vh] w-full max-w-4xl overflow-auto rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-2xl text-black dark:text-white"
        >
          &times;
        </button>

        <form action="#">
          <div className="mb-8 flex  flex-wrap items-center justify-center gap-4">
            <div className="xl:w-3/2 w-full ">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                job
              </label>
              <textarea
                value={comp_job}
                onChange={(e) => setjob(e.target.value)}
                placeholder="Enter your job"
                className="w-full rounded border-[1.5px] h-[50vh] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
  );
};

export default UpdateJobModal;
