var package_info = require("./package.json");
for(var dependency in package_info.dependencies) {
	var name = dependency.replace('.js','');
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
		"utilisation de la commande !twitch : <command> <channelname>\n"
		+"exemple: !twitch status lastwolfplay\n"
		+"commandes disponibles:\n"
		+"- online\n"
		+"- status\n"
		+"- game\n"
		+"- channel\n"
	);
};

// Only one function to get all data
exports.get = function get(options) {
	var command_api = api[options.command];
	var url = command_api.url+options.param;
	console.log("Requesting: "+url);
	request(url, function(err, res, body) {
		var result = JSON.parse(body);
		if(options.command == "online") {
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
		}
	});
};