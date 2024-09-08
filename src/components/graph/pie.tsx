// // pages/chart.js (or any other page/component where you want to use the chart)
// import React, { useEffect, useState } from 'react';
// import { PieChart } from '@mui/x-charts/PieChart';
// import { base_url } from '@/utils/api';

// const fetchData = async () => {
//   try {
//     const response = await fetch(`${base_url}report/GraphReport`, {
//         headers: {
//           Authorization: localStorage.getItem("saudit") || "",
//         },
//       });
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const result = await response.json();
//     return result.data; // Adjust based on your API response structure
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//     return null; // Return null if fetch fails
//   }
// };

// const BasicPie = () => {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true); // Add loading state
//   const [error, setError] = useState(null); // Add error state

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const data = await fetchData();
//         if (data) {
//           setChartData([
//             { id: 0, value: data.total_jobs || 0, label: 'Total Jobs' },
//             { id: 1, value: data.pending_jobs || 0, label: 'Pending Jobs' },
//             { id: 2, value: data.completed_jobs || 0, label: 'Completed Jobs' },
//             { id: 3, value: data.canceled_jobs || 0, label: 'Canceled Jobs' },
//           ]);
//         }
//       } catch (error) {
//         setError('Failed to fetch chart data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     getData();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <PieChart
//       series={[
//         {
//           data: chartData,
//         },
//       ]}
//       width={400}
//       height={400}
//     />
//   );
// };

// export default BasicPie;




// import * as React from 'react';
// import { PieChart } from '@mui/x-charts/PieChart';
// import { useState,useEffect } from 'react';
// import { base_url } from '@/utils/api';

// export default function BasicPie() {
//     const [chartData, setChartData] = useState([]);
//       const [loading, setLoading] = useState(true);
//       const [error, setError] = useState(null); 

//       const fetchData = async () => {
//           try {
//             const response = await fetch(`${base_url}report/GraphReport`, {
//                 headers: {
//                   Authorization: localStorage.getItem("saudit") || "",
//                 },
//               });
//             if (!response.ok) {
//               throw new Error('Network response was not ok');
//             }
//             const result = await response.json();
//             return result.data; // Adjust based on your API response structure
//           } catch (error) {
//             console.error('Failed to fetch data:', error);
//             return null; // Return null if fetch fails
//           }
//         };

//      useEffect(() => {
//             const getData = async () => {
//               try {
//                 const data = await fetchData();
//                 if (data) {
//                   setChartData([
//                     { id: 0, value: data.total_jobs || 0, label: 'Total Jobs' },
//                     { id: 1, value: data.pending_jobs || 0, label: 'Pending Jobs' },
//                     { id: 2, value: data.completed_jobs || 0, label: 'Completed Jobs' },
//                     { id: 3, value: data.canceled_jobs || 0, label: 'Canceled Jobs' },
//                   ]);
//                 }
//               } catch (error) {
//                 setError('Failed to fetch chart data.');
//               } finally {
//                 setLoading(false);
//               }
//             };
        
//             getData();
//           }, []);
//   return (
//     <PieChart
//       series={[
//         {
//           data:chartData
//         },
//       ]}
//       width={600}
//       height={300}
//     />
//   );
// }





// import * as React from 'react';
// import { PieChart } from '@mui/x-charts/PieChart';
// import { useState, useEffect } from 'react';
// import { base_url } from '@/utils/api';

// export default function BasicPie() {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${base_url}report/GraphReport`, {
//         headers: {
//           Authorization: localStorage.getItem("saudit") || "",
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const result = await response.json();
//       return result.data;
//     } catch (error) {
//       console.error('Failed to fetch data:', error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const data = await fetchData();
//         if (data) {
//           setChartData([
//             { id: 0, value: data.total_jobs || 0, label: 'Total Jobs' },
//             { id: 1, value: data.pending_jobs || 0, label: 'Pending Jobs' },
//             { id: 2, value: data.completed_jobs || 0, label: 'Completed Jobs' },
//             { id: 3, value: data.canceled_jobs || 0, label: 'Canceled Jobs' },
//           ]);
//         }
//       } catch (error) {
//         setError('Failed to fetch chart data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     getData();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <PieChart
//       series={[
//         {
//           data: chartData,
//           // Custom configuration for data labels
//           label: {
//             show: true, // Show labels
//             formatter: (value, { data }) => `${data.label}: ${value}`, // Customize label format
//           },
//         },
//       ]}
//       width={600}
//       height={300}
//       // Additional customization can be done here if needed
//     />
//   );
// }




import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from 'react';
import { base_url } from '@/utils/api';

export default function BasicPie({Data} ) {
console.log("Data",Data)
  const [chartData, setChartData] = useState([]);

if (!chartData) {
    return null; // Don't render the chart if there's no data
  }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${base_url}report/GraphReport`, {
//         headers: {
//           Authorization: localStorage.getItem("saudit") || "",
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const result = await response.json();
//       return result.data;
//     } catch (error) {
//       console.error('Failed to fetch data:', error);
//       return null;
//     }
//   };

  useEffect(() => {
    // const getData = async () => {
      try {
        const data =  Data;
        if (data) {
          setChartData([
            { id: 0, value: data.total_jobs || 0, label: 'Total Complaints' },
            { id: 1, value: data.pending_jobs || 0, label: 'Pending Complaints' },
            { id: 2, value: data.completed_jobs || 0, label: 'Completed Complaints' },
            { id: 3, value: data.canceled_jobs || 0, label: 'Canceled Complaints' },
          ]);
        }
      } catch (error) {
        setError('Failed to fetch chart data.');
      } finally {
        setLoading(false);
      }
    // };

    // getData();
  }, [Data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <PieChart
      series={[
        {
          data: chartData.map(item => ({ id: item.id, value: item.value, label: item.label })),
          innerRadius: 80, // Optional: Makes the pie chart look like a donut chart
          outerRadius: 170, // Adjust to change the size
        },
      ]}
      width={700}
      height={400}
    />
  );
}




