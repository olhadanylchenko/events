import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleBirthDate = (e) => {
    setBirthDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/register", { username, email, password, birthDate })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <>
      <h1>Hi!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="username"
          id="username"
          value={username}
          onChange={handleUsername}
        />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" value={email} onChange={handleEmail} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />
        <label htmlFor="birthDate">Birth date</label>
        <input
          type="date"
          id="birthDate"
          value={birthDate}
          onChange={handleBirthDate}
        />

        <button type="submit">GO</button>
      </form>
    </>
  );
}
