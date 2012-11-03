
/*
 * collect.
 */

exports.list = function(req, res){
	res.render('collect', { data: 'data' });
};

exports.addQuestion = function(req, res){
	//res.render('collect', { data: 'data' });
	res.send('hello again');
};


