const API_URL = "http://localhost:3000/api" // Put back the original API URL with /api

// Menu API calls
export const getAllMenus = async () => {
  const response = await fetch(`${API_URL}/menus`)
  if (!response.ok) {
    throw new Error("Failed to fetch menus")
  }
  return response.json()
}

export const getMenuById = async (id) => {
  const response = await fetch(`${API_URL}/menus/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch menu")
  }
  return response.json()
}

export const createMenu = async (menuData) => {
  const response = await fetch(`${API_URL}/menus`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuData),
  })
  if (!response.ok) {
    throw new Error("Failed to create menu")
  }
  return response.json()
}

export const updateMenu = async (id, menuData) => {
  const response = await fetch(`${API_URL}/menus/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuData),
  })
  if (!response.ok) {
    throw new Error("Failed to update menu")
  }
  return response.json()
}

export const deleteMenu = async (id) => {
  const response = await fetch(`${API_URL}/menus/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete menu")
  }
  // Return the id for successful delete operations
  return { id, success: true }
}

// Menu Item API calls
export const getAllMenuItems = async () => {
  const response = await fetch(`${API_URL}/menu-items`)
  if (!response.ok) {
    throw new Error("Failed to fetch menu items")
  }
  return response.json()
}

export const getMenuItemsByMenuId = async (menuId) => {
  const response = await fetch(`${API_URL}/menu-items/menu/${menuId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch menu items")
  }
  return response.json()
}

export const getMenuItemById = async (id) => {
  const response = await fetch(`${API_URL}/menu-items/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch menu item")
  }
  return response.json()
}

export const createMenuItem = async (menuItemData) => {
  const response = await fetch(`${API_URL}/menu-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuItemData),
  })
  if (!response.ok) {
    throw new Error("Failed to create menu item")
  }
  return response.json()
}

export const updateMenuItem = async (id, menuItemData) => {
  const response = await fetch(`${API_URL}/menu-items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuItemData),
  })
  if (!response.ok) {
    throw new Error("Failed to update menu item")
  }
  return response.json()
}

export const deleteMenuItem = async (id) => {
  const response = await fetch(`${API_URL}/menu-items/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete menu item")
  }
  // Return the id for successful delete operations
  return { id, success: true }
}
