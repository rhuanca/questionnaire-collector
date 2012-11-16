
/**
 * collect.
 */

function storeAuthor(authorName){
	db.collection('authors').findOne({'name': authorName}, function(err, doc) {
		if(doc == null) {
			console.log("Creating new author" + authorName);
			db.collection('authors').insert({name:authorName});
		}
	});
}

exports.edit = function(req, res){
	res.render('question-edit', { data: 'data' });
};

exports.add = function(req, res){
	var question = req.body;
	var counters = db.collection("counters");
	
	counters.findAndModify( {'_id':'questions'},[], {'$inc': { 'next': 1 }}, function(err,doc) {
		var questionId = doc.next;
		console.log("next question id = " + questionId);
		question._id = questionId;
		
		var questions = db.collection('questions');
		questions.insert(question);
		
		storeAuthor(question.questionAuthor);
		
		res.send(question);
	});
};

exports.update = function(req, res){
	var question = req.body;
	var questions = db.collection("questions");
	console.log("to update = " + req.params.id);
	questions.update({'_id': parseInt(req.params.id, 10)}, question);
	
	storeAuthor(question.questionAuthor);
	
	questions.findOne({'_id': parseInt(req.params.id, 10)}, {}, function(err, doc){
		res.send(question);
	});
};

/*
Some scripts
-------------
db.counters.insert({ _id:'questions',next:0})
db.createCollection("authors");
db.authors.insert({name:'renan',cookie:''});

supervisor app.js 
*/

//var author = authors.findOne({'name': authorName});