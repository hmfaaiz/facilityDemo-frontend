// "use client"; // Ensure this is at the top to make this a Client Component

// import React from "react";

// interface PropertyDetail {
//   id: number;
//   detail:String;

// }

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   property: PropertyDetail; // `booking` holds the entire booking data, including `room`
// }

// const ViewPropertyDetail: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   property,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 top-5 z-50 flex items-center justify-center bg-black bg-opacity-60">
//       <div className="relative max-h-[80vh] w-full max-w-lg overflow-auto rounded-lg bg-white p-6 shadow-lg">
//         <button
//           onClick={onClose}
//           className="text-gray-700 dark:text-gray-300 absolute right-3 top-3 text-3xl font-semibold"
//         >
//           &times;
//         </button>
//         <h3 className="text-gray-900 dark:text-gray-100 mb-6 text-2xl font-semibold">
//           Property Details
//         </h3>
//         <div className="space-y-6">
//           {/* Room Information */}
//           <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">

//             <p className="text-gray-700 dark:text-gray-300">
//              {property?.detail}
//             </p>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewPropertyDetail;

"use client"; // Ensure this is at the top to make this a Client Component

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: string; // `booking` holds the entire booking data, including `room`
}

const ViewPropertyManegDetail: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

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
          Booking Details
        </h3>
        <div className="space-y-6">
          {/* Room Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Booking Information:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Booking No.:</strong> {booking?.id}
            </p>

            <p className="text-gray-700 dark:text-gray-300 break-words">
              <strong>Start Date:</strong> {formatDate(booking?.start_time)}
            </p>

            <p className="text-gray-700 dark:text-gray-300 break-words">
              <strong>End Date:</strong> {formatDate(booking?.end_time)}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Property Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Property Information:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Property No.:</strong>{" "}
              {booking?.property?.property_number}
            </p>
            <p className="text-gray-700 dark:text-gray-300 break-words">
              <strong>Floor:</strong>
              {booking?.property?.floor}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <strong>Capacity:</strong> {booking?.property?.capacity}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <strong>Detail:</strong> {booking?.property?.detail}
            </p>
          </div>

          {/* Tenant Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Tenant Information
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Name:</strong> {booking?.assignTo?.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Type:</strong> {booking?.assignTo?.type}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <strong>CNIC/NTN:</strong> {booking?.assignTo?.cnic || booking?.assignTo?.ntn}
            </p>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPropertyManegDetail;
