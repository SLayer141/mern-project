import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
const AddContact = ({
  showModelCode,
  showmodal,
  url,
  reload,
  contacts,
  setReload,
  id,
  setId,
}) => {
  const [name, setName] = useState("");
  const [gmail, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (id) {
      for (let i = 0; i < contacts.length; i++) {
        if (id == contacts[i]._id) {
          setName(contacts[i].name);
          setEmail(contacts[i].gmail);
          setPhone(contacts[i].phone);
          break;
        }
      }
    }
  }, [id]);
  const formSubmit = async (e) => {
    e.preventDefault();
    showModelCode();
    if (id) {
      let fetchdata = await axios.put(
        `${url}/${id}`,
        { name, gmail, phone },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(fetchdata.data.msg, {
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
    } else {
      let fetchdata = await axios.post(
        `${url}/`,
        { name, gmail, phone },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(fetchdata.data.msg, {
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
    }
    setReload(!reload);
    setName("");
    setEmail("");
    setPhone("");
    setId("");
  };
  return (
    <>
      <div className="container  mt-5" style={{ width: "200px" }}>
        <button className="btn btn-primary" onClick={showModelCode}>
          Add contact
        </button>
        {showmodal && (
          <div
            className="modal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog" role="document">
              <div
                className="modal-content bg-dark p-3"
                style={{ border: "2px solid yellow" }}
              >
                <div className="modal-header ">
                  <h3>{id ? "Edit contact" : "Add contact"}</h3>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={formSubmit}>
                    <div class="mb-3">
                      <label htmlFor="exampleInputEmail1" class="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label HtmlFor="exampleInputEmail1" class="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={gmail}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label HtmlFor="exampleInputPassword1" class="form-label">
                        phone
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        required
                      />
                    </div>
                    {id ? (
                      <button type="submit" class="btn btn-success m-5">
                        Edit contact
                      </button>
                    ) : (
                      <button type="submit" class="btn btn-primary m-5">
                        Add contact
                      </button>
                    )}

                    <button
                      type="submit"
                      class="btn btn-danger"
                      onClick={showModelCode}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddContact;
