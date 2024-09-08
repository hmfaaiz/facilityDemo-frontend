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
  user: any;
}

const UpdateFieldSupervisorModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  console.log("user", user);

  const [isAlertOpen, setAlertOpen] = useState(false);

  const [userId, setuserId] = useState<number>(6);
  const [start_date, setstart_date] = useState<string>("");
  const [end_date, setend_date] = useState<string>("");
  const [mobile, setmobile] = useState<string>("");
  const [name, setname] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [cnic, setcnic] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [address, setaddress] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState("");

  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);

  useEffect(() => {
    if (user) {
      const formatDate = (date: string) => {
        const d = new Date(date);
        return d.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM'
      };

      setuserId(user?.id || "");
      setstart_date(formatDate(user?.profile?.start_date) || "");
      setend_date(formatDate(user?.profile?.end_date) || "");
      setmobile(user?.profile?.mobile || "");
      setname(user?.name || "");
      setemail(user?.email || "");
      setcnic(user?.profile?.cnic || "");
      setaddress(user?.profile?.address || "");
      setpassword(user?.password || "");
    }
  }, [user]);

  const Allocate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(
      "tart_date && end_date && mobile && name && email && cnic && address && password",
      start_date,
      end_date,
      mobile,
      name,
      email,
      cnic,
      address,
      password,
    );
    if (mobile && name && email && cnic && password) {
      try {
        const response = await axios.put(
          `${base_url}fieldSupervisor/${user?.id}`,
          {
            userId,

            mobile,
            name,
            email,
            cnic,
            address,
            password,
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
                  Contact Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Contact Number
                </label>
                <input
                  value={mobile}
                  onChange={(e) => setmobile(e.target.value)}
                  type="text"
                  placeholder="Enter your contact number"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Contact Email <span className="text-meta-1">*</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  CNIC
                </label>
                <input
                  value={cnic}
                  onChange={(e) => setcnic(e.target.value)}
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Address
                </label>
                <input
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-2/5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type="text"
                  placeholder="Enter your first name"
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

export default UpdateFieldSupervisorModal;
