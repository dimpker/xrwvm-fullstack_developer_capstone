import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import close_icon from "../assets/close.png"
import { BACKEND_URL } from '../../config';

const Register = () => {
  // State variables for form inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to home
  const gohome = (e) => {
    e.preventDefault();
    window.location.href = window.location.origin;
  }

  // Handle form submission
  const register = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!userName || !password || !email || !firstName || !lastName) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    let register_url = BACKEND_URL + "/djangoapp/register";

    try {
      // Send POST request to register endpoint
      const res = await fetch(register_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          "userName": userName,
          "password": password,
          "firstName": firstName,
          "lastName": lastName,
          "email": email
        }),
      });

      const json = await res.json();
      
      if (json.status === "Authenticated") {
        // Save username in session and reload home
        sessionStorage.setItem('username', json.userName);
        alert("Registration successful! Welcome " + json.userName);
        window.location.href = window.location.origin;
      }
      else if (json.error === "Already Registered") {
        alert("The user with same username is already registered");
        // Clear the form instead of redirecting
        setUserName("");
        setPassword("");
        setEmail("");
        setFirstName("");
        setlastName("");
      }
      else {
        alert(json.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register_container" style={{ width: "50%", minWidth: "400px", maxWidth: "600px", margin: "2rem auto" }}>
      <div className="header" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <span className="text" style={{ flexGrow: "1", fontSize: "2rem", fontWeight: "bold", color: "#333" }}>Sign Up</span>
        <div style={{ display: "flex", flexDirection: "row", justifySelf: "end", alignSelf: "start" }}>
          <button 
            onClick={gohome} 
            style={{ 
              background: "none", 
              border: "none", 
              padding: "0", 
              cursor: "pointer",
              justifyContent: "space-between", 
              alignItems: "flex-end" 
            }}
          >
            <img style={{ width: "1cm", cursor: "pointer" }} src={close_icon} alt="Close" />
          </button>
        </div>
      </div>
      <hr style={{ margin: "1rem 0", border: "1px solid #ddd" }} />

      <form onSubmit={register}>
        <div className="inputs">
          <div className="input" style={{ marginBottom: "1rem" }}>
            <img src={user_icon} className="img_icon" alt='Username' />
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              className="input_field" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="input" style={{ marginBottom: "1rem" }}>
            <img src={user_icon} className="img_icon" alt='First Name' />
            <input 
              type="text" 
              name="first_name" 
              placeholder="First Name" 
              className="input_field" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="input" style={{ marginBottom: "1rem" }}>
            <img src={user_icon} className="img_icon" alt='Last Name' />
            <input 
              type="text" 
              name="last_name" 
              placeholder="Last Name" 
              className="input_field" 
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              required
            />
          </div>

          <div className="input" style={{ marginBottom: "1rem" }}>
            <img src={email_icon} className="img_icon" alt='Email' />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              className="input_field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input" style={{ marginBottom: "1rem" }}>
            <img src={password_icon} className="img_icon" alt='Password' />
            <input 
              name="psw" 
              type="password" 
              placeholder="Password" 
              className="input_field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
        </div>

        <div className="submit_panel" style={{ marginTop: "2rem", padding: "0 1rem" }}>
          <input 
            className="submit" 
            type="submit" 
            value={isLoading ? "Registering..." : "Register"}
            disabled={isLoading}
            style={{ 
              width: "auto", 
              margin: "0 auto",
              padding: "12px 24px", 
              fontSize: "1rem", 
              backgroundColor: isLoading ? "#ccc" : "#007bff", 
              color: "white", 
              border: "none", 
              borderRadius: "5px", 
              cursor: isLoading ? "not-allowed" : "pointer",
              minWidth: "120px",
              maxWidth: "200px"
            }}
          />
        </div>
      </form>
    </div>
  )
}

export default Register;