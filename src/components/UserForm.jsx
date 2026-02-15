import React, { useState, useEffect } from "react";
import { userFormFields } from "../config/userFormConfig";

const UserForm = ({ onSubmit, selectedUser, clearSelection }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    }
  }, [selectedUser]);

  const validate = () => {
    let newErrors = {};

    userFormFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }

      if (field.pattern && formData[field.name]) {
        if (!field.pattern.test(formData[field.name])) {
          newErrors[field.name] = field.errorMessage;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit(formData);
    setFormData({});
    clearSelection();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>{selectedUser ? "Update User" : "Add User"}</h2>

      {userFormFields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
          />
          {errors[field.name] && (
            <p className="error">{errors[field.name]}</p>
          )}
        </div>
      ))}

      <button type="submit">
        {selectedUser ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default UserForm;
