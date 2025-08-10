import { useState } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdLocalMovies, MdOutlineSearch } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import AddMovie from "./Admin/AddMovie";
import { BiMovie } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { IoMdLogIn } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions";

const Heading = ({
  setTextFilter,
  typesExtractor,
  qualityExtractor,
  genreExtractor,
  content,
}) => {
  const [showAddMovie, setShowAddMovie] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userReducer);
  return (
    <div>
      <Navbar
        expand="lg"
        className={`hading-bar ${content === "Movie" ? "movie-heading" : null}`}
      >
        <AddMovie
          typesExtractor={typesExtractor}
          qualityExtractor={qualityExtractor}
          genreExtractor={genreExtractor}
          show={showAddMovie}
          setShow={setShowAddMovie}
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
              <MdLocalMovies style={{ marginRight: "15px" }} />
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
              <div></div>

              {currentUser && currentUser.role === "Admin" && content !== "Home" ? (
                <div>
                  <FaPlus
                    className="nav-icon"
                    onClick={() => setShowAddMovie(true)}
                  />
                </div>
              ) : content !== "Movies" ? (
                currentUser ? (
                  <Link to="/movies">
                    <BiMovie className="nav-icon" />
                  </Link>
                ) : null
              ) : null}
            </div>
            <div className="nav-icons-user-icon">
              {currentUser ? (
                currentUser.role === "Admin" ? (
                  <RiAdminLine className="nav-icon" />
                ) : (
                  <AiOutlineUser className="nav-icon" />
                )
              ) : (
                <Link to="/movies">
                  <BiMovie className="nav-icon" />
                </Link>
              )}

              {currentUser ? (
                <CiLogout
                  className="nav-icon"
                  onClick={() => dispatch(logout())}
                />
              ) : (
                <Link to={"/login"}>
                  <IoMdLogIn className="nav-icon" />
                </Link>
              )}
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default Heading;
