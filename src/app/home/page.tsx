
import React, { useState, useEffect, ReactNode } from "react";

import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
;
import ToastProvider from "@/components/ToastProvider/page";
export const metadata: Metadata = {
  title:
    "Sidtech01 Facility Managment System",
  description: "This is Sidtech01 Dashboard ",
};

export default function page() {

  // useSeedApis();

//   useEffect(() => {
  
//     if (!localStorage.getItem("saudit")) {
//       router.push("/auth/signin");
//     }
//   }, [router]);
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}

