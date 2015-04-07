var gulp = require("gulp"),
	fs   = require("fs-extra");

// exps
function foreachObject(object, fn) {
	for(var index in object) { 
	    if (object.hasOwnProperty(index)) {
			fn(index, object[index]);
	    }
	}
}
function task() {
	var pkg = fs.readFile("package.json", "utf-8", function(err, data){
		if (err) {
	        throw err;
	    }
	    var data = JSON.parse(data),
	    	depsDev = data.devDependencies || {},
	    	deps = data.dependencies || {};

	    console.log("--- devDeps:");
	    foreachObject(depsDev, function(key, value){
	    	console.log(key);
	    });
	    console.log("--- :devDeps");

	    console.log("--- deps:");
	    foreachObject(deps, function(key, value){
	    	console.log(key);
	    });
	    console.log("--- :deps");
	});
	return;
}
module.exports = task;

