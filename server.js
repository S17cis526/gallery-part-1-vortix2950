/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
 var http =require ('http');
 var port= 4566;
 var fs=require ('fs');
var stylesheet=fs.readFileSync('gallary.css');
var imageNames=['ace.jpg','bubble.jpg','chess.jpg','mobile.jpg','fern.jpg'];

 function  serverImage(filename,req,res){

	fs.readFile('images/'+filename,function(err,body){
		if(err){
			console.error(err);
			res.statusCode=500;
			res.statusMessage="server error";
			res.end("silly");
			return;
		}
		res.setHeader("Content-Type","image/jpeg");
		res.end(body);
	});
 }





 var server = http.createServer(function(req,res){

switch(req.url){
  case "/gallery":
var html="<!doctype html>";
var ghtml=imageNames.map(function(fileName){
return '<image src='+fileName +' alt="a fishing ace at work">';



}).join('');
html+= '<head>';
html+='<title>Dynamic page></title>'
html+='<link href ="gallary.css " rel ="stylesheet" type="text/css"> ';

html+='</head>';

html+='<body>';
html+='<h1>Gallery</h1>';
html+=gHtml;
html+='<h1>Hello.</h1> Time is '+Date.now();
html+='</body>';
res.setHeader('Content-Type','text/html');
  res.end(html);
break;
case'/gallary.css':
res.setHeader('Content-Type',"text/css");
res.end(stylesheet);
break;
case'/ace':


serverImage('ace.jpg',req,res);
break;
  case "/chess":
	serverImage('chess.jpg',req,res);
	 break;
	 case "/fern":
	 case "/fern/":
	 case "/fern.jpg":
	 case "/fern./jpeg":
	 serverImage('fern.jpg',req,res);
	 break;
	 default:
	res.statusCode=404;
	res.statusMessage="not Found";
	res.end();
}


 });

 server.listen(port,function(){

	 console.log("listening on port"+port);


 });