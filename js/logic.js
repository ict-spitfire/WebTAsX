Array.prototype.extend = function(array) {
    if (array.length < 150000) {
        this.push.apply(this, array)
    } else {
        for (var i = 0, len = array.length; i < len; ++i) {
            this.push(array[i]);
        };
    }  
}

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


var isArray = function(arr) {
	return (typeof(arr) == "object" && arr.constructor.name.indexOf("Array") >= 0);
};

var Logic = function(output) {
	this.counter = 0;
	this.output = output;
	this.arr = this.mknone();
}

Logic.prototype.init = function() {
	this.output.empty();
	this.output.append(this.parseArray(this.arr));
}

Logic.prototype.mkand = function(a,b) {
	e = ["and", a, b];
	return e;
}

Logic.prototype.mkor = function(a,b) {
	e = ["or", a, b];
	return e;
}

Logic.prototype.mknot = function(a) {
	e = ["not", a]
	return e;
}

Logic.prototype.mknone = function() {
	return ["?"];
}

Logic.prototype.getArray = function() {
	return this.arr;
}

Logic.prototype.parseArray = function(arr) {
	var that = this;

	var sparqlSelection = null;
	var showSPO = function() {
		//console.log("showSPO");
		$("span.spo").each( function() {
			$(this).hide();
		});

		if(sparqlSelection == null) {
			sparqlSelection = that.onsparql();	
			var name = "P_" + that.counter++;
			var nameFiled = sparqlSelection.find("[data-name]");
			nameFiled.val(name);
			//console.log(nameFiled);
			nameFiled.keyup(function(e) {
				if(e.keyCode == 13) {
					arr[1] = nameFiled.val();
					that.init();
				}
			});


			a.html(name);
			a.attr("data-toggle", "");
			a.removeClass("dropdown-toggle");
			a.click(showSPO);
			ul.remove();
			arr[1] = name;
			arr[2] = sparqlSelection;
		} else {
			console.log("SHOW!");
			sparqlSelection.show();
		}
	}

	if(arr[0] == "and") {
		return this.parseAnd(arr);
	} else if(arr[0] == "or") {
		return this.parseOr(arr);
	} else if(arr[0] == "not") {
		return this.parseNot(arr);
	} else if(arr[0] == "?" && typeof(arr[1]) == "string") {
		var s = $("<span></span>")
		var a = $('<a href="#">' + arr[1] + '</a>');
		s.append(a);
		sparqlSelection = arr[2];
		a.click(function(e) {
			e.preventDefault()
			showSPO();
		});
		return s;
	} else if(arr[0] == "?") {
//		var q = $("<span>[?]</span>");
//		q.css("cursor", "pointer");
//		q.click(function() {
//		});

		var div = $('<span class="dropdown"></span>');	
		var a = $('<a class="dropdown-toggle" data-toggle="dropdown" href="#">[?]</a>');
		var ul = $('<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"></ul>');
		var and = $('<li><a tabindex="-1" href="#">AND</a></li>');
		and.click(function() {
			arr.splice(0, 1); // Remove first element
			arr.extend(that.mkand(that.mknone(), that.mknone())) // append new element
			that.init();
		}) 
		var or = $('<li><a tabindex="-1" href="#">OR</a></li>');
		or.click(function() {
			arr.splice(0, 1); // Remove first element
			arr.extend(that.mkor(that.mknone(), that.mknone())) // append new element
			that.init();
		}) 

		var not = $('<li><a tabindex="-1" href="#">NOT</a></li>');
		not.click(function() {
			arr.splice(0, 1); // Remove first element
			arr.extend(that.mknot(that.mknone())) // append new element
			that.init();
		}) 

		var divider = $('<li class="divider"></li>');
		var sparql = $('<li><a tabindex="-1" href="#">SPARQL</a></li>');
		sparql.click(showSPO);
		ul.append(and,or,not,divider,sparql);
		div.append(a,ul);

		return div

	} 
}

