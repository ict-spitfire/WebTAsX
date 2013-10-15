var modules = null;

/*
*/

define(
	['config'],
	function(config) {
		var modules = {
			prefixes : [
				["xsd", "http://www.w3.org/2001/XMLSchema#"],
				["ssn", "http://purl.oclc.org/NET/ssnx/ssn#"],
				["sf_ns", "http://spitfire-project.eu/ontology/ns/"],
				["sf_sn", "http://spitfire-project.eu/ontology/ns/sn/"],
				["sf_p", "http://spitfire-project.eu/property/"],
				["sf_foi", "http://spitfire-project.eu/foi/"],
				["rdfs", "http://www.w3.org/2000/01/rdf-schema#"],
				["rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#"],
				["iti", "http://www.iti.uni-luebeck.de/"],
				["dul", "http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#"],
				//["owl", "http://www.w3.org/2002/07/owl#"],
				["cal", "http://calendar/resource/"],
				["vocab", "http://calendar/resource/vocab/"]
				//#PREFIX map: <http://calendar/resource/#>
			],
			mapping :
						[
							[
								"node", "{val}",
								[
									["?", "?"],
									["measures", "ssn:attachedSystem {val}.\n\t{val} sf_ns:obs {type} .\n\t{val} sf_ns:value", 
										[
											["?" ,   "{value}"],
										]
									],
									["measures light", "ssn:attachedSystem {val}.\n\t{val} sf_ns:obs sf_p:Light .\n\t{val} sf_ns:value", 
										[
											["?" ,   "{light}"],
											["on" ,  "{light} . FILTER({light} >= lightThreshold!)"],
											["off" , "{light} . FILTER({light} < lightThreshold!)"],
										]
									],
									["measures movement", "ssn:attachedSystem {val}.\n\t{val} sf_ns:obs sf_sn:Movement .\n\t{val} sf_ns:value", 
										[
											["?" ,   "{movement}"],
											["on" ,  "{movement} . FILTER({movement} > 0)"],
											["off" , "{movement} . FILTER({movement} < 1)"],
										]
									],
									["measures power consumption (mA)", "ssn:attachedSystem {val}.\n\t{val} sf_ns:obs sf_p:PowerConsumption .\n\t{val} sf_ns:value", 
										[
											["?" ,   		"{powerConsumption}"],
											["plugged" ,	"{powerConsumption} . FILTER({powerConsumption} >= 100)"],
											["unplugged" ,  "{powerConsumption} . FILTER({powerConsumption} < 100)"],
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
									["has actuator", "ssn:attachedSystem",
										[
											["?",       "{actor} .		\n\t{actor} rdf:type sf_ns:Actuator",	"{actor}"],
											["Fan",		"{fanActor} . 	\n\t{fanActor} rdf:type sf_sn:Fan", 		"{fanActor}"],
											["Switch",  "{radioActor} . \n\t{radioActor} rdf:type sf_sn:Switch", 	"{radioActor}"]
										]
									],

									["is in", "ssn:featureOfInterest",
										[
											function(callback, div_spo, sparql) {
												setTimeout(function() {
													var q = sparql.getSparql(div_spo);
													doSparqlQuery(q.sparql, function(res) {
														var result = [];
														var data = parseSparqlXML(res);
														var i = 0;
														for(i=0;i<data.title.length;i++) {
															if(data.title[i].indexOf("room") >= 0) {
																break;
															}
														}
														console.log(i);
														var rooms = [];
														for(var j=0;j<data.data.length;j++) {
															var d = data.data[j][i];
															if(rooms.contains(d)) {
																continue;
															}
															rooms.push(d);
															var last = d.lastIndexOf(":");
															var room = d.substring(last+1, d.length);
															if(room.endsWith("/")) {
																room = room.substring(0, room.length-1);
															}
															result.push([room, "[" + d + "]"]);
														}
														callback(result);
													});
												},0)
												return [
													["?", "{room}.\n\t{room} rdf:type sf_foi:Room"],
													["Room Dummy", "[http://dummyRoom]"]
												];
											}
										]
									],
									["has location", "dul:hasLocation",
										[
											function(callback, div_spo, sparql) {
												setTimeout(function() {
													var q = sparql.getSparql(div_spo);
													doSparqlQuery(q.sparql, function(res) {
														var result = [];
														var data = parseSparqlXML(res);
														var i = 0;
														for(i=0;i<data.title.length;i++) {
															if(data.title[i].indexOf("hasLocation") >= 0) {
																break;
															}
														}
														console.log(i);
														var rooms = [];
														for(var j=0;j<data.data.length;j++) {
															var d = data.data[j][i];
															if(rooms.contains(d)) {
																continue;
															}
															rooms.push(d);
															result.push([d, "'" + d + "'"]);
														}
														callback(result);
													});
												},0)
												return [
													["?", "{hasLocation}"],
													["Dummy Location", "'Dummy Location'"]
												];
											}
										]
									]
								]
							],
							["calendar", "?evt vocab:occurrencesid ?occ  .\n\t?occ vocab:occurrences_start_ts ?start .\n\t?occ vocab:occurrences_end_ts ?end .\n\t?evt vocab:events_subject",
								[
									["has event", "", 
										[
											function(callback, div_spo, sparql) {
												setTimeout(function() {
													var q = sparql.getSparql(div_spo);
													doSparqlQuery(q.sparql, function(res) {
														var result = [];
														var data = parseSparqlXML(res);
														var i = 0;
														for(i=0;i<data.title.length;i++) {
															if(data.title[i].indexOf("title") >= 0) {
																break;
															}
														}
														console.log(i);
														var rooms = [];
														for(var j=0;j<data.data.length;j++) {
															var d = data.data[j][i];
															if(rooms.contains(d)) {
																continue;
															}
															rooms.push(d);
															result.push([d, "'" + d + "' . FILTER(?start < now! && ?end > now!)"]);
														}
														callback(result);
													});
												},0)
												return [
													["?", "{title}"],
													["Dummy Event", "'dummyEventTitle' . FILTER(?start < now! && ?end > now!)"]
												];
											}
										]
									]
								]
							]
						], 
		}

		return modules;
	}
);

