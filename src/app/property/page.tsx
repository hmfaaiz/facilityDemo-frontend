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
import TableProperty from "@/components/Tables/TableProperty";


const FormLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Property" />

   
      <button
        onClick={handleOpenModal}
        className="btn btn-primary mb-4"
      >
        Add Property
      </button>
      <TenatRegisterModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <TableProperty />
    </DefaultLayout >
  );
};

export default FormLayout;
