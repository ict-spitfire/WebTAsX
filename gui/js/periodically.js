function success_periodically(data, action) {

	if(typeof(data.rules) != "string" || typeof(data.action) != "string") {
		return;
	}

	var dom1 = new DOMParser().parseFromString(data.rules,'text/xml');
	var results1 = dom1.getElementsByTagName("result");
	
	if(results1.length == 0) {
		if(action == "on") {
			action = "off";
		} else {
			action = "on";
		}
	}	
	console.log("Data for rules: " + results1.length);

	var dom = new DOMParser().parseFromString(data.action,'text/xml');

	var data = [];
	var results = dom.getElementsByTagName("result");

	for(var i = 0; i < results.length; i++) {
		var result = results[i];
		var bindings = result.getElementsByTagName("binding");un:

		var tmp = [];
		for(var k = 0; k < bindings.length; k++) {
			var binding = bindings[k];
			var children = binding.childNodes;
			for(var j = 0; j < children.length; j++) {
				var child = children[j];
				if(child.nodeType != 3) {
					var c = child.firstChild;
					if(typeof(lastAction[c.data]) == "string") {
						if(lastAction[c.data] != action) {
							console.log("RUN NEW COMMAND");
							action_request(c.data, action);
							lastAction[c.data] = action;
						} else {
							console.log("SKIP ACTION (LAST ACTION WAS THE SAME)");
						}
						continue;
					}
					console.log("RUN ACTION FIRST TIME");
					lastAction[c.data] = action;
					action_request(c.data, action);
				}
			}
		}
	}
}

function error_periodically(msg) {
	$("#tab-result-link").click();
	$('#query-result-rules').html(error(msg));
	$('#query-result-actors').html(error(msg));
}


