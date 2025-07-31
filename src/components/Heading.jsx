import { useState } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdLocalMovies, MdOutlineSearch } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import AddMovie from "./Admin/AddMovie";
import { BiMovie } from "react-icons/bi";
import { Link } from "react-router-dom";

const Heading = ({
  setTextFilter,
  role,
  setRole,
  typesExtractor,
  qualityExtractor,
  genreExtractor,
  addMovie,
  content,
}) => {
  const [showAddMovie, setShowAddMovie] = useState(false);
  return (
    <div>
      <Navbar expand="lg" className={`hading-bar ${content === "Movie" ? "movie-heading" :null}`}>
        <AddMovie
          typesExtractor={typesExtractor}
          qualityExtractor={qualityExtractor}
          genreExtractor={genreExtractor}
          show={showAddMovie}
          setShow={setShowAddMovie}
          addMovie={addMovie}
        />
        <Container fluid>
          <Link
            to="/"
            style={{
              width: "20%",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Navbar.Brand id="nav-image">
              <MdLocalMovies style={{marginRight: "15px"}} />
              <span className="nav-title">
                {content !== "Home" ? "MOVIES FOR ALL" : null}
              </span>
            </Navbar.Brand>
          </Link>

          <Form className="d-flex" id="search-bar">
            {content === "Movies" ? (
              <>
                <Button id="search-btn">
                  <MdOutlineSearch />
                </Button>
                <Form.Control
                  type="search"
                  placeholder="Enter keywords"
                  className="me-2"
                  aria-label="Search"
                  id="search-input"
                  onChange={(e) => setTextFilter(e.target.value)}
                />
              </>
            ) : null}
          </Form>

          <div className="nav-icons" style={{ width: "20%" }}>
            <div className="nav-icons-functionality-icon">
              <Link to="/movies">
                <BiMovie className="nav-icon" />
              </Link>

              {role === "Admin" && content !== "Home" ? (
                <div>
                  <FaPlus
                    className="nav-icon"
                    onClick={() => setShowAddMovie(true)}
                  />
                </div>
              ) : null}
            </div>
            <div className="nav-icons-user-icon">
              {role === "Admin" ? (
                <RiAdminLine
                  className="nav-icon"
                  onClick={() => setRole("User")}
                />
              ) : (
                <AiOutlineUser
                  className="nav-icon"
                  onClick={() => setRole("Admin")}
                />
              )}
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default Heading;
