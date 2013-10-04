var lastResult = {};

function success_periodically(data, action) {

	var resultRules = parseXML(data.rules);
	var resultActors = parseXML(data.actuators);
	requestHandlerOnce.generateTable($('#query-result-actors'), resultActors.title, resultActors.data);

	var bool = resultRules.data[0][0];
	console.log("Bool: " + bool);


	// change the action on FALSE!
	if(bool == 0) {
		if(action == "on") {
			action = "off";
		} else if(action == "toggle") {
			action = null;
		} else {
			action = "on";
		}
	}

	for(var i = 0; i < resultActors.data.length; i++) {
		var uri = resultActors.data[i][0];
		// ##############################################
		// TOGGLE
		// ##############################################
		if(lastResult[uri] == undefined) {
			lastResult[uri] = {};
		}

		if(lastResult[uri].cnt > 0 && bool == 1 && action == "toggle") {
			lastResult[uri].cnt = bool;
			return;
		}
		lastResult[uri].cnt = bool;

		// ##############################################
		// All other commands
		// ##############################################

		action_request(uri, action);
	}	

}

// TODO
function error_periodically(msg) {
	$("#tab-result-link").click();
	$('#query-result-rules').html(error(msg));
	$('#query-result-actors').html(error(msg));
}


