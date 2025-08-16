import { Breadcrumbs, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import MUIButton from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import {
  changeUserBlock,
  changeUserRole,
  removeUser,
} from "../../redux/actions";

const UserManagement = () => {
  const { userList } = useSelector((state) => state.userReducer);
  const { currentUser } = useSelector((state) => state.userReducer);
  const [searchSelected, setSearchSelected] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setsearchResult] = useState("");
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();

  const filteredUsers = () => {
    return userList.filter(
      (el) =>
        el.name.toUpperCase().includes(searchResult.toUpperCase().trim()) ||
        el.email.toUpperCase().includes(searchResult.toUpperCase().trim())
    );
  };

  const handleChangeRole = (role, el) => {
    const updatedUser = { ...el, role: role };
    dispatch(changeUserRole(updatedUser));
  };

  const UserRow = ({ el }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button
          id="demo-positioned-button"
          style={{
            height: "55px",
            border: "none",
            backgroundColor: "rgba(24, 109, 220, 1)",
          }}
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          disabled={el.email === currentUser.email}
        >
          User actions
        </Button>
        <Menu
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={{
            style: {
              border: "solid rgb(198, 196, 196) 1px",
              boxShadow: "none",
              width: "123px",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              dispatch(changeUserBlock(el.email));
            }}
            style={
              el.blocked
                ? {
                    backgroundColor: "#64c11d9c",
                  }
                : {
                    backgroundColor: "#ed6767ff",
                  }
            }
          >
            {el.blocked ? "Unblock" : "Block"}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              dispatch(removeUser(el.email));
            }}
            style={{ backgroundColor: "#ed6767ad" }}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
    );
  };

  return (
    <div className="users-page">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <span className="title">User Management</span>
          <Breadcrumbs color="#625d5dff" separator="›" aria-label="breadcrumb">
            <Typography key="3" sx={{ color: "#625f5fff" }}>
              Account
            </Typography>
            <Typography key="3" sx={{ color: "#625f5fff" }}>
              Manage Users
            </Typography>
          </Breadcrumbs>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <div className="search-user">
            <Button
              type="submit"
              className="search-user-btn"
              id={`${searchSelected ? "border-change" : null}`}
              onClick={() => searchInputRef.current.focus()}
            >
              <FaSearch style={{ marginTop: "-2px", marginLeft: "-0.5px" }} />
            </Button>
            <Form.Control
              type="text"
              placeholder="Search User"
              className="search-user-input"
              value={searchInput}
              onChange={(e) => {
                if (e.target.value.trim() === "") {
                  setsearchResult("");
                }
                setSearchInput(e.target.value);
              }}
              onFocus={() => setSearchSelected(true)}
              onBlur={() => setSearchSelected(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setsearchResult(searchInput);
                }
              }}
              id={`${searchSelected ? "border-change" : null}`}
              ref={searchInputRef}
            />
          </div>

          <MUIButton
            variant="contained"
            style={{ textTransform: "none" }}
            onClick={() => setsearchResult(searchInput)}
          >
            <span style={{ marginBottom: "-1px" }}>Search</span>
          </MUIButton>
        </div>
      </div>

      <div className="users-container">
        <div
          style={{
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <span
            style={{ width: "25%", textAlign: "center", fontWeight: "600" }}
          >
            Info
          </span>
          <span
            style={{ width: "25%", textAlign: "center", fontWeight: "600" }}
          >
            User Role
          </span>
          <span
            style={{ width: "25%", textAlign: "center", fontWeight: "600" }}
          >
            Actions
          </span>
        </div>
        <hr />
        {filteredUsers().map((el, i) => 
        (
          <div key={i}>
            <div className="user-info">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                  width: "25%",
                }}
              >
                <div
                  className="user-image"
                  style={
                    el.imageURL.trim() !== ""
                      ? {
                          backgroundImage: `url(${el.imageURL})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : null
                  }
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "55%",
                  }}
                >
                  <span style={{ fontWeight: "600" }}>
                    {el.name} {el.email === currentUser.email ? " (You)" : null}
                  </span>
                  <span style={{ color: "gray", fontWeight: "400" }}>
                    {el.email}
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "25%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  className={`${
                    el.role === "Admin"
                      ? "admin-role"
                      : el.role === "User"
                      ? "user-role"
                      : "other-role"
                  } role`}
                >
                  <span>{el.role}</span>
                </div>
              </div>
              <div
                style={{
                  width: "25%",
                  display: "flex",
                  gap: "20px",
                  justifyContent: "center",
                }}
              >
                <FormControl style={{ width: "120px" }}>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    label="Role"
                    value={el.role}
                    disabled={
                      el.role === "Admin" || currentUser.email === el.email
                    }
                    onChange={(e) => handleChangeRole(e.target.value, el)}
                  >
                    <MenuItem value={"User"}>User</MenuItem>
                    <MenuItem value={"Manager"}>Manager</MenuItem>
                    <MenuItem value={"Admin"} disabled>
                      Admin
                    </MenuItem>
                  </Select>
                </FormControl>

                <UserRow el={el} currentUser={currentUser} />
              </div>
            </div>
            {filteredUsers().length > 3 &&
            i + 1 === filteredUsers().length ? null : (
              <hr />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
