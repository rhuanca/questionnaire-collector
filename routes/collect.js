
/**
 * collect.
 */

exports.list = function(req, res){
	res.render('collect', { data: 'data' });
};

exports.addQuestion = function(req, res){
	var question = req.body;
	var counters = db.collection("counters");
	counters.findAndModify( {'_id':'questions'},[], {'$inc': { 'next': 1 }}, function(err,doc) {
		if(err) {
			console.log("Some error happened " + err);
			return;
		}
		var questionId = doc.next;
		console.log("next question id = " + questionId);
		question._id = questionId;
		db.collection('questions', function(err, collection) {
			if(err) {
				console.log("Some error happened " + err);
				return;
			}
			collection.insert(question);
		});
		res.send(question);
	});
};


/*
Some scripts
-------------
db.counters.insert({ _id:'questions',next:0})
supervisor app.js 
*/
