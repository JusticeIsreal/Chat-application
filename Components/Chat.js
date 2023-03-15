import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import getRecipientEmail from "@/HelperFunction/getRecipientEmail";
// icons
import { FaUserCircle } from "react-icons/fa";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db2 } from "@/Firebase";
function Chat({ id, users }) {
  const router = useRouter();
  // chat satate
  const { data: session } = useSession();

  // get the chat recipient
  const recipientEmail = getRecipientEmail(users, session?.user.email);

  // get the recipient email details

  const [recipientDetails, setRecipientDetails] = useState(null);

  const getRecipientDetails = async () => {
    const usersRef = collection(db2, "signedInUsers");
    const queryFilter = query(
      usersRef,
      where("email", "==", getRecipientEmail(users, session?.user.email))
    );
    const querySnapshot = await getDocs(queryFilter);
    const recipientDetails = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRecipientDetails(recipientDetails[0]);
  };

  useEffect(() => {
    getRecipientDetails();
  }, []);

  //route to chat apge
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };
  return (
    <div style={chatMainDiv} onClick={enterChat}>
      {recipientDetails ? (
        <img src={recipientDetails.photoURL} alt="" style={userImg} />
      ) : (
        <FaUserCircle style={userImg} />
      )}

      <p>{recipientEmail}</p>
    </div>
  );
}

export default Chat;

const chatMainDiv = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  padding: "15px",
  wordBreak: "break-word",
};

const userImg = {
  margin: "5px",
  marginRight: "15px",
  borderRadius: "50%",
  width: "40px",
  fontSize: "40px",
};
