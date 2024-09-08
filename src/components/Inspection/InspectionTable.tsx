// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { base_url } from "@/utils/api";
// import { useDispatch, useSelector } from "react-redux";

// interface Option {
//   id: number;
//   value: string;
//   questionId: number;
//   is_active: boolean;
// }

// interface Question {
//   id: number;
//   text: string;
//   fieldId: number;
//   is_active: boolean;
//   options: Option[];
// }

// interface User {
//   id: number;
//   email: string;
//   password: string;
//   name: string;
//   roleId: number;
//   isActive: boolean;
// }

// interface Inspection {
//   id: number;
//   name: string;
//   id_daily_inspection: boolean;
//   userId: number | null;
//   is_active: boolean;
//   questions: Question[];
//   user: User | null;
// }

// interface InspectionData {
//   status: number;
//   message: string;
//   data: Inspection[];
// }

// const MyInspection: React.FC = ({inspectionId }) => {
//   console.log('inspectionId',inspectionId)
//   const [inspectionData, setInspectionData] = useState<Inspection[]>([]);
//   const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
//   const [selectedOptions, setSelectedOptions] = useState<Record<number, number[]>>({});
//   const dispatch = useDispatch();
//   const reduxData = useSelector((state: any) => state.data);

//   useEffect(() => {
//     axios({
//       method: "get",
//       url: `${base_url}inspect/fieldinspection`,
//       headers: {
//         token: localStorage.getItem("saudit") || "",
//       },
//     })
//       .then((res) => {
//         if (res.status === 200) {
//           setInspectionData(res.data.data);
//           console.log("res.data.data",res.data.data,inspectionId)
//         }
//       })
//       .catch((error) => {
//         const errorMessage =
//           error.response?.data?.message || "Something went wrong";
//         toast.error(errorMessage, {
//           autoClose: 1000,
//         });
//       });
//   }, [reduxData.refresh]);

//   const handleFieldChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedFieldId(Number(event.target.value));
//     setSelectedOptions({}); // Reset selected options when field changes
//   };

// const handleCheckboxChange = (questionId: number, optionId: number) => {
//   // Create a copy of the current state
//   const updatedOptions = { ...selectedOptions };

//   // Initialize the array for the question if it doesn't exist
//   if (!updatedOptions[questionId]) {
//     updatedOptions[questionId] = [];
//   }

//   // Check if the optionId is currently selected
//   const isChecked = updatedOptions[questionId].includes(optionId);

//   if (isChecked) {
//     // If the option is checked, remove it from the array
//     updatedOptions[questionId] = updatedOptions[questionId].filter(
//       (id) => id !== optionId
//     );

//     // Remove the question entry if no options are selected for it
//     if (updatedOptions[questionId].length === 0) {
//       delete updatedOptions[questionId];
//     }
//   } else {
//     // If the option is not checked, add it to the array
//     updatedOptions[questionId] = [...updatedOptions[questionId], optionId];
//   }

//   // Log the changes for debugging
//   console.log('Updated Options:', updatedOptions);

//   // Update the state directly
//   setSelectedOptions(updatedOptions);
// };

//   const selectedField = inspectionData.find((inspection) => {
//     const matchesId = inspection.id === selectedFieldId;
//     const matchesInspectionTypeId =
//       inspection.inspection_type_id == inspectionId;

//     // Detailed logging for debugging
//     console.log("Inspecting:", inspection);
//     console.log("inspectionId:", inspectionId);
//     console.log("Matches Inspection Type ID:", matchesInspectionTypeId);

//     return matchesId && matchesInspectionTypeId;
//   });

//   const handleSubmit = () => {
//     if (selectedFieldId === null) {
//       toast.error("Please select a field before submitting.", {
//         autoClose: 1000,
//       });
//       return;
//     }

//     const payload = {
//       fieldId: selectedFieldId,
//       questionIds: Object.entries(selectedOptions).map(
//         ([questionId, optionIds]) => ({
//           questionId: Number(questionId),
//           optionIds,
//         })
//       ),
//     };

//     console.log("Payload:", payload);

//     axios({
//       method: "post",
//       url: `${base_url}inspect/`,
//       headers: {
//         token: localStorage.getItem("saudit") || "",
//       },
//       data: payload,
//     })
//       .then((res) => {
//         if (res.status === 200) {
//           toast.success("Data submitted successfully", {
//             autoClose: 1000,
//           });
//         }
//         setSelectedFieldId(null);
//         setSelectedOptions({});

//       })
//       .catch((error) => {
//         const errorMessage =
//           error.response?.data?.message || "Submission failed";
//         toast.error(errorMessage, {
//           autoClose: 1000,
//         });
//       });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Inspection Data</h1>

//       <div className="mb-4">
//         <label
//           htmlFor="field-select"
//           className="block text-lg font-medium mb-2"
//         >
//           Select Field:
//         </label>
//         <select
//           id="field-select"
//           value={selectedFieldId || ""}
//           onChange={handleFieldChange}
//           className="block w-full border rounded-lg p-4 bg-transparent"
//         >
//           <option value="" disabled>
//             Select a field
//           </option>
//           {inspectionData.map((inspection) => (
//             <option key={inspection.id} value={inspection.id}>
//               {inspection.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedField && (
//         <div className="border p-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-2 flex items-center justify-center">
//             {selectedField.name}
//           </h2>

