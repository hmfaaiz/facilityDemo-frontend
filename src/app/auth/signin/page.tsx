"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { base_url } from "../../../utils/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignIn: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("saudit")) {
      router.push("/");
    }
  }, [router]);

  const dispatch = useDispatch();
  const reduxData = useSelector((x: any) => x);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const signin = async (e: any) => {
    e.preventDefault();
    if (formData.email) {
      try {
        axios
          .post(`${base_url}auth/signin`, {
            email: formData.email,
            password: formData.password,
          })
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("saudit", res.data.token);
              dispatch({
                type: "name",
                payload: res.data.data.name,
              });
              dispatch({
                type: "role_name",
                payload: res.data.data.role.roleName,
              });
              dispatch({
                type: "permission",
                payload: res.data.permission,
              });
              router.push("/home");
            }
          })
          .catch((err) => {
            const errorMessage =
              err.response?.data?.message || "Something went wrong";

            toast.error(errorMessage);
          });
      } catch (error) {
        toast.error("Something is wrong");
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center bg-red h-[100vh]">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="px-26 py-17.5 text-center">
            <p className="2xl:px-20">Sidtech01 Company Limited</p>

            <span className="mt-15 inline-block">
              <svg
                version="1.1"
                id="Layer_1"
                className="fill-current"
                width="350"
                height="350"
                viewBox="0 0 110 150"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path d="M89.41,24.74l0,.09a147,147,0,0,0-26.6-1.78,166.76,166.76,0,0,0-30.24,2.86v0C24.69-11,99.76-5.77,89.41,24.74ZM47.72,116c-2.19,1.66-4.64,3-8.24,1.61a9.75,9.75,0,0,1-5.32-5.51c9.3,4.21,12.63-7.89,1.62-8.25,3.36-4,8.32-4,12.33-1a13.59,13.59,0,0,0,4,2.41,6.52,6.52,0,0,0,2,.21c2.56,0,11.61-.28,14.32-.34,5.11-.1,7.7-8,15-5.19a9.75,9.75,0,0,1,5.32,5.51c-9.3-4.21-12.63,7.89-1.62,8.25-3.36,4.05-8.32,4-12.33,1.05-1.75-1.31-2.86-2.84-6.32-2.74-2.41.1-11.43.25-13.83.42a6.93,6.93,0,0,0-2.2.38c-1.09.42-2.08,1.27-4.67,3.24ZM29.18,96.18a2.72,2.72,0,1,1-2.73,2.72,2.72,2.72,0,0,1,2.73-2.72Zm65.58,0A2.72,2.72,0,1,1,92,98.9a2.71,2.71,0,0,1,2.72-2.72Zm-49-30c-4.56,3.2-9.33,4.39-14,5.24l6.65,18.83H86.71l5.23-18.7c-4.15-.42-8-.75-11.06-2.35A13.45,13.45,0,0,1,77.2,65.6L77,62.49a18.92,18.92,0,0,0,3-3.07c2-2.5,2.77-6.51,3.73-9.78.19-.69.38-1.38.62-2.07,1.88-.19,3.53-2.31,4.53-4.92A17.61,17.61,0,0,0,90,38.08a6.94,6.94,0,0,0-.53-3.92,2.41,2.41,0,0,0-2-1.34,15.83,15.83,0,0,1,.75-4.13,146,146,0,0,0-25.4-1.62,162.26,162.26,0,0,0-29.45,2.79l.86,4.07a7.66,7.66,0,0,0-.62,4.57,15.56,15.56,0,0,0,1.5,5.15c1,2,2.42,3.34,4.07,3.34.16.46.35,1,.5,1.46,1.35,4,2.34,8.39,4.76,11.24A19,19,0,0,0,46.7,62l-.19,3.5c-.23.22-.47.43-.72.65ZM24.1,72.81C15.52,74.76,8,79,3.76,97.6L0,118.71H20.4V94.18a4,4,0,0,1,4-4h4.24c-.18-6.9-3.63-14.14-4.51-17.4Zm79.44,45.9h19.34l-4-22.19c-3.71-16.66-11.19-21.8-19-23.77-.79,3.27-3.21,11-3.34,17.46h3a4,4,0,0,1,4,4v24.53ZM53.33,13.34H69.55a.69.69,0,0,1,.69.69v3.74a.7.7,0,0,1-.69.7H53.33a.7.7,0,0,1-.69-.7V14a.69.69,0,0,1,.69-.69ZM74.58,63.72c-4.34,2.89-7,4.48-12.59,4.34s-8.31-1.93-12.67-4.68C49,81.59,75,82.67,74.58,63.72Zm6.5-14.65c.23-.81.5-1.66.8-2.65a.89.89,0,0,1,1-.66c1.27.23,2.54-1.61,3.42-3.84a16.1,16.1,0,0,0,1-4.11,5.67,5.67,0,0,0-.34-3c-.35-.63-1.29-.26-2-.88-3.64,9.65-35.36,14-48.34.73a6,6,0,0,0-.39,3.5,14.37,14.37,0,0,0,1.35,4.57c.8,1.57,1.84,2.65,2.88,2.38a.85.85,0,0,1,1,.54c.31.84.5,1.49.73,2.15,6.61,20.94,32.17,22.61,38.9,1.23Z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 bg-blue-300">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In to Facility Management System
            </h2>

            <form>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="6+ Characters, 1 Capital letter"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                          fill=""
                        />
                        <path
                          d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => signin(e)}
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-center text-white transition hover:bg-opacity-90"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
