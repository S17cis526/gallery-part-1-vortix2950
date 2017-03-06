/** @module template
*/
var fs = require('fs');
module.exports={
  render:render,
loadDir: loadDir
}

var fs=require('fs');
  var templates={}
  /**@function loaddir*loads a directory of templates
  *
  &@param{string} -Directory  to loads*/
  function loadDir(directory) {
    var dir = fs.readdirSync(directory);
    dir.forEach(function(file) {
      var path = directory + '/' + file;
      var stats = fs.statSync(path);
      if(stats.isFile()) {
        templates[file] = fs.readFileSync(path).toString();
      }
    });
  }
/**@function render
*Renders a template  with embedded javascribt
*@param {string} templateName the template to render
*@param {...}
*/
function render(template, context) {
  return templates[template].replace(/<%=(.+)%>/g, function(match, code){
    return eval('var context = ' + JSON.stringify(context) + ';' + code);
  });
}
