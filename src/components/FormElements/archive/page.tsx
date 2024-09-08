

"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
 
import Modal from "@/components/RoomModal/AddRoomModal"; 
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
      <Breadcrumb pageName="Archive Details" />

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default FormElements;

