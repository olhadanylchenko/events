import React from "react";

export default function Signup() {
  const handleSubmit = () => {};
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
