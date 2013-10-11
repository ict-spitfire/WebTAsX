var modules = null;

define(
	['config'],
	function(config) {
		var modules = {
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
// Light, Movement, Temperature, PowerConsumption

									["measures light", "ssn:attachedSystem {val}.\n\t{val} sf_ns:obs sf_p:Light .\n\t{val} sf_ns:value", 
										[
											["?" ,   "{light}"],
											["on" ,  "{light} . FILTER({light} >= " + config.get("lightThreshold") + ")"],
											["off" , "{light} . FILTER({light} < " + config.get("lightThreshold") + ")"],
										]
									],
									["measures movement", "ssn:attachedSystem {val}.\n\t{val} sf_ns:obs sf_p:Movement .\n\t{val} sf_ns:value", 
										[
											["?" ,   "{movement}"],
											["on" ,  "{movement} . FILTER({movement} > 0)"],
											["off" , "{movement} . FILTER({movement} < 1)"],
										]
									],
									["measures temperature", "ssn:attachedSystem {val}.\n\t{val} sf_ns:obs sf_p:Temperature .\n\t{val} sf_ns:value", 
										[
											["?" ,   "{temperature}"],
											[">= 10°C" ,  "{temperature} . FILTER({temperature} >= 10)"],
											[">= 11°C" ,  "{temperature} . FILTER({temperature} >= 11)"],
											[">= 12°C" ,  "{temperature} . FILTER({temperature} >= 12)"],
											[">= 13°C" ,  "{temperature} . FILTER({temperature} >= 13)"],
											[">= 14°C" ,  "{temperature} . FILTER({temperature} >= 14)"],
											[">= 15°C" ,  "{temperature} . FILTER({temperature} >= 15)"],
											[">= 16°C" ,  "{temperature} . FILTER({temperature} >= 16)"],
											[">= 17°C" ,  "{temperature} . FILTER({temperature} >= 17)"],
											[">= 18°C" ,  "{temperature} . FILTER({temperature} >= 18)"],
											[">= 19°C" ,  "{temperature} . FILTER({temperature} >= 19)"],
											[">= 20°C" ,  "{temperature} . FILTER({temperature} >= 20)", null, true],
											[">= 21°C" ,  "{temperature} . FILTER({temperature} >= 21)"],
											[">= 22°C" ,  "{temperature} . FILTER({temperature} >= 22)"],
											[">= 23°C" ,  "{temperature} . FILTER({temperature} >= 23)"],
											[">= 24°C" ,  "{temperature} . FILTER({temperature} >= 24)"],
											[">= 25°C" ,  "{temperature} . FILTER({temperature} >= 25)"],
											[">= 26°C" ,  "{temperature} . FILTER({temperature} >= 26)"],
											[">= 27°C" ,  "{temperature} . FILTER({temperature} >= 27)"],
											[">= 28°C" ,  "{temperature} . FILTER({temperature} >= 28)"],
											[">= 29°C" ,  "{temperature} . FILTER({temperature} >= 29)"],
											[">= 30°C" ,  "{temperature} . FILTER({temperature} >= 30)"],
											["< 10°C" ,  "{temperature} . FILTER({temperature} < 10)"],
											["< 11°C" ,  "{temperature} . FILTER({temperature} < 11)"],
											["< 12°C" ,  "{temperature} . FILTER({temperature} < 12)"],
											["< 13°C" ,  "{temperature} . FILTER({temperature} < 13)"],
											["< 14°C" ,  "{temperature} . FILTER({temperature} < 14)"],
											["< 15°C" ,  "{temperature} . FILTER({temperature} < 15)"],
											["< 16°C" ,  "{temperature} . FILTER({temperature} < 16)"],
											["< 17°C" ,  "{temperature} . FILTER({temperature} < 17)"],
											["< 18°C" ,  "{temperature} . FILTER({temperature} < 18)"],
											["< 19°C" ,  "{temperature} . FILTER({temperature} < 19)"],
											["< 20°C" ,  "{temperature} . FILTER({temperature} < 20)"],
											["< 21°C" ,  "{temperature} . FILTER({temperature} < 21)"],
											["< 22°C" ,  "{temperature} . FILTER({temperature} < 22)"],
											["< 23°C" ,  "{temperature} . FILTER({temperature} < 23)"],
											["< 24°C" ,  "{temperature} . FILTER({temperature} < 24)"],
											["< 25°C" ,  "{temperature} . FILTER({temperature} < 25)"],
											["< 26°C" ,  "{temperature} . FILTER({temperature} < 26)"],
											["< 27°C" ,  "{temperature} . FILTER({temperature} < 27)"],
											["< 28°C" ,  "{temperature} . FILTER({temperature} < 28)"],
											["< 29°C" ,  "{temperature} . FILTER({temperature} < 29)"],
											["< 30°C" ,  "{temperature} . FILTER({temperature} < 30)"],

										]
									],
/*
									["has actuator", "ssn:attachedSystem",
										[
											["?",       "{actor} . FILTER regex(str({actor}), 'actor', 'i')", "{actor}"],
											["air conditioning",     "{fanActor} . FILTER regex(str({fanActor}), 'actor', 'i') . \n\t{fanActor} w3c_schema:type ssn:fan", "{fanActor}"],
											["radio",   "{radioActor} . FILTER regex(str({radioActor}), 'actor', 'i') . \n\t{radioActor} w3c_schema:type ssn:switch", "{radioActor}"]
										]
									],
*/
									["has actuator", "ssn:attachedSystem",
										[
											["?",       "{actor} .		\n\t{actor} 		w3c_schema:type {_tmpActor}		. \n\t{_tmptmpActor}	    w3c_schema:subClassOf   sf_ns:Actuator",	"{actor}"],
											["Fan",		"{fanActor} . 	\n\t{fanActor} 		w3c_schema:type sf_sn:Fan		. \n\tsf_sn:Fan	    w3c_schema:subClassOf   sf_ns:Actuator", 	"{fanActor}"],
											["Switch",  "{radioActor} . \n\t{radioActor} 	w3c_schema:type sf_sn:Switch	. \n\tsf_sn:Switch	w3c_schema:subClassOf   sf_ns:Actuator", 	"{radioActor}"]
										]
									],

									["is in", "ssn:featureOfInterest",
										[
											["?", "{featureOfInterest}"],
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
											["?" ],
											[">= 10°C", "{temperature} . FILTER({temperature} >= 10)"],
											[">= 11°C", "{temperature} . FILTER({temperature} >= 11)"],
											[">= 12°C", "{temperature} . FILTER({temperature} >= 12)"],
											[">= 13°C", "{temperature} . FILTER({temperature} >= 13)"],
											[">= 14°C", "{temperature} . FILTER({temperature} >= 14)"],
											[">= 15°C", "{temperature} . FILTER({temperature} >= 15)"],
											[">= 16°C", "{temperature} . FILTER({temperature} >= 16)"],
											[">= 17°C", "{temperature} . FILTER({temperature} >= 17)"],
											[">= 18°C", "{temperature} . FILTER({temperature} >= 18)"],
											[">= 19°C", "{temperature} . FILTER({temperature} >= 19)"],
											[">= 20°C", "{temperature} . FILTER({temperature} >= 20)", null, true],
											[">= 21°C", "{temperature} . FILTER({temperature} >= 21)"],
											[">= 22°C", "{temperature} . FILTER({temperature} >= 22)"],
											[">= 23°C", "{temperature} . FILTER({temperature} >= 23)"],
											[">= 24°C", "{temperature} . FILTER({temperature} >= 24)"],
											[">= 25°C", "{temperature} . FILTER({temperature} >= 25)"],
											[">= 26°C", "{temperature} . FILTER({temperature} >= 26)"],
											[">= 27°C", "{temperature} . FILTER({temperature} >= 27)"],
											[">= 28°C", "{temperature} . FILTER({temperature} >= 28)"],
											[">= 29°C", "{temperature} . FILTER({temperature} >= 29)"],
                                            [">= 30°C", "{temperature} . FILTER({temperature} >= 30)"],
											["< 10°C", "{temperature} . FILTER({temperature} < 10)"],
											["< 11°C", "{temperature} . FILTER({temperature} < 11)"],
											["< 12°C", "{temperature} . FILTER({temperature} < 12)"],
											["< 13°C", "{temperature} . FILTER({temperature} < 13)"],
											["< 14°C", "{temperature} . FILTER({temperature} < 14)"],
											["< 15°C", "{temperature} . FILTER({temperature} < 15)"],
											["< 16°C", "{temperature} . FILTER({temperature} < 16)"],
											["< 17°C", "{temperature} . FILTER({temperature} < 17)"],
											["< 18°C", "{temperature} . FILTER({temperature} < 18)"],
											["< 19°C", "{temperature} . FILTER({temperature} < 19)"],
											["< 20°C", "{temperature} . FILTER({temperature} < 20)"],
											["< 21°C", "{temperature} . FILTER({temperature} < 21)"],
											["< 22°C", "{temperature} . FILTER({temperature} < 22)"],
											["< 23°C", "{temperature} . FILTER({temperature} < 23)"],
											["< 24°C", "{temperature} . FILTER({temperature} < 24)"],
											["< 25°C", "{temperature} . FILTER({temperature} < 25)"],
											["< 26°C", "{temperature} . FILTER({temperature} < 26)"],
											["< 27°C", "{temperature} . FILTER({temperature} < 27)"],
											["< 28°C", "{temperature} . FILTER({temperature} < 28)"],
											["< 29°C", "{temperature} . FILTER({temperature} < 29)"],
											["< 30°C", "{temperature} . FILTER({temperature} < 30)"],
										]
									]
								]
							],[
								"calendar", "iti:time iti:is {time} .\n\t{event} sf_ns:start {startCalendar} . FILTER( {time} >= {startCalendar}) .\n\t{event} sf_ns:end {endCalendar} . FILTER( {time} < {endCalendar}) .\n\t{event} sf_ns:subject",
								[
									["has event", "", 
										[
											["?", "{event}"],
											["radio","{eventSubject} . FILTER regex({eventSubject}, 'Radio', 'i')"],
											["fan","{eventSubject} . FILTER regex({eventSubject}, 'fan', 'i')"],
											["meeting","{eventSubject} . FILTER regex({eventSubject}, 'meeting', 'i')"]
										]
									]
								]
							]
						], 
		}

		return modules;
	}
);

