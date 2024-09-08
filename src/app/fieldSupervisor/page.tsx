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
import FieldSupervisorRegisterModal from "@/components/FieldSupervisor/FieldSupervisorRegisterModal";
import TableFieldSupervisor from "@/components/Tables/TableFieldSupervisor";


const FormLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Field Supervisor" />

   
      <button
        onClick={handleOpenModal}
        className="btn btn-primary mb-4"
      >
        Add Field Supervisor
      </button>
      <FieldSupervisorRegisterModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <TableFieldSupervisor />
    </DefaultLayout >
  );
};

export default FormLayout;
