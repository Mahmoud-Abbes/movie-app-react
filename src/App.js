import { useState } from "react";
import "./App.css";
import Heading from "./components/Heading";
import MovieList from "./components/MovieList";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import MoviePage from "./components/MoviePage";
import Footer from "./components/Footer";
import { Login } from "./components/Login";
import { useSelector } from "react-redux";

function App() {
  const { movies } = useSelector((state) => state.reducer);
  const [shownMovies, setShownMovies] = useState(movies);

  const [qualityFilter, setQualityFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [genreFilter, setGenreFilter] = useState([]);
  const [textFilter, setTextFilter] = useState("");

  const { currentUser } = useSelector(state => state.userReducer)


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
      <Routes>
        <Route
          path="/login"
          element={
            <Login />
          }
        />
        <Route
          path="/"
          element={
            <div>
              <Heading
                setTextFilter={setTextFilter}
                typesExtractor={typesExtractor}
                qualityExtractor={qualityExtractor}
                genreExtractor={genreExtractor}
                content={"Home"}
              />
              <HomePage />
              <Footer />
            </div>
          }
        ></Route>
        <Route
          path="/movies"
          element={
            currentUser ? (
              <div>
                <Heading
                  setTextFilter={setTextFilter}
                  setShownMovies={setShownMovies}
                  typesExtractor={typesExtractor}
                  qualityExtractor={qualityExtractor}
                  genreExtractor={genreExtractor}
                  content={"Movies"}
                />
                <div>
                  <div className="main-content">
                    <MovieList
                      typeFilter={typeFilter}
                      qualityFilter={qualityFilter}
                      ratingFilter={ratingFilter}
                      genreFilter={genreFilter}
                      textFilter={textFilter}
                      // role={role}
                      typesExtractor={typesExtractor}
                      qualityExtractor={qualityExtractor}
                      genreExtractor={genreExtractor}
                      resetFilters={resetFilters}
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
                </div>
                <Footer />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/movie/:id"
          element={
            <div>
              <Heading
                setTextFilter={setTextFilter}
                setShownMovies={setShownMovies}
                typesExtractor={typesExtractor}
                qualityExtractor={qualityExtractor}
                genreExtractor={genreExtractor}
                content={"Movie"}
              />
              <MoviePage />
              <div style={{ position: "absolute", marginTop: "710px" }}>
                <Footer />
              </div>
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
