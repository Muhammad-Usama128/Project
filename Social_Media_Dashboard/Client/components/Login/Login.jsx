import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Login.css";

const Login = () => {
  document.title = "Login - Social Media Dashboard";
  const [User, setUser] = useState("");
  async function FormSubmit(e) {
    e.preventDefault();
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let email_Confirm = false;
    let password_Confirm = false;
    if (email.value.trim() == "" || email.value.length == 0) {
      Errormsg(email, "Email is required.");
    } else {
      email_Confirm = true;
    }

    if (password.value.trim() == "" || password.value.length == 0) {
      Errormsg(password, "Password is required.");
    } else {
      password_Confirm = true;
    }

    if (email_Confirm == true && password_Confirm == true) {
    }
    if (email_Confirm == true && password_Confirm == true) {
      let emaildata = email.value.trim();
      let passworddata = password.value.trim();
      try {
        document.getElementById("submitbtn").disabled = true;
        const response = await fetch(
          "https://project-beta-six-77.vercel.app/api/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ emaildata, passworddata }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        if (result.message == "Login Successfully") {
          localStorage.setItem("login", JSON.stringify(result.email));
          setUser(result.name);
          document
            .getElementsByClassName("message")[0]
            .classList.add("success");
          setTimeout(() => {
            window.location.assign("/");
          }, 1500);
        } else {
          document.getElementById("submitbtn").disabled = false;
          Errormsg(email, "Email or Password is wrong");
        }
      } catch (error) {
        document.getElementById("submitbtn").disabled = false;
        document.getElementsByClassName("message")[1].classList.add("error1");
        setTimeout(() => {
          document
            .getElementsByClassName("message")[1]
            .classList.remove("error1");
        }, 1500);
      }
    }
  }
  function Errormsg(id, Error) {
    id.parentElement.classList.add("Error");
    id.parentElement.getElementsByClassName("error")[0].innerHTML = Error;
  }
  function inputchange(e) {
    if (e.target.parentElement.classList.contains("Error")) {
      e.target.parentElement.classList.remove("Error");
    }
  }
  return (
    <>
      <Navbar />
      <div>
        <div className="message">
          <p>Hello {User}!</p>
          <p>Login Sucessfully!</p>
          <p>Redirecting...</p>
        </div>
        <div className="message">
          <p>Error occur!</p>
          <p>Try Again Later</p>
        </div>
      </div>
      <div className="login-page">
        <div className="form-container">
          <h2>Login</h2>
          <form
            onSubmit={(e) => {
              FormSubmit(e);
            }}
          >
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                id="email"
                onChange={(e) => {
                  inputchange(e);
                }}
                placeholder="Enter your email"
              />
              <p className="error">Email is invalid</p>
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => {
                  inputchange(e);
                }}
                placeholder="Enter your password"
              />
              <p className="error">Email is invalid</p>
            </div>

            <button type="submit" id="submitbtn" className="submitbtn">
              Login
            </button>
          </form>
          <p className="account-reg">
            Don't has an acoount? <NavLink to="/register">Register</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
