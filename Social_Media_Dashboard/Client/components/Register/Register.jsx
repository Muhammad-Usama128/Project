import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Register.css";
const Register = () => {
  document.title = "Register - Social Media Dashboard";
  async function FormSubmit(e) {
    e.preventDefault();
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let cpassword = document.getElementById("cpassword");
    let name_Confirm = false;
    let email_Confirm = false;
    let password_Confirm = false;
    let cpassword_Confirm = false;
    if (name.value.trim() == "" || name.value.length == 0) {
      Errormsg(name, "Name is required.");
    } else if (name.value.trim().length <= 3) {
      Errormsg(name, "Name should be longer than 3 letter.");
    } else if (!/^[A-Za-z\s]+$/.test(name.value.trim())) {
      Errormsg(name, "Name should not have special character or number.");
    } else {
      name_Confirm = true;
    }

    if (email.value.trim() == "" || email.value.length == 0) {
      Errormsg(email, "Email is required.");
    } else if (
      !(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          email.value.trim()
        ) || /^[a-zA-Z0-9._-]+@gmail\.com$/.test(email.value.trim())
      )
    ) {
      Errormsg(email, "Gmail or Email is not right.");
    } else {
      email_Confirm = true;
    }

    if (password.value.trim() == "" || password.value.length == 0) {
      Errormsg(password, "Password is required.");
    } else if (password.value.trim().length <= 5) {
      Errormsg(password, "Password should be longer than 5 character.");
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[_\-!@#$%^&*()+=]).+$/.test(
        password.value.trim()
      )
    ) {
      Errormsg(
        password,
        "Password should have alphabet, number and special character."
      );
    } else {
      password_Confirm = true;
    }

    if (cpassword.value.trim() == "" || cpassword.value.length == 0) {
      Errormsg(cpassword, "Confirm Password is required.");
    } else if (cpassword.value.trim() != password.value.trim()) {
      Errormsg(cpassword, "Password doesn't match.");
    } else {
      cpassword_Confirm = true;
    }
    if (
      name_Confirm == true &&
      email_Confirm == true &&
      password_Confirm == true &&
      cpassword_Confirm == true
    ) {
      let namedata = name.value.trim();
      let emaildata = email.value.trim();
      let passworddata = password.value.trim();
      try {
        document.getElementById("submitbtn").disabled = true;
        const response = await fetch(
          "https://project-beta-six-77.vercel.app/api/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ namedata, emaildata, passworddata }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result.message === "Email is available") {
          document
            .getElementsByClassName("message")[0]
            .classList.add("success");
          setTimeout(() => {
            window.location.assign("/login");
          }, 1500);
        } else {
          document.getElementById("submitbtn").disabled = false;
          Errormsg(email, "Email already Exist");
          email.value = "";
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
      <div className="result-msg">
        <div className="message">
          <p>Register Successfully!</p>
          <p>Redirecting...</p>
        </div>
        <div className="message">
          <p>Error occur!</p>
          <p>Try Again Later</p>
        </div>
      </div>
      <div className="register-page">
        <div className="form-container">
          <h2>Register</h2>
          <form
            onSubmit={(e) => {
              FormSubmit(e);
            }}
          >
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                onChange={(e) => {
                  inputchange(e);
                }}
                id="name"
                placeholder="Enter your name"
              />
              <p className="error">Name is required</p>
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                onChange={(e) => {
                  inputchange(e);
                }}
                id="email"
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
              <p className="error">Password must be at least 6 characters</p>
            </div>

            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                id="cpassword"
                onChange={(e) => {
                  inputchange(e);
                }}
                placeholder="Confirm your password"
              />
              <p className="error">Passwords do not match</p>
            </div>

            <button type="submit" id="submitbtn" className="submitbtn">
              Register
            </button>
          </form>
        </div>
        <div className="instruction">
          <h1>Instruction</h1>
          <ul>
            <li>First you have to create an account.</li>
            <li>Then login in with account.</li>
            <li>
              Then choose a platform in Social Media Dashboard. You will be able
              to see all your post there.
            </li>
            <li>Click on "Add Post" to add a post.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Register;
