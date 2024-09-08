"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { useRouter } from 'next/navigation';
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
;

// export const metadata: Metadata = {
//   title:
//     "Saudi Pak Room",
//   description: "This is Saudi Pak Room Dashboard Template",
// };

export default function Home() {
  const router = useRouter();
  useEffect(() => {
  
    if (!localStorage.getItem("saudit")) {
      router.push("/auth/signin");
    }
    else{
      router.push("/home");
    }
  }, [router]);
  return (
    <>
      {/* <DefaultLayout>
        <ECommerce />
      </DefaultLayout> */}
    </>
  );
}
