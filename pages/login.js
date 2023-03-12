import React from "react";
import Head from "next/head";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div style={loginMainDiv}>
      <Head>
        <title>Login</title>
      </Head>
      <div style={loginDiv}>
        <img
          src="https://res.cloudinary.com/isreal/image/upload/v1673918222/banking%20app/AJIS_FILE_1_re65mc.png"
          alt="logo"
          style={loginLogo}
        />
        <button onClick={signIn}>Signin with Google</button>
      </div>
    </div>
  );
}

export default Login;

const loginMainDiv = {
  display: "grid",
  placeItems: "center",
  height: "100vh",
  backgroundColor: "whitesmoke",
};

const loginDiv = {
  padding: "100px 5px",
  alignItems: "center",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
};

const loginLogo = {
  //   height: "80px",
  width: "250px",
  marginBottom: "10px",
};
