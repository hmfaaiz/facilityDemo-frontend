// import { base_url } from '@/utils/api';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { toast } from "react-toastify";

// // Define the TypeScript interfaces for your data
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

// interface Inspection {
//   id: number;
//   name: string;
//   id_daily_inspection: boolean;
//   userId: number | null;
//   is_active: boolean;
//   questions: Question[];
//   user: string | null;
// }

// interface InspectionData {
//   status: number;
//   message: string;
//   data: Inspection[];
// }

// // The main component that renders the inspection data
// const TableFieldQuestionAns: React.FC<{ inspectionData: InspectionData }> = ({ inspectionData }) => {
//     const [InspectionData, setQuestData] = useState([]);
//     const reduxData = useSelector((state: any) => state.data);
//     const dispatch = useDispatch();
  
//     useEffect(() => {
//         axios({
//           method: "get",
//           url: `${base_url}field`,
//           headers: {
//             token: localStorage.getItem("saudit"),
//           },
//         })
//           .then((res) => {
//             if (res.status === 200) {
//                 setQuestData(res.data.data);
//             }
//           })
//           .catch((error) => {
//             const errorMessage =
//               error.response?.data?.message || "Something went wrong";
    
//             toast.error(errorMessage, {
//               autoClose: 1000,
//             });
//           });
//       }, [reduxData.refresh]);
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Inspection Data</h1>
//       {inspectionData.data.map((inspection) => (
//         <div key={inspection.id} className="border p-4 mb-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-2">{inspection.name}</h2>
//           <p className="mb-2">Daily Inspection: {inspection.id_daily_inspection ? 'Yes' : 'No'}</p>
//           <p className="mb-2">Active: {inspection.is_active ? 'Yes' : 'No'}</p>

//           {inspection.questions.map((question) => (
//             <div key={question.id} className="mb-4">
//               <h3 className="text-lg font-semibold">{question.text}</h3>
//               <ul className="list-disc list-inside">
//                 {question.options.map((option) => (
//                   <li key={option.id} className="ml-4">
//                     {option.value}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// // Mock inspection data for demonstration purposes
// const inspectionData: InspectionData = {
//   status: 200,
//   message: 'Successfully found',
//   data: [
//     {
//       id: 1,
//       name: 'HVAC',
//       id_daily_inspection: true,
//       userId: null,
//       is_active: true,
//       questions: [
//         {
//           id: 1,
//           text: '1 Does the HVAC system meet energy efficiency standards?',
//           fieldId: 1,
//           is_active: true,
//           options: [
//             { id: 1, value: 'No', questionId: 1, is_active: true },
//             { id: 2, value: 'Yes', questionId: 1, is_active: true },
//           ],
//         },
//         {
//           id: 2,
//           text: '2 Does the HVAC system meet energy efficiency standards?',
//           fieldId: 1,
//           is_active: true,
//           options: [
//             { id: 3, value: 'Yes', questionId: 2, is_active: true },
//             { id: 4, value: 'No', questionId: 2, is_active: true },
//           ],
//         },
//       ],
//       user: null,
//     },
//     {
//       id: 2,
//       name: 'Elevator',
//       id_daily_inspection: true,
//       userId: null,
//       is_active: true,
//       questions: [
//         {
//           id: 3,
//           text: 'Q1 It is working?',
//           fieldId: 2,
//           is_active: true,
//           options: [
//             { id: 7, value: 'Yes', questionId: 3, is_active: true },
//             { id: 8, value: 'No', questionId: 3, is_active: true },
//           ],
//         },
//         {
//           id: 4,
//           text: 'Q2 Capacity between',
//           fieldId: 2,
//           is_active: true,
//           options: [
//             { id: 5, value: '1-5', questionId: 4, is_active: true },
//             { id: 6, value: '5-10', questionId: 4, is_active: true },
//             { id: 5, value: '1-5', questionId: 4, is_active: true },
//             { id: 6, value: '5-10', questionId: 4, is_active: true },
//           ],
//         },
//       ],
//       user: null,
//     },
//   ],
// };

