const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import models
const Fruit = require('./fruits');
const Vegetable = require('./vegetables');
const Cart = require('./cart');

const app = express();
let port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'https://fvfullstackfrontend.onrender.com' })); // Allow requests from the React frontend
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse form submissions
app.set('view engine', 'ejs'); // Set EJS as templating engine
app.set('views', path.join(__dirname, 'views')); // Set views directory

// Serve static files (CSS, JS, images) from the dist folder at '/frontend/dist/assets'
app.use('/frontend/dist/assets', express.static(path.join(__dirname, 'frontend', 'dist', 'assets')));

// Serve the React build files (index.html, JS, CSS) from frontend/build
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Routes

// Fetch all fruits
app.get('/api/fruits', async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.json(fruits);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching fruits' });
  }
});

// Fetch all vegetables
app.get('/api/vegetables', async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    res.json(vegetables);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vegetables' });
  }
});

// Add item to cart
app.post('/api/add-to-cart', async (req, res) => {
  const { name, img, price } = req.body;

  try {
    let cartItem = await Cart.findOne({ name });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = new Cart({ name, img, price, quantity: 1 });
      await cartItem.save();
    }

    res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    res.status(500).json({ error: 'Error adding item to cart' });
  }
});

// Render cart page with items
app.get('/cart', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.render('cart.ejs', { cartItems });
  } catch (error) {
    res.status(500).send('Error loading cart');
  }
});

// Delete item from cart
app.get('/delete-cart-item/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.redirect('/cart');
  } catch (error) {
    res.status(500).send('Error deleting item from cart');
  }
});

// Catch-all for handling all other requests (React's routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
