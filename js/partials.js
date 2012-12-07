$(function(){  
  navigate();
  window.onhashchange = navigate;
  $('.header.btn').click(function(){
    $('.header.btn').each(function(){$(this).removeClass('active');}); 
    $(this).addClass('active');
  });
});

function navigate(){
  var page = document.location.hash.substr(1);
  var scope = page.substr(0,page.lastIndexOf('/'));
  console.log(scope);
  //set the buttons
  $('#header .row').each(function(){
    $(this).addClass('hide');
  });
  
  //set all of the nav to hidden
  $('#subnav').each(function(){
    $(this).find('.row').addClass('hide');
  });
  //set the menu to be used
  if(scope == "students"){
    $('#header #student-buttons').removeClass('hide');
    $('#subnav #students-advisement').removeClass('hide');
  } else if(scope == "advisors/students" || page == "advisors/students" || page == "advisors"){
    $('#header #advisor-buttons').removeClass('hide');
    $('#subnav #advisors-students').removeClass('hide');
  } else if(scope == "advisors/resources" || page == "advisors/resources"){
    $('#header #advisor-buttons').removeClass('hide');
    $('#subnav #advisors-resources').removeClass('hide');
  }
  if(page != ""){
    $('#main-content').html(new EJS({url: './pages/'+page+'.ejs'}).render({}));
  }
}