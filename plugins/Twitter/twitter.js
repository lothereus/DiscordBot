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

// Get authentication data
try {
    var AuthDetails = require("../../auth.json");
} catch (e){
    console.log("Please create an auth.json with at least an email and password.\n"+e.stack);
    process.exit();
}

// Define twitter client
try {
    var twitter_client = new twitter({
        consumer_key: AuthDetails.twitter.consumer_key,
        consumer_secret: AuthDetails.twitter.consumer_secret,
        access_token_key: AuthDetails.twitter.access_token_key,
        access_token_secret: AuthDetails.twitter.access_token_secret
    });
} catch (e){
    console.log("Error Twitter.Client");
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
        "utilisation de la commande !twitter : <command> <user>\n"
        +"exemple: !twitter stats lastwolfplays\n"
        +"commandes disponibles:\n"
        +"- lasttweet\n"
        +"- stats\n"
    );
};

// Only one function to get all data
exports.get = function get(options) {
    if(options.clear) {
    options.bot.deleteMessage(options.message);
    }
    var command_api = api[options.command];
    //console.log("COMMAND: "+JSON.stringify(command_api));
    var endpoint = command_api.endpoint;
    var params = {screen_name: options.param};
    for(i in command_api.params) {
        var param = command_api.params[i];
        params[param.name] = param.value;
    }
    console.log("Requesting: "+endpoint+" with param "+JSON.stringify(params));	
    twitter_client.get(endpoint, params, function(error, object, response) {
        if(!error) {
            if(command_api.type == "tweet") {
                options.bot.sendMessage(options.message.channel, options.param + command_api.message + object[0].text);
            } else if(command_api.type == "user") {
                var message = command_api.message;
                if(command_api.fields.length > 1) {
                    message += command_api.additional;
                }
                for(i in command_api.fields) {
                    message = message.replace("#"+command_api.fields[i]+"#", object[command_api.fields[i]]);
                }
                message = message.replace(/#NL#/g,"\n");
                options.bot.sendMessage(options.message.channel, message);
            }
        } else {
            if(error[0].code == 34) {
                options.bot.sendMessage(options.message.channel, command_api.error);
            } else {
                console.log("Something bad happened: "+JSON.stringify(error));
            }
        }
    });
};