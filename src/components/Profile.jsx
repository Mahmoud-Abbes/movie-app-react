import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentPage,
  changeUserImage,
  changeUserName,
  resetPassword,
} from "../redux/actions";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRetype, setNewPasswordRetype] = useState("");
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCurrentPage("Profile"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveName = () => {
    if (newName.trim() === "") {
      toast.info("The name must not empty");
    } else {
      dispatch(changeUserName(newName));
      setNewName("");
    }
  };

  const handleResetPassword = () => {
    if (oldPassword === currentUser.password) {
      if (newPassword === newPasswordRetype) {
        if (newPassword !== currentUser.password) {
          if (newPassword.trim() !== "" && newPasswordRetype !== "") {
            dispatch(resetPassword(newPassword));
            toast.success("Password has been changed sucessfauly");
          } else {
            toast.warning("Please fill the input");
          }
        } else {
          toast.warning("New password cant be old password");
        }
      } else {
        toast.warning("Password doesnt match");
      }
    } else {
      toast.warning("Incorrect password");
    }
  };

  const handleSaveImage = () => {
    if (newImage.trim() !== "") {
      dispatch(changeUserImage(newImage));
      setNewImage("");
    } else {
      toast.info("Image URL must not be empty");
    }
  };

  return (
    <div className="profile-page">
      <div className="cover" />
      <div className="profile-details">
        <div className="name-and-email">
          <span style={{ fontSize: "30px" }}>{currentUser.name}</span>
          <span>{currentUser.email}</span>
          <span>{currentUser.role}</span>
        </div>

        <div className="other-info">
          <div className="password-reset">
            <span className="label-lg">Reset Password</span>
            <span className="label-sm">Old Password</span>
            <Form.Control
              type="password"
              className="password-input"
              style={{ marginBottom: "10px" }}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleResetPassword();
                }
              }}
            />

            <span className="label-sm">New Password</span>
            <Form.Control
              type="password"
              className="password-input"
              style={{ marginBottom: "10px" }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleResetPassword();
                }
              }}
            />

            <span className="label-sm">Retype new Password</span>
            <Form.Control
              type="password"
              className="password-input"
              value={newPasswordRetype}
              onChange={(e) => setNewPasswordRetype(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleResetPassword();
                }
              }}
            />
            <Button
              variant="contained"
              style={{
                height: "36.5px",
                resize: "none",
                marginTop: "15px",
                textTransform: "none",
                width: "70%",
              }}
              onClick={() => handleResetPassword()}
            >
              Reset Password
            </Button>
          </div>

          <div className="name-image-reset">
            <div className="name-image-reset-content">
              <span className="label-lg">Reset other info</span>
              <span className="label-sm">New Name</span>
              <div style={{ display: "flex", gap: "20px" }}>
                <Form.Control
                  type="text"
                  className="name-input"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveName();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  style={{
                    height: "36.5px",
                    resize: "none",
                    marginTop: "5px",
                    textTransform: "none",
                  }}
                  onClick={() => handleSaveName()}
                >
                  Save Name
                </Button>
              </div>

              <span className="label-sm">New Image</span>

              <div style={{ display: "flex", gap: "20px" }}>
                <Form.Control
                  as="textarea"
                  placeholder="Put image URL here"
                  cols={4}
                  style={{
                    height: "100px",
                    resize: "none",
                    marginTop: "5px",
                  }}
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSaveImage();
                    }
                  }}
                  className="new-image-input"
                />
                <Button
                  variant="contained"
                  style={{
                    height: "36.5px",
                    resize: "none",
                    marginTop: "5px",
                    textTransform: "none",
                  }}
                  onClick={() => handleSaveImage()}
                >
                  Save Image
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" />

      <div
        className="image"
        style={
          currentUser.imageURL.trim() !== ""
            ? {
                backgroundImage: `url(${currentUser.imageURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : null
        }
      ></div>
    </div>
  );
};

export default Profile;
