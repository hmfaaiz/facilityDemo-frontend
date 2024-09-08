

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "@/utils/api";

const DetailInspection: React.FC<ModalProps> = ({ isOpen, onClose, myreport }) => {
  console.log("report", myreport);
  if (!isOpen) return null;
  const [report, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "None";

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0"); // Add leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    setReports(myreport || []);
    setLoading(false);
  
  }, [myreport]);


  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="fixed inset-0 z-50 mt-8 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-h-[80vh] w-full max-w-4xl overflow-auto rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-2xl text-black dark:text-white"
        >
          &times;
        </button>
        <div className="container mx-auto p-4">
   
          <div key={report.id} className="mb-4 rounded-lg border p-4 shadow">
            <h2 className="mb-2 flex items-center justify-center text-xl font-semibold">
              {report.field?.name || "No Field Name"}
            </h2>
            <p className="mb-2">
              Done by: {report.user?.name ? report.user?.name : "None"}
            </p>
            <p className="mb-2">
              Inspection Type:{" "}
              {report.field?.inspection_type?.name
                ? report.field?.inspection_type?.name
                : "None"}
            </p>
            <p className="mb-2">Date: {formatDate(report.createdAt)}</p>
            {report.checks &&
            Array.isArray(report.checks) &&
            report.checks.length > 0 ? (
              report.checks.map((check, index) => (
                <div key={check.id} className="mb-4">
                  <h3 className="text-lg font-semibold">
                    {index + 1}. {check.question.text}
                  </h3>
                  <ul className="ml-4 list-inside list-disc">
                    {check.question.options &&
                    Array.isArray(check.question.options) &&
                    check.question.options.length > 0 ? (
                      check.question.options.map((option) => (
                        <li key={option.id} className="ml-7 flex items-center">
                          {option.value}
                        </li>
                      ))
                    ) : (
                      <></>
                    )}
                    {check.correct_ans &&
                    Array.isArray(check.correct_ans) &&
                    check.correct_ans.length > 0 ? (
                      check.correct_ans.map((option) => (
                        <li key={option.id} className="flex items-center">
                          <span className="ml-2 text-green-500">✔️</span>{" "}
                          {option.value}
                        </li>
                      ))
                    ) : (
                      <></>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p>No questions available.</p>
            )}
          </div>
     
        </div>
      </div>
    </div>
  );
};

export default DetailInspection;
