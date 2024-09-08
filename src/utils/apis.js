"use client";
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { base_url } from "@/utils/api";

export const useSeedApis = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPermissionData = async () => {
      try {
        const res = await axios({
          method: 'get',
          url: `${base_url}user/GetPermissionData/`,
          headers: {
            token: localStorage.getItem('saudit'),
          },
        });

        if (res.status === 200) {
          console.log("seed api", res.data.role);
          dispatch({
            type: 'role_ids',
            payload: res.data.role,
          });
        }
      } catch (err) {
        console.error('Something went wrong', err);
      }
    };

    fetchPermissionData();
  }, [dispatch]);

  useEffect(() => {
    const fetchEmpTypeData = async () => {
      try {
        const res = await axios({
          method: 'get',
          url: `${base_url}emp/Get_Emp_Type`,
          headers: {
            token: localStorage.getItem('saudit'),
          },
        });

        if (res.status === 200) {
          console.log("emp_type_ids", res.data.data);
          dispatch({
            type: 'emp_type_ids',
            payload: res.data.data,
          });
        }
      } catch (err) {
        console.error('Something went wrong', err);
      }
    };

    fetchEmpTypeData();
  }, [dispatch]);



  useEffect(() => {
    const fetchEmpData = async () => {
      try {
        const res = await axios({
          method: 'get',
          url: `${base_url}jobmanagement/GetEmp`,
          headers: {
            token: localStorage.getItem('saudit'),
          },
        });

        if (res.status === 200) {
          console.log("emp_data", res.data.data);
          dispatch({
            type: 'emp_data',
            payload: res.data.data,
          });
        }
      } catch (err) {
        console.error('Something went wrong', err);
      }
    };

    fetchEmpData();
  }, [dispatch]);
};
