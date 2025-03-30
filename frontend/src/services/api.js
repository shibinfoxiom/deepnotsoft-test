const API_URL = 'http://localhost:3000'; // Replace with your actual API URL

// Menu API calls
export const getAllMenus = async () => {
  try {
    const response = await fetch(`${API_URL}/menus`);
    if (!response.ok) {
      throw new Error('Failed to fetch menus');
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getMenuById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/menus/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu');
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const createMenu = async (menuData) => {
  try {
    const response = await fetch(`${API_URL}/menus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(menuData),
    });
    if (!response.ok) {
      throw new Error('Failed to create menu');
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const updateMenu = async (id, menuData) => {
  try {
    const response = await fetch(`${API_URL}/menus/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(menuData),
    });
    if (!response.ok) {
      throw new Error('Failed to update menu');
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const deleteMenu = async (id) => {
  try {
    const response = await fetch(`${API_URL}/menus/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete menu');
    }
    // Some APIs return no content on DELETE
    if (response.status === 204) {
      return { id, success: true };
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Menu Item API calls
export const getAllMenuItems = async () => {
  try {
    const response = await fetch(`${API_URL}/menu-items`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getMenuItemsByMenuId = async (menuId) => {
  try {
    const response = await fetch(`${API_URL}/menu-items/menu/${menuId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getMenuItemById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/menu-items/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu item');
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const createMenuItem = async (menuItemData) => {
  try {
    const response = await fetch(`${API_URL}/menu-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(menuItemData),
    });
    if (!response.ok) {
      throw new Error('Failed to create menu item');
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const updateMenuItem = async (id, menuItemData) => {
  try {
    const response = await fetch(`${API_URL}/menu-items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(menuItemData),
    });
    if (!response.ok) {
      throw new Error('Failed to update menu item');
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const deleteMenuItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/menu-items/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete menu item');
    }
    // Some APIs return no content on DELETE
    if (response.status === 204) {
      return { id, success: true };
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
