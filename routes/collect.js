
/**
 * collect.
 */


function clone(x)
{
    if (x.clone)
        return x.clone();
    if (x.constructor == Array)
    {
        var r = [];
        for (var i=0,n=x.length; i<n; i++)
            r.push(clone(x[i]));
        return r;
    }
    return x;
}


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
Sonme scripts
-------------

db.counters.insert({ _id:'questions',next:0})
 
 
 */
