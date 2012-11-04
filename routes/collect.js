
/*
 * collect.
 */

var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;

var db = new Db('questionnaire', new Server('localhost', 27017, {auto_reconnect: true}));

db.open(function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

exports.list = function(req, res){
	res.render('collect', { data: 'data' });
};

exports.addQuestion = function(req, res){

	var question = { 'question': req.body.question };

	db.collection('questions', function(err, collection) {
		collection.insert(question);
	});	
	
	res.send('Question added :'+question.question + ".");
};


