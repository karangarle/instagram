import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostCard({post,index}) {
    
  const [errorMessage, setErrorMessage] = useState("");
  const [activePostId, setActivePostId] = useState(null);
  const [comment, setComment] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleCommentSubmit = (postId) => {
    if (!comment[postId]?.trim()) {
      alert("Comment cannot be empty!");
      return;
    }
    console.log("Comment submitted:", comment[postId]);
    setComment({ ...comment, [postId]: "" });
  };
  return (
    <div
      className="cards m-2"
      style={{ width: "18rem" }}
    >
      <div className="card_inner">
        <div className="carsd post-card">
          <div className="d-flex align-items-center p-2">
            <img
              src={`/img/${post.image}`}
              alt="User"
              className="profile-img me-2"
              style={{ width: "10%" }}
            />
            <strong>karan_garale</strong>
          </div>
          <img
            src={post.image ? `img/${post.image}` : "img/default.jpg"}
            alt="PostImage"
            style={{
              width: "58%",
              height: "150px",
              objectFit: "cover",
            }}
          />
          <div className="p-3">
            <div className="d-flex justify-content-between icons">
              <div>
                <i className="far fa-heart"></i>
                {/* <i className="far fa-comment"></i> */}
                <i
                  className="far fa-comment cursor-pointer text-xl text-gray-600 hover:text-blue-500"
                  onClick={() =>
                    setActivePostId(activePostId === post.id ? null : post.id)
                  }
                ></i>
                <i className="far fa-paper-plane"></i>
              </div>
              <i className="far fa-bookmark"></i>
            </div>

            <p className="mt-2">
              <strong>128 likes</strong>
            </p>
            {activePostId === post.id && (
              <div>
                <input
                  type="text"
                  value={comment[post.id] || ""}
                  // onChange={(e) => setComment(e.target.value)}
                  onChange={(e) =>
                    setComment({
                      ...comment,
                      [post.id]: e.target.value,
                    })
                  }
                  placeholder="Write a comment..."
                  className="mt-2 p-2 border rounded-md w-full"
                />
                <i
                  className="far fa-paper-plane p-2"
                  onClick={() => handleCommentSubmit(post.id)}
                ></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
