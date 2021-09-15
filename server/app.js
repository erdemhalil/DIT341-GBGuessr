var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb+srv://webproject:gettingvg12@cluster0.vsylh.mongodb.net/group31?retryWrites=true&w=majority';
var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
  if (err) {
    console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
    console.error(err.stack);
    process.exit(1);
  }
  console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.options('*', cors());
app.use(cors());

app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT341 backend ExpressJS project!'});
});
app.use('/api/users', require('./controllers/user'))
app.use('/api/locations', require('./controllers/location'))
app.use('/api/quizes', require('./controllers/quiz'))
app.use('/api/questions', require('./controllers/question'))
app.use('/api/scores', require('./controllers/score'))

app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});



app.use(history());

var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

var env = app.get('env');
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
