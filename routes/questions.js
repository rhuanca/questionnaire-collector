
/**
 * collect.
 */

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
		db.collection('questions', function(err, collection) {
			collection.insert(question);
		});
		res.send(question);
	});
};

exports.update = function(req, res){
	var question = req.body;
	var questions = db.collection("questions");
	questions.update({'_id': req.params.id}, {'$set':question});
	res.send(question);
};

/*
Some scripts
-------------
db.counters.insert({ _id:'questions',next:0})
supervisor app.js 
*/
