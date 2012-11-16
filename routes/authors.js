exports.names = function(req, res) {
	var authors = db.collection("authors");
	var names = [];
	
	authors.find().toArray(function (err, docs){
		console.log("entro....");
		for(var i=0; i<docs.length; i++)
			names[i] = docs[i].name;
		console.log(names);
		res.send(names);
	});
};
