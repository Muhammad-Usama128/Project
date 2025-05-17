import React from "react";
import "./FaceHook.css";
import Navbar from "../Navbar/Navbar";
import PostsContainer from "../PostsContainer/PostsContainer";
const FaceHook = () => {
  if (!localStorage.getItem("login")) {
    window.location.assign("/login");
  }
  const PostSubmit = async (e) => {
    e.preventDefault();
    let titleInput = document.getElementById("title");
    let descriptionInput = document.getElementById("description");
    let title_Confirm = false;
    let description_Confirm = false;
    if (titleInput.value.trim() == "" || titleInput.value.length <= 0) {
      Errormsg(titleInput, "Title is required");
    } else {
      title_Confirm = true;
    }
    if (
      descriptionInput.value.trim() == "" ||
      descriptionInput.value.length <= 0
    ) {
      Errormsg(descriptionInput, "Description is required");
    } else {
      description_Confirm = true;
    }
    if (description_Confirm == true && title_Confirm == true) {
      try {
        document.getElementsByClassName("submitbtn")[0].disabled = true;
        let title = titleInput.value.trim();
        let description = descriptionInput.value.trim();
        let email = JSON.parse(localStorage.getItem("login"));
        let image = document.getElementById("image").value.trim();
        let category = "facehook";

        const response = await fetch(
          "https://project-beta-six-77.vercel.app/api/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              description,
              image,
              email,
              category,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        document.getElementsByClassName("submitbtn")[0].disabled = false;

        const result = await response.json();
        document.getElementsByClassName("message")[0].classList.add("success");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        document.getElementsByClassName("submitbtn")[0].disabled = false;
        document.getElementsByClassName("message")[1].classList.add("error1");
        setTimeout(() => {
          document
            .getElementsByClassName("message")[1]
            .classList.remove("error1");
        }, 1500);
      }
    }
  };
  const updateSubmit = async (e) => {
    e.preventDefault();
    let titleInput = document.getElementById("updatetitle");
    let descriptionInput = document.getElementById("updatedescription");
    let title_Confirm = false;
    let description_Confirm = false;
    if (titleInput.value.trim() == "" || titleInput.value.length <= 0) {
      Errormsg(titleInput, "Title is required");
    } else {
      title_Confirm = true;
    }
    if (
      descriptionInput.value.trim() == "" ||
      descriptionInput.value.length <= 0
    ) {
      Errormsg(descriptionInput, "Description is required");
    } else {
      description_Confirm = true;
    }
    if (description_Confirm == true && title_Confirm == true) {
      try {
        document.getElementsByClassName("submitbtn")[1].disabled = true;
        let title = titleInput.value.trim();
        let description = descriptionInput.value.trim();
        let email = JSON.parse(localStorage.getItem("login"));
        let image = document.getElementById("updateimage").value.trim();
        const response = await fetch(
          "https://project-beta-six-77.vercel.app/api/update",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              description,
              image,
              email,
              id: JSON.parse(localStorage.getItem("updateid")),
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        document.getElementsByClassName("submitbtn")[1].disabled = false;
        const result = await response.json();
        document.getElementsByClassName("message")[0].classList.add("success");
        document.getElementsByClassName("message")[0].innerHTML =
          "Post Updated Successfully";
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        document.getElementsByClassName("submitbtn")[1].disabled = false;
        document.getElementsByClassName("message")[1].classList.add("error1");
        setTimeout(() => {
          document
            .getElementsByClassName("message")[1]
            .classList.remove("error1");
        }, 3000);
      }
    }
  };
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
      <div className="result-msg">
        <div className="message">
          <p>Post Added Successfully!</p>
        </div>
        <div className="message">
          <p>Error occur!</p>
          <p>Try Again Later</p>
        </div>
      </div>
      <div className="posting">
        <div className="AddPost">
          <div className="form-container">
            <button
              className="closebtn"
              onClick={() => {
                document
                  .getElementsByClassName("posting")[0]
                  .classList.remove("PostAdding");
              }}
            >
              X
            </button>
            <h2>Add Post</h2>
            <form
              onSubmit={(e) => {
                PostSubmit(e);
              }}
            >
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  id="title"
                  onChange={(e) => {
                    inputchange(e);
                  }}
                  placeholder="Enter Subject Title"
                />
                <p className="error">Title is required</p>
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  id="description"
                  onChange={(e) => {
                    inputchange(e);
                  }}
                  placeholder="Description 0 - 30 words"
                />
                <p className="error">Description is invalid</p>
              </div>
              <div className="form-group">
                <label>Image(Optional):</label>
                <input
                  type="text"
                  id="image"
                  onChange={(e) => {
                    inputchange(e);
                  }}
                  placeholder="Enter image url"
                />
              </div>
              <button type="submit" id="submitbtn" className="submitbtn">
                Post
              </button>
            </form>
            <p className="account-reg"></p>
          </div>
        </div>
        <div className="updatePost">
          <div className="form-container">
            <button
              className="closebtn"
              onClick={() => {
                document
                  .getElementsByClassName("posting")[0]
                  .classList.remove("PostUpdating");
              }}
            >
              X
            </button>
            <h2>Update Post</h2>
            <form
              onSubmit={(e) => {
                updateSubmit(e);
              }}
            >
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  id="updatetitle"
                  onChange={(e) => {
                    inputchange(e);
                  }}
                  placeholder="Enter Subject Title"
                />
                <p className="error">Title is required</p>
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  id="updatedescription"
                  onChange={(e) => {
                    inputchange(e);
                  }}
                  placeholder="Description 0 - 30 words"
                />
                <p className="error">Description is invalid</p>
              </div>
              <div className="form-group">
                <label>Image(Optional):</label>
                <input
                  type="text"
                  id="updateimage"
                  onChange={(e) => {
                    inputchange(e);
                  }}
                  placeholder="Enter image url"
                />
              </div>
              <button type="submit" id="submitbtn" className="submitbtn">
                Update
              </button>
            </form>
            <p className="account-reg"></p>
          </div>
        </div>
      </div>
      <Navbar />
      <h1 className="heading">FaceHook</h1>
      <PostsContainer smedia="facehook" />
    </>
  );
};

export default FaceHook;
