import React from "react";
import { CgLogOut } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { PiUsersThreeBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions";
import { Link } from "react-router-dom";

const ProfileDropdown = ({ setShow }) => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  return (
    <div className="profile-dropdown">
      <Link to={"/profile"} style={{ color: "black", textDecoration: "none" }}>
        <div className="dropdown-item" onClick={() => setShow(false)}>
          <IoMdSettings
            style={{ fontSize: "22px", margin: "10px 10px 10px 10px" }}
          />
          Profile Settings
        </div>
      </Link>
      {currentUser && currentUser.role === "Admin" ? (
        <Link
          to={"/users"}
          style={{ color: "black", textDecoration: "none" }}
        >
          <div className="dropdown-item" onClick={() => setShow(false)}>
            <PiUsersThreeBold
              style={{ fontSize: "22px", margin: "10px 10px 10px 10px" }}
            />
            Manage Users
          </div>
        </Link>
      ) : null}
      <div
        className="dropdown-item"
        onClick={() => {
          setShow(false);
          dispatch(logout());
        }}
      >
        <CgLogOut style={{ fontSize: "22px", margin: "12px 10px 10px 11px" }} />
        Logout
      </div>
    </div>
  );
};

export default ProfileDropdown;
