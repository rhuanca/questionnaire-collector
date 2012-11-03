
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Questionnaire Collector', others: [1,3,5,7,9] });
};