// "use client"
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

// import { Metadata } from "next";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
// import Link from "next/link";
// import TableThree from "@/components/Tables/TableThree";
// import TenatRegisterModal from '../../components/TenantModal/TenatRegisterModal';
// import { useState } from "react";
// import TableReserved from "@/components/Tables/TableReserved";


// const FormLayout = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);


//   const [activePage, setActivePage] = useState("");
//   const [isModalOpen2, setIsModalOpen2] = useState(false);

//   const handleOpenTenant = () => {
//     setActivePage('tenant');
//   };

//   const handleOpenTenantAdmins = () => {
//     setActivePage('tenantAdmins');
//   };

//   const handleOpenModal2 = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal2 = () => {
//     setIsModalOpen(false);
//   };
//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Tenant" />

   
//       <button
//         onClick={handleOpenModal}
//         className="btn btn-primary mb-4"
//       >
//         Add Tenant
//       </button>
//       <button
//         onClick={}
//         className="btn btn-primary mb-4"
//       >
//         Tenant
//       </button>
//       <button
//         onClick={}
//         className="btn btn-primary mb-4"
//       >
//         Tenant Admins
//       </button>
//       <TenatRegisterModal isOpen={isModalOpen} onClose={handleCloseModal} />
//       <TableTenant />
//       <TableAdmins />
   
//     </DefaultLayout >
//   );
// };

// export default FormLayout;



"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TenatRegisterModal from "@/components/TenantModal/TenatRegisterModal";
import { useState } from "react";
import TableTenant from "@/components/Tables/TableTenant";
import TableAdmins from "@/components/Tables/TableAdmins";

const FormLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePage, setActivePage] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenTenant = () => setActivePage("tenant");
  const handleOpenTenantAdmins = () => setActivePage("tenantAdmins");

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tenant" />

      <button onClick={handleOpenModal} className="btn btn-primary m-4 
      btn btn-primary mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10">
        Add Tenant
      </button>
      <button onClick={handleOpenTenant} className="btn btn-primary m-4 
      btn btn-primary mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10">
        Tenant
      </button>
      <button onClick={handleOpenTenantAdmins} className="btn btn-primary m-4 
      btn btn-primary mb-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10">
        Tenant Admins
      </button>

      {/* Conditionally render based on activePage */}
      {activePage === "tenant" && <TableTenant />}
      {activePage === "tenantAdmins" && <TableAdmins />}

      <TenatRegisterModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </DefaultLayout>
  );
};

export default FormLayout;
