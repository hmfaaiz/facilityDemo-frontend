// import React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';

// const Bars = () => {
//   return (
//     <BarChart
//       xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
//       series={[
//         { data: [4, 3, 5] },
//         { data: [1, 6, 3] },
//         { data: [2, 5, 6] }
//       ]}
//       width={500}
//       height={300}
//     />
//   );
// };

// export default Bars;


// import React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';

// const Bars = () => {
//   // Data from your API
//   const data = {
//     total_jobs: 6,
//     pending_jobs: 0,
//     completed_jobs: 5,
//     canceled_jobs: 1
//   };

//   return (
//     <BarChart
//       xAxis={[{ scaleType: 'band', data: ['Total Jobs', 'Pending Jobs', 'Completed Jobs', 'Canceled Jobs'] }]}
//       series={[
//         {
//           data: [data.total_jobs, data.pending_jobs, data.completed_jobs, data.canceled_jobs],
//           label: 'Jobs'
//         }
//       ]}
//       width={500}
//       height={300}
//     />
//   );
// };

// export default Bars;



import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { base_url } from '@/utils/api';

const Bars = ({Data} ) => {
  const [chartData, setChartData] = useState([]);
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
        const data = Data;
        if (data) {
          setChartData([
            data.total_jobs,
            data.pending_jobs,
            data.completed_jobs,
            data.canceled_jobs,
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
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Total Jobs', 'Pending Jobs', 'Completed Jobs', 'Canceled Jobs'] }]}
      series={[
        { data: chartData }
      ]}
      width={500}
      height={400}
    />
  );
};

export default Bars;
