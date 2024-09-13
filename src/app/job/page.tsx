"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import TableThree from "@/components/Tables/TableThree";
import TenatRegisterModal from '../../components/TenantModal/TenatRegisterModal';
import { useState } from "react";
import TableReserved from "@/components/Tables/TableReserved";
import TableContractor from "@/components/Tables/TableContractor";
import ContractorRegisterModal from "@/components/Contractor/ContractorRegisterModal";
import JobRegisterModal from "@/components/Job/JobRegisterModal";
import TableJob from "@/components/Tables/TableJob";


const FormLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Job" />

   
      <button
        onClick={handleOpenModal}
        className="btn btn-primary btn 
      btn-primary m-4 mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        Create New Job
      </button>
      <JobRegisterModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <TableJob />
    </DefaultLayout >
  );
};

export default FormLayout;
