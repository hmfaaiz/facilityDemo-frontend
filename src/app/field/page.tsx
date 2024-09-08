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
import AddFieldModal from "@/components/Field/AddFieldModal";
import AddQuestionModal from "@/components/Field/AddQuestionsOptions";
import TableFieldQuestionAns from "@/components/Tables/TableFieldQuestionAns";
import InspectionList from "@/components/Tables/TableFieldQuestionAns";
import AllocateModal from "@/components/Field/AlocateModal";


const FormLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllocateOpen, setIsAllocateOpen] = useState(false); 


  const handleOpenModal = () => setIsModalOpen(true);
  const openQuestionModal = () => setQuestIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [isQuestModalOpen, setQuestIsModalOpen] = useState(false);
  const closeQuestModal = () => setQuestIsModalOpen(false);

  const openAllocateModal = () => setIsAllocateOpen(true);
  const handleAllocateCloseModal = () => setIsAllocateOpen(false);

  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Field " />

   
      <button
        onClick={() => handleOpenModal()} // Set status to "Pending" on click
        className="btn btn-primary m-4 
        btn btn-primary mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        Add Field
      </button>
      <button
        onClick={() => openQuestionModal()} // Set status to "InProcess" on click
        className="btn btn-primary m-4 
        btn btn-primary mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        Add Question
      </button>
      <button
        onClick={() => openAllocateModal()} // Set status to "Archive" on click
        className="btn btn-primary m-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        Allocate
      </button>
      <AddFieldModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <AddQuestionModal isOpen={isQuestModalOpen} onClose={closeQuestModal} />
      <AllocateModal isOpen={isAllocateOpen} onClose={handleAllocateCloseModal} />
      <InspectionList />
    </DefaultLayout >
  );
};

export default FormLayout;
