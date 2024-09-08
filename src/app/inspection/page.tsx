

"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ToInspect from "@/components/Inspection/toinspect";
import { base_url } from "@/utils/api";
import MyInspection from "@/components/Inspection/MyInspection";
import InspectionTable from "@/components/Inspection/InspectionTable";

const FormLayout = () => {
  const [inspectionTypes, setInspectionTypes] = useState([]);
  const [selectedInspectionId, setSelectedInspectionId] = useState<number | null>(null);
  const [isMyInspectionModalOpen, setIsMyInspectionModalOpen] = useState(false);

  useEffect(() => {
    const fetchInspectionTypes = async () => {
      try {
        const response = await axios.get(`${base_url}inspect/GetInspectionType`, {
          headers: {
            Authorization: localStorage.getItem("saudit") || "",
          },
        });

        if (response.status === 200) {
          const data = response.data.data;
          if (Array.isArray(data) && data.length > 0) {
            setInspectionTypes(data);
          } else {
            toast.error("Data not found", { autoClose: 1000 });
          }
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        toast.error(errorMessage, { autoClose: 1500 });
      }
    };

    fetchInspectionTypes();
  }, []); // Run only on component mount

  const handleButtonClick = (id: number) => {
    setSelectedInspectionId(id);
    closeMyInspectionModal()
  };


  const openMyInspectionModal = () => {
    setIsMyInspectionModalOpen(true);
    setSelectedInspectionId(null);
  };

  const closeMyInspectionModal = () => {
    setIsMyInspectionModalOpen(false);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Inspection" />

      {inspectionTypes.map((type) => (
        <>
   
        <button
          key={type.id}
          onClick={() => handleButtonClick(type.id)}
          className={`btn btn-primary m-4 
            btn btn-primary mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10 ${type.id === selectedInspectionId ? 'bg-black text-white' : ''}`}
        >
          {type.name}
        </button>


        
        
        </>
      ))}

<button
    onClick={openMyInspectionModal} 
    className={`btn btn-primary m-4 
      btn btn-primary mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10 `}
  >
   My Inspection
  </button>

      

      {selectedInspectionId && <ToInspect inspectionId={selectedInspectionId} />}
      {/* <InspectionTable /> */}

     

      {/* Conditionally render the modal */}
      {isMyInspectionModalOpen && (
        <InspectionTable  />
      )}
      {/* <MyInspection inspectionId={selectedInspectionId} /> */}
      {/* <InspectionTable inspectionId={selectedInspectionId} /> */}
    </DefaultLayout>
  );
};

export default FormLayout;

