"use client";

import { Provider } from "react-redux";
import { useRef } from "react";
import { makeStore } from "@/store/store";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <SessionProvider>
      <Provider store={storeRef.current}>
        {children}
        <Toaster position="top-right" />
      </Provider>
    </SessionProvider>
  );
}
