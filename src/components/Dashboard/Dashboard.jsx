import React, { useEffect, useState } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";

export function Dashboard() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activePostId, setActivePostId] = useState(null);
  const [comment, setComment] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate('');

  const handleCommentSubmit = (postId) => {
    if (!comment[postId]?.trim()) {
      alert("Comment cannot be empty!");
      return;
    }
    console.log("Comment submitted:", comment[postId]);
    setComment({ ...comment, [postId]: "" });
  };

  const handleLogout = () => {
    console.log("Click");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:8200/postlist");
      if (response?.data?.code === 1) {
        setPost(response.data.data || []);
      } else {
        const msg = response?.data?.message || "Failed to load posts";
        setErrorMessage(msg);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setErrorMessage("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            />

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a href="/" className="nav-link px-2 text-secondary">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-2 text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-2 text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-2 text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-2 text-white">
                  About
                </a>
              </li>
            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input
                type="search"
                className="form-control form-control-dark"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            <div className="text-end">
              {token ? (
                <button
                  type="button"
                  className="btn btn-outline-light me-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button type="button" className="btn btn-outline-light me-2">
                  Login
                </button>
              )}
              <button type="button" className="btn btn-warning">
                Sign-up
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* body */}
      {loading ? (
        <div className="p-4">Loading...</div>
      ) : post.length === 0 ? (
        <div className="p-4">No Posts Found</div>
      ) : (
        <>
          <img
            src="img/Avenger-Age of ultron.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="d-flex flex-wrap">
            {post.map((post, index) => (
              <div className="cards m-2" style={{ width: "18rem" }} key={post.id || index}>
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
                              setActivePostId(
                                activePostId === post.id ? null : post.id
                              )
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
            ))}
          </div>
        </>
      )}

      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a
              href="/"
              className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
            >
              <svg className="bi" width="30" height="24"></svg>
            </a>
            <span className="mb-3 mb-md-0 text-body-secondary">
              © 2024 Movie, Inc
            </span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-body-secondary" href="/">
                <svg className="bi" width="24" height="24"></svg>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-body-secondary" href="/">
                <svg className="bi" width="24" height="24"></svg>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-body-secondary" href="/">
                <svg className="bi" width="24" height="24"></svg>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
