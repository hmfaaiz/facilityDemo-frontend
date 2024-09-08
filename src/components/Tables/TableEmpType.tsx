


"use client"

import { useState, useEffect } from 'react';
// import UpdateRoomModal from '../RoomModal/UpdateRoom';
import ViewBookingDetail from '../TenantModal/ViewTenantDetail';
import { useSelector } from 'react-redux';

const TableEmpType = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openViewModal = (archives:any) => {
   
    setSelectedRoom(archives);
    setIsViewModalOpen(true);
  };


  const closeViewModal = () => setIsViewModalOpen(false);

  const reduxData = useSelector((x:any) => x.data);
  const archiveData = reduxData?.archives || [];

  // Format date and time
  const formatDateTime = (dateTimeString:any) => {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
    const period = hours >= 12 ? ' PM' : ' AM';
    const formattedHours = ((hours + 11) % 12 + 1); // Convert 24-hour time to 12-hour time

    return `${day}/${month}/${year} ${formattedHours}:${minutes}${period}`;
  };

  // Filter data by date range
  const filterDataByDate = () => {
    if (!startDate || !endDate) {
      setFilteredData(archiveData);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include the entire end day

    const filtered = archiveData.filter((archive:any) => {
      const archiveStartDate = new Date(archive.start_time);
      return archiveStartDate >= start && archiveStartDate <= end;
    });

    setFilteredData(filtered);
  };

  // Handle date change
  const handleStartDateChange = (e:any) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e:any) => {
    setEndDate(e.target.value);
  };

  // Trigger filtering whenever start or end date changes
  useEffect(() => {
   
    filterDataByDate();

  }, [startDate, endDate]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* Date Filter Inputs */}
      <div className="mb-4">
        <label htmlFor="startDate" className="mr-2">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
          className="border rounded p-2"
        />
        <label htmlFor="endDate" className="ml-4 mr-2">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
          className="border rounded p-2"
        />
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[10px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">SNo.</th>
              <th className="min-w-[20px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">Room Number</th>
              <th className="min-w-[20px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">Status</th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">Start Time</th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">End Time</th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Contact Name</th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">View Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((archive:any, index) => (
              <tr key={archive.id}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{index + 1}</h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{archive?.room?.room_number}</h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{archive?.is_active ? "Completed" : "Cancelled"}</h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{formatDateTime(archive.start_time)}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{formatDateTime(archive.end_time)}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{archive.contact_name}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary" onClick={() => openViewModal(archive)}>
                      <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z" fill="" />
                        <path d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.89063C8.30607 7.89063 7.60938 8.58732 7.60938 9C7.60938 9.41268 8.30607 10.1094 9 10.1094C9.69393 10.1094 10.3906 9.41268 10.3906 9C10.3906 8.58732 9.69393 7.89063 9 7.89063Z" fill="" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <UpdateRoomModal isModalOpen={isModalOpen} closeModal={closeModal} selectedRoom={selectedRoom} /> */}
      <ViewBookingDetail isOpen={isViewModalOpen} onClose={closeViewModal} booking={selectedRoom} />
    </div>
  );
};

export default TableEmpType;
