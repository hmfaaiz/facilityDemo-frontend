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
import ReportInspectionTable from "@/components/inspectionReport/report";
import JobRegisterModal from "@/components/Job/JobRegisterModal";
import NewJobModal from "@/components/inspectionReport/newjobmodal";
import { useDispatch, useSelector } from "react-redux";
import TableJobManagement from "@/components/Tables/TableJobmanagement";
import TableJob from "@/components/Tables/TableJob";

const FormLayout = () => {
  const [inspectionTypes, setInspectionTypes] = useState([]);
  const [selectedInspectionId, setSelectedInspectionId] = useState<
    number | null
  >(null);
  const [isMyInspectionModalOpen, setIsMyInspectionModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenData, setIsModalOpenData] = useState(false);

  const handleOpenModal = () => 
  {
    setIsModalOpen(true);
    setIsModalOpenData(false);

  }
   
  const handleCloseModal = () => setIsModalOpen(false);

  const [jobData, setjobData] = useState([]);
  const [jobStatus, setJobStatus] = useState();
  const reduxData = useSelector((state: any) => state.data);
  const dispatch = useDispatch();

  const handleOpenModalData = (status:any) =>{
    console.log("status",status)
    setJobStatus(status)
    setIsModalOpenData(true);
    setIsMyInspectionModalOpen(false);
  }


    

   
  const handleCloseModalData = () => setIsModalOpenData(false);

  useEffect(() => {
    const fetchInspectionTypes = async () => {
      try {
        const response = await axios.get(
          `${base_url}inspect/GetInspectionType`,
          {
            headers: {
              Authorization: localStorage.getItem("saudit") || "",
            },
          },
        );

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

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: `${base_url}inspectionReport/${jobStatus}`, // Dynamically set the URL based on jobStatus
  //     headers: {
  //       token: localStorage.getItem("saudit"),
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setjobData(res.data.data);
  //         console.log("data jobStatus", jobStatus);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Something is wrong");
  //     });
  // }, [reduxData.refresh, jobStatus]);

  const handleButtonClick = (id: number) => {
    setSelectedInspectionId(id);
    closeMyInspectionModal();
  };

  const openMyInspectionModal = () => {
    setIsMyInspectionModalOpen(true);
    setSelectedInspectionId(null);
    setIsModalOpenData(false);
    setjobData([])
 
  };

  const closeMyInspectionModal = () => {
    setIsMyInspectionModalOpen(false);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Inspection Report" />

      <button
        onClick={openMyInspectionModal}
        className={`btn btn-primary btn 
      btn-primary m-4 mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10 `}
      >
        Report
      </button>
      <button
        onClick={handleOpenModal}
        className={`btn btn-primary btn 
          btn-primary m-4 mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10 `}
      >
        New Job
      </button>
      <NewJobModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <button
        onClick={() => handleOpenModalData("Pending")} // Set status to "Pending" on click
        className="btn btn-primary btn 
        btn-primary m-4 mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        My Job
      </button>
      {/* <button
        onClick={() => handleOpenModalData("InProcess")} // Set status to "InProcess" on click
        className="btn btn-primary btn 
        btn-primary m-4 mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        In Process
      </button> */}
      {/* <button
        onClick={() => handleOpenModalData("Archive")} // Set status to "Archive" on click
        className="btn btn-primary m-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        Archive Job
      </button> */}

      {isModalOpenData ? ( // Render the table if data exists
        // <TableJobManagement jobData={jobData} />
        <TableJob/>
      ):null}

      {/* {selectedInspectionId && <ToInspect inspectionId={selectedInspectionId} />} */}
      {/* <InspectionTable /> */}

      {/* Conditionally render the modal */}
      {isMyInspectionModalOpen && <ReportInspectionTable />}
      {/* <MyInspection inspectionId={selectedInspectionId} /> */}
      {/* <InspectionTable inspectionId={selectedInspectionId} /> */}
    </DefaultLayout>
  );
};

export default FormLayout;
