import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { useSession, signIn, signOut } from "next-auth/react";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

// components
import Sidebar from "@/Components/Sidebar";
import Login from "../pages/login";
import { db, db2 } from "@/Firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  const [isSessionSaved, setIsSessionSaved] = useState(false);
  const saveSession = async () => {
    if (session) {
      // Always true
      const usersRef = collection(db2, "signedInUsers");
      const q = query(usersRef, where("name", "==", session.user.name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Check if querySnapshot is not empty
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          email: session.user.email,
          photoURL: session.user.image,
          lastSeen: serverTimestamp(),
        });
        // console.log("User details updated in signedInUsers collection");
        setIsSessionSaved(true);
      } else {
        await addDoc(usersRef, {
          name: session.user.name,
          email: session.user.email,
          photoURL: session.user.image,
          lastSeen: serverTimestamp(),
        });
        // console.log("User added to signedInUsers collection");
        setIsSessionSaved(true);
      }
    }
  };

  useEffect(() => {
    saveSession();
  }, [session]);

  return (
    <div>
      {!session ? (
        <Login />
      ) : (
        <>
          <Head>
            <title>Whatsapp clone by Justice </title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Sidebar />
        </>
      )}
    </div>
  );
}
