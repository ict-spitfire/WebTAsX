function implode (glue, pieces) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Waldo Malqui Silva
  // +   improved by: Itsacon (http://www.itsacon.net/)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: 'Kevin van Zonneveld'
  // *     example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
  // *     returns 2: 'Kevin van Zonneveld'
  var i = '',
	retVal = '',
	tGlue = '';
  if (arguments.length === 1) {
	pieces = glue;
	glue = '';
  }
  if (typeof pieces === 'object') {
	if (Object.prototype.toString.call(pieces) === '[object Array]') {
	  return pieces.join(glue);
	}
	for (i in pieces) {
	  retVal += tGlue + pieces[i];
	  tGlue = glue;
	}
	return retVal;
  }
  return pieces;
}


function isArray(arr) {
	return (typeof(arr) == "object" && arr.constructor.name.indexOf("Array") >= 0);
};

function urlencode (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: AJ
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: travc
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Lars Fischer
  // +      input by: Ratheous
  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Joris
  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: This reflects PHP 5.3/6.0+ behavior
  // %        note 2: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
  // %        note 2: pages served as UTF-8
  // *     example 1: urlencode('Kevin van Zonneveld!');
  // *     returns 1: 'Kevin+van+Zonneveld%21'
  // *     example 2: urlencode('http://kevin.vanzonneveld.net/');
  // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
  // *     example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
  // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
  str = (str + '').toString();

  // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
  // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
  replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

function parseSeXML(xml) {
var dom = new DOMParser().parseFromString(xml,'text/xml');

	var o = {};
	o.title = ["se_id", "se_uri", "se_uom", "se_type", "min", "max"];
	o.data = [];

	var results = dom.getElementsByTagName("se");
	for(var i = 0; i < results.length; i++) {
		var result = results[i];

		var se_id =   result.getElementsByTagName("se_id")[0].childNodes[0].data;
		var se_uri =  result.getElementsByTagName("se_uri")[0].childNodes[0].data;
		var se_uom =  result.getElementsByTagName("se_uom")[0].childNodes[0].data;
		var se_type = result.getElementsByTagName("se_type")[0].childNodes[0].data;
		var min =     result.getElementsByTagName("min")[0].childNodes[0].data;
		var max =     result.getElementsByTagName("max")[0].childNodes[0].data;
		o.data.push([se_id, se_uri, se_uom, se_type, min, max]);
	}

	return o;
}

function parseSparqlXML(xml) {

	var dom = new DOMParser().parseFromString(xml,'text/xml');

	var o = {};
	o.title = [];
	o.data = [];

	var variables = dom.getElementsByTagName("variable");
	for(var i = 0; i < variables.length; i++) {
		var variable = variables[i];
		var name = variable.getAttribute("name");
		o.title.push(name);
	}

	var results = dom.getElementsByTagName("result");
	for(var i = 0; i < results.length; i++) {
		var result = results[i];
		var bindings = result.getElementsByTagName("binding");

		var tmp = [];
		for(var k = 0; k < bindings.length; k++) {
			var binding = bindings[k];
			var children = binding.childNodes;
			for(var j = 0; j < children.length; j++) {
				var child = children[j];
				if(child.nodeType != 3) {
					var name = binding.getAttribute("name");
					var index = o.title.indexOf(name); 
					var c = child.firstChild; // type doesnt matter!
					if(c == null) {
						tmp[index] = "";
					} else {
						tmp[index] = c.data;
					}
				}
			}
		}
		if(tmp.length > 0) {
			o.data.push(tmp);
		}
	}

	return o;
}

function generateResultTable (e, result) {

	if(typeof(result) == "object") {
		title = result.title;
		data = result.data;

		//e.html(create_success("Query successful."));

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
		console.log("Results: " + data.length)
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

		e.html(table);
		if(data.length == 0) {
			e.append(create_alert("No data are matching the query."));
		}

	} else {
		e.html(create_alert("Error with the requested data."));
	}
}

function doSparqlQuery(query, onsuccess, onerror) {

	// Replace now() by the current date...
	var date = new Date();
	var curr_day = date.getDate();
	var curr_month = date.getMonth() + 1; //Months are zero based
	var curr_year = date.getFullYear();
	var ymd = curr_year + "-" + curr_month + "-" + curr_day;
	var d = (new Date()+'').split(' ');
	var now = ymd + "T" + d[4];
	query = query.replace(new RegExp("now\\(\\)", "g"), "\"" + now + "\"^^xsd:dateTime"); 

	var url = config.get("sparqlEndpoint");

	// #################################################################
	// SSP with Apache Jena/SDB RESTful interface
	// POST query on /sparql
	// #################################################################

	var xhr = new XMLHttpRequest();
	xhr.responsetype = "text";
	xhr.open('POST', url + "/sparql", true);
	xhr.onload = function(e) {
		// The response type is "SPARQL Query Results XML Format (Second Edition)"
		// http://www.w3.org/TR/rdf-sparql-XMLres/
		if (this.readyState == 4 && this.status == 200) {
			var elapsed = new Date().getTime() - start;
			console.log("Query elapsed: " + elapsed);

			if(typeof(onsuccess) == "function") {
				onsuccess(this.response);
			}
		} else if (this.readyState == 4){
			onerror();
		}
	}

	var start = new Date().getTime();
	xhr.send(query);
}

function doSeQuery(onsuccess, onerror) {

	var url = config.get("sparqlEndpoint");

	// #################################################################
	// SSP with Apache Jena/SDB RESTful interface
	// POST query on /sparql
	// #################################################################

	var xhr = new XMLHttpRequest();
	xhr.responsetype = "text";
	xhr.open('GET', url + "/se", true);
	xhr.onload = function(e) {
		// The response type is simple XML
		if (this.readyState == 4 && this.status == 200) {
			var elapsed = new Date().getTime() - start;
			console.log("Get SE elapsed: " + elapsed);

			if(typeof(onsuccess) == "function") {
				onsuccess(this.response);
			}
		} else if (this.readyState == 4){
			onerror();
		}
	}

	var start = new Date().getTime();
	xhr.send();
}

/*
 * Runs an HTTP-POST-request on an url, if the value is the opposite
 */
function action_request(url, action) {
	if(action == null) return;
	var query = "SELECT DISTINCT ?o WHERE { <" + url + "> <http://spitfire-project.eu/ontology/ns/value> ?o }";

	var onsuccess = function(res) {

		var dom = new DOMParser().parseFromString(res,'text/xml');
		var variables = dom.getElementsByTagName("literal");
		for(var i = 0; i < variables.length; i++) {
			var variable = variables[i];
			var value = variable.childNodes[0].data;

			if(parseInt(value) == 1 && action == "toggle") {
				console.log("TOGGLE TO OFF!");
				doAction(url, "off");
			} else if(parseInt(value) == 0 && action == "toggle" ) {
				console.log("TOGGLE TO ON!");
				doAction(url, "on");
			} else if(parseInt(value) == 1 && action == "off" || parseInt(value) == 0 && action == "on" ) {
				doAction(url, action);
			} 
		}
	}
	doSparqlQuery(query, onsuccess);
}


/*
 * Runs an HTTP-POST-request on an url
 */
function doAction(url, action) {

	url = config.get("sparqlEndpoint") + "/?uri=" + url;
	console.log("RUN ACTION ON " + url + " :: " + action);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.responsetype = "text";

	xhr.onload = function(e) {
		var elapsed = new Date().getTime() - start;
		console.log("Action elapsed: " + elapsed + "ms");

		// 200 ok/201 created/204 non content
		if (!(this.readyState == 4 && (this.status == 200 || this.status == 201 || this.status == 204))) {
			console.log(url + " + " + action + " ERROR - STATUS: " + this.status);
		}
	}
	var start = new Date().getTime();
	xhr.send(action);
}

function isArray(arr) {
	return (arr != null && typeof(arr) == "object" && arr.constructor.name.indexOf("Array") >= 0);
};
