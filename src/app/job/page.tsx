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
        className="btn btn-primary mb-4"
      >
        Create New Job
      </button>
      <JobRegisterModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <TableJob />
    </DefaultLayout >
  );
};

export default FormLayout;
