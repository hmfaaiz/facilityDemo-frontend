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

const MyInspection: React.FC<ModalProps> = ({ isOpen, onClose, myreport }) => {
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
    // Fetch the inspection report data from the API
    // const fetchReports = async () => {
    //   try {
    //     setLoading(true);
    //     const token = localStorage.getItem('saudit') || '';
    //     const response = await fetch(`${base_url}inspect/GetMyInspectReport`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`, // Adjust header as needed
    //       },
    //     });

    //     if (!response.ok) {
    //       throw new Error('Failed to fetch reports');
    //     }

    //     const result = await response.json();
    //     console.log('API Response:', result); // Debugging line to inspect the response
    //     setReports(result.data || []); // Handle empty data cases
    //   } catch (error) {
    //     setError(error.message);
    //     toast.error('Error fetching reports');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchReports();
  }, [myreport]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

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
          {/* {reports.length === 0 ? (
        <p>No reports available.</p>
      ) : ( */}
          {/* reports.map((report) => ( */}
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
          {/* )) */}
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default MyInspection;
