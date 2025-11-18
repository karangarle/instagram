import React, { useEffect, useState } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostCard from "../../components/PostCard";

export function Dashboard() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
      <Header />
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
            {post.map((p, index) => (
              <PostCard key={p.id || index} post={p} index={index} />
            ))}
          </div>
        </>
      )}

      <Footer />
    </>
  );
}
