var title=document.getElementById('gallery-title');
title.onclick=function(e){
e.preventDefault();
var form= document.getElementById('gallery.form-edit');
form.style.display='inline';
}
