import React from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
const Contact = ({
  contacts,
  opacity,
  url,
  reload,
  setReload,
  showModelCode,
  id,
  setId,
}) => {
  let blur = opacity ? 0.2 : 1;

  const deleetContact = async (id) => {
    let deletedata = await axios.delete(
      `${url}/${id}`,

      {
        headers: { "Content-Type": "application/json" },
      }
    );
    toast.success(deletedata.data.msg, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setReload(!reload);
  };

  return (
    <>
      <div
        className="container my-5"
        style={{ width: "650px", opacity: `${blur}` }}
      >
        {contacts.map((data) => (
          <>
            <div
              className="bg-black p-3 my-3"
              style={{
                border: "3px solid yellow",
                borderRadius: "10px",

                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div key={data._id} className="item">
                <h3>
                  {" "}
                  <i class="fa-solid fa-person"></i> {data.name}
                </h3>

                <h3>
                  <i class="fa-solid fa-envelope"></i> {data.gmail}
                </h3>
                <h3>
                  <i class="fa-solid fa-phone"></i> {data.phone}
                </h3>
              </div>
              <div style={{ gap: "10px", margin: "5px" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setId(data._id);
                    showModelCode();
                  }}
                >
                  Edit
                </button>
                <br />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleetContact(data._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Contact;
