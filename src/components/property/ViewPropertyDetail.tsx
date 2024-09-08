"use client"; // Ensure this is at the top to make this a Client Component

import React from "react";

interface PropertyDetail {
  id: number;
  detail:String;

}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: PropertyDetail; // `booking` holds the entire booking data, including `room`
}

const ViewPropertyDetail: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  property,
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
          Property Details
        </h3>
        <div className="space-y-6">
          {/* Room Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      
            <p className="text-gray-700 dark:text-gray-300">
             {property?.detail}
            </p>
           

          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewPropertyDetail;
