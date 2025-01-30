const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');


// Middleware for parsing JSON
app.use(express.json());

mongoose.connect('mongodb+srv://davidroyblouin:WGgRT3WhBjaHNkRq@cluster0.xv40w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() =>{
        console.log('successfully connected to MongoDB atlas');
    }) 
    .catch((error) => {
        console.log('unable to connect to mongoDB atlas!');
        console.error(error);
    })

// Set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Root route to handle GET /
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the server!');
});

// Example route: Handle POST requests

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);

app.use('/api/auth', userRoutes)


// Export the app
module.exports = app;
