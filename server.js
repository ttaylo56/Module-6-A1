const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = express();
app.use(express.json());

// Connect to the MongoDB database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB Atlas: ${mongoose.connection.name}`);
});

mongoose.connection.on('error', (err) => {
    console.error(`Error connecting to MongoDB Atlas: ${err.message}`);
});

// Use the routes defined in the routes.js file
const accountRoutes = require('./routes/accountRoutes');
app.use('/', accountRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to my bank API');
  });

// Start the Express server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
