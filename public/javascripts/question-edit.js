function showTextAnswer(){
	$("#answerMultipleChoiseTypeDiv").hide();
	$("#answerTextTypeDiv").show();
}

function showMultipleChoiseAnswer(){
	$("#answerTextTypeDiv").hide();
	$("#answerMultipleChoiseTypeDiv").show();
	if($("#answerMultipleChoiseTypeDiv").is(":empty")) {
		appendAnswerOption();
	}
}

function appendAnswerOption(){
	var guid = GUID();
	var optionInput = "Option: <input name='answerOption-"+guid+"' /> <label><input name='iscorrect' id='isAnswerOptionCorrect-"+guid+"' type='radio'/> The answer?</label>";
	var addOptionLink = "<a id='addAnswertOption' href='#'>Add Option</a>";
	$("#addAnswertOption").remove();
	$('#answerMultipleChoiseTypeDiv').append(optionInput+"&nbsp;&nbsp;"+addOptionLink+"<br/>");
	$("#addAnswertOption").click(appendAnswerOption);
}

function updateQuestionType() {
	var answerType = $('input[name=questionType]:checked').val();
	$('#answerTypeDiv').empty();

	if(answerType == "Text") {
		showTextAnswer();
	} else if(answerType == "Multiple Choice") {
		showMultipleChoiseAnswer();
	} 
}

function focusQuestionField(){
	// $('#wysiwyg').wysiwyg('focus'); does not work
	// $("iframe")[0].focus();
	//$('#textQuestion').focus();
	//adding on focus handler
	//CKEDITOR.instances.ckeditor.on('focus', function(){
	//console.log('focus')
	//});
}

function updateId(data){
	$("#questionIdText").html(data._id);
	$("input[name=questionId]").val(data._id);
	
}

function submitQuestion() {
	// get parameter values.
	var questionId = $("input[name=questionId]").val();
	var type = $("input[name=questionType]:checked").val();
	var question = $('textarea[name=textQuestion]').val();
	var textAnswer = $('textarea[name=textAnswer]').val();
	var answerOptionsArray = $(":input[name^=answerOption]");
	var answerOptions = [];
	for(var i=0; i<answerOptionsArray.length; i++) {
		var tempId = $(answerOptionsArray[i]).attr('name');
		var guid = tempId.substring(13);
		var textOption = $(answerOptionsArray[i]).val();
		var isCorrect = $("#isAnswerOptionCorrect-"+guid).is(':checked');;
		answerOptions[i] = {
			textOption:textOption,
			isCorrect:isCorrect
		};
	}
	// build data for ajax request
	var data = {};
	data.questionText = question;
	data.questionType = type; 
	if(type=="Text") {
		data.textAnswer = textAnswer;
	} 
	else if(type=="Multiple Choice") {
		data.answerOptions = answerOptions;
	}
	if(questionId=="") {
		// insert
		$.ajax({
			type: "POST",
			url: "/questions/add",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				$.easyNotification("Question added successfully");
				updateId(data);
			},
			error: function(err) {
				var msg = 'Status: ' + err.status + ': ' + err.responseText;
				alert(msg);
				focusQuestionField();
			}
		});
	} else {
		// update
		$.ajax({
			type: "POST",
			url: "/questions/update/"+questionId,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				$.easyNotification("Question updated successfully");
				updateId(data);
			},
			error: function(err) {
				var msg = 'Status: ' + err.status + ': ' + err.responseText;
				alert(msg);
				focusQuestionField();
			}
		});
	}
}

$(function() {
	//
	// Intialize GUI
	//
	$( '#textQuestion' ).ckeditor();
	$( '#textAnswer' ).ckeditor();
	
	//
	// Intialize Events
	//
	$('#add-question').click(function() {
		submitQuestion();
		return false;
	});
	 
	// Init focus for page
	focusQuestionField();
	updateQuestionType();
});