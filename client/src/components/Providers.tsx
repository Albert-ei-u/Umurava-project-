"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { NotificationProvider } from "@/context/NotificationContext";
import { ChatProvider } from "@/context/ChatContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <ChatProvider>
          {children}
        </ChatProvider>
      </NotificationProvider>
    </Provider>
  );
}
