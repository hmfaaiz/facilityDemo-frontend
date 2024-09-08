
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "@/utils/api";
import MyInspection from "../";
import DetailInspection from "./detailInspection";

const ReportInspectionTable = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const closeViewModal = () => setIsViewModalOpen(false);

  const openViewModal = (report: any) => {
    setSelectedReport(report);
    setIsViewModalOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "None";

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0"); // Add leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    // Fetch the inspection report data from the API
    const fetchReports = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("saudit") || "";
        const response = await fetch(`${base_url}inspectionReport`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Adjust header as needed
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }

        const result = await response.json();
        console.log("API Response:", result); // Debugging line to inspect the response
        setReports(result.data || []); // Handle empty data cases
      } catch (error) {
        setError(error.message);
        toast.error("Error fetching reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }


      return (
        <div className="container mx-auto p-4 ">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                SNo.
              </th>
              <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                InspectID
              </th>
              <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                Date
              </th>
              <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                Type
              </th>
              <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                Inspect by
              </th>
              <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                Status
              </th>

              <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white xl:pl-11">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {reports?.map((report: any, index: any) => (
              <tr key={report.id}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {index + 1}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {report.id}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {report.field?.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {formatDate(report.createdAt)}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {report.field?.inspection_type?.name
                      ? report.field?.inspection_type?.name
                      : "None"}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {report.user?.name ? report.user?.name : "None"}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="w-full flex font-medium items-center justify-center bg-red rounded-2xl text-white dark:text-white">
                    Alert
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="hover:text-primary"
                      onClick={() => openViewModal(report)}
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DetailInspection
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        myreport={selectedReport}
      />
   
    </div>
   
  );
};

export default ReportInspectionTable;
