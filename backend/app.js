const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const cors = require('cors');
var express = require('express');
var pathLib = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoURI = process.env.MONGO_URI;
console.log('🔍 MONGO_URI:', mongoURI);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');

var app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(pathLib.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);

// Health check route
app.get('/test', (req, res) => {
  res.send('Backend is working!');
});

module.exports = app;
