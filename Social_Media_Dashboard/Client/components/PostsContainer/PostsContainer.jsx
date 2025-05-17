import React from "react";
import { useState, useEffect } from "react";
import "./PostsContainer.css";

const PostsContainer = ({ smedia }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpage, settotalpage] = useState(1);
  const [Post, setPost] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://project-beta-six-77.vercel.app/api/posting",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              currentPage,
              email: JSON.parse(localStorage.getItem("login")),
              category: smedia,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        settotalpage(result.totalPages);
        setPost(result.posts);
      } catch (error) {
        window.location.assign("/");
      }
    })();
  }, [currentPage]);
  function updateform(e) {
    document.getElementsByClassName("posting")[0].classList.add("PostUpdating");
    document.getElementById("updatetitle").value =
      e.target.parentElement.parentElement.getElementsByClassName(
        "item-title"
      )[0].innerHTML;
    document.getElementById("updatedescription").value =
      e.target.parentElement.parentElement.getElementsByClassName(
        "item-description"
      )[0].innerHTML;
    if (
      e.target.parentElement.parentElement.getElementsByClassName(
        "post-image"
      )[0]
    ) {
      document.getElementById("updateimage").value =
        e.target.parentElement.parentElement.getElementsByClassName(
          "post-image"
        )[0].src;
    }
    localStorage.setItem(
      "updateid",
      JSON.stringify(
        e.target.parentElement.parentElement.getAttribute("data-id")
      )
    );
  }
  const deleteid = async (e) => {
    let id = e.target.parentElement.parentElement.getAttribute("data-id");
    try {
      const response = await fetch(
        "https://project-beta-six-77.vercel.app/api/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            email: JSON.parse(localStorage.getItem("login")),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      document.getElementsByClassName("message")[0].classList.add("success");
      document.getElementsByClassName("message")[0].innerHTML =
        "Post Deleted Successfully";
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      document.getElementsByClassName("message")[1].classList.add("error1");
      setTimeout(() => {
        document
          .getElementsByClassName("message")[1]
          .classList.remove("error1");
      }, 3000);
    }
  };
  return (
    <>
      <div className="app-container">
        <div className="header">
          <h2>Posts</h2>
          <button
            className="add-post-btn"
            onClick={() => {
              document
                .getElementsByClassName("posting")[0]
                .classList.add("PostAdding");
            }}
          >
            Add Post
          </button>
        </div>
        {Post.length == 0 ? (
          <p className="no-post">No Post Found</p>
        ) : (
          Post.map((item) => (
            <div className="post-card" key={item._id} data-id={item._id}>
              {!item.image ? (
                <p className="no-image">No Image</p>
              ) : (
                <img src={item.image} alt="Post Image" className="post-image" />
              )}

              <div className="post-content">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-description">{item.description} </p>
              </div>
              <div className="edit-deleter-btn">
                <button
                  onClick={(e) => {
                    updateform(e);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    deleteid(e);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            Previous
          </button>
          <button className="active">{currentPage}</button>
          <button
            disabled={currentPage >= totalpage}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalpage))}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default PostsContainer;
