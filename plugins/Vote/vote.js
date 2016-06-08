// Get all required npm modules
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

try {
	var api = require("./api.json");
	console.log("FILE : api.json [OK]");
} catch(e) {
	console.log("Please check the api.json file.\n"+e.stack);
	process.exit();
}

try {
	var votes = require("./votes.json");
	console.log("FILE : votes.json [OK]");
} catch(e) {
	console.log("Please check the votes.json file.\n"+e.stack);
	process.exit();
}

// Default help function
exports.help = function help(options) {
    var infos = "utilisation de la commande !vote : <type> (<vote>)\n"
        +"exemple pour lister les choix: !vote mdc\n"
        +"exemple pour voter: !vote mdc 7\n"
        +"votes disponibles en ce moment:\n";
        for(var i in votes.current) {
            var end_date = new Date(votes.current[i].end);
            infos += "- "+votes.current[i].name+" ("+i+") - fin: "+frenchDate(end_date.toDateString())+"\n";
        }
    options.bot.sendMessage(options.message.channel, infos);
};

// Only one function to get all data
exports.get = function get(options) {
    var command = api[options.command];
};

function frenchDate(date)
{
    date = date.replace('Mon','Lun')
            .replace('Tue','Mar')
            .replace('Wed','Mer')
            .replace('Thu','Jeu')
            .replace('Fri','Ven')
            .replace('Sat','Sam')
            .replace('Sun','Dim')
            .replace('Feb','Fev')
            .replace('Apr','Avr')
            .replace('May','Mai')
            .replace('Jun','Juin')
            .replace('Jul','Juil')
            .replace('Aug','Août')
            .replace('GMT','');

    var date_parts = date.split(" ");
    return date_parts[0]+" "+date_parts[2]+" "+date_parts[1]+" "+date_parts[3];
}


