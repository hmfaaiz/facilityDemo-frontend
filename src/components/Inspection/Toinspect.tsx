
// "use client"
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { base_url } from '@/utils/api';
// import { useDispatch, useSelector } from 'react-redux';

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

// const ToInspect: React.FC = () => {
//   const [inspectionData, setInspectionData] = useState<Inspection[]>([]);
//   const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
//   const dispatch = useDispatch();
//   const reduxData = useSelector((state: any) => state.data);

//   useEffect(() => {
//     axios({
//       method: 'get',
//       url: `${base_url}inspect/fieldinspection`,
//       headers: {
//         token: localStorage.getItem('saudit') || '',
//       },
//     })
//       .then((res) => {
//         if (res.status === 200) {
//           setInspectionData(res.data.data);
//         }
//       })
//       .catch((error) => {
//         const errorMessage = error.response?.data?.message || 'Something went wrong';
//         toast.error(errorMessage, {
//           autoClose: 1000,
//         });
//       });
//   }, [reduxData.refresh]);

//   const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedFieldId(Number(event.target.value));
//   };

//   const selectedField = inspectionData.find((inspection) => inspection.id === selectedFieldId);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Inspection Data</h1>

//       {/* Dropdown for selecting a field */}    
//       <div className="mb-4">
//         <label htmlFor="field-select" className="block text-lg font-medium mb-2">Select Field:</label>
//         <select
//           id="field-select"
//           value={selectedFieldId || ''}
//           onChange={handleFieldChange}
//           className="block w-full border rounded-lg p-4 bg-transparent"
//         >
//           <option value="" disabled>Select a field</option>
//           {inspectionData.map((inspection) => (
//             <option key={inspection.id} value={inspection.id}>
//               {inspection.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Display questions and options based on the selected field */}
//       {selectedField && (
//         <div className="border p-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-2 flex items-center justify-center">{selectedField.name}</h2>
          
//           {/* Display the allocated user name */}
//           <p className="mb-2">Allocated User: {selectedField.user ? selectedField.user.name : 'None'}</p>

//           {selectedField.questions.map((question, index) => (
//             <div key={question.id} className="mb-4">
//               <h3 className="text-lg font-semibold"> {index + 1}. {question.text}</h3>
//               <ul className="list-disc list-inside">
//                 {question.options.map((option) => (
//                   <li key={option.id} className="ml-4">
//                   <label>
//                     <input 
//                       type="checkbox" 
//                       className="mr-2" 
//                       value={option.value} 
//                       name={`question-${question.id}-option-${option.id}`} 
//                     />
//                     {option.value}
//                   </label>
//                 </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ToInspect;


"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";

interface Option {
  id: number;
  value: string;
  questionId: number;
  is_active: boolean;
}

interface Question {
  id: number;
  text: string;
  fieldId: number;
  is_active: boolean;
  options: Option[];
}

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  roleId: number;
  isActive: boolean;
}

interface Inspection {
  id: number;
  name: string;
  id_daily_inspection: boolean;
  userId: number | null;
  is_active: boolean;
  questions: Question[];
  user: User | null;
}

interface InspectionData {
  status: number;
  message: string;
  data: Inspection[];
}

