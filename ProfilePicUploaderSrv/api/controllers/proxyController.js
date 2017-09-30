"use strict";

var http = require("http");
var https = require("https");
var request = require("request").defaults({ encoding: null });

exports.getForeignResource = function(req, res) {
	try{
		console.log("Entered getForeignResource");
		var _url =  decodeURI(req.query.url);
		var _filetype = decodeURI(req.query.filetype);
		
		if(_url && _filetype){
		console.log("Trying to retrieve "+_url +" as "+_filetype);
		
		request.get(_url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("retrieved resource, trying to return it");
			    res.setHeader('Content-Type', _filetype );
				res.setHeader("Response-Type", "blob");
				res.status(200).send(body);
			}
			else{
				console.log("404, returning without resource");
				res.status(404).send({error: "Could not find resource "+ url});
			}
		});
		}
		else{
			console.log("400,no url or filetype.");
		    res.status(400).send({error: "Bad request, please pass along url and filetype (eg: ?url=http...&filetype=image/jpg"});
		}
	}
	catch(e){
		console.log(e);
		res.status(500).send({error: e});
	}
};

exports.foo = function(req, res){
	
	try{
		var foo = req.query.foo;
		var bar = req.query.bar;
		var derp = req.query.derp;
		
		console.log("foo: "+foo+" bar: "+bar+" derp: "+derp);
		res.status(200).send({"foo": foo, "bar": bar, "derp":derp});
		
	}
	catch(e){
		console.log(e);
		res.status(500).send({error: e});
	}
}