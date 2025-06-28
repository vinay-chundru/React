import React, { useState } from "react";

export default function LoginForm() {
    const [name,setName]=useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage]=useState("");
    const [isLoggedIn,setIsLoggedIn]=useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(name==="user" && password==="password") {
            setMessage("Welcome, user!");
            setIsLoggedIn(true);
        } else {
            setMessage("Invalid username or password");
            setIsLoggedIn(false);
        }
    }

    return (
        <div>
      <h1>Login Page</h1>
      {message && <p className={isLoggedIn ? "success" : "error"}>{message}</p>}
      {!isLoggedIn && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              placeholder="username"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="pwd">Password:</label>
            <input
            id="pwd"
            type="password"
            placeholder="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
    );
}