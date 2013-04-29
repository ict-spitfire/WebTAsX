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
											["?" ,   "{lightValue}", "{lightValue}"],
											["on" ,  "{val}lightValue . FILTER({val}lightValue >= " + config["lightThreshold"] + ")"],
											["off" , "{val}lightValue . FILTER({val}lightValue < " + config["lightThreshold"] + ")"],
										]
									],
									["measures temperature", "<http://purl.oclc.org/NET/ssnx/ssn#attachedSystem> {val}.\n\t{val} <http://spitfire-project.eu/ontology/ns/obs> <http://spitfire-project.eu/property/Temperature> .\n\t{val} <http://spitfire-project.eu/ontology/ns/value>", 
										[
											["?" ,   "{tempValue}", "{tempValue}"],
											["> 10°C" ,  "{val}tempValue . FILTER({val}tempValue >= 10)"],
											["> 11°C" ,  "{val}tempValue . FILTER({val}tempValue >= 11)"],
											["> 12°C" ,  "{val}tempValue . FILTER({val}tempValue >= 12)"],
											["> 13°C" ,  "{val}tempValue . FILTER({val}tempValue >= 13)"],
											["> 14°C" ,  "{val}tempValue . FILTER({val}tempValue >= 14)"],
											["> 15°C" ,  "{val}tempValue . FILTER({val}tempValue >= 15)"],
											["> 16°C" ,  "{val}tempValue . FILTER({val}tempValue >= 16)"],
											["> 17°C" ,  "{val}tempValue . FILTER({val}tempValue >= 17)"],
											["> 18°C" ,  "{val}tempValue . FILTER({val}tempValue >= 18)"],
											["> 19°C" ,  "{val}tempValue . FILTER({val}tempValue >= 19)"],
											["> 20°C" ,  "{val}tempValue . FILTER({val}tempValue >= 20)", null, true],
											["> 21°C" ,  "{val}tempValue . FILTER({val}tempValue >= 21)"],
											["> 22°C" ,  "{val}tempValue . FILTER({val}tempValue >= 22)"],
											["> 23°C" ,  "{val}tempValue . FILTER({val}tempValue >= 23)"],
											["> 24°C" ,  "{val}tempValue . FILTER({val}tempValue >= 24)"],
											["> 25°C" ,  "{val}tempValue . FILTER({val}tempValue >= 25)"],
											["> 26°C" ,  "{val}tempValue . FILTER({val}tempValue >= 26)"],
											["> 27°C" ,  "{val}tempValue . FILTER({val}tempValue >= 27)"],
											["> 28°C" ,  "{val}tempValue . FILTER({val}tempValue >= 28)"],
											["> 29°C" ,  "{val}tempValue . FILTER({val}tempValue >= 29)"],
											["> 30°C" ,  "{val}tempValue . FILTER({val}tempValue >= 30)"],
											["< 10°C" ,  "{val}tempValue . FILTER({val}tempValue < 10)"],
											["< 11°C" ,  "{val}tempValue . FILTER({val}tempValue < 11)"],
											["< 12°C" ,  "{val}tempValue . FILTER({val}tempValue < 12)"],
											["< 13°C" ,  "{val}tempValue . FILTER({val}tempValue < 13)"],
											["< 14°C" ,  "{val}tempValue . FILTER({val}tempValue < 14)"],
											["< 15°C" ,  "{val}tempValue . FILTER({val}tempValue < 15)"],
											["< 16°C" ,  "{val}tempValue . FILTER({val}tempValue < 16)"],
											["< 17°C" ,  "{val}tempValue . FILTER({val}tempValue < 17)"],
											["< 18°C" ,  "{val}tempValue . FILTER({val}tempValue < 18)"],
											["< 19°C" ,  "{val}tempValue . FILTER({val}tempValue < 19)"],
											["< 20°C" ,  "{val}tempValue . FILTER({val}tempValue < 20)"],
											["< 21°C" ,  "{val}tempValue . FILTER({val}tempValue < 21)"],
											["< 22°C" ,  "{val}tempValue . FILTER({val}tempValue < 22)"],
											["< 23°C" ,  "{val}tempValue . FILTER({val}tempValue < 23)"],
											["< 24°C" ,  "{val}tempValue . FILTER({val}tempValue < 24)"],
											["< 25°C" ,  "{val}tempValue . FILTER({val}tempValue < 25)"],
											["< 26°C" ,  "{val}tempValue . FILTER({val}tempValue < 26)"],
											["< 27°C" ,  "{val}tempValue . FILTER({val}tempValue < 27)"],
											["< 28°C" ,  "{val}tempValue . FILTER({val}tempValue < 28)"],
											["< 29°C" ,  "{val}tempValue . FILTER({val}tempValue < 29)"],
											["< 30°C" ,  "{val}tempValue . FILTER({val}tempValue < 30)"],

										]
									],
									["has actor", "<http://purl.oclc.org/NET/ssnx/ssn#attachedSystem>",
										[
											["?",       "{actor} . FILTER regex(str({hasA}), 'actor', 'i')", "{actor}"],
											["fan",     "{fan} . FILTER regex(str({fan}), 'actor', 'i') . \n\t{fan} <http://www.w3.org/2000/01/rdf-schema#type> <http://purl.oclc.org/NET/ssnx/ssn#fan>", "{fan}"],
											["radio",   "{radio} . FILTER regex(str({radio}), 'actor', 'i') . \n\t{radio} <http://www.w3.org/2000/01/rdf-schema#type> <http://purl.oclc.org/NET/ssnx/ssn#switch>", "{radio}"]
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
											["?" , "{temperatur}", "{temperatur}"]
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

