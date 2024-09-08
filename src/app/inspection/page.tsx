// "use client"
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

// import { Metadata } from "next";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
// import Link from "next/link";
// import TableThree from "@/components/Tables/TableThree";
// import TenatRegisterModal from '../../components/TenantModal/TenatRegisterModal';
// import { useEffect, useState } from "react";
// import TableReserved from "@/components/Tables/TableReserved";
// import FieldSupervisorRegisterModal from "@/components/FieldSupervisor/FieldSupervisorRegisterModal";
// import TableFieldSupervisor from "@/components/Tables/TableFieldSupervisor";
// import AddFieldModal from "@/components/Field/AddFieldModal";
// import AddQuestionModal from "@/components/Field/AddQuestionsOptions";
// import TableFieldQuestionAns from "@/components/Tables/TableFieldQuestionAns";
// import InspectionList from "@/components/Tables/TableFieldQuestionAns";
// import AllocateModal from "@/components/Field/AlocateModal";
// import ToInspect from "@/components/Inspection/toinspect";
// import { useDispatch, useSelector } from "react-redux";
// import { base_url } from "@/utils/api";
// import axios from "axios";
// import { toast } from "react-toastify";


// const FormLayout = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAllocateOpen, setIsAllocateOpen] = useState(false); 


//   const handleOpenModal = () => setIsModalOpen(true);
//   const openQuestionModal = () => setQuestIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   const [isQuestModalOpen, setQuestIsModalOpen] = useState(false);
//   const closeQuestModal = () => setQuestIsModalOpen(false);

//   const openAllocateModal = () => setIsAllocateOpen(true);
//   const handleAllocateCloseModal = () => setIsAllocateOpen(false);

//   const dispatch = useDispatch();
//   const reduxData = useSelector((state: any) => state.data);

//   const [getInspectionType, setGetInspectionType ]= useState<string>("");
//   const [selectedInspectionType, setSelectedGetInspectionType ]= useState([]);
   
//   useEffect(() => {
//     const fetchFieldData = async () => {
//       try {
//         const response = await axios.get(`${base_url}field/GetInspectionType`, {
//           headers: {
//             Authorization: localStorage.getItem("saudit") || "",
//           },
//         });

//         if (response.status === 200) {
//           const data = response.data.data;
//           if (Array.isArray(data) && data.length > 0) {
//             setGetInspectionType(data);
//           } else {
//             toast.error("Data not found", { autoClose: 1000 });
//           }
//         }
//       } catch (error) {
//         const errorMessage =
//           error.response?.data?.message || "Something went wrong";
//         toast.error(errorMessage, { autoClose: 1500 });
//       }
//     };

//     fetchFieldData();
//   }, [reduxData.refresh]);
  
//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Inspection " />

   
//       <button
       
//         className="btn btn-primary m-4 
//         btn btn-primary mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
//       >
//         Daily Inspection
//       </button>
//       <button
//         // Set status to "InProcess" on click
//         className="btn btn-primary m-4 
//         btn btn-primary mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
//       >
//         Weekly Inspection
//       </button>
//       <button
//         // Set status to "Archive" on click
//         className="btn btn-primary m-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
//       >
//         Monthly Inspection    
//       </button>

//       <ToInspect />
//     </DefaultLayout >
//   );
// };

// export default FormLayout;




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

