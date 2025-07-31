import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import ReactStars from "react-stars";
import DeleteMovie from "./Admin/DeleteMovie";
import EditMovie from "./Admin/EditMovie";
import { Link } from "react-router-dom";

const MovieCard = ({
  el,
  role,
  deleteMovie,
  typesExtractor,
  qualityExtractor,
  genreExtractor,
  editMovie,
  resetFilters,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="movie-card">
      <Link to={role === "User" ?`/movie/${el.id}`: null} onClick={() => role === "User" ? resetFilters():null} >
        <img src={el.imageURL} alt="" className="movie-image" />
        <div className="movie-quality">
          <span>{el.quality}</span>
        </div>

        <div className="movie-rating">
          {role === "User" ? (
            <button className="play-btn">
              <FaPlay style={{ marginLeft: "3px" }} />
            </button>
          ) : (
            <div className="movie-admin-controls">
              <Button
                className="movie-edit-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setShowEdit(true);
                }}
              >
                <TbEdit style={{ margin: "0px 0px 5px 0px" }} />
              </Button>
              <Button
                className="movie-delete-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDelete(true);
                }}
              >
                <IoTrashSharp style={{ margin: "0px 0px 5px 0px" }} />
              </Button>
            </div>
          )}
          <ReactStars
            className="rating-stars"
            count={5}
            size={24}
            color2={"#ffd700"}
            edit={false}
            value={el.rating}
          />
        </div>
      </Link>
      <EditMovie
        typesExtractor={typesExtractor}
        qualityExtractor={qualityExtractor}
        genreExtractor={genreExtractor}
        show={showEdit}
        setShow={setShowEdit}
        el={el}
        editMovie={editMovie}
      />
      <DeleteMovie
        deleteMovie={deleteMovie}
        el={el}
        show={showDelete}
        setShow={setShowDelete}
      />

      <div className="movie-info-container">
        <span className="movie-title">
          {el.name.length > 20 ? `${el.name.slice(0, 19)}...` : el.name}
        </span>
        <div className="movie-type-container">
          <span className="movie-type-title">
            {el.genre.join(",").length > 11
              ? el.genre.join(",").slice(0, 11) + "..."
              : el.genre.join(",")}
          </span>
          <span className="movie-type">{el.media}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
