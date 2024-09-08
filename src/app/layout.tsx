
"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import Providers from "../tk/Provider";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { store } from "@/tk/Store";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
         <head>
        <title>Saudi Pak Facility Management System</title>
        <link rel="icon" href="/images/logo/saudi-logo.png" type="image/png" /> 

      </head>
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <Providers>
          {loading ? <Loader /> : children}
          </Providers>
          <ToastContainer />
        </div>
      </body>
    </html>
  );
}
