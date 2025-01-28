const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

const Thing = require('./models/thing');

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
app.post('/api/stuff', (req, res, next) => {
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    })
    thing.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully'
            });
        }
    ).catch(
        (error) =>{
            res.status(400).json({
                error: error
            });
        }
    );
});

app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    );
});


app.put('/api/stuff/:id', (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    Thing.updateOne({_id: req.params.id}, thing).then(
        () => {
            res.status(201).json({
                message: 'thing updated successfully'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    );
});

app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(201).json({
                message: 'thing deleted successfully'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    );
});


// Example route: Handle GET /api/stuff
app.get('/api/stuff', (req, res, next) => {
    Thing.find().then(
        (things) => {
            res.status(200).json(things);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    );
});



// Export the app
module.exports = app;
