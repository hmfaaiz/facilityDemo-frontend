"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import TableThree from "@/components/Tables/TableThree";
import TenatRegisterModal from "../../components/TenantModal/TenatRegisterModal";
import { useState } from "react";
import TableReserved from "@/components/Tables/TableReserved";
import TableContractor from "@/components/Tables/TableContractor";
import ContractorRegisterModal from "@/components/Contractor/ContractorRegisterModal";
import EmployeeRegisterModal from "@/components/Employee/EmployeeRegisterModal";
import TableEmployee from "@/components/Tables/TableEmployee";
import EmployeeTypeModal from "@/components/Employee/EmployeeTypeModal";
import TableContEmployee from "@/components/Tables/TableContEmployee";

const FormLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isEmpTable, setIsEmpTable] = useState(true);
  const [isContEmpTable, setIsContEmpTable] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleEmpTypeOpenModal = () => setIsTypeModalOpen(true);
  const handleEmpTypeCloseModal = () => setIsTypeModalOpen(false);

  const openEmpTable = () => {
    setIsEmpTable(true);
    setIsContEmpTable(false);
  };
  const openContTable = () => {
    setIsEmpTable(false);
    setIsContEmpTable(true);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Employee" />

      <button
        onClick={handleOpenModal}
        className="btn btn-primary btn 
      btn-primary m-4 mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        Add Employee
      </button>

      <button
        onClick={openEmpTable}
        className="btn btn-primary btn 
      btn-primary m-4 mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        Our Employee
      </button>

      <button
        onClick={openContTable}
        className="btn btn-primary btn 
      btn-primary m-4 mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        Contractor's Employee
      </button>

      {/* <button
        onClick={handleEmpTypeOpenModal}
        className="btn btn-primary mb-4"
      >
        Add Employee Type
      </button> */}
      <EmployeeRegisterModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <EmployeeTypeModal
        isOpen={isTypeModalOpen}
        onClose={handleEmpTypeCloseModal}
      />
      {/* <TableEmployee /> */}

      {isEmpTable && <TableEmployee />}
      {isContEmpTable && <TableContEmployee />}
    </DefaultLayout>
  );
};

export default FormLayout;
