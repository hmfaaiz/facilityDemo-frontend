"use client";
import dynamic from "next/dynamic";
import React from "react";
// import ChartOne from "../Charts/ChartOne";
// import ChartTwo from "../Charts/ChartTwo";
// import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import TableThree from "../Tables/TableThree";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { base_url } from "../../utils/api";
import axios from "axios";
import { useSeedApis } from "@/utils/apis";
import Bars from "../graph/bar";
import BasicPie from "../graph/pie";
const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
  ssr: false,
});

// const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
//   ssr: false,
// });

const ECommerce: React.FC = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector((x: any) => x.data);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState(null);
  useSeedApis();

  // useEffect(() => {

  //   axios({
  //     method: "get",
  //     url: `${base_url}booking/Report`,
  //     headers: {
  //       token: localStorage.getItem("saudit"),
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         dispatch({
  //           type: "report",
  //           payload: res.data.data,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Something is wrong");
  //     });
  // }, [reduxData.refresh, reduxData.role_name]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${base_url}report`,
      headers: {
        token: localStorage.getItem("saudit"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "summary_report",
            payload: res.data.data,
          });
        }
      })
      .catch((err) => {
        console.log("Something is wrong");
      });
  }, [reduxData.refresh, reduxData.role_name]);

  useEffect(() => {
    console.log("End date")
    const fetchData = async () => {
      try {
        const response = await fetch(`${base_url}report/GraphReport`, {
          method: "POST", // Change the method to POST
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header
            Authorization: localStorage.getItem("saudit") || "",
          },
          body: JSON.stringify({
            start_date: startDate || null, // Include startDate in the request body
            end_date: endDate || null, // Include endDate in the request body
          }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setChartData(result.data); // Store the fetched data
      } catch (error) {
        console.error("Failed to fetch data:", error);
        return null;
      }
    };
    fetchData();
  }, [reduxData.refresh, reduxData.role_name, endDate]);

  let total_report = reduxData.summary_report;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {total_report?.total_properties > -1 && (
          <CardDataStats
            title="Total Properties"
            total={total_report?.total_properties}
          >
            <svg
              className="fill-primary dark:fill-white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3L2 12h3v7h5v-5h4v5h5v-7h3L12 3z"
                fill="currentColor"
              />
            </svg>
          </CardDataStats>
        )}

        {total_report?.total_bookings > -1 && (
          <CardDataStats
            title="Total Bookings"
            total={total_report?.total_bookings}
          >
            <svg
              className="fill-primary dark:fill-white"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3h-1V2h-2v1H8V2H6v1H5c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15H8v-2h4v2zm0-4H8v-2h4v2zm6 4H9v-2h9v2zm0-4H9v-2h9v2zm-9-4v-2h9v2H9zm8-6v2H9V3h8zm-9 0H6v2h2V3z"
                fill="currentColor"
              />
            </svg>
          </CardDataStats>
        )}

        {total_report?.total_archive > -1 && (
          <CardDataStats
            title="Archive Bookings"
            total={total_report?.total_archive}
          >
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-4-4zm-4 14H8v-2h2v2zm0-4H8v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2z"
                fill="currentColor"
              />
            </svg>
          </CardDataStats>
        )}

        {total_report?.total_todayBooking > -1 && (
          <CardDataStats
            title="Today's Bookings"
            total={total_report?.total_todayBooking}
          >
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3h-2V1H7v2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 0H9V1h4v2zm6 18H5V8h14v13zm-6-9h-2v2h2v-2zm-2-2h2v-2h-2v2zm4 0h2v-2h-2v2zm-4 4h2v-2h-2v2z"
                fill="currentColor"
              />
            </svg>
          </CardDataStats>
        )}

        {total_report?.total_Users > -1 && (
          <CardDataStats title="Total Users" total={total_report?.total_Users}>
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                fill=""
              />
              <path
                d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                fill=""
              />
            </svg>
          </CardDataStats>
        )}

        {total_report?.total_tenants > -1 && (
          <CardDataStats
            title="Total Tenants"
            total={total_report?.total_tenants}
          >
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 122.88 85.855"
              enableBackground="new 0 0 122.88 85.855"
              xmlSpace="preserve"
              style={{
                fill: "currentColor", // Applies the text color to the SVG fill
                width: "24px", // Set the width of the SVG
                height: "24px", // Set the height of the SVG
              }}
            >
              <path d="M60.033,55.557c-0.61,0.332-1.37,0.107-1.697-0.499c-0.332-0.609-0.107-1.37,0.502-1.696 c2.88-1.563,4.221-3.584,4.491-5.561c0.144-1.055-0.021-2.114-0.417-3.097c-0.405-0.993-1.047-1.897-1.86-2.625 c-1.584-1.415-3.805-2.16-6.125-1.583c-0.941,0.233-1.754,0.703-2.467,1.367c-0.757,0.703-1.411,1.624-1.984,2.711 c-0.323,0.614-1.08,0.848-1.689,0.528c-0.614-0.323-0.847-1.08-0.528-1.689c0.703-1.334,1.526-2.479,2.499-3.387 c1.019-0.945,2.201-1.624,3.575-1.964c3.191-0.79,6.23,0.217,8.389,2.147c1.098,0.981,1.969,2.206,2.517,3.555 c0.552,1.363,0.777,2.859,0.568,4.376C65.437,50.85,63.702,53.564,60.033,55.557L60.033,55.557L60.033,55.557z M95.493,78.362 h0.854c0.775,0,1.409-0.633,1.409-1.409v-2.288c0-0.775-0.634-1.407-1.409-1.407h-5.098c-0.775,0-1.408,0.632-1.408,1.407v2.288 c0,0.776,0.633,1.409,1.408,1.409h0.867l-1.662,8.493h6.643L95.493,78.362L95.493,78.362L95.493,78.362z M9.851,88.039V50.395 c-2.002,0.771-3.876,0.787-5.433,0.258c-1.216-0.412-2.242-1.147-2.995-2.097c-0.754-0.95-1.232-2.105-1.378-3.38 c-0.222-1.977,0.368-4.21,2.054-6.306l0,0c0.085-0.102,0.179-0.205,0.291-0.291L51.208,0.472c0.633-0.582,1.609-0.641,2.311-0.094 l32.55,25.305l-0.305,0.104c-4.906,1.702-9.154,4.79-11.706,9.272c-9.218-7.405-19.367-15.417-21.31-16.928 c-3.927,2.986-38.107,29.303-38.107,30.415v39.511L9.851,88.039L9.851,88.039L9.851,88.039z M80.221,3.039L94.91,3.638v19.841 l-14.689-9.694V3.039L80.221,3.039L80.221,3.039L80.221,3.039z M64.717,86.855c0.658-8.566-1.022-8.194,6.154-10.887 c3.579-1.343,8.154-3.044,11.447-5.091l6.146,15.978H64.717L64.717,86.855L64.717,86.855z M86.582,65.963 c0.156-1.317-3.742-6.337-4.452-8.741c-1.526-2.433-2.067-6.285-0.404-8.854c0.664-1.017,0.378-2.835,0.378-4.236 c0-13.964,24.465-13.971,24.465,0c0,1.766-0.404,3.108,0.554,4.497c1.604,2.321,0.776,6.435-0.573,8.593 c-0.866,2.528-4.961,7.308-4.674,8.741C102.116,73.134,86.536,72.893,86.582,65.963L86.582,65.963L86.582,65.963z M105.564,70.142 c3.006,1.923,7.269,3.5,10.678,4.641c6.694,2.236,6.676,2.543,6.63,12.073H99.209L105.564,70.142L105.564,70.142L105.564,70.142z M50.437,65.444c-4.744-6.373-4.86-12.411,0.9-18.023l-4.148-2.291c-3.322-1.292-9.416,8.234-7.061,10.779l3.232,4.794 l-0.667,1.391c-0.184,0.413-0.004,0.703,0.446,0.904l0.438,0.118l-8.406,16.637l1.701,3.628l3.404-1.002l0.876-1.701l-0.839-1.571 l1.849-0.396l0.43-0.835l-0.966-1.473l0.634-1.231l1.845-0.232l0.601-1.165l-1.031-1.348l0.659-1.275l1.881-0.307l2.561-4.889 l0.434,0.237C49.962,66.651,50.351,66.356,50.437,65.444L50.437,65.444L50.437,65.444z M59.367,69.44l-1.252,4.672L56.376,74.8 l-0.364,1.361l1.268,1.076l-0.331,1.239l-1.718,0.605l-0.352,1.309l1.231,1.207l-0.237,0.888l-1.69,0.765l1.129,1.33l-0.487,1.812 l-3.047,1.665l-2.381-3.121l4.541-16.947l-1.1-0.295c-0.224-0.061-0.364-0.294-0.302-0.523l0.462-1.722 c-3.329-2.524-4.979-6.893-3.833-11.175c1.473-5.503,7.028-8.824,12.534-7.589c0.025,0.295,0.021,0.593-0.02,0.892 c-0.103,0.744-0.426,1.51-1.023,2.25c-0.081,0.099-0.167,0.2-0.257,0.299c-1.759-0.114-3.407,1.022-3.881,2.79 c-0.205,0.761-0.16,1.529,0.081,2.221c0.058,0.246,0.152,0.483,0.275,0.716c0.29,0.532,0.716,0.937,1.214,1.194 c0.328,0.218,0.696,0.38,1.093,0.491c1.976,0.527,4-0.609,4.589-2.553c0.597-0.527,1.117-1.084,1.563-1.657 c0.867-1.117,1.46-2.303,1.812-3.509c2.39,2.577,3.441,6.287,2.464,9.936c-1.146,4.282-4.767,7.245-8.906,7.765l-0.462,1.721 c-0.061,0.227-0.295,0.364-0.523,0.304L59.367,69.44L59.367,69.44L59.367,69.44z" />
            </svg>
          </CardDataStats>
        )}

        {total_report?.total_contractors > -1 && (
          <CardDataStats
            title="Total Contractors"
            total={total_report?.total_contractors}
          >
            <svg
              style={{ fill: "currentColor", width: "24", height: "24" }}
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 469 511.98"
            >
              <path d="M60.21 401.42c5.6 0 10.14 4.54 10.14 10.14 0 5.6-4.54 10.14-10.14 10.14-5.6 0-10.15-4.54-10.15-10.14 0-5.6 4.55-10.14 10.15-10.14zM242.87 216.1h4.21c3.83 0 6.95-3.12 6.95-6.95v-11.3c0-3.82-3.12-6.94-6.95-6.94h-25.16c-3.83 0-6.95 3.12-6.95 6.94v11.3c0 3.83 3.12 6.95 6.95 6.95h4.28l-2.04 18.06c6.19-2.68 12.83-4.63 20.02-5.95l-1.31-12.11zM92.16 257.65c.76-25.52 3.33-43.67 29.18-53.36 17.66-6.63 40.25-15.03 56.5-25.13l20.25 73.33c-1.41 1.46-2.8 3-4.16 4.61-20.15.31-37.41 6.66-54.41 17.1h-13.35c-9.07-9.78-21.1-14.86-34.01-16.55zM198.88 154.9c.77-6.5-18.47-31.27-21.98-43.15-7.53-12-10.2-31.01-1.99-43.69 3.28-5.02 1.86-9.44 1.86-16.36 0-68.92 120.76-68.95 120.76 0 0 8.72-2 10.79 2.73 17.65 7.92 11.45 3.83 31.75-2.83 42.4-4.28 12.49-24.48 36.07-23.07 43.15 1.19 35.39-75.7 34.2-75.48 0zm93.69 20.62c14.84 9.49 35.88 17.29 52.71 22.91 25.45 8.5 31.24 29.75 32.45 60.56-6.19.53-12.22 1.82-18.02 4.19-30.92-20.1-50.25-34.48-81.19-36.82l14.05-50.84zm62.77 137.42c0-1.92.12-3.75.36-5.47l-19.94-13.31c-2.88-1.92-6.01-4.12-9.16-6.32-11.34-7.95-23.02-16.13-35.6-19.44a98.312 98.312 0 0 0-22.68-3.13c-7-.13-14.15.53-20.86 2.27-4.01 1.03-7.88 2.48-11.48 4.37-3.19 1.69-6.17 3.76-8.82 6.23l-13.39 15.93a5.87 5.87 0 0 1-1.67 1.99l-36.93 43.95c.55 2.8 1.65 5.15 3.17 7.04 1.76 2.17 4.1 3.79 6.81 4.81 2.85 1.07 6.15 1.48 9.64 1.19 5.57-.46 11.51-2.74 16.86-6.98l10.26-8.48c2.6-2.14 4.75-4.12 6.9-6.08 4.73-4.33 9.47-8.65 14.44-11.61 11.51-6.87 22.95-7.09 34.28 11.91l58.06 104.72h19.74l.01-123.59zm4.68-16.76c.89-1.25 1.92-2.39 3.07-3.43 5.08-4.56 12.33-6.79 21.63-6.8v-.02l50.48.02c10.55-.04 19.15 1.89 25.1 6.46 6.61 5.1 9.72 12.87 8.4 23.99l-11.16 115.32c-.81 10.29-3.54 18.36-8.38 23.93-5.16 5.93-12.34 8.85-21.75 8.46l-45.39.01c-6.35.33-11.74-1.4-16.25-5-3.31-2.63-6.04-6.24-8.23-10.74h-15.69c2.11 6.18 2 12.05.32 17.26-1.74 5.36-5.13 9.93-9.44 13.35-4.22 3.35-9.38 5.64-14.76 6.53-5.27.86-10.78.39-15.9-1.74-5.95 6.22-12.22 10.15-18.77 11.95-6.56 1.8-13.21 1.44-19.94-.92-6.39 7.08-13.46 11.52-21.24 13.21-7.92 1.71-16.34.53-25.27-3.68-2.77 2.18-5.69 3.9-8.72 5.15a32.666 32.666 0 0 1-13.56 2.47c-11.31-.33-18.93-3.68-25-9.1-5.78-5.17-9.67-11.81-14.05-19.45l-25.03-43.64h-19.4c-1.08 5.46-2.97 10.12-5.75 13.84l-.27.39c-4.95 6.36-12.22 9.74-22.26 9.53l-42.32.01c-8.39 1.36-15.58-.7-21.21-7.22-4.98-5.77-8.39-15.12-9.84-28.88l-.06-.5L.63 318.58c-1.73-11.7.18-19.96 4.89-25.61 4.74-5.7 11.89-8.28 20.7-8.69l.72-.04h53.59v.02c8.47-.09 15.74 1.3 21.25 4.86v.02c4.44 2.87 7.62 6.92 9.27 12.42h36.46c9.16-6.18 17.74-11.04 27.24-13.99 9.31-2.9 19.31-3.93 31.24-2.5l12.48-14.84.46-.5c3.48-3.3 8.27-5.57 13.16-6.37 9.17-1.52 19.39.42 26.63 5.62 1.96 1.53 3.69 3.26 5.2 5.15 2.25 2.61 4.27 5.55 5.73 8.65 3.85 8.56 3.84 17.58-.02 24.3-2.36 5.35-5.92 9.95-10.49 13.79l-44.78 32.74c-5.67 4.05-11.84 6.45-18.34 7.05-6.47.59-12.39-1.14-17.55-5.59-6.47-5.56-9.89-12.7-9.68-21.59h-2.9c-7.14-.04-13.24-2.28-18.45-6.29zm70.76 33.22c-5.67 4.07-12.44 6.22-19.69 6.22h-57.62c-10.37 0-16.92 5.03-19.41 14.12-.54 1.84-.77 3.75-.64 5.66.77 7.77 5.85 14.5 12.38 19.95 6.73 5.55 15.29 8.2 23.6 8.04h39.02c8.21.12 15.45-2.94 21.06-8.78 5.87-6.34 8.9-14.65 8.57-23.49-.28-4.67-2.68-8.97-6.73-12.27-5.56-4.23-11.98-6.57-18.69-6.66l-40.45.02zm31.14 81.68c-5.89 5.23-12.82 7.72-20.89 7.88l-42.71-.02c-9.99 0-18.52-4.27-25.31-12.14-6.56-7.27-9.68-15.7-9.6-25.86.06-11.04 4.08-20.96 11.21-27.88 6.39-6.62 15.13-9.46 25.54-8.68 7.83.58 14.65 4.38 20.59 10.77 6.57 7.05 9.79 14.91 10.05 23.53 1.16 15.74-8.31 24.54-21.95 25.28zm-100.57-108.85c-4.86 2.19-9.31 5.38-12.94 9.62-6.44 6.24-10.26 14.88-10.26 24.16 0 4.5.55 8.92 1.6 13.14l26.29-34.67c-4.02-2.49-8.2-4.36-12.56-5.83-7.16-2.68-14.53-3.51-21.93-2.95-8.64.65-17.2 3.27-24.42 7.83-5.43 3.41-10.16 8.04-13.4 13.6-3.52 6.04-5.49 12.64-5.76 19.63-.16 4.77 2.04 9.48 6.1 13.68 4.08 4.31 9.26 7.21 14.72 9.31 9.41 2.57 19.13 3.33 29.31 2.21 10.78-1.21 21.34-6.63 30.11-14.36 6.26-5.95 11.13-12.81 14.47-19.87 2.57-5.89 4.02-12.06 4.25-18.42.16-5.7-1.46-11.41-4.76-16.48-2.8-4.57-7.08-8.31-12.42-11.12-5.85-3.29-12.27-5.55-18.96-6.77-7.95-1.2-15.98-.99-23.84.63-4.03 1.08-8.31 2.73-12.16 5.03zm-91.55 95.85c-1.67 0-3.34-.56-4.71-1.56a6.665 6.665 0 0 1-2.56-4.63c-1.1-6.5 3.54-13.42 10.14-13.42 5.7 0 10.14 4.44 10.14 10.14s-4.44 10.14-10.14 10.14z" />
            </svg>
          </CardDataStats>
        )}

        {total_report?.total_emps > -1 && (
          <CardDataStats
            title="Total Employees"
            total={total_report?.total_emps}
          >
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 122.88 85.855"
              enableBackground="new 0 0 122.88 85.855"
              xmlSpace="preserve"
              style={{
                fill: "currentColor", // Applies the text color to the SVG fill
                width: "24px", // Set the width of the SVG
                height: "24px", // Set the height of the SVG
              }}
            >
              <path d="M0,83.03h23.34V54.25c0-0.19,0.03-0.38,0.08-0.56C4,56.45,4.96,65.41,0.03,83.01L0,83.03L0,83.03z M65.53,83.03h0.57h14.4v-0.03h2.92v0.01l0,0h21.54V64.55c0-0.22,0.05-0.45,0.15-0.64L94.2,63.99l-10.44-0.07 c-2.74-5.46-7.27-8.75-17.73-10.24c0.05,0.19,0.08,0.38,0.08,0.56v26.71c-0.17,0.67-0.36,1.35-0.56,2.06L65.53,83.03L65.53,83.03z M84.51,45.71v2.32l0.79,1.08c0.12,0.17,0.19,0.36,0.19,0.55c0.29,4.04,1.36,6.56,2.98,8.12c1.57,1.53,3.72,2.24,6.16,2.63 c2.65-0.43,4.71-1.55,6.19-3.27c1.53-1.81,2.46-4.32,2.75-7.5c0.02-0.15,0.07-0.31,0.14-0.45l0.71-1.17l0.02-2.41h2.08l-0.02,2.63 c0.02,0.21-0.03,0.41-0.15,0.62l-0.74,1.2c-0.36,3.49-1.45,6.31-3.22,8.41c-1.84,2.15-4.37,3.51-7.59,4.01 c-0.1,0.02-0.22,0.02-0.34,0c-2.89-0.45-5.49-1.29-7.47-3.23c-1.93-1.89-3.24-4.75-3.58-9.19l-0.76-1.05 c-0.17-0.19-0.26-0.43-0.26-0.69V45.7h2.1L84.51,45.71L84.51,45.71z M94.08,29.78c1,0,1.98,0.1,2.91,0.29l-0.17,8.38L99.86,31 c4.28,1.91,7.47,5.88,8.26,10.65h1.65v1.96h-1.46v0.03H79.83v-0.03h-1.19v-1.96h1.38c0.83-4.92,4.18-9,8.69-10.82l2.67,7.5 L91.65,30c0.79-0.14,1.58-0.21,2.41-0.21L94.08,29.78L94.08,29.78z M92.61,76.32h3.18v3.18h-3.18V76.32L92.61,76.32z M92.61,68.46 h3.18v3.18h-3.18V68.46L92.61,68.46z M107.91,83.02h14.97c-3.18-11.29-2.55-17.03-15-18.81c0.03,0.12,0.05,0.24,0.05,0.36v18.46 L107.91,83.02L107.91,83.02z M29.59,24.84v3.62l1.23,1.69c0.19,0.27,0.3,0.56,0.3,0.86c0.46,6.3,2.12,10.22,4.64,12.66 c2.44,2.39,5.79,3.49,9.6,4.1c4.13-0.67,7.35-2.41,9.66-5.1c2.39-2.82,3.84-6.73,4.29-11.7c0.03-0.24,0.11-0.48,0.21-0.7l1.1-1.82 l0.03-3.76h3.25l-0.03,4.1c0.03,0.32-0.05,0.64-0.24,0.97l-1.15,1.88c-0.56,5.45-2.25,9.85-5.02,13.12 c-2.87,3.35-6.81,5.47-11.83,6.25c-0.16,0.03-0.35,0.03-0.54,0c-4.51-0.7-8.56-2.01-11.64-5.04c-3-2.95-5.04-7.4-5.58-14.33 l-1.18-1.64c-0.27-0.3-0.4-0.67-0.4-1.07v-4.13h3.27L29.59,24.84L29.59,24.84z M44.51,0c1.56,0,3.09,0.16,4.53,0.46l-0.27,13.07 L53.52,1.9c6.68,2.98,11.64,9.18,12.88,16.61h2.58v3.06h-2.28v0.05h-44.4v-0.05h-1.85v-3.06h2.15c1.29-7.67,6.52-14.03,13.55-16.87 l4.16,11.7l0.43-12.98c1.23-0.21,2.47-0.32,3.76-0.32L44.51,0L44.51,0z M42.23,72.57h4.96v4.96h-4.96V72.57L42.23,72.57z M42.23,60.31h4.96v4.96h-4.96V60.31L42.23,60.31z M27.9,83.01h33.59V54.22c0-0.35,0.08-0.7,0.24-0.99L44.7,53.33l-17.04-0.11 c0.16,0.3,0.24,0.64,0.24,0.99V83.01L27.9,83.01L27.9,83.01z" />
            </svg>
          </CardDataStats>
        )}

        {total_report?.total_jobs > -1 && (
          <CardDataStats title="Pending Complaints" total={total_report?.total_jobs}>
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 122.88 85.855"
              enableBackground="new 0 0 122.88 85.855"
              xmlSpace="preserve"
              style={{
                fill: "currentColor", // Applies the text color to the SVG fill
                width: "24px", // Set the width of the SVG
                height: "24px", // Set the height of the SVG
              }}
            >
              <path d="M45.19,57a1.88,1.88,0,1,1,0-3.75H52.4a1.88,1.88,0,1,1,0,3.75Zm4.24-32.24c0-3.48.12-6.42,4.49-7.49a1.75,1.75,0,0,1-.16-.69V16h-.07L54.42,12A5.61,5.61,0,0,1,58.77,9a.94.94,0,0,1,0-.25V6.54a2.58,2.58,0,0,1,0-.38c1-6.15,7.06-6.07,12-6h1.29L77.74,0h.17c4.84.23,8,2.13,11.6,4.33C92.05,5.92,99.61,7,101.45,9.61a9,9,0,0,1,1.64,5.12V33.9a5.07,5.07,0,0,1-2.46,4.53c-1.32.9-8.4,1.48-10.73,1.78a173.54,173.54,0,0,1-17.67,10.2,14.69,14.69,0,0,1-4,1.36v2.89h17.7a1.86,1.86,0,0,1,1.72,1.14l10,19.35a1.94,1.94,0,0,1,.21,1L98,121a1.87,1.87,0,0,1-1.87,1.86H1.87A1.87,1.87,0,0,1,0,121V76H0v0H0v0H0v0H0v0H0v0H0v0H0v0H0v0H0v0H0v0H0v0h0v0h0v-.06h0v0h0v0h0l0,0h0l0,0h0v0h0v0h0v0h0l0,0h0l0,0v0h0v0L10.47,55.66a1.86,1.86,0,0,1,1.65-1H29.43V36.92a2.3,2.3,0,0,1,2.32-2.32h6a7.06,7.06,0,0,1,1.59-6.48c4.47-5.15,10-1.84,10.07-3.33Zm15,27c-5.64-1.11-8.13-7.2-3.38-11.72H46.58a10.49,10.49,0,0,1-6.14-1.69H33.17V64.27H64.45V51.75ZM87.9,37.38a1.57,1.57,0,0,1,.75-.28c2-.25,8.77-.68,9.72-1.31a2,2,0,0,0,1-1.81V14.85a5.87,5.87,0,0,0-1.07-3.31C97,9.63,89.37,8.4,87.39,7.2c-7.86-4.79-7.73-3.58-16.08-3.74-3.66,0-8.18-.1-8.74,3.25V8.87c1,0,2.08.08,3.09.13s1.77.12,2.61.12a1.61,1.61,0,0,1,0,3.22c-.85,0-1.81-.06-2.82-.12-3.45-.22-7.39-.47-7.89,2.27v2.15a2,2,0,0,1,0,.35c1.25,0,2.53.06,3.78.14.92.06,1.77.12,2.61.11a1.62,1.62,0,0,1,0,3.23c-.84,0-1.8-.06-2.82-.12-3.45-.22-7.39-.47-7.88,2.28v2.16a2,2,0,0,1-.05.43h6.28a1.62,1.62,0,1,1,0,3.23H46.77c-3.38,0-7.17,2.16-5.36,5.74l.23.4h0l0,0h0l0,.05,0,0,0,0v0l0,0,0,.05h0l0,0,0,0,0,0v0l0,0h0l0,.05h0l.05,0h0l0,.05h0l.05.05h0l.05,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0v0l0,0h0l.06,0h0l.07.05h0l.07,0h0l.06,0h0l.05,0,0,0,0,0h0l.15.09h0l.05,0h0l.07,0h0l.08,0h0l.08,0h0l.08,0h0l.07,0h0l.06,0h0l.06,0,0,0,0,0h0l0,0,.06,0h0l.07,0h0l.08,0h0l.09,0h0l.09,0h0l.09,0h0l.08,0h0l.09,0H45l.06,0h0l.07,0h0l.09,0H72.19c2.1,0,2.15,2.56,0,2.58a21.28,21.28,0,0,0-4,.52h-.07l-.05,0h0l-.07,0-.06,0h-.07l-.07,0h-.07l-.07,0h-.06l-.07,0h-.07l-.07,0h0l-.12,0-.06,0h0l0,0-.06,0-.07,0-.06,0h0l-.06,0-.07,0-.06,0h0l-.06,0-.06,0h0l-.06,0-.06,0-.06,0-.06,0-.06,0-.06,0,0,0h0l-.06,0-.06,0h0l0,0-.06,0h0l0,0-.06,0,0,0-.06,0,0,0h0l0,0h0l-.09.05h0l0,0h0l0,0,0,0h0l0,0-.06,0,0,0-.05,0,0,0h0l0,0,0,0h0l0,0-.05,0,0,0,0,0,0,0h0l0,0h0l-.09.06h0l0,0h0l0,0,0,0a5.52,5.52,0,0,0-1,1C62,44.34,62,47.08,64.45,48l.13,0h0l0,0h0l.13,0h0l0,0,.13,0H65l.09,0h.1l.1,0h.07l.14,0h.06l.16,0h1.14l.47,0h.28l.21,0h.08l.22,0h.07l.41-.08c4.49-.93,10.07-4.19,19.3-10.76Zm-58.47,21H13.25L5,74.16h88L84.76,58.4H68.19v5.87h4.13a1.87,1.87,0,0,1,0,3.74h-46a1.87,1.87,0,1,1,0-3.74h3.16V58.4ZM3.74,77.9v41.24H94.27L94.12,77.9ZM38.21,48.24a1.88,1.88,0,1,1,0-3.75H52.39a1.88,1.88,0,1,1,0,3.75Z" />
            </svg>
          </CardDataStats>
        )}

        {total_report?.total_fields > -1 && (
          <CardDataStats
            title="Inspection Fields"
            total={total_report?.total_fields}
          >
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 122.88 85.855"
              enableBackground="new 0 0 122.88 85.855"
              xmlSpace="preserve"
              style={{
                fill: "currentColor", // Applies the text color to the SVG fill
                width: "24px", // Set the width of the SVG
                height: "35px", // Set the height of the SVG
              }}
            >
              <path d="M81.813,70.818c6.268,0,11.949,2.549,16.066,6.648c4.115,4.117,6.648,9.783,6.648,16.066c0,4.582-1.365,8.865-3.699,12.432 l9.832,10.715l-6.781,6.199l-9.484-10.432c-3.6,2.4-7.932,3.799-12.582,3.799c-6.266,0-11.949-2.549-16.064-6.648 c-4.117-4.117-6.65-9.783-6.65-16.064c0-6.268,2.551-11.949,6.65-16.066C69.863,73.35,75.531,70.818,81.813,70.818L81.813,70.818z M19.784,57.08c-1.445,0-2.649-1.308-2.649-2.89c0-1.617,1.169-2.89,2.649-2.89h22.639c1.445,0,2.649,1.308,2.649,2.89 c0,1.617-1.17,2.89-2.649,2.89H19.784L19.784,57.08z M84.879,17.582h9.496c1.859,0,3.58,0.757,4.783,1.995 c1.238,1.239,1.996,2.925,1.996,4.783v37.031c-0.203,2.121-5.41,2.148-5.85,0V24.359c0-0.275-0.104-0.516-0.275-0.688 c-0.172-0.172-0.412-0.275-0.688-0.275h-9.496v37.995c-0.506,1.924-4.838,2.213-5.814,0V6.778c0-0.275-0.104-0.516-0.275-0.688 c-0.172-0.172-0.414-0.275-0.689-0.275H6.744c-0.275,0-0.517,0.103-0.688,0.275C5.883,6.262,5.78,6.502,5.78,6.778v80.58 c0,0.275,0.103,0.516,0.275,0.688s0.413,0.275,0.688,0.275h42.53c2.929,0.301,3.017,5.365,0,5.814H22.054v10.803 c0,0.275,0.104,0.518,0.275,0.689s0.413,0.275,0.688,0.275h26.256c2.122,0.238,2.805,5.063,0,5.814H23.052 c-1.858,0-3.578-0.758-4.782-1.996c-1.239-1.238-1.996-2.924-1.996-4.783V94.135H6.778c-1.858,0-3.578-0.758-4.782-1.996 C0.757,90.9,0,89.215,0,87.357V6.778C0,4.92,0.757,3.2,1.996,1.995C3.234,0.757,4.92,0,6.778,0h71.324 c1.857,0,3.578,0.757,4.783,1.995c1.238,1.239,1.994,2.925,1.994,4.783V17.582L84.879,17.582L84.879,17.582z M19.749,26.045 c-1.445,0-2.649-1.308-2.649-2.891c0-1.617,1.17-2.89,2.649-2.89h45.278c1.445,0,2.648,1.308,2.648,2.89 c0,1.617-1.168,2.891-2.648,2.891H19.749L19.749,26.045z M19.749,41.563c-1.445,0-2.649-1.308-2.649-2.89 c0-1.617,1.17-2.89,2.649-2.89h45.278c1.445,0,2.648,1.307,2.648,2.89c0,1.617-1.168,2.89-2.648,2.89H19.749L19.749,41.563z M93.891,81.455c-3.09-3.09-7.365-5.008-12.078-5.008c-4.711,0-8.986,1.918-12.076,5.008s-5.01,7.365-5.01,12.078 c0,4.711,1.92,8.986,5.01,12.076s7.365,5.01,12.076,5.01c4.713,0,8.988-1.92,12.078-5.01s5.008-7.365,5.008-12.076 C98.898,88.82,96.98,84.545,93.891,81.455L93.891,81.455L93.891,81.455z" />
            </svg>
          </CardDataStats>
        )}

        {total_report?.total_cont_Emps > -1 && (
          <CardDataStats
            title="Contractor's Employees"
            total={total_report?.total_cont_Emps}
          >
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 122.88 85.855"
              enableBackground="new 0 0 122.88 85.855"
              xmlSpace="preserve"
              style={{
                fill: "currentColor", // Applies the text color to the SVG fill
                width: "24px", // Set the width of the SVG
                height: "24px", // Set the height of the SVG
              }}
            >
              <path d="M0,83.03h23.34V54.25c0-0.19,0.03-0.38,0.08-0.56C4,56.45,4.96,65.41,0.03,83.01L0,83.03L0,83.03z M65.53,83.03h0.57h14.4v-0.03h2.92v0.01l0,0h21.54V64.55c0-0.22,0.05-0.45,0.15-0.64L94.2,63.99l-10.44-0.07 c-2.74-5.46-7.27-8.75-17.73-10.24c0.05,0.19,0.08,0.38,0.08,0.56v26.71c-0.17,0.67-0.36,1.35-0.56,2.06L65.53,83.03L65.53,83.03z M84.51,45.71v2.32l0.79,1.08c0.12,0.17,0.19,0.36,0.19,0.55c0.29,4.04,1.36,6.56,2.98,8.12c1.57,1.53,3.72,2.24,6.16,2.63 c2.65-0.43,4.71-1.55,6.19-3.27c1.53-1.81,2.46-4.32,2.75-7.5c0.02-0.15,0.07-0.31,0.14-0.45l0.71-1.17l0.02-2.41h2.08l-0.02,2.63 c0.02,0.21-0.03,0.41-0.15,0.62l-0.74,1.2c-0.36,3.49-1.45,6.31-3.22,8.41c-1.84,2.15-4.37,3.51-7.59,4.01 c-0.1,0.02-0.22,0.02-0.34,0c-2.89-0.45-5.49-1.29-7.47-3.23c-1.93-1.89-3.24-4.75-3.58-9.19l-0.76-1.05 c-0.17-0.19-0.26-0.43-0.26-0.69V45.7h2.1L84.51,45.71L84.51,45.71z M94.08,29.78c1,0,1.98,0.1,2.91,0.29l-0.17,8.38L99.86,31 c4.28,1.91,7.47,5.88,8.26,10.65h1.65v1.96h-1.46v0.03H79.83v-0.03h-1.19v-1.96h1.38c0.83-4.92,4.18-9,8.69-10.82l2.67,7.5 L91.65,30c0.79-0.14,1.58-0.21,2.41-0.21L94.08,29.78L94.08,29.78z M92.61,76.32h3.18v3.18h-3.18V76.32L92.61,76.32z M92.61,68.46 h3.18v3.18h-3.18V68.46L92.61,68.46z M107.91,83.02h14.97c-3.18-11.29-2.55-17.03-15-18.81c0.03,0.12,0.05,0.24,0.05,0.36v18.46 L107.91,83.02L107.91,83.02z M29.59,24.84v3.62l1.23,1.69c0.19,0.27,0.3,0.56,0.3,0.86c0.46,6.3,2.12,10.22,4.64,12.66 c2.44,2.39,5.79,3.49,9.6,4.1c4.13-0.67,7.35-2.41,9.66-5.1c2.39-2.82,3.84-6.73,4.29-11.7c0.03-0.24,0.11-0.48,0.21-0.7l1.1-1.82 l0.03-3.76h3.25l-0.03,4.1c0.03,0.32-0.05,0.64-0.24,0.97l-1.15,1.88c-0.56,5.45-2.25,9.85-5.02,13.12 c-2.87,3.35-6.81,5.47-11.83,6.25c-0.16,0.03-0.35,0.03-0.54,0c-4.51-0.7-8.56-2.01-11.64-5.04c-3-2.95-5.04-7.4-5.58-14.33 l-1.18-1.64c-0.27-0.3-0.4-0.67-0.4-1.07v-4.13h3.27L29.59,24.84L29.59,24.84z M44.51,0c1.56,0,3.09,0.16,4.53,0.46l-0.27,13.07 L53.52,1.9c6.68,2.98,11.64,9.18,12.88,16.61h2.58v3.06h-2.28v0.05h-44.4v-0.05h-1.85v-3.06h2.15c1.29-7.67,6.52-14.03,13.55-16.87 l4.16,11.7l0.43-12.98c1.23-0.21,2.47-0.32,3.76-0.32L44.51,0L44.51,0z M42.23,72.57h4.96v4.96h-4.96V72.57L42.23,72.57z M42.23,60.31h4.96v4.96h-4.96V60.31L42.23,60.31z M27.9,83.01h33.59V54.22c0-0.35,0.08-0.7,0.24-0.99L44.7,53.33l-17.04-0.11 c0.16,0.3,0.24,0.64,0.24,0.99V83.01L27.9,83.01L27.9,83.01z" />
            </svg>
          </CardDataStats>
        )}

        {total_report?.total_field_Supervisors > -1 && (
          <CardDataStats
            title="Field Supervisors"
            total={total_report?.total_field_Supervisors}
          >
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 122.88 85.855"
              enableBackground="new 0 0 122.88 85.855"
              xmlSpace="preserve"
              style={{
                fill: "currentColor", // Applies the text color to the SVG fill
                width: "28px", // Set the width of the SVG
                height: "28px", // Set the height of the SVG
              }}
            >
              <path
                d="M53.613,0c14.79,0,28.202,6.018,37.918,15.694c9.715,9.716,15.693,23.089,15.693,37.918 c0,10.817-3.225,20.926-8.732,29.343l23.207,25.292l-16.008,14.632L83.311,98.256c-8.498,5.664-18.725,8.969-29.698,8.969 c-14.79,0-28.203-6.019-37.918-15.694C5.979,81.814,0,68.44,0,53.612c0-14.79,6.018-28.202,15.695-37.918 C25.41,5.979,38.784,0,53.613,0L53.613,0z M37.534,33.9c7.813-8.622,16.834-13.305,23.597-5.639 c1.773,0.084,3.359,0.671,4.684,1.921c2.781,2.615,3.213,7.508,1.941,11.394v3.392c0.861,0.567,1.418,1.628,1.67,2.835 c0.168,0.777,0.211,1.638,0.125,2.457c-0.082,0.851-0.293,1.659-0.629,2.332c-0.482,0.956-1.219,1.627-2.215,1.774 c-0.979,1.04-1.934,2.153-2.783,3.224c-0.936,1.176-1.734,2.289-2.289,3.203c-0.432,0.704-0.295,1.166-0.137,1.691 c0.072,0.262,0.156,0.535,0.209,0.829c1.713,0.367,3.256,0.661,4.643,0.924c8.811,1.648,14.01,2.163,14.01,13.631 c0,0.588-0.473,1.061-1.061,1.061H30.697c-0.588,0-1.061-0.473-1.061-1.061c0-11.468,5.189-11.982,14.01-13.631 c1.397-0.263,2.961-0.557,4.673-0.924c0.063-0.231,0.137-0.441,0.21-0.651c0.178-0.504,0.357-1.008-0.168-1.858 c-0.557-0.914-1.355-2.026-2.289-3.203c-0.851-1.071-1.807-2.184-2.783-3.224c-0.998-0.146-1.733-0.819-2.216-1.774 c-0.336-0.662-0.546-1.481-0.63-2.331c-0.074-0.819-0.032-1.68,0.126-2.458c0.252-1.208,0.798-2.258,1.648-2.825l-1.145-0.683 c-0.304-3.392,0.588-9.283-3.55-10.396L37.534,33.9L37.534,33.9z M87.283,19.942C78.668,11.328,66.75,5.979,53.613,5.979 c-13.138,0-25.056,5.35-33.67,13.963c-8.614,8.614-13.964,20.532-13.964,33.67c0,13.138,5.35,25.056,13.964,33.67 c8.614,8.614,20.532,13.964,33.67,13.964c13.137,0,25.055-5.35,33.67-13.964c8.613-8.614,13.963-20.532,13.963-33.67 C101.246,40.474,95.896,28.556,87.283,19.942L87.283,19.942L87.283,19.942z"
                fill="currentColor"
              />
            </svg>
          </CardDataStats>
        )}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne /> */}
        {/* <ChartTwo /> */}
        {/* <ChartThree /> */}
        {/* <MapOne /> */}

        {/* <div className="col-span-12 xl:col-span-12">
       

          {total_report?.total_jobs > -1 && (
            <div className="flex">
              <Bars />
              <BasicPie />
            </div>
          )}
        </div> */}

        <div className="col-span-12 xl:col-span-12">
          <div className="mb-4 flex items-center  rounded-lg p-4">
            <label
              htmlFor="start-date"
              className="mr-2 font-semibold text-black"
            >
              Start Date:
            </label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border-gray-300 mr-4 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <label htmlFor="end-date" className="mr-2 font-semibold text-black">
              End Date:
            </label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border-gray-300 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {total_report?.total_jobs > -1 && (
            <div className="flex flex-wrap">
              <div className="w-full p-2 md:w-1/2">
              <Bars Data={chartData} />
              </div>
              <div className="w-full p-2 md:w-1/2">
              <BasicPie Data={chartData} />
              </div>
            </div>
          )}
        </div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default ECommerce;
