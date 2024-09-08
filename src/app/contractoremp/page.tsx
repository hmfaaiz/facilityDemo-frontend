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
import EmployeeRegisterModal from "@/components/ContEmp/EmployeeRegisterModal";
import TableEmployee from "@/components/Tables/TableContEmp";
import EmployeeTypeModal from "@/components/Employee/EmployeeTypeModal";


const FormLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleEmpTypeOpenModal = () => setIsTypeModalOpen(true);
  const handleEmpTypeCloseModal = () => setIsTypeModalOpen(false);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Contractor's Employee" />

   
      <button
        onClick={handleOpenModal}
        className="btn btn-primary mb-4"
      >
        Add Employee
      </button>
   
      {/* <button
        onClick={handleEmpTypeOpenModal}
        className="btn btn-primary mb-4"
      >
        Add Employee Type
      </button> */}
      <EmployeeRegisterModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <EmployeeTypeModal isOpen={isTypeModalOpen} onClose={handleEmpTypeCloseModal} />
      <TableEmployee />
    </DefaultLayout >
  );
};

export default FormLayout;
