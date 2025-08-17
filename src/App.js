import { useEffect, useState } from "react";
import "./App.css";
import Heading from "./components/Heading";
import MovieList from "./components/MovieList";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import MoviePage from "./components/MoviePage";
import Footer from "./components/Footer";
import { Login } from "./components/Login";
import { useSelector } from "react-redux";
import Profile from "./components/Profile";
import UserManagement from "./components/Admin/UserManagement";
import Favorites from "./components/Favorites";

function App() {
  const { currentPage } = useSelector((state) => state.reducer);
  const { movies } = useSelector((state) => state.reducer);
  const [shownMovies, setShownMovies] = useState(movies);

  const [qualityFilter, setQualityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [genreFilter, setGenreFilter] = useState([]);
  const [textFilter, setTextFilter] = useState("");

  const { currentUser } = useSelector((state) => state.userReducer);

  useEffect(() => {
    setQualityFilter("All");
    setTypeFilter("All");
    setRatingFilter(0);
    setGenreFilter([]);
    setTextFilter("");
  }, [currentUser]);

  const handleGenreFilter = (genre) => {
    genreFilter.includes(genre)
      ? setGenreFilter(genreFilter.filter((el) => el !== genre))
      : setGenreFilter([...genreFilter, genre]);
  };

  const typesExtractor = () => {
    let types = [];
    shownMovies.map((el) => {
      if (!types.includes(el.media)) {
        types.push(el.media);
      }
      return null;
    });
    return types;
  };

  const qualityExtractor = () => {
    let qualities = [];
    shownMovies.map((el) => {
      if (!qualities.includes(el.quality) && el.quality !== null) {
        qualities.push(el.quality);
      }
      return null;
    });
    return qualities;
  };

  const genreExtractor = () => {
    const genres = [];
    shownMovies.map((elt) => {
      elt.genre.map((el) => {
        if (!genres.includes(el)) {
          genres.push(el);
        }
        return null;
      });
      return null;
    });
    return genres;
  };

  const resetFilters = () => {
    setQualityFilter("All");
    setTypeFilter("All");
    setRatingFilter(0);
    setGenreFilter([]);
    setTextFilter("");
  };

  return (
    <div className="App">
      {currentPage !== "Login" ? (
        <Heading
          setTextFilter={setTextFilter}
          setShownMovies={setShownMovies}
          typesExtractor={typesExtractor}
          qualityExtractor={qualityExtractor}
          genreExtractor={genreExtractor}
        />
      ) : null}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/movies"
          element={
            currentUser ? (
              <div className="main-content">
                <MovieList
                  typeFilter={typeFilter}
                  qualityFilter={qualityFilter}
                  genreFilter={genreFilter}
                  resetFilters={resetFilters}
                  ratingFilter={ratingFilter}
                  textFilter={textFilter}
                  typesExtractor={typesExtractor}
                  qualityExtractor={qualityExtractor}
                  genreExtractor={genreExtractor}
                  /* Filter props */
                  setTypeFilter={setTypeFilter}
                  setQualityFilter={setQualityFilter}
                  // movies={shownMovies}
                  setRatingFilter={setRatingFilter}
                  // ratingFilter={ratingFilter}
                  modifyGenreFilter={handleGenreFilter}
                  // textFilter={textFilter}
                  // typesExtractor={typesExtractor}
                  // qualityExtractor={qualityExtractor}
                  // genreExtractor={genreExtractor}
                />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route
          path="/profile"
          element={currentUser ? <Profile /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/users"
          element={
            currentUser && currentUser.role === "Admin" ? (
              <UserManagement />
            ) : currentUser ? (
              <Navigate to={"/movies"} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              typesExtractor={typesExtractor}
              qualityExtractor={qualityExtractor}
              genreExtractor={genreExtractor}
              resetFilters={resetFilters}
            />
          }
        />
      </Routes>
      {currentPage !== "Login" ? (
        currentPage !== "Movie" ? (
          <Footer />
        ) : (
          <div style={{ position: "absolute", marginTop: "710px" }}>
            <Footer />
          </div>
        )
      ) : null}
    </div>
  );
}

export default App;
