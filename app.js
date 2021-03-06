
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , authors = require('./routes/authors')
  , questions = require('./routes/questions')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/authors/names', authors.names);
app.get('/questions/edit', questions.edit);
app.get('/questions/view/:id', questions.view);
app.post('/questions/read/:id', questions.read);
app.post('/questions/add', questions.add);
app.post('/questions/update/:id', questions.update);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

//
// Initializing mongodb
//

var mongo = require('mongodb'),
Server = mongo.Server,
Db = mongo.Db;

db = new Db('questionnaire', new Server('localhost', 27017, {auto_reconnect: true}));

db.open(function(err, db) {
if(!err) {
  console.log("We are connected");
}
});

