var requestHandlerOnce = new Object();

requestHandlerOnce.success_once = function(data, queries) {
	if(typeof(data.res) == "string") {
		requestHandlerOnce.prepareTable(data.res, queries[0].variables, queries[1].variables);
	}
}

requestHandlerOnce.error_once = function(msg) {
	$('#query-result-rules').html(create_error(msg));
	$('#query-result-actors').html(create_error(msg));
	$("#tab-result-link").click();
}

requestHandlerOnce.async_once = function() {
	$('#query-result-rules').html(create_info("Query is running..."));  
	$('#query-result-actors').html(create_info("Query is running..."));  
	$("#tab-result-link").click();
}

requestHandlerOnce.prepareTable = function(res, varRules, varActors) {
	var dom = new DOMParser().parseFromString(res,'text/xml');

	var titleRules = [];
	var titleActions = [];

	var variables = dom.getElementsByTagName("variable");
	for(var i = 0; i < variables.length; i++) {
		var variable = variables[i];
		var name = variable.getAttribute("name");
		
		var isRule = $.inArray("?" + name, varRules);
		var isAction = $.inArray("?" + name, varActors);

		if(isRule >= 0) {
			titleRules.push(name);
		} else if(isAction >= 0) {
			titleActions.push(name);
		} else {
			console.log("UNKNOWN title: " + name);
		}
	}

	var dataRules = [];
	var dataActions = [];
	var results = dom.getElementsByTagName("result");

	for(var i = 0; i < results.length; i++) {
		var result = results[i];
		var bindings = result.getElementsByTagName("binding");

		var tmpRules = [];
		var tmpActions = [];
		for(var k = 0; k < bindings.length; k++) {
			var binding = bindings[k];
			var children = binding.childNodes;
			for(var j = 0; j < children.length; j++) {
				var child = children[j];
				if(child.nodeType != 3) {
					var c = child.firstChild;
					var name = binding.getAttribute("name");
					var indexRules = titleRules.indexOf(name); 
					var indexActions = titleActions.indexOf(name); 
					if(indexRules >= 0) {
						tmpRules[indexRules] = c.data;
					} else {
						tmpActions[indexActions] = c.data;
					}
				}
			}
		}
		if(tmpRules.length > 0) {
			dataRules.push(tmpRules);
		}

		if(tmpActions.length > 0) {
			dataActions.push(tmpActions);
		}
	}

	console.log(titleRules.length);
	console.log(titleActions.length);
	console.log(dataRules.length);
	console.log(dataActions.length);

	requestHandlerOnce.generateTable($('#query-result-rules'), titleRules, dataRules);
	requestHandlerOnce.generateTable($('#query-result-actors'), titleActions, dataActions);

}

requestHandlerOnce.generateTable = function(e, title, data) {

e.html(create_success("Query successful."));

var table = $('<table class="table table-striped table-hover table-condensed table-bordered"></table>');
	var thead = $('<thead></thead>');
	var tr = $('<tr></tr>');
	for(i=0; i<title.length; i++){
		var th = $('<th>' + title[i] + '</th>');
		tr.append(th);
	}
	thead.append(tr);
	table.append(thead);

	var onClick = function(e) {
		var t = $(this);						
		if(t.hasClass("marked")) {
			t.removeClass("marked");
		} else {
			t.addClass("marked");
		}
	}

	var tbody = $('<tbody></tbody>');
	for(i=0; i<data.length; i++){
		tr = $('<tr></tr>');
		for(j=0; j<data[i].length; j++){
			var td = null;
			if(typeof(data[i][j]) === "undefined") {
				td = $('<td></td>');
			} else {
				td = $('<td>' + data[i][j] + '</td>');
			}
			td.click(onClick);
			tr.append(td);
		}
		if(data[i].length < title.length) {
			var diff = title.length - data[i].length;
			console.log(diff);
			for(var y = 0; y< diff; y++) {
				tr.append($('<td></td>'));
			}
		}

		tbody.append(tr);
	}
	table.append(tbody);

	if(data.length == 0) {
		e.append(create_alert("No data are matching the query."));
	} else {
		e.append(table);
	}

}


