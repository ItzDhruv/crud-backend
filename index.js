const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;

const allowedOrigins = [
  'http://localhost:3000',
  'https://frontend-nine-sand-28.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // If you're using cookies or auth headers
}));

const Contact = require('./routes/Contact');

app.use('/api', Contact);
// Connect to MongoDB

require('dotenv').config();

const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

connectToMongoDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

