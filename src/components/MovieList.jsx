import FilterBar from "./FilterBar";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const MovieList = ({
  qualityFilter,
  typeFilter,
  ratingFilter,
  genreFilter,
  textFilter,
  role,
  typesExtractor,
  qualityExtractor,
  genreExtractor,
  resetFilters,
  /* Filter Props */
  setTypeFilter,
  setQualityFilter,
  setRatingFilter,
  modifyGenreFilter,
}) => {
  const {movies} = useSelector((state) => state.reducer);
  

  const moviesFilter = () => {
    let filteredMovies = movies;
    if (qualityFilter !== "All") {
      filteredMovies = filteredMovies.filter(
        (el) => el.quality === qualityFilter
      );
    }
    if (typeFilter !== "All") {
      filteredMovies = filteredMovies.filter((el) => el.media === typeFilter);
    }

    if (ratingFilter > 0) {
      filteredMovies = filteredMovies.filter((el) => el.rating >= ratingFilter);
    }

    if (genreFilter.length > 0) {
      genreFilter.map(
        (elt) =>
          (filteredMovies = filteredMovies.filter((el) =>
            el.genre.includes(elt)
          ))
      );
    }

    if (textFilter !== "") {
      filteredMovies = filteredMovies.filter((el) =>
        el.name.toLowerCase().includes(textFilter.trim().toLowerCase())
      );
    }
    return filteredMovies;
  };

  return (
    <div>
      <div style={{ marginTop: "-28px", marginBottom: "28px" }}>
        <Breadcrumbs
          color="rgb(82, 81, 81)"
          separator="›"
          aria-label="breadcrumb"
        >
          <Link to="/" className="bread-crumb bread-crumb-movies">
            Home
          </Link>
          <Typography key="3" sx={{ color: "black" }}>
            Movies
          </Typography>
        </Breadcrumbs>
      </div>
      <FilterBar
        setTypeFilter={setTypeFilter}
        setQualityFilter={setQualityFilter}
        movies={movies}
        setRatingFilter={setRatingFilter}
        ratingFilter={ratingFilter}
        modifyGenreFilter={modifyGenreFilter}
        textFilter={textFilter}
        typesExtractor={typesExtractor}
        qualityExtractor={qualityExtractor}
        genreExtractor={genreExtractor}
      />

      <div className="movie-list">
        {moviesFilter().map((el, i) => (
          <MovieCard
            typesExtractor={typesExtractor}
            qualityExtractor={qualityExtractor}
            genreExtractor={genreExtractor}
            role={role}
            key={el.id}
            el={el}
            resetFilters={resetFilters}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
