import { useState } from "react";
import "./App.css";
import Heading from "./components/Heading";
import MovieList from "./components/MovieList";
import { movies } from "./DataBase";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import MoviePage from "./components/MoviePage";
import Footer from "./components/Footer";
import { Login } from "./components/Login";

function App() {
  const [shownMovies, setShownMovies] = useState(movies);

  const [qualityFilter, setQualityFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [genreFilter, setGenreFilter] = useState([]);
  const [textFilter, setTextFilter] = useState("");

  const [role, setRole] = useState("Visitor");

  const [userList, setuserList] = useState([
    { email: "admin@gmail.com", password: "adminadmin" },
  ]);

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

  const handleLogin = (email, pass) => {
    console.log(`In the parameters : ${email} pass: ${pass}`);
    if (email === "admin@gmail.com") {
      if (pass === "adminadmin") {
        setRole("Admin");
        return true;
      }
      return false;
    }

    let accountFetch = userList.find((el) => el.email === email);
    if (accountFetch) {
      if (accountFetch.password === pass) {
        setRole("User");
        return true;
      }
      return false;
    }
    return false;
  };

  const handleRegister = (email, pass) => {
    let existsEmail = userList.find((el) => el.email === email);
    if (existsEmail) {
      return false;
    }

    let newUser = {
      email: email,
      password: pass,
    };

    setuserList([...userList, newUser]);
    return true;
  };

  const handleLogout = () => {
    setRole("Visitor");
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <Login handleLogin={handleLogin} handleRegister={handleRegister} />
          }
        />
        <Route
          path="/"
          element={
            <div>
              <Heading
                setTextFilter={setTextFilter}
                setShownMovies={setShownMovies}
                role={role}
                typesExtractor={typesExtractor}
                qualityExtractor={qualityExtractor}
                genreExtractor={genreExtractor}
                addMovie={addMovie}
                content={"Home"}
                handleLogout={handleLogout}
                isLogged={role !== "Visitor"}
              />
              <HomePage />

              <Footer />
            </div>
          }
        ></Route>
        <Route
          path="/movies"
          element={
            role !== "Visitor" ? (
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
                  handleLogout={handleLogout}
                  isLogged={role !== "Visitor"}
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
                role={role}
                setRole={setRole}
                typesExtractor={typesExtractor}
                qualityExtractor={qualityExtractor}
                genreExtractor={genreExtractor}
                addMovie={addMovie}
                content={"Movie"}
                handleLogout={handleLogout}
                isLogged={role !== "Visitor"}
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
