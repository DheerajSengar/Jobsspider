require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var subCategoryRouter = require('./routes/subcategory');
var companyRouter = require('./routes/company');
var statecityRouter = require('./routes/statecity');
var requiredSkillsRouter = require('./routes/requiredskills');
var companyjobsRouter = require('./routes/companyjobs');
var adminRouter = require('./routes/admin');
var userInterfaceRouter = require('./routes/userinterface');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// CORS configuration
const configuredOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const localOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
const hostedFrontendOriginPatterns = [
  /^https:\/\/[^/]+\.vercel\.app$/,
  /^https:\/\/[^/]+\.netlify\.app$/
];
const corsOptions = {
  origin(origin, callback) {
    const isHostedFrontend = hostedFrontendOriginPatterns.some((pattern) => pattern.test(origin));
    if (!origin || localOrigins.includes(origin) || configuredOrigins.includes(origin) || isHostedFrontend) {
      return callback(null, true);
    }
    return callback(new Error(`CORS origin not allowed: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint for Render / monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'JobSpider Backend API', timestamp: new Date().toISOString() });
});

// API routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/subcategory', subCategoryRouter);
app.use('/company', companyRouter);
app.use('/statecity', statecityRouter);
app.use('/requiredskills', requiredSkillsRouter);
app.use('/companyjobs', companyjobsRouter);
app.use('/admin', adminRouter);
app.use('/userinterface', userInterfaceRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  if (req.accepts('json')) {
    res.json({ status: false, message: err.message || 'Internal Server Error' });
  } else {
    res.render('error');
  }
});

module.exports = app;
