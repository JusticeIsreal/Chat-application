import Sidebar from "@/Components/Sidebar";
import Head from "next/head";
import React from "react";

import { useSession, signOut } from "next-auth/react";
import ChatScreen from "@/Components/ChatScreen";

function Chat() {
  const { data: session } = useSession();
  return (
    <div style={chatScreenDiv}>
      <Head>
        <title>Chat</title>
      </Head>
      <Sidebar />
      <div style={chatDiv}>
        <ChatScreen />
      </div>
    </div>
  );
}

export default Chat;

const chatScreenDiv = {
  display: "flex",
};

const chatDiv = {
  flex: "1",
  overflow: "scroll",
  height: "100vh",
};
