const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all menus
const getAllMenus = async (req, res) => {
  try {
    const menus = await prisma.menu.findMany({
      include: { items: true }
    });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single menu by ID
const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await prisma.menu.findUnique({
      where: { id: parseInt(id) },
      include: { items: true }
    });

    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new menu
const createMenu = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newMenu = await prisma.menu.create({
      data: { name, description }
    });
    res.status(201).json(newMenu);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'A menu with this name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Update a menu
const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedMenu = await prisma.menu.update({
      where: { id: parseInt(id) },
      data: { name, description }
    });
    res.json(updatedMenu);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Delete a menu
const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.menu.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
};
