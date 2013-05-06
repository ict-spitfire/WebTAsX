var config = {};

define(
	['jquery'],
	function($) {
		config.lightThreshold = 3000;
		config.sparqlEndpoint = "http://192.168.0.100:8080/openrdf-sesame/repositories/sensors";

		// Load all saved config
		for (var key in localStorage){
			// Just set real config values!
			if(typeof(config[key]) != "undefined") {
				config[key] = localStorage.getItem(key);
			}
		}

		// set the values in the config window
		for (var key in config){
			var id = "config-" + key;
			var input = $("#" + id);
			input.val(config[key]);
		}
	}
)
