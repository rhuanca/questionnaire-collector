
/*
 * collect.
 */



var mongoose = require('mongoose')
, db = mongoose.createConnection('localhost', 'questionnaire');

var Question = new mongoose.Schema({
    question: String
});
exports.list = function(req, res){
	res.render('collect', { data: 'data' });
};

exports.addQuestion = function(req, res){

	var question = new Question({ question: req.body.question });
	
	question.save(function (err){
		if(err)
			console.log("Some error happen");	
	});

	res.send('Question added :'+question.question + ".");
};


