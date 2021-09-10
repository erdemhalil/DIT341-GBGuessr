var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/animalDevelopmentDB';
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

app.get('/api/quiz', function (req, res) {
    res.json({'quiz': 'list of all quizzes'});
  })

app.get('/api/quiz/:id', function (req, res) {
    res.json({'quiz': 'get quiz by id'});
  })

app.post('/api/quiz/:id', function (req, res) {
    res.json({'quiz': 'submit specific quiz on completion by user'});
  })

app.get('/api/quiz/question', function (req, res) {
    res.json({'question': 'list of all questions'});
  })

app.get('/api/quiz/question/:id', function (req, res) {
    res.json({'question': 'get question by id'});
  })

app.get('/api/location', function (req, res) {
    res.json({'location': 'list all locations'});
  })

app.get('/api/location/:id', function (req, res) {
    res.json({'location': 'get location by ud'});
  })

app.get('/api/score/:id', function (req, res) {
    res.json({'score': 'get highscore by id'});
  })

app.get('/api/score', function (req, res) {
    res.json({'score': 'list of all highscores'});
  })

app.post('/api/score', function (req, res) {
    res.json({'score': 'add new score'});
})

app.patch('/api/score', function (req, res) { // If user only can har one score saved
    res.json({'score': 'update user score'});
})

app.post('/api/user/register', function (req, res) {
    res.json({'register': 'create new user'});
  })

app.post('/api/user/login', function (req, res) {
    res.json({'authentication': 'user authentication'});
  })





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
