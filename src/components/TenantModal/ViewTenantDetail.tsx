// "use client"; // Ensure this is at the top to make this a Client Component

// import React from "react";

// interface UserDetail {
//   id: number;
//   roleId: number;
//   start_date: string;
//   end_date: string;
//   name: string;
//   mobile: string;
//   email: string;
//   address: string;
//   cnic: string;
// }

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   user: UserDetail; // `booking` holds the entire booking data, including `room`
// }

// const ViewTenantDetail: React.FC<ModalProps> = ({ isOpen, onClose, user }) => {
//   if (!isOpen) return null;

//   // Extracting details from the booking object
//   const {
//     id,
//     roleId,
//     start_date,
//     end_date,
//     mobile,
//     name,
//     email,
//     address,
//     cnic,
//   } = user;

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
//           User Details
//         </h3>
//         <div className="space-y-4">
//           {/* Room Information */}

//           <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
//             User Information:
//           </h4>
//           <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
//             <p className="text-gray-700 dark:text-gray-300">
//               <strong>Tenant Admin Number:</strong> {user?.id}
//             </p>
//             <p className="text-gray-700 dark:text-gray-300">
//               <strong>Name:</strong> {user?.name}
//             </p>
//             <p className="text-gray-700 dark:text-gray-300">
//               <strong>Email:</strong> {user?.email}
//             </p>
//             <p className="text-gray-700 dark:text-gray-300">
//               <strong>Password:</strong> {user?.password}
//             </p>

//           </div>

//           {/* Tenant Information */}

//           <div className="mt-4">
//             <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
//               Tenant Information:
//             </h4>

//             <div className="bg-gray-100 dark:bg-gray-700 mb-2 rounded-lg p-3">
//               <p className="text-gray-700 dark:text-gray-300">
//                 <strong>Name:</strong> {user?.tenantOrg?.name}
//               </p>

//               <p className="text-gray-700 dark:text-gray-300">
//                 <strong>Type:</strong> {user?.tenantOrg?.type}
//               </p>
//               {user?.tenantOrg?.type == "Company" ? (
//                 <p className="text-gray-700 dark:text-gray-300">
//                   <strong>NTN:</strong> {user?.tenantOrg?.ntn}
//                 </p>
//               ) : (
//                 <p className="text-gray-700 dark:text-gray-300">
//                   <strong>CNIC:</strong> {user?.tenantOrg?.cnic}
//                 </p>
//               )}
//             </div>
//           </div>

//           {user?.tenantOrg?.TenantOrgContacts?.length > 0 && (
//             <div className="mt-4">
//               <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
//                 Tenant Contacts:
//               </h4>
//               {user?.tenantOrg?.TenantOrgContacts.map((contact) => (
//                 <div
//                   key={contact.id}
//                   className="bg-gray-100 dark:bg-gray-700 mb-2 rounded-lg p-3"
//                 >
//                   <p className="text-gray-700 dark:text-gray-300">
//                     <strong>Name:</strong> {contact.name}
//                   </p>
//                   <p className="text-gray-700 dark:text-gray-300">
//                     <strong>Email:</strong> {contact.email}
//                   </p>
//                   <p className="text-gray-700 dark:text-gray-300">
//                     <strong>Mobile:</strong> {contact.mobile}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewTenantDetail;

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

const ViewTenantDetail: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  tenant,
}) => {
  if (!isOpen) return null;
  console.log("tenant", tenant);
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
          Tenant Detail
        </h3>
        <div className="space-y-6">
          {/* Job Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Tenant Information:
            </h4>
            <div  className="mb-2 flex w-full flex-col gap-1">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Tenant Id:</strong> {tenant?.id}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <strong>Tenant:</strong> {tenant?.name}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <strong>NTN:</strong> {tenant?.ntn}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>CNIC:</strong> {tenant?.cnic}
            </p>
          </div>
          </div>

          {/* Property Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-md">
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
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Admin Information
            </h4>

            {tenant?.users.map((admin, index) => (
              <div key={admin.id} className="mb-2 flex w-full flex-col gap-1">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Name:</strong> {admin?.name}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> {admin?.email}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Password:</strong> {admin?.password}
                </p>
              </div>
            ))}
          </div>

     
          {/* Contact Information */}

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <h4 className="text-gray-800 dark:text-gray-200 mb-3 text-xl font-medium">
              Tenant Contact Information
            </h4>
            {tenant?.TenantOrgContacts?.map((contact) => (
              <div key={contact.id} className="pb-3 mb-4 flex w-full flex-col gap-1 shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
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
        </div>
      </div>
    </div>
  );
};

export default ViewTenantDetail;
