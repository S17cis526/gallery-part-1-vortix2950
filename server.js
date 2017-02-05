/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
var http =require ('http');
var port= 4566;
var fs=require ('fs');
var stylesheet=fs.readFileSync('gallery.css');
//var imageNames=['mobile.jpg'];
function getImageNames(callback){
  fs.readdir('images/',function(err,fileNames){
    if(err)callback(err,undefined);
    else callback(false,fileNames);
  });
}
function imageNamesToTags(fileNames){
  return fileNames.map(function(fileName){
      return '<img src="'+fileName+'" alt="'+fileName+'">';
   });
 }
function buildGallery(imageTags){
  var html="<!doctype html>";
     html+= '<head>';
     html+='<title>';
     html+='Dynamic page';
     html+='</title>';
     html+='<link href ="gallery.css" rel="stylesheet" type="text/css"> ';
     html+='</head>';
     html+='<body>';
     html+='<h1>Gallery</h1>';
     html+=imageNamesToTags(imageTags).join('');
     html+='<h1>Hello.</h1> Time is '+Date.now();
     html+='</body>';
      return html;
    }
function  serveImage(fileName,req,res){
  fs.readFile('images/'+fileName,function(err,data){
    //getImageNames(function(err,imageNames){
    if(err){
    	console.error(err);
    	res.statusCode=500;
    	res.statusMessage="resoure not found";
    	res.end("");
    	return;
     }
    res.setHeader("Content-Type","image/jpeg");
    res.end(data);
    //	});
 });
}
function serveGallery(req,res){
  getImageNames(function(err,imageNames){
      if(err){
        console.error(err);
        res.statusMessage='Server error';
        res.end();
          return;
       }
      res.setHeader('Content-Type','text/html');
      res.end(buildGallery(imageNames));
    });
}
var server = http.createServer(function(req,res){
    switch(req.url){
          case'/':;
          case "/gallery":
            serveGallery(req,res);
            break;
      		case'/gallery.css':
      			res.setHeader('Content-Type',"text/css");
      			res.end(stylesheet);
      			break;
       		  default:
            serveImage(req.url,req,res);
        }
 });
 server.listen(port,function(){
   console.log("listening on port"+port);
 });
