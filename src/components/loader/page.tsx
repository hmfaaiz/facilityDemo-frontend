"use client"; // Ensure this component is rendered on the client

import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader"; // Ensure this path is correct

const ClientOnlyWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader /> : <>{children}</>;
};

export default ClientOnlyWrapper;