// // Rendering the component with the mock data
// const App = () => {
//   return <TableFieldQuestionAns inspectionData={inspectionData} />;
// };

// export default App;


// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import { toast } from "react-toastify";
// import { base_url } from '@/utils/api';

// // Define the TypeScript interfaces for your data
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

// interface Inspection {
//   id: number;
//   name: string;
//   id_daily_inspection: boolean;
//   userId: number | null;
//   is_active: boolean;
//   questions: Question[];
//   user: string | null;
// }

// interface InspectionData {
//   status: number;
//   message: string;
//   data: Inspection[];
// }

// // The main component that renders the inspection data
// const TableFieldQuestionAns: React.FC = () => {
//   const [inspectionData, setInspectionData] = useState<Inspection[]>([]);

//   useEffect(() => {
//     axios({
//       method: "get",
//       url: `${base_url}field`, // replace base_url with your actual base URL
//       headers: {
//         token: localStorage.getItem("saudit") || "", // Retrieve token from local storage
//       },
//     })
//       .then((res) => {
//         if (res.status === 200) {
//           setInspectionData(res.data.data);
//         }
//       })
//       .catch((error) => {
//         const errorMessage = error.response?.data?.message || "Something went wrong";
//         toast.error(errorMessage, {
//           autoClose: 1000,
//         });
//       });
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Inspection Data</h1>
//       {inspectionData.map((inspection) => (
//         <div key={inspection.id} className="border p-4 mb-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-2">{inspection.name}</h2>
//           <p className="mb-2">Daily Inspection: {inspection.id_daily_inspection ? 'Yes' : 'No'}</p>
//           <p className="mb-2">Active: {inspection.is_active ? 'Yes' : 'No'}</p>

//           {inspection.questions.map((question) => (
//             <div key={question.id} className="mb-4">
//               <h3 className="text-lg font-semibold">{question.text}</h3>
//               <ul className="list-disc list-inside">
//                 {question.options.map((option) => (
//                   <li key={option.id} className="ml-4">
//                     {option.value}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TableFieldQuestionAns;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { base_url } from '@/utils/api';

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

// interface Inspection {
//   id: number;
//   name: string;
//   id_daily_inspection: boolean;
//   userId: number | null;
//   is_active: boolean;
//   questions: Question[];
//   user: string | null;
// }

// interface InspectionData {
//   status: number;
//   message: string;
//   data: Inspection[];
// }

// const TableFieldQuestionAns: React.FC = () => {
//   const [inspectionData, setInspectionData] = useState<Inspection[]>([]);

//   useEffect(() => {
//     axios({
//       method: 'get',
//       url: `${base_url}field`,
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
//   }, []);

//   return (
//     <div className="container mx-auto p-6 bg-gray-100 rounded-lg">
//       <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-600">Inspection Data</h1>
//       {inspectionData.length > 0 ? (
//         inspectionData.map((inspection) => (
//           <div
//             key={inspection.id}
//             className="border border-gray-300 p-6 mb-6 rounded-lg bg-white shadow-lg"
//           >
//             <h2 className="text-2xl font-semibold mb-3 text-gray-700 flex items-center justify-center">{inspection.name}</h2>
//             <p className="mb-2 text-gray-500">
//               <span className="font-bold">Daily Inspection:</span>{' '}
//               {inspection.id_daily_inspection ? (
//                 <span className="text-green-600">Yes</span>
//               ) : (
//                 <span className="text-red-600">No</span>
//               )}
//             </p>
//             {/* <p className="mb-4 text-gray-500">
//               <span className="font-bold">Active:</span>{' '}
//               {inspection.is_active ? (
//                 <span className="text-green-600">Yes</span>
//               ) : (
//                 <span className="text-red-600">No</span>
//               )}
//             </p> */}

//             {inspection.questions.map((question) => (
//               <div
//                 key={question.id}
//                 className="mb-4 p-4 border-l-4 border-blue-600 bg-gray-50 rounded-md"
//               >
//                 <h3 className="text-xl font-semibold mb-2 text-gray-700">{question.text}</h3>
//                 <ul className="list-disc list-inside text-gray-600">
//                   {question.options.map((option) => (
//                     <li key={option.id} className="ml-6">
//                       {option.value}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-gray-500">No inspection data available.</p>
//       )}
//     </div>
//   );
// };

