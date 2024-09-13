"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { base_url } from "@/utils/api";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const permissions = ["GET", "POST", "PUT", "DELETE", "LIST"];

const PermissionsPage = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [userPermissions, setUserPermissions] = useState<number[]>([]);
  const [permissionData, setPermissionData] = useState([]);
  const [getPermissionData, setGetPermissionData] = useState([]);
  const [getPermissionDataRole, setPermissionDataRole] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const dispatch = useDispatch();
  const reduxData = useSelector((x) => x.data);

  // getting permidssion data 1st api

  useEffect(() => {
    axios({
      method: "get",
      url: `${base_url}user/GetPermissionData/`,
      headers: {
        token: localStorage.getItem("saudit"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setGetPermissionData(res.data.data);
          setPermissionDataRole(res.data.role);
          console.log("role_ids",res.data.role)
          dispatch({
            type: 'role_ids',
            payload:reduxData.res.data.role,
        });
        }
      })
      .catch((err) => {
        console.log("Something is wrong");
      });
  }, [reduxData.refresh]);

  // 2nd api

  useEffect(() => {
    axios({
      method: "get",
      url: `${base_url}user/GetRolePermission/`,
      headers: {
        token: localStorage.getItem("saudit"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setPermissionData(res.data.data);
          setRoles(res.data.data.map((role: any) => role.roleName));
        }
      })
      .catch((err) => {
        console.log("Something is wrong");
      });
  }, [reduxData.refresh]);

  //  3rd function

  const findPermission = (e: any) => {
    const [roleId, roleName] = e.target.value.split(':'); 
   setSelectedRole(e.target.value);
console.log(" e.target.value", e.target.value)

    const selectedrole = permissionData.find(
      (role) => role.roleName === roleName,
    );

    if (selectedrole) {
      console.log("Selected Role:", selectedrole.permissions);
      let permissions = selectedrole.permissions;

      let allPermissionIds: any = [];

      for (let role in permissions) {
        let rolePermissions = permissions[role];

        // Iterate over each permission and collect permissionId
        rolePermissions.forEach((permission) => {
          allPermissionIds.push(permission.permissionId);
        });
      }
      setUserPermissions(allPermissionIds);
    } else {
      console.log("Role not found");
      setUserPermissions([]);
    }
  };

  // const handleCheckboxChange = (id: any) => {
  //   setUserPermissions((prev: any) => {
  //     if (prev.includes(id)) {
  //       return prev.filter((perm: any) => perm !== id);
  //     } else {
  //       return [...prev, id];
  //     }
  //   });
  // };


  const handleCheckboxChange = (id: number) => {
    setUserPermissions((prev: number[]) => {
      console.log('Previous Permissions:', prev);
      const updatedPermissions = prev.includes(id)
        ? prev.filter((perm: number) => perm !== id)
        : [...prev, id];
      console.log('Updated Permissions:', updatedPermissions);
      return updatedPermissions;
    });
  };
  
  const UpdatePermission = (id: any) => {
    console.log("userPermissions update", (userPermissions[0]));
    let [roleId]=selectedRole
  

        axios
          .post(`${base_url}user/AddRolePermission/`, {
            roleId,
            permissionId: userPermissions,
            headers: {
              'Content-Type': 'application/json', 
               'Authorization': `Bearer ${localStorage.getItem("saudit")}`
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setRefresh(!refresh)
              toast.success("Successfully updated", {
                autoClose: 1000, 
              });
            }
          })
      



       .catch ((error:any)=> {
         
          const errorMessage =
          error.response?.data?.message || "Something went wrong";
       
        toast.error(errorMessage);
      });



      // } catch (error) {
      //   alert("Something is wrong");
      // }
    
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Permission" />
      <div className="col-span-12 xl:col-span-12">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-4 ">
            <label
              htmlFor="roleSelect"
              className="text-gray-700 mb-3 block text-sm font-medium"
            >
              Select Role
            </label>
            <div className="flex gap-2 ">
              <select
                id="roleSelect"
                className=" border-gray-300 mt-1 block w-full cursor-pointer rounded-md border py-2 pl-3 pr-10 text-base text-black focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                value={selectedRole}
                onChange={(e) => findPermission(e)}
              >
                <option className="cursor-pointer" value="">
                  Select a role
                </option>
                {getPermissionDataRole.map((role: any) => (
                  <option
                    className="cursor-pointer"
                    key={role.id}
                    value={`${role.id}:${role.roleName}`}
                  >
                    {role.roleName}
                  </option>
                ))}
              </select>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-md border border-black px-10 py-4 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
                onClick={() => UpdatePermission()}
              >
                UPDATE
              </Link>
            </div>
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-black text-white">
                <tr>
                  <th className="border-gray-300 border-b px-4 py-2">Module</th>
                  {permissions.map((permission) => (
                    <th
                      key={permission}
                      className="border-gray-300 border-b px-4 py-7"
                    >
                      {permission === "PUT" ? "UPDATE" : permission}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getPermissionData.map((module: any) => (
                  <tr key={module}>
                    <td className="border-gray-300 border-b px-4 py-7">
                      {module.moduleName}
                    </td>
                    {module.actions.map((action: any) => (
                      <td
                        key={action.permissionId}
                        className="border-gray-300 border-b px-25 py-2"
                      >
                        <input
                          type="checkbox"
                          checked={userPermissions.includes(
                            action.permissionId,
                          )}
                          onChange={() =>
                            handleCheckboxChange(action.permissionId)
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PermissionsPage;
