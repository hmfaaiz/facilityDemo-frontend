
// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { base_url } from "@/utils/api";
// import { useDispatch, useSelector } from "react-redux";

// const AllocateModal = ({ isOpen, onClose }) => {
//   const [questions, setQuestions] = useState([{ text: "", options: [""] }]);
//   const [fields, setFields] = useState([]);
//   const [fieldSupervisor, setFieldSupervisor] = useState([]);
//   const [selectedFieldId, setSelectedFieldId] = useState("");
//   const [fieldSupervisorId, setFieldSupervisorId] = useState("");
//   const dispatch = useDispatch();
//   const reduxData = useSelector((state: any) => state.data);

  
//   useEffect(() => {
//     const fetchFields = async () => {
//       try {
//         const response = await axios.get(`${base_url}field`, {
//           headers: { Authorization: localStorage.getItem("saudit") || "" },
//         });
//         if (response.status === 200) {
//           setFields(response.data.data);
//         }
//       } catch (error) {
//         const errorMessage =
//           error.response?.data?.message || "Something went wrong";

//         toast.error(errorMessage, {
//           autoClose: 2000,
//         });
//       }
//     };

//     if (isOpen) {
//       fetchFields();
//     }
//   }, [reduxData.refresh,isOpen]);

//   useEffect(() => {
//     const fetchFields = async () => {
//       try {
//         const response = await axios.get(`${base_url}fieldSupervisor/`, {
//           headers: { Authorization: localStorage.getItem("saudit") || "" },
//         });
//         if (response.status === 200) {
//             setFieldSupervisor(response.data.data);
//         }
//       } catch (error) {
//         const errorMessage =
//           error.response?.data?.message || "Something went wrong";

//         toast.error(errorMessage, {
//           autoClose: 2000,
//         });
//       }
//     };

//     if (isOpen) {
//       fetchFields();
//     }
//   }, [reduxData.refresh,isOpen]);



// ;



//   const handleFieldChange = (event) => {
//     setSelectedFieldId(event.target.value);
//   };
//   const handleSupervisorChange = (event) => {
//     setFieldSupervisorId(event.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedFieldId) {
//       toast.error("Please select a field", { autoClose: 2000 });
//       return;
//     }

//     try {
    

//       const response = await axios.put(
//         `${base_url}field/AllocateTOField/${selectedFieldId}`,
//         userId:fieldSupervisorId,
//         {
//           headers: { Authorization: localStorage.getItem("saudit") || "" },
//         },
//       );

//       if (response.status === 200) {
//         toast.success("Questions added successfully", { autoClose: 1000 });
//         onClose(); // Close modal after success
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to add questions", { autoClose: 2000 });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
//         <button onClick={onClose} className="absolute right-2 top-2 text-2xl">
//           &times;
//         </button>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="mb-2 block text-sm font-medium">
//               Select Field
//             </label>
//             <select
//               value={selectedFieldId}
//               onChange={handleFieldChange}
//               className="w-full rounded border p-4"
//             >
//               <option value="" disabled>
//                 Select a field
//               </option>
//               {fields.map((field) => (
//                 <option key={field.id} value={field.id}>
//                   {field.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="mb-2 block text-sm font-medium">
//               Select Field Supervisor
//             </label>
//             <select
//               value={selectedFieldId}
//               onChange={handleFieldChange}
//               className="w-full rounded border p-4"
//             >
//               <option value="" disabled>
//                 Select a Field Supervisor
//               </option>
//               {fieldSupervisor.map((supervisor) => (
//                 <option key={supervisor.id} value={supervisor.id}>
//                   {supervisor.name}
//                 </option>
//               ))}
//             </select>
//           </div>

    

//           <button
//             type="submit"
//              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AllocateModal;



import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url } from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";

interface Field {
  id: string;
  name: string;
}

interface Supervisor {
  id: string;
  name: string;
}

