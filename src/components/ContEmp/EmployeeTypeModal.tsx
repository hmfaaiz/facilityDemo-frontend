
import React, { useState } from 'react';
import SelectGroupOne from '../SelectGroup/SelectGroupOne';
import { base_url } from '@/utils/api';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EmployeeTypeModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
   
    const [type_name, settype_name] = useState<string>('');


    const dispatch = useDispatch();
    const reduxData = useSelector((state: any) => state.data);

    const Allocate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent default form behavior if applicable
        if (  type_name ) {
            try {
                const response = await axios.post(
                    `${base_url}contractoremp/Add_Emp_Type`,
                    {
                        type_name,
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem('saudit') || '',
                        },
                    }
                );

                if (response.status === 200) {
                    dispatch({
                        type: 'refresh',
                        payload: !(reduxData.refresh),
                    });
                    toast.success('Successfully Added');
                    onClose();
                }
            // } catch (error) {
            //     alert('Something went wrong');
            // }

        } catch (error: any) {
            // Handle both response and request errors
            const errorMessage =
            error.response?.data?.message || "Something went wrong";
         
          toast.error(errorMessage);
        }
        } else {
            toast.error('Please fill in all fields');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-8">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] p-6 relative overflow-auto">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-black dark:text-white text-2xl"
                >
                    &times;
                </button>

                <form action="#">
                    <div className="flex flex-wrap gap-4 mb-8 items-center justify-center">
                        <div className="w-full xl:w-2/5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Name
                            </label>
                            <input
                                value={type_name}
                                onChange={(e) => settype_name(e.target.value)}
                                type="text"
                                placeholder="Enter your first name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

              
                       
                    </div>
                    <button
                        onClick={Allocate}
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeTypeModal;