// export default TableFieldQuestionAns;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { base_url } from '@/utils/api';

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

// interface Inspection {
//   id: number;
//   name: string;
//   id_daily_inspection: boolean;
//   userId: number | null;
//   is_active: boolean;
//   questions: Question[];
//   user: string | null;
// }

// interface InspectionData {
//   status: number;
//   message: string;
//   data: Inspection[];
// }

// const TableFieldQuestionAns: React.FC = () => {
//   const [inspectionData, setInspectionData] = useState<Inspection[]>([]);
//   const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);

//   useEffect(() => {
//     axios({
//       method: 'get',
//       url: `${base_url}field`,
//       headers: {
//         token: localStorage.getItem('saudit') || '',
//       },
//     })
//       .then((res) => {
//         if (res.status === 200) {
//           setInspectionData(res.data.data);
//           console.log("res.data.data",res.data.data)
//         }
//       })
//       .catch((error) => {
//         const errorMessage = error.response?.data?.message || 'Something went wrong';
//         toast.error(errorMessage, {
//           autoClose: 1000,
//         });
//       });
//   }, []);

//   const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedFieldId(Number(event.target.value));
//   };

//   const selectedField = inspectionData.find((inspection) => inspection.id === selectedFieldId);
// console.log("selectedField",selectedField)
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
//           {/* <p className="mb-2">Daily Inspection: {selectedField.id_daily_inspection ? 'Yes' : 'No'}</p> */}
//           {/* <p className="mb-2">Active: {selectedField.is_active ? 'Yes' : 'No'}</p> */}
          

//           {selectedField.questions.map((question,index) => (
            
//             <div key={question.id} className="mb-4">
//               <p>Allocated : {selectedField.user}</p>
//               <h3 className="text-lg font-semibold"> {index + 1}. {question.text}</h3>
//               <ul className="list-disc list-inside">
//                 {question.options.map((option) => (
//                   <li key={option.id} className="ml-4">
//                     {option.value}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TableFieldQuestionAns;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { base_url } from '@/utils/api';
import { useDispatch, useSelector } from 'react-redux';

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

const TableFieldQuestionAns: React.FC = () => {
  const [inspectionData, setInspectionData] = useState<Inspection[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);
  useEffect(() => {
    axios({
      method: 'get',
      url: `${base_url}field`,
      headers: {
        token: localStorage.getItem('saudit') || '',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setInspectionData(res.data.data);
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        toast.error(errorMessage, {
          autoClose: 1000,
        });
      });
  }, [reduxData.refresh]);

  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFieldId(Number(event.target.value));
  };

  const selectedField = inspectionData.find((inspection) => inspection.id === selectedFieldId);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inspection Data</h1>

      {/* Dropdown for selecting a field */}
      <div className="mb-4">
        <label htmlFor="field-select" className="block text-lg font-medium mb-2">Select Field:</label>
        <select
          id="field-select"
          value={selectedFieldId || ''}
          onChange={handleFieldChange}
          className="block w-full border rounded-lg p-4 bg-transparent"
        >
          <option value="" disabled>Select a field</option>
          {inspectionData.map((inspection) => (
            <option key={inspection.id} value={inspection.id}>
              {inspection.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display questions and options based on the selected field */}
      {selectedField && (
        <div className="border p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 flex items-center justify-center">{selectedField.name}</h2>
          
          {/* Display the allocated user name */}
          <p className="mb-2">Allocated User: {selectedField.user ? selectedField.user.name : 'None'}</p>
          <p className="mb-2">Inspection Type: {selectedField.inspection_type ? selectedField.inspection_type.name : 'None'}</p>

          {selectedField.questions.map((question, index) => (
            <div key={question.id} className="mb-4">
              <h3 className="text-lg font-semibold"> {index + 1}. {question.text}</h3>
              <ul className="list-disc list-inside">
                {question.options.map((option) => (
                  <li key={option.id} className="ml-4">
                    {option.value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableFieldQuestionAns;

