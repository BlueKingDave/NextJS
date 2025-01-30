const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');

const app = express();

// Parse incoming JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://davidroyblouin:WGgRT3WhBjaHNkRq@cluster0.xv40w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() =>{
        console.log('successfully connected to MongoDB atlas');
    }) 
    .catch((error) => {
        console.log('unable to connect to mongoDB atlas!');
        console.error(error);
    })

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Simple root route
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the server!');
});

// CREATE a Product
app.post('/api/products', (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock,
  });
  product
    .save()
    .then((savedProduct) => {
      res.status(201).json({ product: savedProduct });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

// READ ALL Products
app.get('/api/products', (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json({ products });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

// READ ONE Product
app.get('/api/products/:id', (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => {
      res.status(200).json({ product });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

// UPDATE a Product
app.put('/api/products/:id', (req, res) => {
  const product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock,
  };
  Product.updateOne({ _id: req.params.id }, product)
    .then(() => {
      res.status(200).json({ message: 'Modified!' });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

// DELETE a Product
app.delete('/api/products/:id', (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: 'Deleted!' });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

module.exports = app;
