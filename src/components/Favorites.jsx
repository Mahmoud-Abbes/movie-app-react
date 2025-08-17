import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { changeCurrentPage } from "../redux/actions";
import { Link, Navigate } from "react-router-dom";

const Favorites = ({
  typesExtractor,
  qualityExtractor,
  genreExtractor,
  resetFilters,
}) => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const { movies } = useSelector((state) => state.reducer);
  const dispach = useDispatch();

  useEffect(() => {
    dispach(changeCurrentPage("Favorites"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const extractFavorites = () => {
    return movies.filter((el) => currentUser.favoriteMovies.includes(el.id));
  };

  return currentUser && currentUser.role === "User" ? (
    <div className="favorites-page-container">
      {extractFavorites().length > 0 ? (
        <div className="favorites-page">
          {extractFavorites().map((el) => (
            <MovieCard
              typesExtractor={typesExtractor}
              qualityExtractor={qualityExtractor}
              genreExtractor={genreExtractor}
              key={el.id}
              el={el}
              resetFilters={resetFilters}
            />
          ))}
        </div>
      ) : (
        <div className="no-movies-text">
          <h1>No favorite movies found</h1>
          <h1>
            Browse{" "}
            <Link to="/movies" style={{ textDecoration: "none" }}>
              <span>Movies</span>
            </Link>{" "}
            ?
          </h1>
        </div>
      )}
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Favorites;
