import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import ReactStars from "react-stars";
import { addMovie } from "../../redux/actions";

const AddMovie = ({
  show,
  setShow,
  typesExtractor,
  qualityExtractor,
  genreExtractor,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [trailerLink, setTrailerLink] = useState("");
  const [rating, setRating] = useState("");

  /* Media Handeling */
  const [media, setMedia] = useState("");
  const [newMedia, setNewMedia] = useState("");

  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");

  /* Quality Handeling */
  const [quality, setQuality] = useState("");
  const [newQuality, setNewQuality] = useState("");

  /* Genre Handeling */
  const [genres, setGenres] = useState([]);
  const [newGenre, setnewGenre] = useState("");
  const [checkedGenres, setCheckedGenres] = useState([]);

  /* Cancleing handeling */
  const handleClose = () => {
    setName("")
    setMedia("")
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newMovie = {
      id: Math.random(),
      name: name.trim(),
      genre: genres,
      trailerLink: trailerLink.trim(),
      rating: rating,
      media: media,
      imageURL: imageURL.trim(),
      description: description.trim(),
      quality: quality,
    };

    if (
      name.trim() !== "" &&
      description.trim() !== "" &&
      trailerLink.trim() !== "" &&
      imageURL.trim() !== ""
    ) {
      dispatch(addMovie(newMovie));
      setnewGenre("");
      setNewMedia("");
      setNewQuality("");
      setShow(false);
    }
  };

  const handleNewMedia = (value) => {
    setNewMedia(value);
    if (value.trim() !== "") {
      setMedia(value.trim());
    }
  };

  const handleNewQuality = (value) => {
    setNewQuality(value);
    if (value.trim() !== "") {
      setQuality(value.trim());
    }
  };

  const handleNewGenre = (genre) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((el) => el !== genre));
      setCheckedGenres(checkedGenres.filter((el) => el !== genre));
    } else {
      setGenres([...genres, genre]);
      setCheckedGenres([...checkedGenres, genre]);
    }
  };

  const handleNewGenres = (value) => {
    setnewGenre(value);
    let newGenres = [];
    if (value.trim() !== "") {
      if (value.includes(",")) {
        console.log("yes it actually does includes taht");
        newGenres = value
          .split(",")
          .map((el) => el.trim())
          .filter((el) => el !== "");
        setGenres([...checkedGenres, ...newGenres]);
      } else {
        console.log("NO what is taht");
        newGenres = [value];
        if (value.length > 1) {
          setGenres(
            genres.map((el, index) =>
              index === genres.length - 1 ? value : el
            )
          );
        } else {
          setGenres([...genres, ...newGenres]);
        }
      }
    }
    // else {
    //   setGenres(el.genre);
    // }
  };

  return (
    <Modal size="xl" show={show} onHide={() => handleClose()}>
      <Modal.Header closeButton style={{ marginBottom: "0px" }}>
        <Modal.Title>Edit Movie</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ paddingTop: "0px", padding: "0px" }}>
        <Form onSubmit={handleSubmit}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%", padding: "15px" }}>
              <Form.Group className="mb-3 form-group">
                <Form.Label className="edit-form-label">Name</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 form-group">
                <label className="edit-form-label edit-movie-rating-label">
                  Rating
                </label>
                <div className="form-control">
                  <ReactStars
                    count={5}
                    onChange={(e) => setRating(e)}
                    size={24}
                    value={rating}
                    color2={"#ffd700"}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3 form-group">
                <Form.Label className="edit-form-label">Description</Form.Label>
                <Form.Control
                  className="form-control"
                  value={description}
                  as="textarea"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>

              {/* ------------------------------ Media handeling ------------------------------*/}

              <div>
                <Form.Label
                  className="edit-form-label"
                  style={{
                    marginBottom: "2px",
                    fontWeight: "600",
                    fontSize: "17px",
                  }}
                >
                  Media Type
                </Form.Label>
                <hr
                  style={{
                    margin: "0px 0px 15px 0px",
                    width: "40%",
                    borderWidth: "3px",
                    borderRadius: "35px",
                  }}
                />
              </div>

              <Form.Group className="mb-3 form-group">
                <Form.Label className="edit-form-label">
                  Add new media type
                </Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  autoFocus
                  placeholder="Short Film,Anime..."
                  value={newMedia}
                  onChange={(e) => {
                    handleNewMedia(e.target.value);
                  }}
                  name="Type"
                />
              </Form.Group>

              <Form.Group className="mb-3 form-group">
                <Form.Label className="edit-form-label">
                  Select from existing...
                </Form.Label>
                <div
                  style={{ display: "flex", flexWrap: "wrap", padding: "10px" }}
                  className="form-control"
                >
                  {typesExtractor().map((el, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        marginLeft: "-10px",
                        marginRight: "20px",
                        width: "40%",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {i === 0 ? (
                          <input
                            type="radio"
                            name="Type"
                            className="radio-input"
                            value={el}
                            disabled={newMedia.trim() !== "" ? true : false}
                            defaultChecked
                            onChange={(e) => setMedia(e.target.value)}
                          />
                        ) : (
                          <input
                            type="radio"
                            name="Type"
                            className="radio-input"
                            value={el}
                            disabled={newMedia.trim() !== "" ? true : false}
                            onChange={(e) => setMedia(e.target.value)}
                          />
                        )}
                      </div>
                      <span className="radio-input-title">{el}</span>
                    </div>
                  ))}
                </div>
              </Form.Group>

              {/* ------------------------------ Quality handeling ------------------------------*/}

              <div>
                <Form.Label
                  className="edit-form-label"
                  style={{
                    marginBottom: "2px",
                    fontWeight: "600",
                    fontSize: "17px",
                  }}
                >
                  Quality
                </Form.Label>
                <hr
                  style={{
                    margin: "0px 0px 15px 0px",
                    width: "40%",
                    borderWidth: "3px",
                    borderRadius: "35px",
                  }}
                />
              </div>

              <Form.Group className="mb-3 form-group">
                <Form.Label className="edit-form-label">
                  Add new quality
                </Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  autoFocus
                  placeholder="BlueRay,TVRip..."
                  value={newQuality}
                  onChange={(e) => {
                    handleNewQuality(e.target.value);
                  }}
                  name="Type"
                />
              </Form.Group>

              <Form.Group className="mb-3 form-group">
                <Form.Label className="edit-form-label">
                  Select from existing...
                </Form.Label>
                <div
                  style={{ display: "flex", flexWrap: "wrap", padding: "10px" }}
                  className="form-control"
                >
                  {qualityExtractor().map((el, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        marginLeft: "-10px",
                        marginRight: "20px",
                        width: "40%",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {i === 0 ? (
                          <input
                            type="radio"
                            name="quality"
                            className="radio-input"
                            value={el}
                            defaultChecked
                            disabled={newQuality.trim() !== "" ? true : false}
                            checked={newQuality.trim() === "" ? true : false}
                            onClick={(e) => setQuality(e.target.value)}
                          />
                        ) : (
                          <input
                            type="radio"
                            name="quality"
                            className="radio-input"
                            value={el}
                            disabled={newQuality.trim() !== "" ? true : false}
                            onClick={(e) => setQuality(e.target.value)}
                          />
                        )}
                      </div>
                      <span className="radio-input-title">{el}</span>
                    </div>
                  ))}
                </div>
              </Form.Group>
            </div>
            <div className="dividor-bar"></div>

            {/* ------------------------------ Image handeling ------------------------------*/}

            <div style={{ width: "50%" }}>
              <div style={{ padding: "15px" }}>
                <Form.Group className="mb-3 form-group">
                  <div
                    style={{
                      width: "80%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Form.Label style={{ fontFamily: "Inter" }}>
                      Image
                    </Form.Label>
                    <Form.Control
                      value={imageURL}
                      as="textarea"
                      rows={5}
                      className="edit-image-input"
                      onChange={(e) => setImageURL(e.target.value)}
                      required
                    />
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "left",
                    }}
                    className="edit-image-holder"
                  >
                    <img
                      className="edit-image"
                      src={imageURL}
                      alt="Invalid Link"
                    />
                  </div>
                </Form.Group>
              </div>
              <hr
                style={{
                  borderColor: "#a9acb0ff",
                  margin: "-15px 0px 0px 0px",
                }}
              />

              {/* ------------------------------ Trailer handeling ------------------------------*/}

              <div style={{ padding: "15px" }}>
                <Form.Group className="mb-3 form-group">
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Form.Label style={{ fontFamily: "Inter" }}>
                      Trailer
                    </Form.Label>
                    <Form.Control
                      value={trailerLink}
                      as="textarea"
                      rows={5}
                      className="edit-trailer-input"
                      onChange={(e) => setTrailerLink(e.target.value)}
                      required
                    />
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "left",
                    }}
                    className="edit-image-holder"
                  >
                    <iframe
                      className="edit-trailer-video"
                      src={trailerLink}
                      title="YouTube video player"
                    ></iframe>
                  </div>
                </Form.Group>
              </div>
              <hr
                style={{
                  borderColor: "#a9acb0ff",
                  margin: "-85px 0px 0px 0px",
                }}
              />

              {/* ------------------------------ Genre handeling ------------------------------*/}

              <div
                style={{
                  padding: "15px",
                  display: "flex",
                }}
              >
                <Form.Group className="mb-3" style={{ width: "50%" }}>
                  <Form.Label className="edit-form-label">
                    Add Genres
                  </Form.Label>
                  <Form.Control
                    className="genre-form-control"
                    type="text"
                    autoFocus
                    value={newGenre}
                    onChange={(e) => handleNewGenres(e.target.value)}
                    placeholder={`Genres seperated by ","`}
                  />
                </Form.Group>

                <Form.Group className="mb-3" style={{ width: "50%" }}>
                  <Form.Label className="edit-form-label">
                    Select from existing...
                  </Form.Label>
                  <div className="genre-form-control form-control genre-form-control-list">
                    {genreExtractor().map((el, i) => (
                      <div key={i}>
                        {
                          <input
                            type="checkbox"
                            name="genre"
                            className="genre-input"
                            value={el}
                            style={{ marginRight: "10px" }}
                            onClick={(e) => handleNewGenre(e.target.value)}
                          />
                        }
                        <label className="genre-label">{el}</label>
                      </div>
                    ))}
                  </div>
                </Form.Group>
              </div>
            </div>
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddMovie;
