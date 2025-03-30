"use client"

import { useState, useEffect } from "react"
import {
  getAllMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  getAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../services/api"
import MenuForm from "../components/MenuForm"
import MenuItemForm from "../components/MenuItemForm"

const AdminPage = () => {
  const [menus, setMenus] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [showMenuForm, setShowMenuForm] = useState(false)
  const [showMenuItemForm, setShowMenuItemForm] = useState(false)
  const [currentMenu, setCurrentMenu] = useState(null)
  const [currentMenuItem, setCurrentMenuItem] = useState(null)

  // Fetch menus and menu items
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [menusData, menuItemsData] = await Promise.all([getAllMenus(), getAllMenuItems()])
        setMenus(menusData)
        setMenuItems(menuItemsData)
      } catch (err) {
        setError("Failed to load data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Menu CRUD operations
  const handleAddMenu = () => {
    setCurrentMenu(null)
    setShowMenuForm(true)
  }

  const handleEditMenu = (menu) => {
    setCurrentMenu(menu)
    setShowMenuForm(true)
  }

  const handleDeleteMenu = async (menuId) => {
    if (!window.confirm("Are you sure you want to delete this menu?")) return

    try {
      await deleteMenu(menuId)
      setMenus(menus.filter((menu) => menu.id !== menuId))
    } catch (err) {
      setError("Failed to delete menu")
      console.error(err)
    }
  }

  const handleMenuSubmit = async (formData) => {
    try {
      if (currentMenu) {
        // Update existing menu
        const updatedMenu = await updateMenu(currentMenu.id, formData)
        setMenus(menus.map((menu) => (menu.id === currentMenu.id ? updatedMenu : menu)))
      } else {
        // Create new menu
        const newMenu = await createMenu(formData)
        setMenus([...menus, newMenu])
      }
      setShowMenuForm(false)
    } catch (err) {
      setError("Failed to save menu")
      console.error(err)
    }
  }

  // Menu Item CRUD operations
  const handleAddMenuItem = () => {
    setCurrentMenuItem(null)
    setShowMenuItemForm(true)
  }

  const handleEditMenuItem = (menuItem) => {
    setCurrentMenuItem(menuItem)
    setShowMenuItemForm(true)
  }

  const handleDeleteMenuItem = async (menuItemId) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) return

    try {
      await deleteMenuItem(menuItemId)
      setMenuItems(menuItems.filter((item) => item.id !== menuItemId))
    } catch (err) {
      setError("Failed to delete menu item")
      console.error(err)
    }
  }

  const handleMenuItemSubmit = async (formData) => {
    try {
      if (currentMenuItem) {
        // Update existing menu item
        const updatedMenuItem = await updateMenuItem(currentMenuItem.id, formData)
        setMenuItems(menuItems.map((item) => (item.id === currentMenuItem.id ? updatedMenuItem : item)))
      } else {
        // Create new menu item
        const newMenuItem = await createMenuItem(formData)
        setMenuItems([...menuItems, newMenuItem])
      }
      setShowMenuItemForm(false)
    } catch (err) {
      setError("Failed to save menu item")
      console.error(err)
    }
  }

  // Group menu items by menu
  const menuItemsByMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.menuId]) {
      acc[item.menuId] = []
    }
    acc[item.menuId].push(item)
    return acc
  }, {})

  return (
    <div className="admin-page">
      <h1>Menu Management</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-actions">
        <button className="add-button" onClick={handleAddMenu}>
          Add New Menu
        </button>
        <button className="add-button" onClick={handleAddMenuItem}>
          Add New Menu Item
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="admin-content">
          <div className="menus-section">
            <h2>Menus</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  {/* <th>Order</th> */}
                  {/* <th>Status</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {menus.map((menu) => (
                  <tr key={menu.id}>
                    <td>{menu.name}</td>
                    <td>{menu.description}</td>
                    {/* <td>{menu.order}</td> */}
                    {/* <td>{menu.isActive ? "Active" : "Inactive"}</td> */}
                    <td className="actions">
                      <button className="edit-button" onClick={() => handleEditMenu(menu)}>
                        Edit
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteMenu(menu.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="menu-items-section">
            <h2>Menu Items</h2>
            {menus.map((menu) => (
              <div key={menu.id} className="menu-items-group">
                <h3>{menu.name}</h3>
                {menuItemsByMenu[menu.id] && menuItemsByMenu[menu.id].length > 0 ? (
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        {/* <th>Order</th> */}
                        {/* <th>Status</th> */}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItemsByMenu[menu.id].map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>${Number.parseFloat(item.price).toFixed(2)}</td>
                          {/* <td>{item.order}</td> */}
                          {/* <td>{item.isActive ? "Active" : "Inactive"}</td> */}
                          <td className="actions">
                            <button className="edit-button" onClick={() => handleEditMenuItem(item)}>
                              Edit
                            </button>
                            <button className="delete-button" onClick={() => handleDeleteMenuItem(item.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No items in this menu</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {showMenuForm && (
        <MenuForm menu={currentMenu} onSubmit={handleMenuSubmit} onClose={() => setShowMenuForm(false)} />
      )}

      {showMenuItemForm && (
        <MenuItemForm
          menuItem={currentMenuItem}
          menus={menus}
          onSubmit={handleMenuItemSubmit}
          onClose={() => setShowMenuItemForm(false)}
        />
      )}
    </div>
  )
}

export default AdminPage

