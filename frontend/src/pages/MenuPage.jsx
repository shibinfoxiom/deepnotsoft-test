"use client"

import { useState, useEffect } from "react"
import { getAllMenus, getMenuItemsByMenuId } from "../services/api"

const MenuPage = () => {
  const [menus, setMenus] = useState([])
  const [activeMenu, setActiveMenu] = useState(null)
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = await getAllMenus()
        setMenus(data)
        if (data.length > 0) {
          setActiveMenu(data[0].id)
        }
      } catch (err) {
        setError("Failed to load menus")
        console.error(err)
      }
    }

    fetchMenus()
  }, [])

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!activeMenu) return

      setLoading(true)
      try {
        const data = await getMenuItemsByMenuId(activeMenu)
        setMenuItems(data)
      } catch (err) {
        setError("Failed to load menu items")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [activeMenu])

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId)
  }

  // Group menu items by category
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const category = item.category || "Uncategorized"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(item)
    return acc
  }, {})

  // Add this function to refresh data when the component is focused
  useEffect(() => {
    const refreshData = async () => {
      try {
        const data = await getAllMenus()
        setMenus(data)
        if (activeMenu) {
          const items = await getMenuItemsByMenuId(activeMenu)
          setMenuItems(items)
        }
      } catch (err) {
        setError("Failed to refresh data")
        console.error(err)
      }
    }

    // Initial load
    refreshData()

    // Set up event listener for when the page becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshData()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [activeMenu])

  return (
    <div className="menu-page">
      <div className="menu-hero">
        <h1>MENU</h1>
        <p>
          Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the
          "Order Online" button located below the menu.
        </p>
      </div>

      <div className="menu-categories">
        {menus.map((menu) => (
          <button
            key={menu.id}
            className={`menu-category-button ${activeMenu === menu.id ? "active" : ""}`}
            onClick={() => handleMenuClick(menu.id)}
          >
            {menu.name}
          </button>
        ))}
      </div>

      <div className="menu-content">
        {loading ? (
          <div className="loading">Loading menu items...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          Object.entries(groupedMenuItems).map(([category, items]) => (
            <div key={category} className="menu-section">
              <h2 className="menu-section-title">{category}</h2>
              <div className="menu-items">
                {items.map((item) => (
                  <div key={item.id} className="menu-item">
                    <div className="menu-item-header">
                      <h3 className="menu-item-name">{item.name}</h3>
                      <div className="menu-item-price">${Number.parseFloat(item.price).toFixed(2)}</div>
                    </div>
                    <p className="menu-item-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MenuPage