interface AllocateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllocateModal: React.FC<AllocateModalProps> = ({ isOpen, onClose }) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [fieldSupervisors, setFieldSupervisors] = useState<Supervisor[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string>("");
  const [selectedSupervisorId, setSelectedSupervisorId] = useState<string>("");
  const [getInspectionType, setGetInspectionType ]= useState<string>("");
  const [selectedInspectionType, setSelectedGetInspectionType ]= useState([]);
  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);

  // Fetch fields when the modal is open
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get(`${base_url}field`, {
          headers: { Authorization: localStorage.getItem("saudit") || "" },
        });
        if (response.status === 200) {
          setFields(response.data.data);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong", {
          autoClose: 2000,
        });
      }
    };

    if (isOpen) {
      fetchFields();
    }
  }, [reduxData.refresh, isOpen]);

  // Fetch field supervisors when the modal is open
  useEffect(() => {
    const fetchFieldSupervisors = async () => {
      try {
        const response = await axios.get(`${base_url}fieldSupervisor/`, {
          headers: { Authorization: localStorage.getItem("saudit") || "" },
        });
        if (response.status === 200) {
          setFieldSupervisors(response.data.data);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong", {
          autoClose: 2000,
        });
      }
    };

    if (isOpen) {
      fetchFieldSupervisors();
    }
  }, [reduxData.refresh, isOpen]);

  
  useEffect(() => {
    const fetchFieldData = async () => {
      try {
        const response = await axios.get(`${base_url}field/GetInspectionType`, {
          headers: {
            Authorization: localStorage.getItem("saudit") || "",
          },
        });

        if (response.status === 200) {
          const data = response.data.data;
          if (Array.isArray(data) && data.length > 0) {
            setGetInspectionType(data);
          } else {
            toast.error("Data not found", { autoClose: 1000 });
          }
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        toast.error(errorMessage, { autoClose: 1500 });
      }
    };

    fetchFieldData();
  }, [reduxData.refresh]);

  // Handle field selection
  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFieldId(event.target.value);
  };

  // Handle supervisor selection
  const handleSupervisorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSupervisorId(event.target.value);
  };
  const handleInspectionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGetInspectionType(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
console.log("selectedInspectionType",selectedInspectionType)
    if (!selectedFieldId || !selectedSupervisorId || !selectedInspectionType) {
      toast.error("Please select both a field and a supervisor", { autoClose: 2000 });
      return;
    }

    try {
      const response = await axios.put(
        `${base_url}field/AllocateTOField/${selectedFieldId}`,
        { userId: selectedSupervisorId ,
          inspection_type_id:selectedInspectionType
        },
        {
          headers: { Authorization: localStorage.getItem("saudit") || "" },
        }
      );

      if (response.status === 200) {
        dispatch({
            type: "refresh",
            payload: !reduxData.refresh,
          });
          toast.success("Successfully updated", {
            autoClose: 1000, // Duration in milliseconds
          });
          onClose();
      }
    } catch (error) {
      toast.error("Failed to allocate field", { autoClose: 2000 });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <button onClick={onClose} className="absolute right-2 top-2 text-2xl">
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Select Field</label>
            <select
              value={selectedFieldId}
              onChange={handleFieldChange}
              className="w-full rounded border p-4"
            >
              <option value="" disabled>
                Select a field
              </option>
              {fields.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Select Field Supervisor</label>
            <select
              value={selectedSupervisorId}
              onChange={handleSupervisorChange}
              className="w-full rounded border p-4"
            >
              <option value="" disabled>
                Select a field supervisor
              </option>
              {fieldSupervisors.map((supervisor) => (
                <option key={supervisor.id} value={supervisor.id}>
                  {supervisor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Select Field Supervisor</label>
            <select
              value={selectedInspectionType}
              onChange={handleInspectionTypeChange}
              className="w-full rounded border p-4"
            >
              <option value="" disabled>
                Select Inspection Type
              </option>
              {getInspectionType.map((inspect) => (
                <option key={inspect.id} value={inspect.id}>
                  {inspect.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AllocateModal;
