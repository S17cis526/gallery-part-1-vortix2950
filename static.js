/**@module static
*loads and serve static files
*/
var fs=require('fs');
module.exports={
  loadDir:loadDir,
  isCached:isCached
}

var files={};
var fs=require('fs');

function loadDir(directory){
  fs.readdir(directory){
    var items =fs.readdirSync(directory);
    item.forEach(function(item){
      var path =directory+'/'+item;
        var stats =fs.statsSync(path);
        if(stats.isFile()){
          var parts=path.split('.');
          var extention=parts[parts.length-1];
          var type ='application/octet-stream'
          switch(extention){
            case'css':
            type='text/javascript';
            break;
            case'js':
            type='text/javascript';
            break;
            case'css':
            type='text/javascript';
            break;
            case'css':
            type='text/javascript';
            break;

            case'css':
            type='text/javascript';
            break;

          }
          files[path]=fs.readFileSync(path);
           contentType:type,

        }
        if(stats.isDirectory()){
          loadDir(path);
        }
      });

  }
}
function serveFile(path,req,res){
res.statusCode=200;
res.

}


function isCached(path){
  return files[path] !=undefined;
}
function serveFile(path,req,res){
  res.end(files[path]);
}
