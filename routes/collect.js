
/*
 * collect.
 */

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


