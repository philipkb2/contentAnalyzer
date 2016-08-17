var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
// LOGIN
var config = require('./config');
var UserCtrl = require('./controllers/userCtrl.js');
var passport = require('./services/passport');
// ANALYSIS
var indicoCtrl = require('./controllers/indicoCtrl.js');
var ibmAlCtrl = require('./controllers/ibmAL-Ctrl.js');
var toneAnalyzerCtrl = require('./controllers/ibmTA-Ctrl.js');
var ibmPICtrl = require('./controllers/ibmPI-Ctrl.js');
var keys = require('./keys.js');


var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

var app = express();
app.use(express.static(__dirname + '/public')); // Things in the public folder are hosted by Express
app.use(bodyParser.json());

// ======== ANALYSIS APIs ========
// app.post('/api/getIndicoMultiText', indicoCtrl.GetIndicoMultiText);
app.post('/api/getAlchemyCombined', ibmAlCtrl.GetAlchemyCombined);
// app.get('/api/getAlchemySentiment', ibmAlCtrl.GetAlchemySentiment);
// app.get('/api/getAlchemyEmotions', ibmAlCtrl.GetAlchemyEmotions);
// app.get('/api/getToneAnalyzer', toneAnalyzerCtrl.GetToneAnalyzer);
// app.get('/api/getPersonalityInsights', ibmPICtrl.GetPersonalityInsights);
	// app.get('/api/getIndicoPersonaText', indicoCtrl.GetIndicoPersonaText);

// app.post('/api/createIndicoMultiText', indicoCtrl.CreateIndicoMultiText);
// app.post('/api/createAlchemyCombined', ibmAlCtrl.CreateAlchemyCombined);
// app.post('/api/createAlchemySentiment', ibmAlCtrl.CreateAlchemySentiment);
// app.post('/api/createAlchemyEmotions', ibmAlCtrl.CreateAlchemyEmotions);
// app.post('/api/createToneAnalyzer', toneAnalyzerCtrl.CreateToneAnalyzer);
// app.post('/api/createPersonalityInsights', ibmPICtrl.CreatePersonalityInsights);
	// app.post('/api/createIndicoPersonaText', indicoCtrl.CreateIndicoPersonaText);

// ======== PASSPORT ========
app.use(session({
	secret: config.SESSION_SECRET,
	saveUninitialized: false,
	resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/users', UserCtrl.register);
app.get('/me', isAuthed, UserCtrl.me);
app.put('/users/:_id', isAuthed, UserCtrl.update);

app.post('/login', passport.authenticate('local', {
	successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
	req.logout();
	return res.status(200).send('logged out');
});

// ======== MONGO ========

var mongoURI = config.MONGO_URI;
var port = config.PORT;

mongoose.connect(mongoURI);
mongoose.connection.once('open', function(){
    console.log('Connected to MongoDB at', mongoURI);
    app.listen(port, function(){
    	console.log('Listening on port ' + port);
    });
});
