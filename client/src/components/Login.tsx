import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    const email = event.target.value;
    setEmail(email);
  };
  const handlePassword = (event) => {
    const password = event.target.value;
    setPassword(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/authenticate", { email, password })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h1>Hi!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" value={email} onChange={handleEmail} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">GO</button>
      </form>
    </>
  );
}
