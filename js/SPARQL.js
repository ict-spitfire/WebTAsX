var lineid = 0;
define(
	[
		"modules",
		"dnd"
	],
	function(module, dnd) {
		var SPARQL = function(e) {
			this.e = e;
			this.s_mapping = module.mapping;
		}

		SPARQL.prototype.init = function (name, showName) {
			var that = this;
			var local = $("<span class=\"spo\"></span>");
			local.append("<br>");
			// Add [+]-Button to the content pane
			var input = $("<input class=\"btn\" type=\"button\" value=\"+\">");
			local.append(input);

			var div_rules = $("<div style=\"margin-top:5px;\"></div>");

			input.click(function(e) {
				div_rules.append(that.create());
				info_msg_rules.hide();
				//update("input.click");
			});

			if(showName) {
				var name = $("<input style=\"margin-bottom:0px\" type=\"text\">");
				local.append("&nbsp;", name);
			}

			// Create a div, to keep all rules and add it to the content pane
			var info_msg_rules = $(create_info("No " + name +" rules yet. Click the [+] button.", false)); // Empty message
			div_rules.append(info_msg_rules);
			local.append(div_rules);		
			this.e.append(local);
			this.spo = local;
			return local;
		}

		SPARQL.prototype.create = function() {

			var that = this;
			var spo_id = "spo" + (lineid++);
			var div_spo = $("<div data-id=\"" + spo_id + "\" class=\"query-spo\"></div>");
	
			createimg = function() {
				return $("<img class=\"dnd\" src=\"img/arrow_in.png\">");
			}

			// SPO-divs
			var div_s = $("<div data-id=\"s" + lineid + "\" draggable=\"true\" class=\"box\"></div>"); //  style=\"padding:2px; border: 2px solid red;\"
			var div_p = $("<div data-id=\"p" + lineid + "\" draggable=\"true\" class=\"box\"></div>"); //  style=\"padding:2px; border: 2px solid blue;\"
			var div_o = $("<div data-id=\"o" + lineid + "\" draggable=\"true\" class=\"box\"></div>"); //  style=\"padding:2px; border: 2px solid green;\"

			var map_dnd = function(div) {
				// By dnd.js file
				div.bind('dragstart', dnd.handleDragStart);
				div.bind('dragend', dnd.handleDragEnd);
				div.bind('dragover', dnd.handleDragOver);
				div.bind('drop', dnd.handleDrop);
			}  

			map_dnd(div_s);
			map_dnd(div_p);
			map_dnd(div_o);

			var div_del = $("<span></span>");
	
			var del_img = $("<img style=\"cursor:pointer;\" src=\"img/cancel.png\">");
			del_img.click(function() {
				div_spo.remove();
			});
			div_del.append(del_img);

			// Append SPO-divs to main div
			div_spo.append(div_s);
			div_spo.append(div_p);
			div_spo.append(div_o);
			div_spo.append(div_del);

			var s_change = function() {
				var s_text = select_s.find("option:selected").text();

				for(var i = 0; i<that.s_mapping.length; i++) {
					if(that.s_mapping[i][0] == s_text) {
						var p_mapping = that.s_mapping[i][2];

						var p_change = function(e){
							var text = select_p.find("option:selected").text();
							var select_o = null;
							for(var i = 0; i<p_mapping.length; i++) {
								if(p_mapping[i][0] == text) {
									var o_change = function(e){
										//update("o_change");
									};
									var o_mapping = p_mapping[i][2];

									if(typeof(o_mapping) == "undefined") {
										select_o = that.generate_select([["?","?"]], o_change);
									} else {
										select_o = that.generate_select(o_mapping, o_change, "actors");
									}
								}
							}
							div_o.empty();
							div_o.append(select_o);
							//update("p_change");
						};
						var select_p = that.generate_select(p_mapping, p_change, "actors");
						div_p.empty();
						div_p.append(select_p);

						// Empty select for O
						var select_o = $('<select class="o"></select>');
						select_o.append("<option value=\"?\">?</option>");

						select_p.trigger('change');
					}
				}
				//update("s_change");
			}

			// Select for S
			var select_s = this.generate_select(this.s_mapping, s_change, "actors");
			div_s.append(select_s);
			select_s.trigger('change');
			return div_spo;
		}

		// o[0] what to show
		// o[1] what to map
		// o[2] 
		// o[3] preselected
		// event changeevent
		SPARQL.prototype.generate_select = function (o, event, str) {
			var select = $('<select></select>');

			for(var j = 0; j<o.length; j++) {
				var option = "<option value=\"" + o[j][1] + "\" ";

				if(typeof(str) == "string" && typeof(o[j][2]) == "string") {
					option += "" + str + "=\"" + o[j][2] + "\" ";			
				}

				if(o[j][3] == true) {
					option += " selected";
				}
				option += ">" + o[j][0] + "</option>";
				select.append(option);
			}
			if(typeof(event) == "function") {
				select.change(event);
			}
			return select;
		}

		SPARQL.prototype.getSparql = function () {
			var spo = this.spo.find(".query-spo");
			var valCnt = 0;
			var q = null;
			var result = new Object();
			if(spo.length == 0) {
				return;
			} else {

				var ids = [];
			
				q = "";
				var actors = []; 	
				var variables = [];
				for(var i = 0; i < spo.length; i++) {
					var children = spo[i].childNodes;

		            var tmp = "";

					for(var j = 0; j < children.length; j++) {
						var c = children[j];
						var v = $(c).attr("data-var");
						var e = $(c.firstChild);
						// Skip the dnd-image
						if(e.is("img")) break;
						var option = e.find("option:selected");
						var actor = option.attr("actors");
						if(typeof(actor) == "string" && actor != "") {
							actors.push(actor);
						}

						var val = e.val();

						var cont = false;

						if(typeof(v) == "string" && val.indexOf("{val}") >= 0) {
							if(val.indexOf("{val}") >= 0) {
								val = val.replace(new RegExp("{val}", "g"), "?" + v);
							}
		                    tmp += val;
						} else if (val == "?") {
							var varx = "?val" + (++valCnt);
							variables.push(varx);
							tmp += varx;
						} else if (typeof(v) != "string" && val.indexOf("{val}") >= 0) {
							var varx = "?val" + (++valCnt);
							variables.push(varx);
							if(val.indexOf("{val}") >= 0) {
								val = val.replace(new RegExp("{val}", "g"), varx);
							}
		                    tmp += val;
						} else {
		                    tmp += val;
						}
					
						tmp += " ";
					}

		            // http://coding.pressbin.com/16/Javascript-equivalent-of-PHPs-pregmatchall
		            function preg_match_all(regex, haystack) {
		                var globalRegex = new RegExp(regex, 'g');
		                var globalMatch = haystack.match(globalRegex);
		                matchArray = new Array();
						if(globalMatch != null) {
			                for(var gmi = 0; gmi < globalMatch.length; gmi++) {
			                    nonGlobalRegex = new RegExp(regex);
			                    nonGlobalMatch = globalMatch[gmi].match(nonGlobalRegex);
			                    matchArray.push(nonGlobalMatch[1]);
			                }
						}
		                return matchArray;
		            }

		            var regex = '{([^"]*?)}';
		            var matches = preg_match_all(regex, tmp);

		            // http://stackoverflow.com/a/15868720/605890
		            var uniq = matches.reduce(function(a,b){
		                if (a.indexOf(b) < 0 ) a.push(b);
		                return a;
		            },[]);

		            // Replace the vars
		            for(var k = 0; k<uniq.length; k++) {
		                var varname = uniq[k];
		                var varx = "?" + varname + (++valCnt);
						variables.push(varx);
		                tmp = tmp.replace(new RegExp("{" + varname + "}", "g"), varx);

		                // Check, if any actor is a variable as well
		                if(actors.length > 0) {
		                    for(var aidx = 0; aidx < actors.length; aidx++) {
		                        var actor = actors[aidx];
		                        if(actor == "{" + varname + "}") {
		                            actors[aidx] = varx;
		                        }
		                    }
		                }
		            }

		            // Here, one line is complete
		            if(tmp.indexOf("<s>") >= 0) {
		                var varx = "?val" + (++valCnt);
						variables.push(varx);
		                tmp = tmp.replace(new RegExp("<s>", "g"), "" + varx + " ");
		            }

		            q += "\t" + tmp + " . \n";
				}

				//q = "{\n" + q + "}";
			
				if(actors.length == 0) {
					result.selections = "*";
					result.hasActuator = false;
					console.log("Query does not contain any actor!");
				} else {
					result.hasActuator = true;
					result.selections = actors.join(" ");
				}

				result.variables = variables;
				result.query = q;
				//console.log(q);
			}

			result.prefixes = "";
			for(var i = 0; i<module.prefixes.length; i++) {
				result.prefixes += "PREFIX " + module.prefixes[i][0] + ":<" + module.prefixes[i][1] + ">\n";
			}
			return result;
		}


		return SPARQL;
	}
)


