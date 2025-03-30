"use client"

import { useState, useEffect } from "react"

const MenuForm = ({ menu, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    // order: 0,
    // isActive: true,
  })

  useEffect(() => {
    if (menu) {
      setFormData({
        name: menu.name || "",
        description: menu.description || "",
        // order: menu.order || 0,
        // isActive: menu.isActive !== undefined ? menu.isActive : true,
      })
    }
  }, [menu])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{menu ? "Edit Menu" : "Add New Menu"}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Menu Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
          {/* <div className="form-group">
            <label htmlFor="order">Display Order</label>
            <input type="number" id="order" name="order" value={formData.order} onChange={handleChange} />
          </div> */}
          {/* <div className="form-group checkbox">
            <label>
              <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
              Active
            </label>
          </div> */}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {menu ? "Update Menu" : "Create Menu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MenuForm

