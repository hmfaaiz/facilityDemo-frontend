import React, { useState } from "react";
import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import { base_url } from "@/utils/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JobRegisterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [job, setjob] = useState<string>("");

  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);

  const Allocate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form behavior if applicable
    if (job) {
      try {
        const response = await axios.post(
          `${base_url}job`,
          {
            job,
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
          toast.success("Successfully updated", {
            autoClose: 1000,
          });
          onClose();
        }
        // } catch (error) {
        //     alert('Something went wrong');
        // }
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
    <div className="fixed inset-0  z-50 mt-8 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-h-[80vh] w-full max-w-4xl overflow-auto rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-2xl text-black dark:text-white"
        >
          &times;
        </button>

        <form action="#">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <div className="w-full xl:w-3/2 ">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Job
              </label>
              <textarea
                value={job}
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

export default JobRegisterModal;
