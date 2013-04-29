var modules = null;

define(
	['config'],
	function() {
		var modules = {
			title : "Query-GUI",
			mapping :
						[
							[
								"node", "{val}",
								[
									["?", "?"],
									["measures light", "<http://purl.oclc.org/NET/ssnx/ssn#attachedSystem> {val}.\n\t{val} <http://spitfire-project.eu/ontology/ns/obs> <http://spitfire-project.eu/property/Light> .\n\t{val} <http://spitfire-project.eu/ontology/ns/value>", 
										[
											["?" ,   "{light}", "{light}"],
											["on" ,  "{light} . FILTER({light} >= " + config["lightThreshold"] + ")"],
											["off" , "{light} . FILTER({light} < " + config["lightThreshold"] + ")"],
										]
									],
									["measures temperature", "<http://purl.oclc.org/NET/ssnx/ssn#attachedSystem> {val}.\n\t{val} <http://spitfire-project.eu/ontology/ns/obs> <http://spitfire-project.eu/property/Temperature> .\n\t{val} <http://spitfire-project.eu/ontology/ns/value>", 
										[
											["?" ,   "{temperature}", "{temperature}"],
											["> 10°C" ,  "{temperature} . FILTER({temperature} >= 10)", "{temperature}"],
											["> 11°C" ,  "{temperature} . FILTER({temperature} >= 11)", "{temperature}"],
											["> 12°C" ,  "{temperature} . FILTER({temperature} >= 12)", "{temperature}"],
											["> 13°C" ,  "{temperature} . FILTER({temperature} >= 13)", "{temperature}"],
											["> 14°C" ,  "{temperature} . FILTER({temperature} >= 14)", "{temperature}"],
											["> 15°C" ,  "{temperature} . FILTER({temperature} >= 15)", "{temperature}"],
											["> 16°C" ,  "{temperature} . FILTER({temperature} >= 16)", "{temperature}"],
											["> 17°C" ,  "{temperature} . FILTER({temperature} >= 17)", "{temperature}"],
											["> 18°C" ,  "{temperature} . FILTER({temperature} >= 18)", "{temperature}"],
											["> 19°C" ,  "{temperature} . FILTER({temperature} >= 19)", "{temperature}"],
											["> 20°C" ,  "{temperature} . FILTER({temperature} >= 20)", "{temperature}", true],
											["> 21°C" ,  "{temperature} . FILTER({temperature} >= 21)", "{temperature}"],
											["> 22°C" ,  "{temperature} . FILTER({temperature} >= 22)", "{temperature}"],
											["> 23°C" ,  "{temperature} . FILTER({temperature} >= 23)", "{temperature}"],
											["> 24°C" ,  "{temperature} . FILTER({temperature} >= 24)", "{temperature}"],
											["> 25°C" ,  "{temperature} . FILTER({temperature} >= 25)", "{temperature}"],
											["> 26°C" ,  "{temperature} . FILTER({temperature} >= 26)", "{temperature}"],
											["> 27°C" ,  "{temperature} . FILTER({temperature} >= 27)", "{temperature}"],
											["> 28°C" ,  "{temperature} . FILTER({temperature} >= 28)", "{temperature}"],
											["> 29°C" ,  "{temperature} . FILTER({temperature} >= 29)", "{temperature}"],
											["> 30°C" ,  "{temperature} . FILTER({temperature} >= 30)", "{temperature}"],
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
									["has actor", "<http://purl.oclc.org/NET/ssnx/ssn#attachedSystem>",
										[
											["?",       "{actor} . FILTER regex(str({hasA}), 'actor', 'i')", "{actor}"],
											["fan",     "{fanActor} . FILTER regex(str({fanActor}), 'actor', 'i') . \n\t{fanActor} <http://www.w3.org/2000/01/rdf-schema#type> <http://purl.oclc.org/NET/ssnx/ssn#fan>", "{fanActor}"],
											["radio",   "{radioActor} . FILTER regex(str({radioActor}), 'actor', 'i') . \n\t{radioActor} <http://www.w3.org/2000/01/rdf-schema#type> <http://purl.oclc.org/NET/ssnx/ssn#switch>", "{radioActor}"]
										]
									],
									["is in", "<http://purl.oclc.org/NET/ssnx/ssn#featureOfInterest>",
										[
											["?", "{featureOfInterest}", "{featureOfInterest}"],
											["kitchen", "<http://spitfire-project.eu/foi/kitchen>"],
											["living room", "<http://spitfire-project.eu/foi/livingroom>"]
										]
									]
								]
							],
							[
								"weather", "<http://www.iti.uni-luebeck.de/time> <http://www.iti.uni-luebeck.de/is> {time} .\n\t{forecast} <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://spitfire-project.eu/ontology/ns/sn/temperatureForecast> .\n\t{forecast} <http://spitfire-project.eu/ontology/ns/sn/time_start> {startForecast} . FILTER({time} >= {startForecast})\n\t{forecast} <http://spitfire-project.eu/ontology/ns/sn/time_end> {endForecast} . FILTER({time} <= {endForecast})\n\t{forecast} <http://spitfire-project.eu/ontology/ns/value>",
								[
									["temperatur is", "",
										[
											["?" , "{temperatur}", "{temperatur}"],
											["> 10°C", "{temperatur} . FILTER({temperatur} > 10)", "{temperatur}"],
											["> 11°C", "{temperatur} . FILTER({temperatur} > 11)", "{temperatur}"],
											["> 12°C", "{temperatur} . FILTER({temperatur} > 12)", "{temperatur}"],
											["> 13°C", "{temperatur} . FILTER({temperatur} > 13)", "{temperatur}"],
											["> 14°C", "{temperatur} . FILTER({temperatur} > 14)", "{temperatur}"],
											["> 15°C", "{temperatur} . FILTER({temperatur} > 15)", "{temperatur}"],
											["> 16°C", "{temperatur} . FILTER({temperatur} > 16)", "{temperatur}"],
											["> 17°C", "{temperatur} . FILTER({temperatur} > 17)", "{temperatur}"],
											["> 18°C", "{temperatur} . FILTER({temperatur} > 18)", "{temperatur}"],
											["> 19°C", "{temperatur} . FILTER({temperatur} > 19)", "{temperatur}"],
											["> 20°C", "{temperatur} . FILTER({temperatur} > 20)", "{temperatur}", true],
											["> 21°C", "{temperatur} . FILTER({temperatur} > 21)", "{temperatur}"],
											["> 22°C", "{temperatur} . FILTER({temperatur} > 22)", "{temperatur}"],
											["> 23°C", "{temperatur} . FILTER({temperatur} > 23)", "{temperatur}"],
											["> 24°C", "{temperatur} . FILTER({temperatur} > 24)", "{temperatur}"],
											["> 25°C", "{temperatur} . FILTER({temperatur} > 25)", "{temperatur}"],
											["> 26°C", "{temperatur} . FILTER({temperatur} > 26)", "{temperatur}"],
											["> 27°C", "{temperatur} . FILTER({temperatur} > 27)", "{temperatur}"],
											["> 28°C", "{temperatur} . FILTER({temperatur} > 28)", "{temperatur}"],
											["> 29°C", "{temperatur} . FILTER({temperatur} > 29)", "{temperatur}"],
											["> 30°C", "{temperatur} . FILTER({temperatur} > 30)", "{temperatur}"],
											["< 10°C", "{temperatur} . FILTER({temperatur} < 10)", "{temperatur}"],
											["< 11°C", "{temperatur} . FILTER({temperatur} < 11)", "{temperatur}"],
											["< 12°C", "{temperatur} . FILTER({temperatur} < 12)", "{temperatur}"],
											["< 13°C", "{temperatur} . FILTER({temperatur} < 13)", "{temperatur}"],
											["< 14°C", "{temperatur} . FILTER({temperatur} < 14)", "{temperatur}"],
											["< 15°C", "{temperatur} . FILTER({temperatur} < 15)", "{temperatur}"],
											["< 16°C", "{temperatur} . FILTER({temperatur} < 16)", "{temperatur}"],
											["< 17°C", "{temperatur} . FILTER({temperatur} < 17)", "{temperatur}"],
											["< 18°C", "{temperatur} . FILTER({temperatur} < 18)", "{temperatur}"],
											["< 19°C", "{temperatur} . FILTER({temperatur} < 19)", "{temperatur}"],
											["< 20°C", "{temperatur} . FILTER({temperatur} < 20)", "{temperatur}"],
											["< 21°C", "{temperatur} . FILTER({temperatur} < 21)", "{temperatur}"],
											["< 22°C", "{temperatur} . FILTER({temperatur} < 22)", "{temperatur}"],
											["< 23°C", "{temperatur} . FILTER({temperatur} < 23)", "{temperatur}"],
											["< 24°C", "{temperatur} . FILTER({temperatur} < 24)", "{temperatur}"],
											["< 25°C", "{temperatur} . FILTER({temperatur} < 25)", "{temperatur}"],
											["< 26°C", "{temperatur} . FILTER({temperatur} < 26)", "{temperatur}"],
											["< 27°C", "{temperatur} . FILTER({temperatur} < 27)", "{temperatur}"],
											["< 28°C", "{temperatur} . FILTER({temperatur} < 28)", "{temperatur}"],
											["< 29°C", "{temperatur} . FILTER({temperatur} < 29)", "{temperatur}"],
											["< 30°C", "{temperatur} . FILTER({temperatur} < 30)", "{temperatur}"],
										]
									]
								]
							],[
								"calendar", "<http://www.iti.uni-luebeck.de/time> <http://www.iti.uni-luebeck.de/is> {time} .\n\t{event} <http://spitfire-project.eu/ontology/ns/start> {startCalendar} . FILTER( {time} >= {startCalendar}) .\n\t{event} <http://spitfire-project.eu/ontology/ns/end> {endCalendar} . FILTER( {time} <= {endCalendar} .\n\t{event} <http://spitfire-project.eu/ontology/ns/subject>",
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

