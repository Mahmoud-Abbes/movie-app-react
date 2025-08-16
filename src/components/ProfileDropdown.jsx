import { CgLogOut } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { PiUsersThreeBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

const ProfileDropdown = ({ menuButton }) => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  return (
    <Menu menuButton={menuButton} align="end" menuStyle={{ zIndex: 8000 }}>
      <MenuItem>
        <Link
          to={"/profile"}
          style={{ color: "black", textDecoration: "none" }}
        >
          <div className="dropdown-item">
            <IoMdSettings
              style={{ fontSize: "22px", margin: "10px 10px 10px 0px" }}
            />
            <span style={{fontWeight : "400"}}>Account Settings</span>
          </div>
        </Link>
      </MenuItem>

      {currentUser && currentUser.role === "Admin" ? (
        <MenuItem>
          <Link
            to={"/users"}
            style={{ color: "black", textDecoration: "none" }}
          >
            <PiUsersThreeBold
              style={{ fontSize: "20px", margin: "10px 10px 10px 0px" }}
            />
            <span style={{fontWeight : "400"}}>Manage Users</span>
          </Link>
        </MenuItem>
      ) : null}

      <MenuItem>
        <div
          className="dropdown-item"
          onClick={() => {
            dispatch(logout());
          }}
        >
          <CgLogOut
            style={{ fontSize: "22px", margin: "10px 10px 10px 0px" }}
          />
          <span style={{fontWeight : "400"}}>Logout</span>
        </div>
      </MenuItem>
    </Menu>
  );
};

export default ProfileDropdown;
