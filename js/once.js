var requestHandlerOnce = new Object();

requestHandlerOnce.success_once = function(data) {
	if(typeof(data.rules) == "string") {
		var resultRules = parseXML(data.rules);
		requestHandlerOnce.generateTable($('#query-result-rules'), resultRules.title, resultRules.data);
	} else {
		$('#query-result-rules').empty();
		$('#query-result-rules').append(create_alert("No data are matching the query."));
	}

	if(typeof(data.actuators) == "string") {
		var resultActors = parseXML(data.actuators);
		requestHandlerOnce.generateTable($('#query-result-actors'), resultActors.title, resultActors.data);
	} else {
		$('#query-result-actors').empty();
		$('#query-result-actors').append(create_alert("No data are matching the query."));
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


