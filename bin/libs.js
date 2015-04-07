#!/usr/bin/env node
"use strict";
var colors = require("colors/safe"),
	exec   = require("exec"),
	config = require("./config"),
	conflibs = config.libs,
	keys = [];

console.log(colors.green("libs installation [*exp!]"));
for (var i in conflibs) {
	if (conflibs.hasOwnProperty(i)) {
		keys.push(i);
	}
}

if (keys.length == 0) {
	console.log(colors.white("* ") + colors.red("no libs config found"));
}
startTask(keys, 0);

function startTask(keys, index) {
	var spawn = require('child_process').spawn,
		key   = keys[index],
		isErr = false;

	if (typeof key == "undefined") return;

	console.log(colors.yellow("*") + colors.white(" %s ")+colors.grey("[from: %s, to: %s]"), key, conflibs[key].repo, conflibs[key].dest);
	//console.log("git clone " + conflibs[i].repo);
	ls = spawn('git', ['clone', conflibs[i].repo, conflibs[key].dest])

	ls.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
	});

	ls.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
		ls.stdin.pause();
		//ls.kill();
		startTask(keys, index+1);
		//ls.kill('SIGHUP');
		//isErr = true;
	});

	ls.on('close', function (code) {
		//if (!isErr) {
			console.log("cloning " + conflibs[key].repo + " is finished");
			startTask(keys, index+1);
		//}
		//console.log('child process exited with code ' + code);
	});
}

		//var out = execSync("git clone "+conflibs[i].repo); /*, function(err, out, code){
			/*console.log(arguments);
			if (err instanceof Error)
				throw err;
			process.stderr.write(err);
			process.stdout.write(out);
			process.exit(code);
		});*/
		//console.log(out);
//	}
//}
