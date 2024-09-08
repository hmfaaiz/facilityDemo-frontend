"use client"


import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Settings = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [name, setName] = useState(profileData.name);
  const [email, setEmail] = useState(profileData.email);
  const [password, setPassword] = useState(profileData.password);

  const reduxData = useSelector((state:any) => state);
  
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "get",
      url: `${base_url}auth/MyProfile`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("saudit")}`, // Correct token format
      },
    })
      .then((res) => {
        if (res.data && res.data.data) {
          setProfileData(res.data.data);
        } else {
          console.log("No data found");
        }
      })
      .catch((err) => {
        console.log("Error fetching profile data:", err);
      });
  }, [reduxData.refresh]);

  useEffect(() => {
    setName(profileData.name || '');
    setEmail(profileData.email || '');
    setPassword(profileData.password || '');
  }, [profileData]);



  const updateProfile=async(e:any)=>{
   
      e.preventDefault();
      if (name && email && password) {
        try {
          const response = await axios.put(
            `${base_url}auth/UpdateProfile`,
            { 
              name,
               email,
              password,
            },
            {
              headers: {
                Authorization: localStorage.getItem("saudit") || '',
              },
            }
          );
  
          if (response.status === 200) {

            dispatch({
              type: "name",
              payload: response.data.data.name,
            });
            dispatch({
              type: "role_name",
              payload: response.data.data.role,
            });
          
            dispatch({
              type: "refresh",
              payload: !(reduxData.refresh),
            });
       
            toast.success("Successfully updated");
          
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Please fill in all fields");
      }
  
  

  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-370">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          {/* SVG icon */}
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="fullName"
                          id="fullName"
                          placeholder="Devid Jhon"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          {/* SVG icon */}
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="email"
                          name="emailAddress"
                          id="emailAddress"
                          placeholder="devidjond45@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Password
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="+990 3343 7865"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    {/* <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button" // Changed to type="button" to prevent form submission
                    >
                      Cancel
                    </button> */}
                    <button
                    onClick={(e)=>updateProfile(e)}
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
