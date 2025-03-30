const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all menu items
const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: { menu: true }
    });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get menu items by menu ID
const getMenuItemsByMenuId = async (req, res) => {
  try {
    const { menuId } = req.params;
    const menuItems = await prisma.menuItem.findMany({
      where: { menuId: parseInt(menuId) }
    });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single menu item by ID
const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: parseInt(id) },
      include: { menu: true }
    });

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new menu item
const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, menuId } = req.body;
    const newMenuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        menuId: parseInt(menuId)
      }
    });
    res.status(201).json(newMenuItem);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'An item with this name already exists in this menu' });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ message: 'The specified menu does not exist' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Update a menu item
const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, menuId } = req.body;
    const updatedMenuItem = await prisma.menuItem.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price,
        menuId: menuId ? parseInt(menuId) : undefined
      }
    });
    res.json(updatedMenuItem);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Delete a menu item
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.menuItem.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMenuItems,
  getMenuItemsByMenuId,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};
