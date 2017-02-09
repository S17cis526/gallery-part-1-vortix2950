/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
var http =require ('http');
var port= 4566;
var title="Gallery";
var url=require('url');
var fs=require ('fs');
var stylesheet=fs.readFileSync('gallery.css');
var config=JSON.parse(fs.readFileSync('config.json'))||{
  title:'Gallery'
};


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
     html+='<title>'+config.title+'</title>';
     html+='<link href ="gallery.css" rel="stylesheet" type="text/css"> ';
     html+='</head>';
     html+='<body>';
     html+='<h1> '+config.title+'</h1>';
     html+='<form action="/">';
     html+='<input type="text" name="title"/>';
     html+='<input type="submit" value="Change Gallery Title"/>'
     html+='</form>';
     html+=imageNamesToTags(imageTags).join('');
     html+='<form action="" method="POST">';
     html+='<inut type="file" name="images">';
      html+='<inut type="submit" value="Upload Image">';
     html+='</form>';
     html+='<h1>Hello.</h1> Time is '+Date.now();
     html+='</body>';
      return html;
    }
function  serveImage(fileName,req,res){
  fs.readFile('images/'+fileName,function(err,data){
    //getImageNames(function(err,imageNames){
    if(err){
    	console.error(err);
    	res.statusCode=404;
    	res.statusMessage="Resoure not found";
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
//var title = query ? query.title : "Image Gallery";
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
function uploadImage(req,res){
  var body='';
  req.on('error',function(){
    res.statusCode=500;
    res.end();
  });
  req.on('data', function(data){
    body+=data;
  });

  req.on('end',function(){
      fs.writeFile('fileName',data,function(){
         if (err){
           console.err(err);
           res.statusCode=500;
           res.end();
           return;
         }
          serveImage(fileName,req,res);
      });
  });

}
var server = http.createServer(function(req,res){
//at most we should have two parts
//a resurce and a qury string seerated by a ?
var urlParts= url.parse(req.url);
    //var url=req.url.split('?');
    var querystring = require("querystring");

    var query = querystring.parse(req.url.split("?")[1]);
console.log(querystring.parse(req.url.split("?")[1]));
    //if(urlParts.query){
        //var matches=  /title=(.+)[$&]/.exec(urlParts.query);
        if(query.title){
          config.title=query.title;
          fs.writeFile('config.json',JSON.stringify(config));
        }
  //  }
    switch(urlParts.pathname){
          case'/':;
          case "/gallery":
          if(req.method=='GET')
            serveGallery(req,res);
          else if(req.method=="POST"){

          }
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
