

"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
 
import AllocateModal from "@/components/TenantModal/TenatRegisterModal"; 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { base_url } from "@/utils/api";
import axios from "axios";

const FormElements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);



  



  return (
    <>
      <Breadcrumb pageName="Booking Management" />
      <button
        onClick={openModal}
        // className="btn btn-primary mb-4"
          className="mb-5 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-center text-white transition hover:bg-opacity-90"
      >
        Add Booking
      </button>
      {/* <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          
        </div>
      </div> */}

      <AllocateModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default FormElements;

