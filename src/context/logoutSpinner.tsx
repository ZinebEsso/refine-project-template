"use client"
// import GlobalSpinner from "@components/GlobalSpinner";
import { Flex, Spin } from "antd";
import { createContext, useContext, useState } from "react";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

// Create context
export const LoadingContext = createContext<LoadingContextType | null>(null);

// Global reference
let loadingContextValue: LoadingContextType | null = null;

export const LogoutSpinner = () => {
  const [isLoading, setLoading] = useState(false);

  // Store reference globally
  loadingContextValue = { isLoading, setLoading };

  return (
   <>
   
   {
    isLoading &&
    <>
     <GlobalSpinner />
    </>
   }
   </>
  );
};


const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(255, 255, 255, 0.93)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

export const GlobalSpinner = () => {
  const { isLoading } = getLogoutLoadingContext();

  if (!isLoading) return null;

  return (
      <div
          style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              backgroundColor: "rgba(255, 255, 255, 0.86)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
          }}
      >
          <Flex vertical>
              <Spin size="large" tip="Logout ...">
                  {content}
              </Spin>
          </Flex>

      </div>
  );
};
// Function to access loading context outside of hooks
export const getLogoutLoadingContext = () => {
  if (!loadingContextValue) {
    throw new Error("Loading context is not available");
  }
  return loadingContextValue;
};