//           <p className="mb-2">
//             Allocated User: {selectedField.user ? selectedField.user.name : "None"}
//           </p>

//           {selectedField.questions.map((question, index) => (
//             <div key={question.id} className="mb-4">
//               <h3 className="text-lg font-semibold">
//                 {index + 1}. {question.text}
//               </h3>
//               <ul className="list-disc list-inside">
//                 {question.options.map((option) => (
//                   <li key={option.id} className="ml-4">
//                     <label>
//                       <input
//                         type="checkbox"
//                         className="mr-2"
//                         value={option.value}
//                         checked={
//                           selectedOptions[question.id]?.includes(option.id) || false
//                         }
//                         onChange={() =>
//                           handleCheckboxChange(question.id, option.id)
//                         }
//                       />
//                       {option.value}
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//           <button
//             onClick={handleSubmit}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
//           >
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyInspection;

// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { base_url } from "@/utils/api";

// const MyInspection = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch the inspection report data from the API
//     const fetchReports = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem('saudit') || '';
//         const response = await fetch(`${base_url}inspectionReport`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`, // Adjust header as needed
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch reports');
//         }

//         const result = await response.json();
//         console.log('API Response:', result); // Debugging line to inspect the response
//         setReports(result.data || []); // Handle empty data cases
//       } catch (error) {
//         setError(error.message);
//         toast.error('Error fetching reports');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       {reports.length === 0 ? (
//         <p>No reports available.</p>
//       ) : (
//         reports.map((report) => (
//           <div key={report.id} className="border p-4 rounded-lg shadow mb-4">
//             <h2 className="text-xl font-semibold mb-2 flex items-center justify-center">
//               {report.field?.name || 'No Field Name'}
//             </h2>
//             <p className="mb-2">
//               Allocated User: {report.user?.name ? report.user?.name : 'None'}
//             </p>
//             {report.checks?.questions && Array.isArray(report.field.questions) && report.field.questions.length > 0 ? (
//               report.field.questions.map((question, index) => (
//                 <div key={question.id} className="mb-4">
//                   <h3 className="text-lg font-semibold">
//                     {index + 1}. {question.text}
//                   </h3>
//                   <ul className="list-disc list-inside">
//                     {question.options && Array.isArray(question.options) && question.options.length > 0 ? (
//                       question.options.map((option) => (
//                         <li key={option.id} className="ml-4">
//                           {option.value}
//                         </li>
//                       ))
//                     ) : (
//                       <li>No options available</li>
//                     )}
//                   </ul>
//                 </div>
//               ))
//             ) : (
//               <p>No questions available.</p>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MyInspection;

// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { base_url } from "@/utils/api";

// const MyInspection = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem('saudit') || '';
//         const response = await fetch(`${base_url}inspectionReport`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch reports');
//         }

//         const result = await response.json();
//         console.log('API Response:', result);
//         setReports(result.data || []);
//       } catch (error) {
//         setError(error.message);
//         toast.error('Error fetching reports');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, []);

//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex items-center justify-center h-screen">Error: {error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       {reports.length === 0 ? (
//         <p className="text-center text-lg">No reports available.</p>
//       ) : (
//         reports.map((report) => (
//           <div key={report.id} className="border p-4 rounded-lg shadow mb-4">
//             <h2 className="text-xl font-semibold mb-2 text-center">
//               {report.field?.name || 'No Field Name'}
//             </h2>
//             <p className="mb-2 text-center">
//               Allocated User: {report.user?.name || 'None'}
//             </p>
//             {report.checks?.question && Array.isArray(report.checks.question) && report.checks.question.length > 0 ? (
//               report.checks.questions.map((question, index) => (
//                 <div key={question.id} className="mb-4">
//                   <h3 className="text-lg font-semibold">
//                     {index + 1}. {question.text}
//                   </h3>
//                   <ul className="list-disc list-inside ml-4">
//                     {question.options && Array.isArray(question.options) && question.options.length > 0 ? (
//                       question.options.map((option) => (
//                         <li key={option.id}>
//                           {option.value}
//                         </li>
//                       ))
//                     ) : (
//                       <li>No options available</li>
//                     )}
//                   </ul>
//                 </div>
//               ))
//             ) : (
//               <p>No questions available.</p>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MyInspection;

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "@/utils/api";
import MyInspection from "./MyInspection";

const InspectionTable = () => {
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
        const response = await fetch(`${base_url}inspect/GetMyInspectReport`, {
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

//for return
   {/* {reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        reports.map((report) => (
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
        ))
      )} */}
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
              <th className="min-w-[20px] px-6 py-4 font-medium text-black dark:text-white  xl:pl-11">
                Inspect by...
              </th>

              <th className="px-4 py-4 font-medium text-black dark:text-white">
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

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
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

      <MyInspection
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        myreport={selectedReport}
      />
   
    </div>
   
  );
};

export default InspectionTable;
