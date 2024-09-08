import React, { useState, useEffect } from "react";
import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import { base_url } from "@/utils/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import SelectProperty from "../SelectGroup/SelectProperty";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: any;
}

const UpdateFieldModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  field,
}) => {


  const [fieldName, setfieldName] = useState<string>(field.name);


  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);

useEffect(()=>{
    setfieldName(field.name)
},[field])
  const UpdateField = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (fieldName) {
      try {
        const response = await axios.put(
          `${base_url}field/${field?.id}`,
          {
            name:fieldName,
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
            autoClose: 1000, // Duration in milliseconds
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
    } else {
      
      toast.error("Please fill in all fields", {
        autoClose: 1000,
      });
    }
  };





  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 mt-8 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative max-h-[40vh] w-full max-w-xl overflow-auto rounded-lg bg-white p-6 shadow-lg">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-2xl text-black dark:text-white"
          >
            &times;
          </button>

          <form action="#">
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
       

              <div className="w-full xl:w-full">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Field Name
                </label>
                <input
                  value={fieldName}
                  onChange={(e) => setfieldName(e.target.value)}
                  type="text"
                  placeholder="Enter field name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
           
           
            </div>
            <button
              onClick={UpdateField}
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

export default UpdateFieldModal;
