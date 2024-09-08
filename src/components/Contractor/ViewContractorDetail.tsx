"use client"; // Ensure this is at the top to make this a Client Component

import React from "react";

interface UserDetail {
  id: number;
  roleId: number;
  start_date: string;
  end_date: string;
  name: string;
  mobile: string;
  email: string;
  address: string;
  cnic: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDetail; // `booking` holds the entire booking data, including `room`
}

const ViewContractorDetail: React.FC<ModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  // Extracting details from the booking object
  const {id, roleId, start_date, end_date, mobile, name, email, address, cnic } = user;

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
          User Details
        </h3>
        <div className="space-y-6">
          {/* Room Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              User Information:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Tenant Number:</strong> {user?.id}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Name:</strong> {user?.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Password:</strong> {user?.password}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Contact Number:</strong> {user?.profile?.mobile}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>CNIC:</strong> {user?.profile?.cnic}
            </p>
   
          </div>

          {/* Booking Information */}
          {/* <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Booking Information:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Start date:</strong>{" "}
              {new Date(user?.profile?.start_date).toLocaleString()}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>End Time:</strong> {new Date(user?.profile?.end_date).toLocaleString()}
            </p>
          </div> */}

         
        </div>
      </div>
    </div>
  );
};

export default ViewContractorDetail;
