
/**
 * collect.
 */

exports.list = function(req, res){
	res.render('collect', { data: 'data' });
};

exports.addQuestion = function(req, res){
	
	console.log("About to create a question");
	
	var question = { 'question': req.body };

	db.collection('questions', function(err, collection) {
		collection.insert(question);
	});	
	
	res.send('Question added :'+question + ".");
};


