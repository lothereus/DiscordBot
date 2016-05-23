var fs = require('fs'),
	path = require('path');
	
function getDirectories(srcpath) { 
	return fs.readdirSync(srcpath).filter(function(file) { 
		return fs.statSync(path.join(srcpath, file)).isDirectory(); 
	}); 
}

var plugins = {};
var plugin_directory = "./plugins/"; 
var plugin_folders = getDirectories(plugin_directory); 

exports.init = function() { 
    load_plugins();
	return plugins;
}; 

function load_plugins(){ 
    var commandCount = 0; 
    for(var i = 0; i < plugin_folders.length; i++) { 
        try {
			console.log("Trying to load plugins/"+plugin_folders[i]+"/"+plugin_folders[i].toLowerCase()+".js");
			
            plugins[plugin_folders[i].toLowerCase()] = require(plugin_directory
																+ plugin_folders[i] + "/"
																+ plugin_folders[i].toLowerCase() + ".js");
			
			console.log("Plugin "+plugin_folders[i]+" loaded");
        } catch(err) { 
            console.log("Improper setup of the '" + plugin_folders[i] +"' plugin. : " + err); 
        } 
    } 
} 
