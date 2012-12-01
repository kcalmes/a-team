$(function(){  
  navigate();
  window.onhashchange = navigate;
});

function navigate(){
  var page = document.location.hash.substr(1);
  if(page != ""){
    $('#main-content').html(new EJS({url: './pages/'+page+'.ejs'}).render({}));
  }
}