// import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Login() {
  const navigate = useNavigate(); 
  const [errorMessage,setErrorMessage] = useState('');

  const loginForm = useFormik({
    initialValues : {
      email : "",
      password : "",
    },
    // onSubmit : (values) => {
    //   console.log(values);
    //   setEmail(values.email)
    //   setPassword(values.password);
    //   const response = { data: { code: 0 } };
    //   if (response.data.code === 0) {
    //     navigate('../dashboard')
    //   }
    // },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8200/login", values);
        if (response.data.code === 1) {
          localStorage.setItem('token',response.data.token)
          navigate('/dashboard'); 
        } else {
          setErrorMessage(response.data.message)
          // alert(response.data.message);
        }
      } catch (error) {
        console.error("Something went wrong:", error);
        // alert("An error occurred while logging in.");
      }
    },
    validationSchema:Yup.object({
      email : Yup.string().required("Please Enter Valid Email"),
      password : Yup.string().required("Please Enter Password")
    })
  })

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
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{backgroundColor:"rgb(0, 0, 0)"}}>
        <div className="row p-1">
          <div className="col">
            <div
              className="card text-white mb-3"
              style={{
                width: "22rem",
                height: "26rem",
                borderColor: "rgb(65, 64, 64)",
                backgroundColor:"rgb(0, 0, 0)"
              }}
            >
              {/* <div class="text-center"><h1>Instagram</h1></div> */}
              <div className="card-body">
                <h1 className="card-title text-center p-4">Instagram</h1>
                <form method="post" onSubmit={loginForm.handleSubmit} action="">
                {errorMessage && (
                  <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>
                )}
                  <div className="mb-2">
                    <input
                      type="text"
                      name="email"
                      placeholder="Phone number, username, or email"
                      className="form-control bg-dark text-white"
                      style={{ borderColor: "rgb(18, 18, 18)" , fontSize:"small"}}
                      onChange={loginForm.handleChange}
                      onBlur={loginForm.handleBlur}
                      value={loginForm.values.email}
                    />
                    {loginForm.touched.email && loginForm.errors.email && (<p className="error">{loginForm.errors.email}</p> )}    
           
                  </div>
                  <div className="mb-2">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control bg-dark text-white"
                    style={{ borderColor: "rgb(18, 18, 18)", fontSize: "small" }}
                    onChange={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                    value={loginForm.values.password}
                  />

                    {loginForm.touched.password && loginForm.errors.password && (<p className="error">{loginForm.errors.password}</p>) }
                  </div>
                  <div className="d-flex justify-content-center">
                    <button 
                      type="submit"
                      className="btn btn-primary vw-100"
                      style={{ borderRadius: "12px" }}
                    >
                      Log in
                    </button>
                  </div>
                  <div style={dividerStyle}>
                    <div style={lineStyle}></div>
                    OR
                    <div style={lineStyle}></div>
                  </div>
                  <div>
                    <a
                      href="https://www.facebook.com/"
                      className="text-decoration-none text-center"
                    >
                      <p>
                      <img src="img/facebook.png" className="m-2" alt="Profile" width={"25px"} />
                        Log in with Facebook
                      </p>
                    </a>
                  </div>
                </form>
              </div>
              <div className="text-center">
                <p>
                  <a href="/forgot" className="text-white text-decoration-none">
                    Forgot Password?
                  </a>
                </p>
              </div>
            </div>
            <div
              className="card text-white mt-3 p-2 text-center"
              style={{ borderColor: "rgb(72, 71, 71)" , backgroundColor:"rgb(0, 0, 0)" }}
            >
              <p>
                Don't have an account? {""}
                <Link to="/" className="text-primary text-decoration-none">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
