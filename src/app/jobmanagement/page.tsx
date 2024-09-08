"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import TableThree from "@/components/Tables/TableThree";
import TenatRegisterModal from '../../components/TenantModal/TenatRegisterModal';
import { useEffect, useState } from "react";
import TableReserved from "@/components/Tables/TableReserved";
import TableContractor from "@/components/Tables/TableContractor";
import ContractorRegisterModal from "@/components/Contractor/ContractorRegisterModal";
import JobRegisterModal from "@/components/Job/JobRegisterModal";
import TableJob from "@/components/Tables/TableJob";
import TableJobManagement from "@/components/Tables/TableJobmanagement";
import { base_url } from "@/utils/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


const FormLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (status:any) =>{
    setJobStatus(status)
    setIsModalOpen(true);
  }


    

   
  const handleCloseModal = () => setIsModalOpen(false);
  const [jobData, setjobData] = useState([]);
  const [jobStatus, setJobStatus] = useState("Pending");
  
  const reduxData = useSelector((state: any) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("jobStatus",jobStatus)
    axios({
      method: "get",
      url: `${base_url}jobmanagement/${jobStatus}`, // Dynamically set the URL based on jobStatus
      headers: {
        token: localStorage.getItem("saudit"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setjobData(res.data.data);
          console.log("data jobStatus",jobStatus)
        }
      })
      .catch((err) => {
        console.log("Something is wrong");
      });
  }, [reduxData.refresh, jobStatus]);

  return (
    <DefaultLayout>
  <Breadcrumb pageName={`Job Management / ${jobStatus}`} />


      <button
        onClick={() => handleOpenModal("Pending")} // Set status to "Pending" on click
        className="btn btn-primary m-4 
        btn btn-primary mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        Pending Job
      </button>
      <button
        onClick={() => handleOpenModal("InProcess")} // Set status to "InProcess" on click
        className="btn btn-primary m-4 
        btn btn-primary mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        In Process
      </button>
      <button
        onClick={() => handleOpenModal("Archive")} // Set status to "Archive" on click
        className="btn btn-primary m-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        Archive Job
      </button>

      {jobData.length >0 ? ( // Render the table if data exists
        <TableJobManagement jobData={jobData} />
      ) : (
        <p>No jobs available for {jobStatus}.</p> // Show message if no data is found
      )}
    </DefaultLayout>
  );
};

export default FormLayout;