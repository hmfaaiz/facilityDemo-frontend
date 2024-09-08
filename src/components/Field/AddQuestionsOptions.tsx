// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { base_url } from "@/utils/api";

// const AddQuestionModal = ({ isOpen, onClose, fieldId=3 }) => {
//   const [questions, setQuestions] = useState([
//     { text: "", options: [""] }
//   ]);

//   const handleQuestionChange = (index, event) => {
//     const newQuestions = [...questions];
//     newQuestions[index].text = event.target.value;
//     setQuestions(newQuestions);
//   };

//   const handleOptionChange = (questionIndex, optionIndex, event) => {
//     const newQuestions = [...questions];
//     newQuestions[questionIndex].options[optionIndex] = event.target.value;
//     setQuestions(newQuestions);
//   };

//   const handleAddOption = (questionIndex) => {
//     const newQuestions = [...questions];
//     newQuestions[questionIndex].options.push("");
//     setQuestions(newQuestions);
//   };

//   const handleAddQuestion = () => {
//     setQuestions([...questions, { text: "", options: [""] }]);
//   };

//   const handleRemoveQuestion = (index) => {
//     const newQuestions = [...questions];
//     newQuestions.splice(index, 1);
//     setQuestions(newQuestions);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         data: questions.map((question) => ({
//           text: question.text,
//           fieldId: fieldId, // Assuming fieldId is provided as a prop
//           options: question.options.map((option) => ({ value: option }))
//         }))
//       };

//       const response = await axios.post(`${base_url}/field/NewQuestionAndOptions`, payload, {
//         headers: { Authorization: localStorage.getItem("saudit") || "" },
//       });

//       if (response.status === 200) {
//         toast.success("Questions added successfully", { autoClose: 1000 });
//         onClose();  // Close modal after success
//       }
//     } catch (error) {
//         console.log(error)
//       toast.error("error", { autoClose: 2000 });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="relative w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
//         <button onClick={onClose} className="absolute top-2 right-2 text-2xl">&times;</button>

//         <form onSubmit={handleSubmit}>
//           {questions.map((question, qIndex) => (
//             <div key={qIndex} className="mb-4">
//               <label className="block text-sm font-medium mb-2">Question {qIndex + 1}</label>
//               <input
//                 type="text"
//                 value={question.text}
//                 onChange={(event) => handleQuestionChange(qIndex, event)}
//                 className="w-full p-2 border rounded mb-2"
//                 placeholder="Enter question"
//               />

//               {question.options.map((option, oIndex) => (
//                 <div key={oIndex} className="flex items-center mb-2">
//                   <input
//                     type="text"
//                     value={option}
//                     onChange={(event) => handleOptionChange(qIndex, oIndex, event)}
//                     className="flex-1 p-2 border rounded mr-2"
//                     placeholder={`Option ${oIndex + 1}`}
//                   />
//                 </div>
//               ))}

//               <button type="button" onClick={() => handleAddOption(qIndex)} className="text-blue-500">
//                 + Add Option
//               </button>
//               <button type="button" onClick={() => handleRemoveQuestion(qIndex)} className="ml-4 text-red-500">
//                 - Remove Question
//               </button>
//             </div>
//           ))}

//           <button type="button" onClick={handleAddQuestion} className="text-blue-500">
//             + Add Another Question
//           </button>

//           <button onClick={(e)=>handleSubmit(e)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddQuestionModal;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url } from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";

const AddQuestionModal = ({ isOpen, onClose }) => {
  const [questions, setQuestions] = useState([{ text: "", options: [""] }]);
  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState("");
  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);
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
        const errorMessage =
          error.response?.data?.message || "Something went wrong";

        toast.error(errorMessage, {
          autoClose: 2000,
        });
      }
    };

    if (isOpen) {
      fetchFields();
    }
  }, [reduxData.refresh,isOpen]);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push("");
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", options: [""] }]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleFieldChange = (event) => {
    setSelectedFieldId(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFieldId) {
      toast.error("Please select a field", { autoClose: 2000 });
      return;
    }

    try {
      const payload = {
        data: questions.map((question) => ({
          text: question.text,
          fieldId: selectedFieldId, // Using the selected field ID
          options: question.options.map((option) => ({ value: option })),
        })),
      };

      const response = await axios.post(
        `${base_url}/field/NewQuestionAndOptions`,
        payload,
        {
          headers: { Authorization: localStorage.getItem("saudit") || "" },
        },
      );

      if (response.status === 200) {
        dispatch({
          type: "refresh",
          payload: !reduxData.refresh,
        });
        toast.success("Questions added successfully", {
          autoClose: 1000, // Duration in milliseconds
        });
        onClose();
        
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add questions", { autoClose: 2000 });
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
            <label className="mb-2 block text-sm font-medium">
              Select Field
            </label>
            <select
              value={selectedFieldId}
              onChange={handleFieldChange}
              className="w-full rounded border p-2"
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

          {questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-4">
              <label className="mb-2 block text-sm font-medium">
                Question {qIndex + 1}
              </label>
              <input
                type="text"
                value={question.text}
                onChange={(event) => handleQuestionChange(qIndex, event)}
                className="mb-2 w-full rounded border p-2"
                placeholder="Enter question"
              />

              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="mb-2 flex items-center">
                  <input
                    type="text"
                    value={option}
                    onChange={(event) =>
                      handleOptionChange(qIndex, oIndex, event)
                    }
                    className="mr-2 flex-1 rounded border p-2"
                    placeholder={`Option ${oIndex + 1}`}
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleAddOption(qIndex)}
                className="text-blue-500"
              >
                + Add Option
              </button>
              <button
                type="button"
                onClick={() => handleRemoveQuestion(qIndex)}
                className="text-red-500 ml-4"
              >
                - Remove Question
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddQuestion}
            className="text-blue-500"
          >
            + Add Another Question
          </button>

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

export default AddQuestionModal;
