
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const menuRoutes = require('./src/routes/menuRoutes');
const menuItemRoutes = require('./src/routes/menuItemRoutes');
const path = require('path')
const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

app.use('/api/menus', menuRoutes);
app.use('/api/menu-items', menuItemRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
  }
  


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

