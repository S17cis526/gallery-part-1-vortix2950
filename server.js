var http=require('http');
var port="3325";
var fs=require('fs');

function userReq (fileName,req,res){
	fs.readFile("images\\"+fileName,function(err,body){
		if(err){
      console.error(err);
			res.statusCode=500;
			res.end();
      return;
		}
		res.setHeader("Content-Type","image/jpeg");
		res.end(body);
		return;
});



}




var server=http.createServer(function(req,res){
	switch(req.url){
		case "/chess":
			userReq("chess.jpg",req,res);
			break;
	  default:
		  res.statusCode = 404;
	  	res.end("not found");
	}
});



server.listen(port,function(){console.log("listining on port 3325")});
