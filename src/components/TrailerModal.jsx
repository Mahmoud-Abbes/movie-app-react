import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { GrClose } from "react-icons/gr";

const TrailerModal = ({ show, setShow, link }) => {
  const [showCloseBtn, setShowCloseBtn] = useState(false);
  return (
    <div>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        size="lg"
        onHide={() => setShow(false)}
        className="trailer-modal"
        onMouseOver={() => setShowCloseBtn(true)}
        onMouseOut={() => setShowCloseBtn(false)}
      >
        <div onMouseOver={() => setShowCloseBtn(true)}>
          <Modal.Header
            style={{
              borderColor: "transparent",
              position: "absolute",
              zIndex: "300",
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div></div>
              <Button
                className={`trailer-close-btn ${
                  showCloseBtn
                    ? "trailer-close-btn-shown"
                    : "trailer-close-btn-hidden"
                }`}
                onClick={() => setShow(false)}
              >
                <GrClose />
              </Button>
            </div>
          </Modal.Header>
          <Modal.Body style={{ padding: "0px", marginBottom: "-7px" }}>
            <iframe
              style={{ width: "100%", height: "500px", borderRadius: "15px" }}
              src={link}
              title="YouTube video player"
              allowFullScreen={true}
              // onMouseOver={() => setShowCloseBtn(true)}
              // onMouseOut={() => setShowCloseBtn(false)}
            ></iframe>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default TrailerModal;
