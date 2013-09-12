var modules = null;

define(
	['config'],
	function() {
		var modules = {
			title : "Query-GUI",
			prefixes : [
				["ssn", "http://purl.oclc.org/NET/ssnx/ssn#"],
				["sf_ns", "http://spitfire-project.eu/ontology/ns/"],
				["sf_sn", "http://spitfire-project.eu/ontology/ns/sn/"],
				["sf_p", "http://spitfire-project.eu/property/"],
				["sf_foi", "http://spitfire-project.eu/foi/"],
				["w3c_schema", "http://www.w3.org/2000/01/rdf-schema#"],
				["w3c_rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#"],
				["iti", "http://www.iti.uni-luebeck.de/"]
			],
			mapping :
						[
							[
								"node", "{val}",
								[
									["?", "?"],
									["measures light", "ssn:attachedSystem {val}.\n\t{val} sf_ns:obs sf_p:Light .\n\t{val} sf_ns:value", 
										[
											["?" ,   "{light}", "{light}"],
											["on" ,  "{light} . FILTER({light} >= " + config["lightThreshold"] + ")"],
											["off" , "{light} . FILTER({light} < " + config["lightThreshold"] + ")"],
										]
									],
									["measures movement", "ssn:attachedSystem {val}.\n\t{val} sf_ns:obs sf_p:Movement .\n\t{val} sf_ns:value", 
										[
											["?" ,   "{light}", "{light}"],
											["on" ,  "{light} . FILTER({light} > 0)"],
											["off" , "{light} . FILTER({light} < 1)"],
										]
									],
									["measures temperature", "ssn:attachedSystem {val}.\n\t{val} sf_ns:obs sf_p:Temperature .\n\t{val} sf_ns:value", 
										[
											["?" ,   "{temperature}", "{temperature}"],
											[">= 10°C" ,  "{temperature} . FILTER({temperature} >= 10)", "{temperature}"],
											[">= 11°C" ,  "{temperature} . FILTER({temperature} >= 11)", "{temperature}"],
											[">= 12°C" ,  "{temperature} . FILTER({temperature} >= 12)", "{temperature}"],
											[">= 13°C" ,  "{temperature} . FILTER({temperature} >= 13)", "{temperature}"],
											[">= 14°C" ,  "{temperature} . FILTER({temperature} >= 14)", "{temperature}"],
											[">= 15°C" ,  "{temperature} . FILTER({temperature} >= 15)", "{temperature}"],
											[">= 16°C" ,  "{temperature} . FILTER({temperature} >= 16)", "{temperature}"],
											[">= 17°C" ,  "{temperature} . FILTER({temperature} >= 17)", "{temperature}"],
											[">= 18°C" ,  "{temperature} . FILTER({temperature} >= 18)", "{temperature}"],
											[">= 19°C" ,  "{temperature} . FILTER({temperature} >= 19)", "{temperature}"],
											[">= 20°C" ,  "{temperature} . FILTER({temperature} >= 20)", "{temperature}", true],
											[">= 21°C" ,  "{temperature} . FILTER({temperature} >= 21)", "{temperature}"],
											[">= 22°C" ,  "{temperature} . FILTER({temperature} >= 22)", "{temperature}"],
											[">= 23°C" ,  "{temperature} . FILTER({temperature} >= 23)", "{temperature}"],
											[">= 24°C" ,  "{temperature} . FILTER({temperature} >= 24)", "{temperature}"],
											[">= 25°C" ,  "{temperature} . FILTER({temperature} >= 25)", "{temperature}"],
											[">= 26°C" ,  "{temperature} . FILTER({temperature} >= 26)", "{temperature}"],
											[">= 27°C" ,  "{temperature} . FILTER({temperature} >= 27)", "{temperature}"],
											[">= 28°C" ,  "{temperature} . FILTER({temperature} >= 28)", "{temperature}"],
											[">= 29°C" ,  "{temperature} . FILTER({temperature} >= 29)", "{temperature}"],
											[">= 30°C" ,  "{temperature} . FILTER({temperature} >= 30)", "{temperature}"],
											["< 10°C" ,  "{temperature} . FILTER({temperature} < 10)", "{temperature}"],
											["< 11°C" ,  "{temperature} . FILTER({temperature} < 11)", "{temperature}"],
											["< 12°C" ,  "{temperature} . FILTER({temperature} < 12)", "{temperature}"],
											["< 13°C" ,  "{temperature} . FILTER({temperature} < 13)", "{temperature}"],
											["< 14°C" ,  "{temperature} . FILTER({temperature} < 14)", "{temperature}"],
											["< 15°C" ,  "{temperature} . FILTER({temperature} < 15)", "{temperature}"],
											["< 16°C" ,  "{temperature} . FILTER({temperature} < 16)", "{temperature}"],
											["< 17°C" ,  "{temperature} . FILTER({temperature} < 17)", "{temperature}"],
											["< 18°C" ,  "{temperature} . FILTER({temperature} < 18)", "{temperature}"],
											["< 19°C" ,  "{temperature} . FILTER({temperature} < 19)", "{temperature}"],
											["< 20°C" ,  "{temperature} . FILTER({temperature} < 20)", "{temperature}"],
											["< 21°C" ,  "{temperature} . FILTER({temperature} < 21)", "{temperature}"],
											["< 22°C" ,  "{temperature} . FILTER({temperature} < 22)", "{temperature}"],
											["< 23°C" ,  "{temperature} . FILTER({temperature} < 23)", "{temperature}"],
											["< 24°C" ,  "{temperature} . FILTER({temperature} < 24)", "{temperature}"],
											["< 25°C" ,  "{temperature} . FILTER({temperature} < 25)", "{temperature}"],
											["< 26°C" ,  "{temperature} . FILTER({temperature} < 26)", "{temperature}"],
											["< 27°C" ,  "{temperature} . FILTER({temperature} < 27)", "{temperature}"],
											["< 28°C" ,  "{temperature} . FILTER({temperature} < 28)", "{temperature}"],
											["< 29°C" ,  "{temperature} . FILTER({temperature} < 29)", "{temperature}"],
											["< 30°C" ,  "{temperature} . FILTER({temperature} < 30)", "{temperature}"],

										]
									],
									["has actor", "ssn:attachedSystem",
										[
											["?",       "{actor} . FILTER regex(str({actor}), 'actor', 'i')", "{actor}"],
											["fan",     "{fanActor} . FILTER regex(str({fanActor}), 'actor', 'i') . \n\t{fanActor} w3c_schema:type ssn:fan>", "{fanActor}"],
											["radio",   "{radioActor} . FILTER regex(str({radioActor}), 'actor', 'i') . \n\t{radioActor} w3c_schema:type ssn:switch>", "{radioActor}"]
										]
									],
									["is in", "ssn:featureOfInterest>",
										[
											["?", "{featureOfInterest}", "{featureOfInterest}"],
											["office", "sf_foi:office"],
											["bedroom", "sf_foi:bedroom"]
										]
									]
								]
							],
							[
								"weather", "iti:time iti:is {time} .\n\t{forecast} w3c_rdf:type sf_sn:temperatureForecast .\n\t{forecast} sf_sn:time_start {startForecast} . FILTER({time} >= {startForecast})\n\t{forecast} sf_sn:time_end {endForecast} . FILTER({time} <= {endForecast})\n\t{forecast} sf_ns:value",
								[
									["temperature is", "",
										[
											["?" , "{temperature}", "{temperature}"],
											[">= 10°C", "{temperature} . FILTER({temperature} >= 10)", "{temperature}"],
											[">= 11°C", "{temperature} . FILTER({temperature} >= 11)", "{temperature}"],
											[">= 12°C", "{temperature} . FILTER({temperature} >= 12)", "{temperature}"],
											[">= 13°C", "{temperature} . FILTER({temperature} >= 13)", "{temperature}"],
											[">= 14°C", "{temperature} . FILTER({temperature} >= 14)", "{temperature}"],
											[">= 15°C", "{temperature} . FILTER({temperature} >= 15)", "{temperature}"],
											[">= 16°C", "{temperature} . FILTER({temperature} >= 16)", "{temperature}"],
											[">= 17°C", "{temperature} . FILTER({temperature} >= 17)", "{temperature}"],
											[">= 18°C", "{temperature} . FILTER({temperature} >= 18)", "{temperature}"],
											[">= 19°C", "{temperature} . FILTER({temperature} >= 19)", "{temperature}"],
											[">= 20°C", "{temperature} . FILTER({temperature} >= 20)", "{temperature}", true],
											[">= 21°C", "{temperature} . FILTER({temperature} >= 21)", "{temperature}"],
											[">= 22°C", "{temperature} . FILTER({temperature} >= 22)", "{temperature}"],
											[">= 23°C", "{temperature} . FILTER({temperature} >= 23)", "{temperature}"],
											[">= 24°C", "{temperature} . FILTER({temperature} >= 24)", "{temperature}"],
											[">= 25°C", "{temperature} . FILTER({temperature} >= 25)", "{temperature}"],
											[">= 26°C", "{temperature} . FILTER({temperature} >= 26)", "{temperature}"],
											[">= 27°C", "{temperature} . FILTER({temperature} >= 27)", "{temperature}"],
											[">= 28°C", "{temperature} . FILTER({temperature} >= 28)", "{temperature}"],
											[">= 29°C", "{temperature} . FILTER({temperature} >= 29)", "{temperature}"],
                                            [">= 30°C", "{temperature} . FILTER({temperature} >= 30)", "{temperature}"],
											["< 10°C", "{temperature} . FILTER({temperature} < 10)", "{temperature}"],
											["< 11°C", "{temperature} . FILTER({temperature} < 11)", "{temperature}"],
											["< 12°C", "{temperature} . FILTER({temperature} < 12)", "{temperature}"],
											["< 13°C", "{temperature} . FILTER({temperature} < 13)", "{temperature}"],
											["< 14°C", "{temperature} . FILTER({temperature} < 14)", "{temperature}"],
											["< 15°C", "{temperature} . FILTER({temperature} < 15)", "{temperature}"],
											["< 16°C", "{temperature} . FILTER({temperature} < 16)", "{temperature}"],
											["< 17°C", "{temperature} . FILTER({temperature} < 17)", "{temperature}"],
											["< 18°C", "{temperature} . FILTER({temperature} < 18)", "{temperature}"],
											["< 19°C", "{temperature} . FILTER({temperature} < 19)", "{temperature}"],
											["< 20°C", "{temperature} . FILTER({temperature} < 20)", "{temperature}"],
											["< 21°C", "{temperature} . FILTER({temperature} < 21)", "{temperature}"],
											["< 22°C", "{temperature} . FILTER({temperature} < 22)", "{temperature}"],
											["< 23°C", "{temperature} . FILTER({temperature} < 23)", "{temperature}"],
											["< 24°C", "{temperature} . FILTER({temperature} < 24)", "{temperature}"],
											["< 25°C", "{temperature} . FILTER({temperature} < 25)", "{temperature}"],
											["< 26°C", "{temperature} . FILTER({temperature} < 26)", "{temperature}"],
											["< 27°C", "{temperature} . FILTER({temperature} < 27)", "{temperature}"],
											["< 28°C", "{temperature} . FILTER({temperature} < 28)", "{temperature}"],
											["< 29°C", "{temperature} . FILTER({temperature} < 29)", "{temperature}"],
											["< 30°C", "{temperature} . FILTER({temperature} < 30)", "{temperature}"],
										]
									]
								]
							],[
								"calendar", "iti:time iti:is {time} .\n\t{event} sf_ns:start {startCalendar} . FILTER( {time} >= {startCalendar}) .\n\t{event} sf_ns:end {endCalendar} . FILTER( {time} < {endCalendar}) .\n\t{event} sf_ns:subject",
								[
									["has event", "", 
										[
											["?", "{event}", "{event}"],
											["radio","{eventSubject} . FILTER regex({eventSubject}, 'Radio', 'i')"],
											["fan","{eventSubject} . FILTER regex({eventSubject}, 'fan', 'i')"],
											["meeting","{eventSubject} . FILTER regex({eventSubject}, 'meeting', 'i')"]
										]
									]
								]
							]
						], 
			isActive : true
		}

		return modules;
	}
);

