import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { HiArrowSmRight } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addUser, changeCurrentPage, setCureentUser } from "../redux/actions";

export const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCurrentPage("Login"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Login Info */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  /* Register Info */
  const [registerEmail, setRegisterEmail] = useState("");
  const [name, setName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordRetype, setRegisterPasswordRetype] = useState("");

  const [stayLogged, setstayLogged] = useState(false);
  const [register, setregister] = useState(false);

  const [isLogged, setIsLogged] = useState(false);

  const emptyData = () => {
    setLoginEmail("");
    setLoginPassword("");
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterPasswordRetype("");
    setName("");
  };

  const { userList } = useSelector((state) => state.userReducer);

  const fetchAccount = (email) => {
    console.log(userList);
    return userList.find((el) => el.email === email);
  };

  // ---------------------- Register Handeling ---------------------- //

  const handleRegister = (email, pass) => {
    if (fetchAccount(email)) {
      return false;
    }

    let newUser = {
      name: name,
      email: email,
      password: pass,
      role: "User",
    };

    dispatch(addUser(newUser));
    return true;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerPassword !== registerPasswordRetype) {
      toast.error("Password does not match");
    } else {
      let response = handleRegister(registerEmail, registerPassword);
      if (response) {
        emptyData();
        setregister(false);
        toast.success("Registred successfaully !");
      } else {
        toast.error("Email has already been used");
      }
    }
  };

  // ---------------------- Login Handeling ---------------------- //

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin(loginEmail, loginPassword)
      ? setIsLogged(true)
      : toast.error("Incorrect email or password");
  };

  const handleLogin = (email, pass) => {
    let accountFetch = fetchAccount(email);
    if (accountFetch) {
      if (accountFetch.password === pass) {
        dispatch(setCureentUser(accountFetch));
        return true;
      }
    }
    return false;
  };

  return isLogged === false ? (
    <div className="login-register-page">
      <Link to={"/"} className="home-back-link">
        <IoIosArrowBack
          style={{ fontSize: "25px", marginRight: "10px", marginTop: "-1px" }}
        />
        <span>Back to Home</span>
      </Link>
      <div
        className={`login-register-form ${register ? "register-form" : null}`}
      >
        {!register ? (
          <div className="login-form">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "30px",
              }}
            >
              <span className="title">Login</span>
              <span className="title-description">Dive into movie ratings</span>
            </div>

            <Form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleLoginSubmit}
            >
              <Form.Group>
                <span className="coordinates-label">Email</span>
                <Form.Control
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  type="email"
                  className="coordinates-tf"
                  required
                />
              </Form.Group>

              <Form.Group style={{ marginTop: "15px" }}>
                <span className="coordinates-label">Password</span>
                <Form.Control
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  type="password"
                  className="coordinates-tf"
                  required
                />
              </Form.Group>

              <Form.Group style={{ marginTop: "15px" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stayLogged}
                      onChange={() => {
                        toast.error("Cookies not added yet", {
                          position: "top-right",
                          autoClose: 4000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                        setstayLogged(false);
                      }}
                    />
                  }
                  label={
                    <span style={{ fontFamily: "Poppins", fontWeight: "500" }}>
                      Stay Logged In
                    </span>
                  }
                />
              </Form.Group>

              <Form.Group style={{ marginTop: "15px", height: "100%" }}>
                <Button type="submit" className="inscription-btn">
                  <span>Log In</span>
                  <HiArrowSmRight
                    style={{ fontSize: "30px", marginLeft: "10px" }}
                  />
                </Button>

                <Button
                  className="continue-google"
                  onClick={() => {
                    toast.error("Google API not integrated yet", {
                      position: "top-right",
                      autoClose: 4000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  }}
                >
                  <FcGoogle style={{ fontSize: "30px", marginRight: "15px" }} />
                  <span>Continue with google</span>
                </Button>
              </Form.Group>
            </Form>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <span className="auth-question">Dont have an account ?</span>
              <a
                href=" "
                onClick={(e) => {
                  e.preventDefault();
                  setregister(true);
                  emptyData();
                }}
                className="auth-question"
                style={{ marginLeft: "10px" }}
              >
                Register
              </a>
            </div>
          </div>
        ) : (
          /* ---------------------------------------------------------------------------------------------------- */
          <div className="login-form">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "30px",
              }}
            >
              <span className="title">Register</span>
              <span className="title-description">
                Join our movie rating app community
              </span>
            </div>

            <Form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleRegisterSubmit}
            >
              <Form.Group>
                <span className="coordinates-label">Name</span>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="coordinates-tf"
                  required
                />
              </Form.Group>

              <Form.Group style={{ marginTop: "15px" }}>
                <span className="coordinates-label">Email</span>
                <Form.Control
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  type="email"
                  className="coordinates-tf"
                  required
                />
              </Form.Group>

              <Form.Group style={{ marginTop: "15px" }}>
                <span className="coordinates-label">Password</span>
                <Form.Control
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  type="password"
                  className="coordinates-tf"
                  required
                />
              </Form.Group>

              <Form.Group style={{ marginTop: "15px", marginBottom: "5px" }}>
                <span className="coordinates-label">Retype password</span>
                <Form.Control
                  value={registerPasswordRetype}
                  onChange={(e) => setRegisterPasswordRetype(e.target.value)}
                  type="password"
                  className="coordinates-tf"
                  required
                />
              </Form.Group>

              <Form.Group style={{ marginTop: "15px", height: "100%" }}>
                <Button type="submit" className="inscription-btn">
                  <span>Register</span>
                  <HiArrowSmRight
                    style={{ fontSize: "30px", marginLeft: "10px" }}
                  />
                </Button>

                <Button
                  className="continue-google"
                  onClick={() => {
                    toast.error("Google API not integrated yet", {
                      position: "top-right",
                      autoClose: 4000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  }}
                >
                  <FcGoogle style={{ fontSize: "30px", marginRight: "15px" }} />
                  <span>Continue with google</span>
                </Button>
              </Form.Group>
            </Form>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <span className="auth-question">Already have an account ?</span>
              <a
                href=" "
                onClick={(e) => {
                  e.preventDefault();
                  setregister(false);
                  emptyData();
                }}
                className="auth-question"
                style={{ marginLeft: "10px" }}
              >
                Login
              </a>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  ) : (
    <Navigate to={"/movies"} />
  );
};
