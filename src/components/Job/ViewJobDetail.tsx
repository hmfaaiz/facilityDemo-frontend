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
  console.log("job..",job)
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
          Job Details..
        </h3>
        <div className="space-y-6">
          {/* Job Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Job Information:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Job Id:</strong> {job?.id}
            </p>
       

            <p className="text-gray-700 dark:text-gray-300">
              <strong>Job Status:</strong> {job?.job_status}
            </p>
  
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Created At:</strong>{" "}
              {new Date(job?.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>End Job:</strong>{" "}
              {job?.completedAt
                ? new Date(job?.completedAt).toLocaleString()
                : null}
            </p>
          </div>
          

          {/* Property Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Property Information
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Property Number:</strong> {}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <strong>Floor:</strong> {}
            </p>
          </div>



          {/* Admin Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Admin Information
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Name:</strong> {job?.user?.name}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <strong>Email:</strong> {job?.user?.email}
            </p>
          </div>




          {/* Tenant Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Tenant Information
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Name:</strong> {job?.user?.tenantOrg?.name}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <strong>Type:</strong> {job?.user?.tenantOrg?.type}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Tenant Contact Information
            </h4>
            {job?.user?.tenantOrg?.TenantOrgContacts?.map((contact) => (
              <div key={contact.id} className="mb-3">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Name:</strong> {contact.name}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> {contact.email}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Mobile:</strong> {contact.mobile}
                </p>
              </div>
            ))}
          </div>

          {/* Employee Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Employee Information
            </h4>
            {job?.emps?.map((i) => (
              <div key={i.id} className="py-4">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Name:</strong> {i.name}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Contact Number:</strong> {i.mobile}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Type:</strong> {i.emp_type?.type_name}
                </p>
              </div>
            ))}
          </div>

          {/* Contractor Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Contractor Information
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Name:</strong>{" "}
              {job?.contractor?.name ? job?.contractor?.name : "..."}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Contact Number:</strong>{" "}
              {job?.contractor?.profile?.mobile ? job?.contractor?.profile?.mobile : "..."}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p>
              <strong>Job:</strong>
            </p>
            <textarea
              disabled
              className="text-gray-700 dark:text-gray-300 h-[200px] w-full break-words bg-slate-100 p-4"
            >
              {job?.complain}
            </textarea>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p>
              <strong>FeedBack:</strong>
            </p>
            <textarea
              disabled
              className="text-gray-700 dark:text-gray-300 h-[200px] w-full break-words bg-slate-100 p-4"
            >
              {job?.feedback}
            </textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContractorDetail;
