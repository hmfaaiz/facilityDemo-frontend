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
          .catch((error) => {
            const errorMessage = error.response?.data?.message || "Something went wrong";

            toast.error(errorMessage, {
              autoClose: 1000,
            });
            
          });
      } catch (error) {
   
        toast.error("Something is wrong", {
          autoClose: 1000,
        });
      }
    }
  };

  return (
    <div className="relative h-[100vh] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark  dark:bg-boxdark">
      {/* Background image with blur effect */}
      <div className="absolute inset-0 bg-[url('/images/cover/cover2.png')] bg-cover bg-center blur-sm"></div>

      {/* Content on top */}
      <div className="relative z-10 flex h-full flex-wrap items-center justify-center">
        <div className="flex w-full items-center border-stroke dark:border-strokedark xl:w-1/3 ">
          <div className="flex w-full flex-col items-center rounded-3xl bg-[#0b3d73] p-4 sm:p-12.5 xl:p-17.5">
            <h4 className=" items-center text-2xl font-bold italic text-white dark:text-white sm:text-title-xl2">
              SidTech01
            </h4>
            <div>
              <h2 className="mb-9  font-bold text-white dark:text-white sm:text-title-xl2">
                Facility Managment System
              </h2>
{/* 
              <h2 className="mb-2 font-bold text-white text-lg sm:text-xl dark:text-white">
Sign In
</h2> */}


     

              <form>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-white dark:text-white">
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
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <span className="absolute right-4 top-4">
                      {/* Email Icon */}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-white dark:text-white">
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
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <span className="absolute right-4 top-4">
                      {/* Password Icon */}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => signin(e)}
                  className="w-full cursor-pointer rounded-lg border border-primary bg-slate-300 p-4 text-center text-black transition hover:bg-opacity-90"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark bg-[#0b3d73]">

  //    <div className="absolute inset-0 bg-[url('/images/cover/cover2.png')] bg-cover bg-center">

  //     <div className="flex flex-wrap items-center h-[100vh]  justify-center ">

  //       <div className="w-full border-stroke dark:border-strokedark xl:w-1/3 ">
  //         <div className="w-full p-4 sm:p-12.5 xl:p-17.5 bg-slate-400 rounded-3xl ">
  //           <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
  //             Sign In
  //           </h2>

  //           <form>
  //             <div className="mb-4">
  //               <label className="mb-2.5 block font-medium text-black dark:text-white">
  //                 Email
  //               </label>
  //               <div className="relative">
  //                 <input
  //                   type="email"
  //                   name="email"
  //                   value={formData.email}
  //                   onChange={handleChange}
  //                   required
  //                   placeholder="Enter your email"
  //                   className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
  //                 />

  //                 <span className="absolute right-4 top-4">
  //                   <svg
  //                     className="fill-current"
  //                     width="22"
  //                     height="22"
  //                     viewBox="0 0 22 22"
  //                     fill="none"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                   >
  //                     <g opacity="0.5">
  //                       <path
  //                         d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
  //                         fill=""
  //                       />
  //                     </g>
  //                   </svg>
  //                 </span>
  //               </div>
  //             </div>

  //             <div className="mb-6">
  //               <label className="mb-2.5 block font-medium text-black dark:text-white">
  //                 Password
  //               </label>
  //               <div className="relative">
  //                 <input
  //                   type="password"
  //                   name="password"
  //                   value={formData.password}
  //                   onChange={handleChange}
  //                   required
  //                   placeholder="6+ Characters, 1 Capital letter"
  //                   className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
  //                 />

  //                 <span className="absolute right-4 top-4">
  //                   <svg
  //                     className="fill-current"
  //                     width="22"
  //                     height="22"
  //                     viewBox="0 0 22 22"
  //                     fill="none"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                   >
  //                     <g opacity="0.5">
  //                       <path
  //                         d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
  //                         fill=""
  //                       />
  //                       <path
  //                         d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
  //                         fill=""
  //                       />
  //                     </g>
  //                   </svg>
  //                 </span>
  //               </div>
  //             </div>

  //             <button
  //               onClick={(e) => signin(e)}
  //               className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-center text-white transition hover:bg-opacity-90"
  //             >
  //               Sign In
  //             </button>
  //           </form>
  //         </div>
  //       </div>
  //     </div>

  //     </div>
  //   </div>
  // );
};

export default SignIn;