Logic.prototype.parseElement = function (elem) {
	if(typeof(elem) == "undefined") {
		var q = $("<span>button</span>");
		return q;
	} else if(typeof(elem) == "string") {
		var q = $("<span>" + elem + "</span>");
		return q;
	} else if(isArray(elem)) {
		return this.parseArray(elem);
	} else {
		var q = $("<span>error</span>");
		return q;
	}
}

Logic.prototype.parseAnd = function(and) {
	var q1 = $("<span>(</span>");
	var q2 = this.parseElement(and[1]);
	var q3 = $("<span>AND</span>");
	q3.css("cursor", "pointer");
	var q4 = this.parseElement(and[2]);
	var q5 = $("<span>)</span>");
	var q = $("<span class=\"and\"></span>");
	q3.click(function() {
		q.toggleClass("highlight");
	})
	q.append(q1, q2, q3, q4, q5);
	return q;
}

Logic.prototype.parseOr = function(or) {
	var q1 = $("<span>(</span>");
	var q2 = this.parseElement(or[1]);
	var q3 = $("<span>OR</span>");
	q3.css("cursor", "pointer");
	var q4 = this.parseElement(or[2]);
	var q5 = $("<span>)</span>");
	var q = $("<span class=\"or\"></span>");
	q3.click(function() {
		q.toggleClass("highlight");
	})
	q.append(q1, q2, q3, q4, q5);
	return q;

}

Logic.prototype.parseNot = function(not) {
	var q1 = $("<span>(</span>");
	var q2 = $("<span>NOT </span>");
	q2.css("cursor", "pointer");
	var q3 = this.parseElement(not[1]);
	var q4 = $("<span>)</span>");
	var q = $("<span class=\"not\"></span>")
	q.append(q1, q2, q3, q4);
	q2.click(function() {
		q.toggleClass("highlight");
	})
	return q;
}

Logic.prototype.queryArray = function(arr) {
	var that = this;
	if(arr[0] == "and") {
		return this.queryAnd(arr);
	} else if(arr[0] == "or") {
		return this.queryOr(arr);
	} else if(arr[0] == "not") {
		return this.queryNot(arr);
	} else if(arr[0] == "?") {
		if(arr[2] == null) {
			throw (arr[0] + " has no triples!")
		}
		var spo = generate_sparql(arr[2].find(".rules").find(".query-spo"));
		if(spo == null) {
			throw (arr[1] + " has no triples!")
		}
		var q = "SELECT " + implode(" ", spo.variables) + " WHERE {\n " + spo.query + "}\n";
		return "SELECT (IF(COUNT(*) > 0, 1, 0) AS ?bool) WHERE {\n" + q + "}\n";
	}
}

Logic.prototype.queryElement = function (elem) {
	if(typeof(elem) == "undefined") {
		return "undef";
	} else if(typeof(elem) == "string") {
		return elem;
	} else if(isArray(elem)) {
		return this.queryArray(elem);
	} else {
		return "ERROR";
	}
}

Logic.prototype.queryAnd = function(and) {
	var q1 = "SELECT (IF(SUM(?bool) = 2, 1, 0) AS ?bool) WHERE {{\n";
	var q2 = this.queryElement(and[1]);
	var q3 = "} UNION {";
	var q4 = this.queryElement(and[2]);
	var q5 = "\n}}\n";
	return q1 + q2 + q3 + q4 + q5;
}

Logic.prototype.queryOr = function(or) {
	var q1 = "\nSELECT (IF(SUM(?bool) > 0, 1, 0) AS ?bool) WHERE {{\n";
	var q2 = this.queryElement(or[1]);
	var q3 = "} UNION {";
	var q4 = this.queryElement(or[2]);
	var q5 = "\n}}\n";
	return q1 + q2 + q3 + q4 + q5;

}

Logic.prototype.queryNot = function(not) {
	var q1 = "SELECT (IF(?bool = 0, 1, 0) AS ?bool) WHERE {\n";
	var q2 = this.queryElement(not[1]);
	var q3 = "\n}\n";
	return q1 + q2 + q3;
}

Logic.prototype.query = function() {
	return this.queryArray(this.arr)
}
