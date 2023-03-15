import { useEffect, useState } from "react";
import * as EmailValidator from "email-validator";
import { useSession, signOut } from "next-auth/react";

// icons
import { FaUserCircle } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsFillChatLeftTextFill, BsSearch } from "react-icons/bs";
import { db } from "@/Firebase";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import Chat from "./Chat";
import { useRouter } from "next/router";
function Sidebar() {
  const router = useRouter();
  // chat satate
  const [myChats, setMyChats] = useState();
  // session details
  const { data: session } = useSession();

  // create chat function
  const createChat = async () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );
    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !(await checkChatExist(input)) &&
      input !== session.user.email
    ) {
      // we need to add chat into the db
      const colRef = collection(db, "chats");
      addDoc(colRef, { users: [session.user.email, input] });
    } else {
      console.log("Chat already exists");
    }
  };

  // check if chat already exists
  const checkChatExist = async (recipientEmail) => {
    const colRef = collection(db, "chats");
    const snapshot = await getDocs(colRef);
    const recipient = snapshot.docs.map((doc) => doc.data().users);
    return recipient.some((users) => users.includes(recipientEmail));
  };

  // fetch all chats
  const fetchAllChat = () => {
    const colRef = collection(db, "chats");
    onSnapshot(colRef, (snapshot) => {
      const chats = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMyChats(chats);
    });
  };

  useEffect(() => {
    fetchAllChat();
  }, []);
  return (
    <div style={mainDiv}>
      <div style={headerDiv}>
        <img
          src={session?.user.image}
          alt=""
          style={userImg}
          onClick={signOut}
        />
        <div style={topIconDiv}>
          <BsFillChatLeftTextFill style={userIcon} />
          <FiMoreHorizontal style={userIcon} />
        </div>
      </div>

      <div style={searchDiv}>
        <BsSearch />
        <input type="text" style={input} placeholder="Searh in chats" />
      </div>

      <button style={sideBarBtn} onClick={createChat}>
        START A NEW CHAT
      </button>

      {/* list of chats */}
      {myChats ? (
        <>
          {myChats.map((chat) => {
            return <Chat key={chat.id} id={chat.id} users={chat.users} />;
          })}
        </>
      ) : (
        "loading"
      )}
    </div>
  );
}

export default Sidebar;

const mainDiv = {};

// top side bar
const headerDiv = {
  display: "flex",
  position: "static",
  top: "0",
  backgroundColor: "white",
  zIndex: "1",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
  height: "80px",
  border: "1px solid whitesmoke",
};

const topIconDiv = {};

const userImg = {
  cursor: "pointer",
  color: "gray",
  borderRadius: "50%",
  width: "50px",
  fontSize: "40px",
  objectFit: "center",
};
const userIcon = {
  cursor: "pointer",
  color: "gray",
};

// lower side bar
const searchDiv = {
  display: "flex",
  alignItems: "center",
  padding: "20px",
  borderRadius: "2px",
};
const input = {
  outlineWidth: "0",
  border: "none",
  flex: "1",
  marginLeft: "5px",
};

const sideBarBtn = {
  width: "100%",
  border: "none",
  height: "50px",
  cursor: "pointer",
  backgroundColor: "transparent",
  borderTop: "1px solid whitesmoke",
  borderBottom: "1px solid whitesmoke",
};
