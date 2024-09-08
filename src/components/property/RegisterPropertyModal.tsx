import React, { useState, useEffect } from "react";
import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import { base_url } from "@/utils/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { toast } from 'react-toastify';
import SelectProperty from "../SelectGroup/SelectProperty";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
}

const RegisterPropertyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {


  const [property_number, setproperty_number] = useState<string>("");
  const [floor, setfloor] = useState<string>("");
  const [capacity, setcapacity] = useState<string>("");
  const [detail, setdetail] = useState<string>("");
  const [price, setprice] = useState<string>("");


  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);

//   useEffect(() => {
//     if (property) {

//       setproperty_number(property?.property_number || "");
//       setfloor(property?.floor || "");
//       setcapacity(property?.capacity || "");
//       setprice(property?.price || "");
//       setdetail(property?.detail || "");
//     }
//   }, [property]);

  const Allocate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("property_number  && floor && detail && price",property_number,floor ,detail , price)
    
    if (property_number  && floor && detail && price) {
      try {
        const response = await axios.post(
          `${base_url}property`,
          {

            property_number,
            floor,
            detail,capacity,price
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
          toast.success("Successfully Added", {
            autoClose: 1000, // Duration in milliseconds
          });
          onClose();
        }
      } catch (error: any) {
        // Handle both response and request errors
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
       
          toast.error(errorMessage, {
            autoClose: 1000,
          });
      }
    } else {
      toast.error("Incomplete Data", {
        autoClose: 1000,
      });
    }
  };

  if (!isOpen) return null;

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
                  Property Number <span className="text-meta-1">*</span>
                </label>
                <input
                  value={property_number}
                  onChange={(e) => setproperty_number(e.target.value)}
                  type="text"
                  placeholder="Enter your contact number"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Floor <span className="text-meta-1">*</span>
                </label>
                <input
                  value={floor}
                  onChange={(e) => setfloor(e.target.value)}
                  type="floor"
                  placeholder="Enter your floor price"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Capacity
                </label>
                <input
                  value={capacity}
                  onChange={(e) => setcapacity(e.target.value)}
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Price <span className="text-meta-1">*</span>
                </label>
                <input
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                  type="number"
                  placeholder="Enter your first name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              

              <div className="w-full ">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Detail <span className="text-meta-1">*</span>
                </label>
                <textarea
                value={detail}
                onChange={(e) => setdetail(e.target.value)}
                placeholder="Enter detail"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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

export default RegisterPropertyModal;
