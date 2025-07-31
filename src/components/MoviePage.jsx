// import { Breadcrumbs, Typography } from "@mui/material";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";
import ReactStars from "react-stars";
import { Link, useParams } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import TrailerModal from "./TrailerModal";

const MoviePage = ({ movies }) => {
  const paramsID = useParams().id;
  const el = movies.find((el) => el.id === Number(paramsID));
  const [sohwTrailer, setSohwTrailer] = useState(false);
  
  return (
    <div>
      <div className="movie-page-image-container">
        <div className="movie-page-breadcrumbs">
          <Breadcrumbs color="#b8b9ba" separator="›" aria-label="breadcrumb">
            <Link to="/" className="bread-crumb">
              Home
            </Link>
            <Link to="/movies" className="bread-crumb">
              Movies
            </Link>
            <Typography key="3" sx={{ color: "white" }}>
              {el.name}
            </Typography>
          </Breadcrumbs>
        </div>
        
        <div className="movie-details">
          <img src={el.imageURL} alt="" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button className="trailer-btn" onClick={() =>setSohwTrailer(true)}>
                <FaPlay />
                <span>Watch Trailer</span>
              </Button>

              <div className="media">
                <span>{el.media}</span>
              </div>
            </div>

            <TrailerModal link={el.trailerLink} show={sohwTrailer} setShow={setSohwTrailer}/>

            <div
              style={{
                marginLeft: "5px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span className="name">{el.name}</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "5px 0px 5px 0px",
                }}
              >
                {el.quality !== null ? (
                  <div className="quality">
                    <span style={{ marginTop: "-2px" }}>{el.quality}</span>
                  </div>
                ) : null}
                <div style={{ marginBottom: "4px" }}>
                  <ReactStars
                    className="rating-stars"
                    count={5}
                    size={24}
                    edit={false}
                    value={el.rating}
                  />
                </div>
              </div>
              <span className="description">{el.description}</span>
              <div>
                <span style={{ fontSize: "18px", fontWeight: "500" }}>
                  Genre :
                </span>
                <span> {el.genre.join(",")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
