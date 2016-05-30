var package_info = require("./package.json");
for(var dependency in package_info.dependencies) {
	var name = dependency.replace('.js','').replace('-','');
	console.log("Loading "+dependency);
	try {
		eval("var "+name+" = require(\""+dependency+"\")");
		console.log("LIB : "+dependency+" [OK]");
	} catch(e) {
		console.log(e.stack);
		console.log(process.version);
		console.log("Please run npm install "+dependency+" and ensure it passes with no errors!");
		process.exit();
	}
}

// Get authentication data
try {
	var AuthDetails = require("../../auth.json");
} catch (e){
	console.log("Please create an auth.json with at least an email and password.\n"+e.stack);
	process.exit();
}

// Get api command list
try {
	var api = require("./api.json");
	console.log("FILE : api.json [OK]");
} catch(e) {
	console.log("Please check the api.json file.\n"+e.stack);
	process.exit();
}

// Default help function
exports.help = function help(options) {
	options.bot.sendMessage(
		options.message.channel,
		"utilisation de la commande !diablo : <command> <params|param1:param2>\n"
		//+"exemple: !diablo leader 6:rift-wizard\n"
		+"exemple: !diablo profile lothereus-2562\n"
		+"commandes disponibles:\n"
		//+"- leader <season>:<type> NON-IMPLEMENTE\n"
		+"- profile <battletag-####>\n"
		//+"- hero <battletag-####>:<idhero> NON-IMPLEMENTE\n"
	);
};

// Only one function to get all data
exports.get = function get(options) {
	var command_api = api[options.command];
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*var url = command_api.url;
	url = url + "?locale="+package_info.config.locale;
	
	// set url
	if(options.command == "leader" || options.command == "hero") {
		var params = options.param.split(":");
		if(options.command == "leader") {
			url = url.replace("#season#", params[0])
						.replace("#type#", params[1]);
		}
		if(options.command == "hero") {
			url = url.replace("#battletag#", params[0])
						.replace("#idhero#", params[1]);
		}
	}
	if(options.command == "profile") {
		url = url.replace("#battletag#", options.param);
	}
	
	url = url + "&" + command_api.auth + "=" + AuthDetails.blizzard[command_api.auth];
	
	console.log("Requesting: "+url);
	request(url, function(err, res, body) {
		var result = JSON.parse(body);
		var message = result.battleTag+":\n"
						+"- Parangon (era|hc|s|shc): "+result.paragonLevel+"|"+result.paragonLevelHardcore+"|"+result.paragonLevelSeason+"|"+result.paragonLevelSeasonHardcore+"\n"
						+"- Guilde: "+result.guildName+"\n"
						+"- Kills (m|e|hc): "+result.kills.monsters+"|"+result.kills.elites+"|"+result.kills.hardcoreMonsters+"\n";
		options.bot.sendMessage(options.message.channel, message);*/
		/*if(options.command == "online") {
			if(result.stream) {
				//console.log(options.param+" is streaming!");
				var message = command_api.message;
				if(command_api.fields.length > 1) {
					message += command_api.additional;
				}
				for(i in command_api.fields) {
					message = message.replace("#"+command_api.fields[i]+"#", result.stream[command_api.fields[i]]);
				}
				message = message.replace("#USER#", options.param);
				message = message.replace(/#NL#/g,"\n");
				//console.log("Message will be sent: "+message);
				options.bot.sendMessage(options.message.channel, message);
			} else {
				//console.log(options.param+" is offline!");
				var message = command_api.error.replace("#USER#", options.param);
				//console.log("Message will be sent: "+message);
				options.bot.sendMessage(options.message.channel, message);
				//console.log(err + " / " + res + " / " + body);
			}
		} else {
			if(command_api.method && command_api.method == "file") {
				var file = result[command_api.fields[0]];
				options.bot.sendFile(options.message.channel, file);
			} else {
				var message = command_api.message;
				if(command_api.fields.length > 1) {
					message += command_api.additional;
				}
				for(i in command_api.fields) {
					message = message.replace("#"+command_api.fields[i]+"#", result[command_api.fields[i]]);
				}
				message = message.replace("#USER#", options.param);
				message = message.replace(/#NL#/g,"\n");
				//console.log("Message will be sent: "+message);
				options.bot.sendMessage(options.message.channel, message);
			}
		}*/
	});
};