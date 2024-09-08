
import React, { useState } from 'react';
import SelectGroupOne from '../SelectGroup/SelectGroupOne';
import { base_url } from '@/utils/api';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SelectEmpType from '../SelectGroup/SelectEmpType';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EmployeeRegisterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {




    const [roleId, setroleId] = useState<number>();
    const [start_date, setstart_date] = useState<string>('');
    const [end_date, setend_date] = useState<string>('');
    const [mobile, setmobile] = useState<string>('');
    const [name, setname] = useState<string>('');
    const [email, setemail] = useState<string>('');
    const [cnic, setcnic] = useState<string>('');
    const [emp_type_id, setemp_type_id] = useState<string>('');

    const dispatch = useDispatch();
    const reduxData = useSelector((state: any) => state.data);
    console.log("redux employee",reduxData.role_ids)

    const toNull=()=>{
        setmobile("")
        setname("")
        setemail("")
        setemp_type_id("")
        onClose()
    }

    const Allocate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent default form behavior if applicable
        if ( mobile && name && email &&  emp_type_id) {
            try {
                const response = await axios.post(
                    `${base_url}contractoremp`,
                    {
                        roleId,
                        mobile,
                        name,
                        email,
                        emp_type_id,
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem('saudit') || '',
                        },
                    }
                );

                if (response.status === 200) {
                    toNull()
                    dispatch({
                        type: "refresh",
                        payload: !reduxData.refresh,
                      });
                      toast.success("Successfully updated", {
                        autoClose: 1000, // Duration in milliseconds
                      });
                      onClose();
                }
            // } catch (error) {
            //     alert('Something went wrong');
            // }

        } catch (error: any) {
            // Handle both response and request errors
            const errorMessage = error.response?.data?.message || "Something went wrong";

            toast.error(errorMessage, {
              autoClose: 1000,
            });
            
        }
        } else {
          
            toast.error('Please fill in all fields', {
                autoClose: 1000,
              });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-8">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] p-6 relative overflow-auto">
                <button
                    onClick={toNull}
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
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                type="text"
                                placeholder="Enter your first name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div className="w-full xl:w-2/5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Contact Number
                            </label>
                            <input
                                value={mobile}
                                onChange={(e) => setmobile(e.target.value)}
                                type="text"
                                placeholder="Enter your contact number"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                 
                        {/* <div className="w-full xl:w-2/5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                emp_type_id
                            </label>
                            <input
                                value={emp_type_id}
                                onChange={(e) => setemp_type_id(e.target.value)}
                                type="text"
                                placeholder="Enter your emp_type_id"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div> */}

                        <div className="w-full xl:w-2/5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Contact Email <span className="text-meta-1">*</span>
                            </label>
                            <input
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                type="email"
                                placeholder="Enter your email "
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div className="w-full xl:w-2/5">
                            <SelectEmpType setempType_id={setemp_type_id} />
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

export default EmployeeRegisterModal;

