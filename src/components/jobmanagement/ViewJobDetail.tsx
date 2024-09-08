"use client"; // Ensure this is at the top to make this a Client Component

import React from "react";

interface JobDetail {
  id: number;
  roleId: number;
  start_date: string;
  end_date: string;
  complain: string;
  mobile: string;
  email: string;
  address: string;
  cnic: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobDetail; // `booking` holds the entire booking data, including `room`
}

const ViewContractorDetail: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  job,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-5 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative max-h-[80vh] w-full max-w-lg overflow-auto rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="text-gray-700 dark:text-gray-300 absolute right-3 top-3 text-3xl font-semibold"
        >
          &times;
        </button>
        <h3 className="text-gray-900 dark:text-gray-100 mb-6 text-2xl font-semibold">
          Job Details
        </h3>
        <div className="space-y-6">
          {/* Room Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Job Information:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Job Number:</strong> {job?.id}
            </p>
       

            <p className="text-gray-700 dark:text-gray-300">
              <strong>Job Status:</strong> {job?.job_status}
            </p>
            {/* <p className="text-gray-700 dark:text-gray-300">
              <strong>Is Seen:</strong> {job?.isSeen ? "Yes" : "No"}
            </p> */}
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Feedback:</strong> {job?.feedback}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Created At:</strong>  {new Date(job?.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>End Job:</strong>  {job?.completedAt? new Date(job?.completedAt).toLocaleString():null}
            </p>
          </div>

          {/* Employee Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Employee Information
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Name:</strong>{" "}
              
            </p>
      
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Contact Number:</strong> {" "}
            </p>
          </div>

          {/* Contractor Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Contractor Information
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Name:</strong>{".............. "}
              
            </p>
      
            
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <p className="text-gray-700 dark:text-gray-300 break-words">
              <strong>Job:</strong>{job?.complain}
           
            </p>
      
            
          </div>



        </div>
      </div>
    </div>
  );
};

export default ViewContractorDetail;
