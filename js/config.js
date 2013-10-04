
define(
	['jquery'],
	function($) {
		var config = localStorage.getItem("config");
		if(config == null) {
			var config = {};
			config.lightThreshold = 300;
			config.sparqlEndpoint = "http://ssp1.wisebed.itm.uni-luebeck.de:8080";
			config.timeout = 3000;
			localStorage.setItem("config", JSON.stringify(config));
		}

		return {
			get : function (id) {
				var c = localStorage.getItem("config");
				var v = JSON.parse(c)[id];
				return v;
			}
		}

	}
	
)