const ToInspect: React.FC = ({inspectionId }) => {
  console.log('inspectionId',inspectionId)
  const [inspectionData, setInspectionData] = useState<Inspection[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number[]>>({});
  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);

  useEffect(() => {
    axios({
      method: "get",
      url: `${base_url}inspect/fieldinspection`,
      headers: {
        token: localStorage.getItem("saudit") || "",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setInspectionData(res.data.data);
          console.log("res.data.data",res.data.data,inspectionId)
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        toast.error(errorMessage, {
          autoClose: 1000,
        });
      });
  }, [reduxData.refresh]);

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedFieldId(Number(event.target.value));
    setSelectedOptions({}); // Reset selected options when field changes
  };



  
//   const handleCheckboxChange = (questionId: number, optionId: number) => {
//     console.log("hitting")
//     setSelectedOptions((prev) => {
//       // Create a copy of the previous state
//       console.log("prev",prev)
//       const updatedOptions = { ...prev };
//       console.log("optionId",optionId)
  
//       // Initialize the array for the question if it doesn't exist
//       if (!updatedOptions[questionId]) {
//         updatedOptions[questionId] = [];
//       }
//       // console.log("isChecked 0",optionId)
//       // Check if the option is currently selected
//       const isChecked = updatedOptions[questionId].includes(optionId);
//     //  console.log("isChecked",isChecked,optionId)
//       if (isChecked) {
//         // If the option is selected, remove it from the array
//         updatedOptions[questionId] = updatedOptions[questionId].filter(
//           (id) => id !== optionId
//         );
// // console.log("updatedOptions 1",updatedOptions)  
//         // Remove the question entry if no options are selected for it
//         if (updatedOptions[questionId].length === 0) {
//           delete updatedOptions[questionId];
//         }
//         // console.log("updatedOptions 2",updatedOptions)  
//       } else {
//         // If the option is not selected, add it to the array
//         updatedOptions[questionId].push(optionId);
//       }
//   console.log("updatedOptions",updatedOptions)
//       // Return the updated state
//       return updatedOptions;
//     });
//   };
  

const handleCheckboxChange = (questionId: number, optionId: number) => {
  // Create a copy of the current state
  const updatedOptions = { ...selectedOptions };

  // Initialize the array for the question if it doesn't exist
  if (!updatedOptions[questionId]) {
    updatedOptions[questionId] = [];
  }

  // Check if the optionId is currently selected
  const isChecked = updatedOptions[questionId].includes(optionId);

  if (isChecked) {
    // If the option is checked, remove it from the array
    updatedOptions[questionId] = updatedOptions[questionId].filter(
      (id) => id !== optionId
    );

    // Remove the question entry if no options are selected for it
    if (updatedOptions[questionId].length === 0) {
      delete updatedOptions[questionId];
    }
  } else {
    // If the option is not checked, add it to the array
    updatedOptions[questionId] = [...updatedOptions[questionId], optionId];
  }

  // Log the changes for debugging
  console.log('Updated Options:', updatedOptions);

  // Update the state directly
  setSelectedOptions(updatedOptions);
};


  // const selectedField = inspectionData.find(
  //   (inspection) => inspection.id === selectedFieldId
  // );


  // const selectedField = inspectionData.find(
  //   (inspection) => 
  //     console.log(" inspection.inspection_type.id == inspectionId", inspection.inspection_type.id == inspectionId),
  //     inspection.id === selectedFieldId &&
  //     inspection.inspection_type && 
  //     inspection.inspection_type.id == inspectionId
  // );


  const selectedField = inspectionData.find((inspection) => {
    const matchesId = inspection.id === selectedFieldId;
    const matchesInspectionTypeId = 
      inspection.inspection_type_id == inspectionId;
  
    // Detailed logging for debugging
    console.log("Inspecting:", inspection);
    console.log("inspectionId:", inspectionId);
    console.log("Matches Inspection Type ID:", matchesInspectionTypeId);
  
    return matchesId && matchesInspectionTypeId;
  });
  

  const handleSubmit = () => {
    if (selectedFieldId === null) {
      toast.error("Please select a field before submitting.", {
        autoClose: 1000,
      });
      return;
    }

    const payload = {
      fieldId: selectedFieldId,
      questionIds: Object.entries(selectedOptions).map(
        ([questionId, optionIds]) => ({
          questionId: Number(questionId),
          optionIds,
        })
      ),
    };

    console.log("Payload:", payload);

    axios({
      method: "post",
      url: `${base_url}inspect/`,
      headers: {
        token: localStorage.getItem("saudit") || "",
      },
      data: payload,
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Data submitted successfully", {
            autoClose: 1000,
          });
        }
        setSelectedFieldId(null);
        setSelectedOptions({});
     
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Submission failed";
        toast.error(errorMessage, {
          autoClose: 1000,
        });
      });
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inspection Data</h1>

      <div className="mb-4">
        <label
          htmlFor="field-select"
          className="block text-lg font-medium mb-2"
        >
          Select Field:
        </label>
        <select
          id="field-select"
          value={selectedFieldId || ""}
          onChange={handleFieldChange}
          className="block w-full border rounded-lg p-4 bg-transparent"
        >
          <option value="" disabled>
            Select a field
          </option>
          {inspectionData.map((inspection) => (
            <option key={inspection.id} value={inspection.id}>
              {inspection.name}
            </option>
          ))}
        </select>
      </div>

      {selectedField && (
        <div className="border p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 flex items-center justify-center">
            {selectedField.name}
          </h2>

          <p className="mb-2">
            Allocated User: {selectedField.user ? selectedField.user.name : "None"}
          </p>

          {selectedField.questions.map((question, index) => (
            <div key={question.id} className="mb-4">
              <h3 className="text-lg font-semibold">
                {index + 1}. {question.text}
              </h3>
              <ul className="list-disc list-inside">
                {question.options.map((option) => (
                  <li key={option.id} className="ml-4">
                    <label>
                      <input
                        type="checkbox"
                        className="mr-2"
                        value={option.value}
                        checked={
                          selectedOptions[question.id]?.includes(option.id) || false
                        }
                        onChange={() =>
                          handleCheckboxChange(question.id, option.id)
                        }
                      />
                      {option.value}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default ToInspect;


