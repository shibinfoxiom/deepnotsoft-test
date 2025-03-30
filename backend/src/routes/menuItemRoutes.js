const express = require('express');
const {
  getAllMenuItems,
  getMenuItemsByMenuId,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuItemController');

const router = express.Router();

router.get('/', getAllMenuItems);
router.get('/menu/:menuId', getMenuItemsByMenuId);
router.get('/:id', getMenuItemById);
router.post('/', createMenuItem);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

module.exports = router;
