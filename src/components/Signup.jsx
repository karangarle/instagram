import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

export function Signup() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const signupForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      user_name: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8200/signup", values); // Add await here
        if (response.data.code === 1) {
          console.log(response.data.message);
          navigate("/login");
        } else {
          setErrorMessage(response.data.message);
          alert(response.data.message);
        }
      } catch (error) {
        console.log("Something Went Wrong", error.response?.data || error.message);
      }
    },    
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Mobile Number or Email"),
      password: Yup.string().required("Please Enter Your Password"),
      user_name: Yup.string().required("Please Enter Your User Name"),
    }),
  });

  const dividerStyle = {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    margin: "20px 0",
    color: "#8e8e8e",
    fontSize: "14px",
  };

  const lineStyle = {
    flex: "1",
    borderBottom: "1px solid rgb(100 98 98)",
    margin: "0 10px",
  };
  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "rgb(0, 0, 0)" }}
      >
        <div className="row p-1">
          <div className="col">
            <div
              className="card text-white mb-3"
              style={{
                width: "22rem",
                height: "35rem",
                borderColor: "rgb(65, 64, 64)",
                backgroundColor: "rgb(0, 0, 0)",
              }}
            >
              {/* <div class="text-center"><h1>Instagram</h1></div> */}
              <div className="card-body p-4">
                {/* <h1 className="card-title text-center p-4 ml-5">Instagram</h1> */}
                <img
                  src="img/logo.png"
                  alt="logo"
                  className="text-center ms-4"
                />
                <div>
                  <a
                    href="https://www.facebook.com/"
                    className="text-decoration-none text-center"
                  >
                    <p>
                      <img
                        src="img/facebook.png"
                        className="m-2"
                        alt="Profile"
                        width={"25px"}
                      />
                      Log in with Facebook
                    </p>
                  </a>
                </div>
                <div style={dividerStyle}>
                  <div style={lineStyle}></div>
                  OR
                  <div style={lineStyle}></div>
                </div>
                <form method="post" onSubmit={signupForm.handleSubmit}>
                  {errorMessage && (
                    <div style={{ color: "red", marginBottom: "10px" }}>
                      {errorMessage}
                    </div>
                  )}
                  <div className="mb-2">
                    <input
                      type="text"
                      name="email"
                      placeholder="Mobile Number or Email"
                      className="form-control bg-dark text-white"
                      style={{
                        borderColor: "rgb(18, 18, 18)",
                        fontSize: "small",
                      }}
                      onChange={signupForm.handleChange}
                      onBlur={signupForm.handleBlur}
                    />
                    {signupForm.touched.email && signupForm.errors.email && (
                      <p className="error">{signupForm.errors.email}</p>
                    )}
                  </div>
                  <div className="mb-2">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control bg-dark text-white"
                    style={{
                      borderColor: "rgb(18, 18, 18)",
                      fontSize: "small",
                    }}
                    onChange={signupForm.handleChange}
                    onBlur={signupForm.handleBlur}
                  />
                    {signupForm.touched.password &&
                      signupForm.errors.password && (
                        <p className="error">{signupForm.errors.password}</p>
                      )}
                  </div>
                  {/* <div className="mb-2">
                    <input
                      type="text"
                      name="fullname"
                      placeholder="Full Name"
                      className="form-control bg-dark"
                      style={{
                        borderColor: "rgb(18, 18, 18)",
                        fontSize: "small",
                        color: "white",
                      }}
                      onChange={signupForm.handleChange}
                      onBlur={signupForm.handleBlur}
                    />
                    {signupForm.touched.fullname &&
                      signupForm.errors.fullname && (
                        <p className="error">{signupForm.errors.fullname}</p>
                      )}
                  </div> */}
                  <div className="mb-2">
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Username"
                      className="form-control bg-dark text-white"
                      style={{
                        borderColor: "rgb(18, 18, 18)",
                        fontSize: "small",
                      }}
                      onChange={signupForm.handleChange}
                      onBlur={signupForm.handleBlur}
                    />
                    {signupForm.touched.user_name &&
                      signupForm.errors.user_name && (
                        <p
                          className="
                    error"
                        >
                          {signupForm.errors.user_name}
                        </p>
                      )}
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary vw-100"
                      style={{ borderRadius: "12px" }}
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
              <div className="text-center"></div>
            </div>
            <div>
              <div
                className="card text-white mt-3 p-2 text-center"
                style={{
                  borderColor: "rgb(72, 71, 71)",
                  backgroundColor: "rgb(0, 0, 0)",
                }}
              >
                {/* Your content here */}
                <p>
                  <span>Have an account? </span>
                  <Link
                    to="/login"
                    className="text-primary text-decoration-none"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
