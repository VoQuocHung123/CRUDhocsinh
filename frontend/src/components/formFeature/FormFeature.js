import React from "react";
import FormGroup from "../formGroup/FormGroup";
export default function FormFeature(props) {
  const handleAvatar = (e) => {
    props.setErrors({});
    props.setPreviewImage(URL.createObjectURL(e.target.files[0]));
    props.setEditingStudent((prev) => {
      const file = e.target.files[0];
      return { ...prev, avatar: file };
    });
  };
  const handleChange = (e) => {
    props.setErrors({});
    const { name, value } = e.target;
    props.setEditingStudent({ ...props.editingStudent, [name]: value });
  };
  return (
    <>
      <div className={props.visible ? "modal active" : "modal"}>
        <div className="modal-container">
          <form encType="multipart/form-data">
            <span
              style={{
                float: "right",
                color: "white",
                fontWeight: "bold",
                padding: 20,
                cursor: "pointer",
              }}
              className="btn-close"
              onClick={props.onCancel}
            >
              X
            </span>
            <header className="modal-header">{props.title}</header>
            <div className="form-body">
              <FormGroup
                label="FirstName"
                type="text"
                value={props.editingStudent.firstname}
                name="firstname"
                onChange={(e) => handleChange(e)}
                validate={props.errors.firstname}
              ></FormGroup>
              <FormGroup
                label="LastName"
                type="text"
                value={props.editingStudent.lastname}
                name="lastname"
                onChange={(e) => handleChange(e)}
                validate={props.errors.lastname}
              ></FormGroup>
              <FormGroup
                label="Age"
                type="text"
                value={props.editingStudent.age}
                name="age"
                onChange={(event) => {
                  /^-?[\d.]+(?:e-?\d+)?$/.test(event.target.value)
                    ? handleChange(event)
                    : event.preventDefault();
                }}
                validate={props.errors.age}
              ></FormGroup>
              <FormGroup
                label="Class"
                type="text"
                value={props.editingStudent.classname}
                name="classname"
                onChange={(e) => handleChange(e)}
                validate={props.errors.classname}
              ></FormGroup>
              <FormGroup
                label="Avatar"
                accept="image/*"
                type="file"
                name="avatar"
                onChange={(e) => handleAvatar(e)}
                style={{ height: 40, width: 84, display: "block", padding: 5 }}
              ></FormGroup>
              <span
                style={{
                  color: "red",
                  opacity: 0.9,
                  height: 10,
                  display: "inline-block",
                }}
              >
                {props.errors.avatar}
              </span>
              <img
                alt=""
                src={
                  props.previewImage
                    ? props.previewImage
                    : process.env.REACT_APP_API_URL +
                      "/avatar/" +
                      props.editingStudent?.avatar
                }
                style={{ width: 70, display: "block", height: 70 }}
              ></img>
              <button
                type="button"
                className="btn-add-form"
                onClick={props.handleSubmit}
              >
                Xác Nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
