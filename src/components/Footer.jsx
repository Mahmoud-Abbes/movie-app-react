import { Breadcrumbs } from "@mui/material";
import React from "react";
import { MdLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div style={{ display: "flex", flexDirection: "column", width: "20%" }}>
        <MdLocalMovies className="logo" />
        <span className="title"> Movies for all</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          marginRight: "100px",
        }}
      >
        <span
          style={{ fontSize: "15px", color: "#878585ff", marginBottom: "20px" }}
        >
          This movie rating app lets you watch trailers and check ratings before
          deciding what to watch next. Browse through a wide selection of films,
          see what others are saying, and explore trending or top-rated titles.
          With a clean interface and easy navigation, you can quickly find
          trailers, read short reviews, and stay updated on the latest releases
          — all in one place.
        </span>

        <Breadcrumbs
          color="rgb(82, 81, 81)"
          separator="-"
          aria-label="breadcrumb"
        >
          <Link to="/" className="bread-crumb bread-crumb-footer">
            Home
          </Link>

          <Link to="/movies" className="bread-crumb bread-crumb-footer">
            Movies
          </Link>
        </Breadcrumbs>
      </div>

      <div className="app-rating">
        <span style={{ width: "80%" }}>Best Rated Movie app in 2025</span>
        <div className="app-rating-red-circle"></div>
      </div>
    </div>
  );
};

export default Footer;
