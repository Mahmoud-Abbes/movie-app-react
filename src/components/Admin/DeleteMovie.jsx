import { Button, Modal } from "react-bootstrap";
import { IoIosWarning } from "react-icons/io";

const DeleteMovie = ({ show, setShow, el, deleteMovie }) => {
  return (
    <div
      className="modal show"
    >
      <Modal show={show} style={{marginTop: "150px"}} >
        <Modal.Header
          closeButton
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "right",
            borderBottomColor: "transparent",
            marginLeft: "430px",
            marginTop: "7px",
            zIndex: "1"
          }}
          onHide={() => setShow(false)}
        ></Modal.Header>
        <Modal.Body
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "70px",
              width: "70px",
              backgroundColor: "#fff5f6",
              borderRadius: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <IoIosWarning style={{fontSize: "40px", color: "#ff3f56"}}/>
          </div>
          <span className="delete-movie-title">Delete Movie</span>
          <span className="delete-movie-description">You're going to delete the "{el.name}" movie. Are you sure ?</span>
        </Modal.Body>
        <Modal.Footer style={{
            display: "flex",
            justifyContent: "center",
            borderTopColor: "transparent"
        }}>
          <Button variant="secondary" className="delte-btns cancle-delete-btn" onClick={() => setShow(false)}>
            No, keep it.
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteMovie(el.id);
              setShow(false);
            }}
            className="delte-btns confirm-delete-btn"
          >
            Yes, Delete!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteMovie;
