$(function(){  
  navigate();
  window.onhashchange = navigate;
});

function navigate(){
  var page = document.location.hash.substr(1);
  var scope = page.substr(0,page.indexOf('/'));
  if(scope == "students"){
    $('#subnav .students').addClass('hide');
    $('#subnav .advisors').addClass('hide');
    $('#subnav .students').removeClass('hide');
  } else if(scope == "advisors"){
    $('#subnav .students').addClass('hide');
    $('#subnav .advisors').addClass('hide');
    $('#subnav .advisors').removeClass('hide');
  }
  if(page != ""){
    $('#main-content').html(new EJS({url: './pages/'+page+'.ejs'}).render({}));
  }
}