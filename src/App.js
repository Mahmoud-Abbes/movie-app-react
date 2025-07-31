import { useState } from "react";
import "./App.css";
import Heading from "./components/Heading";
import MovieList from "./components/MovieList";
import { movies } from "./DataBase";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import MoviePage from "./components/MoviePage";
import Footer from "./components/Footer";

function App() {
  const [shownMovies, setShownMovies] = useState(movies);

  const [qualityFilter, setQualityFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [genreFilter, setGenreFilter] = useState([]);
  const [textFilter, setTextFilter] = useState("");

  const [role, setRole] = useState("User");

  const handleGenreFilter = (genre) => {
    genreFilter.includes(genre)
      ? setGenreFilter(genreFilter.filter((el) => el !== genre))
      : setGenreFilter([...genreFilter, genre]);
  };

  const handleDeleteMovie = (id) => {
    setShownMovies(shownMovies.filter((el) => el.id !== id));
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

  const editMovie = (movie) => {
    setShownMovies(shownMovies.map((el) => (el.id === movie.id ? movie : el)));
  };

  const addMovie = (movie) => {
    setShownMovies([...shownMovies, movie]);
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
          path="/"
          element={
            <div>
              <Heading
                setTextFilter={setTextFilter}
                setShownMovies={setShownMovies}
                role={role}
                setRole={setRole}
                typesExtractor={typesExtractor}
                qualityExtractor={qualityExtractor}
                genreExtractor={genreExtractor}
                addMovie={addMovie}
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
            <div>
              <Heading
                setTextFilter={setTextFilter}
                setShownMovies={setShownMovies}
                role={role}
                setRole={setRole}
                typesExtractor={typesExtractor}
                qualityExtractor={qualityExtractor}
                genreExtractor={genreExtractor}
                addMovie={addMovie}
                content={"Movies"}
              />
              <div>
                <div className="main-content">
                  <MovieList
                    movies={shownMovies}
                    typeFilter={typeFilter}
                    qualityFilter={qualityFilter}
                    ratingFilter={ratingFilter}
                    genreFilter={genreFilter}
                    textFilter={textFilter}
                    role={role}
                    deleteMovie={handleDeleteMovie}
                    typesExtractor={typesExtractor}
                    qualityExtractor={qualityExtractor}
                    genreExtractor={genreExtractor}
                    editMovie={editMovie}
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
          }
        />
        <Route
          path="/movie/:id"
          element={
            <div>
              <Heading
                setTextFilter={setTextFilter}
                setShownMovies={setShownMovies}
                role={role}
                setRole={setRole}
                typesExtractor={typesExtractor}
                qualityExtractor={qualityExtractor}
                genreExtractor={genreExtractor}
                addMovie={addMovie}
                content={"Movie"}
              />
              <MoviePage movies={shownMovies} />
              <div style={{ position: "absolute", marginTop: "710px" }}>
                <Footer />
              </div>
            </div>
          }
        ></Route>
      </Routes>

      {/* <div style={{ position: "absolute", marginTop: "700px" }}>
        <Footer />
      </div> */}
    </div>
  );
}

export default App;
