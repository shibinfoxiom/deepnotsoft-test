"use client"

import { useState, useEffect } from "react"

const MenuItemForm = ({ menuItem, menus, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    menuId: "",
    // order: 0,
    // isActive: true,
  })

  useEffect(() => {
    if (menuItem) {
      setFormData({
        name: menuItem.name || "",
        description: menuItem.description || "",
        price: menuItem.price || "",
        menuId: menuItem.menuId || "",
        // order: menuItem.order || 0,
        // isActive: menuItem.isActive !== undefined ? menuItem.isActive : true,
      })
    } else if (menus && menus.length > 0) {
      setFormData((prev) => ({
        ...prev,
        menuId: menus[0].id,
      }))
    }
  }, [menuItem, menus])

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
          <h2>{menuItem ? "Edit Menu Item" : "Add New Menu Item"}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="menuId">Menu</label>
            <select id="menuId" name="menuId" value={formData.menuId} onChange={handleChange} required>
              <option value="">Select a menu</option>
              {menus &&
                menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Item Name</label>
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
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="order">Display Order</label>
            <input type="number" id="order" name="order" value={formData.order} onChange={handleChange} />
          </div>
          <div className="form-group checkbox">
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
              {menuItem ? "Update Menu Item" : "Create Menu Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MenuItemForm

