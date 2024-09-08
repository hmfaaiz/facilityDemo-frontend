


"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import TablePropertyManagement from "@/components/Tables/TablePropertyManagement";
import TableUpcomingtPropertyManag from "@/components/Tables/TableUpcomingtPropertyManag";
import TableReserved from "@/components/Tables/TableReserved";


const FormLayout = () => {
  const [selectedTable, setSelectedTable] = useState("default"); // Track which table to show

  const renderTable = () => {
    switch (selectedTable) {
      case "upcoming":
        return <TableUpcomingtPropertyManag propertyType={selectedTable}/>;
      case "current":
        return <TableUpcomingtPropertyManag propertyType={selectedTable}/>;
      case "archive":
        return <TableUpcomingtPropertyManag propertyType={selectedTable}/>;
      case "property":
        return <TablePropertyManagement />;
      default:
        return <TablePropertyManagement />;
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Property Management" />

      <button
        onClick={() => setSelectedTable("property")}
        className="btn btn-primary m-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        Property
      </button>
      <button
        onClick={() => setSelectedTable("current")}
        className="btn btn-primary m-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        Current Engaged
      </button>
      <button
        onClick={() => setSelectedTable("upcoming")}
        className="btn btn-primary m-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        Upcoming Engaged
      </button>
      <button
        onClick={() => setSelectedTable("archive")}
        className="btn btn-primary m-4 inline-flex items-center justify-center rounded-md border border-slate-950 px-10 py-4 text-center font-medium text-black hover:bg-black hover:text-white lg:px-8 xl:px-10"
      >
        Archive Engaged
      </button>

      {renderTable()}
    </DefaultLayout>
  );
};

export default FormLayout;

