$(function(){

  //set click listener to show menus
  $('#subnav h5').click(function(event){
    menu = $(this).parents('.menu');
    if(menu.css('margin-top') == '0px'){
      menu.animate( {'margin-top': '-'+menu.find('ul').outerHeight(true)+'px'}, 200, 'swing');
    } else {
      $('#subnav h5').each(function(){
        $(this).parents('.menu').animate( {'margin-top': '-'+$(this).parents('.menu').find('ul').outerHeight(true)+'px'}, 200, 'swing');
      });
      menu.animate( {'margin-top': '0px'}, 200, 'swing');
    }
    /*
    $('#subnav .menu').css('margin-top','-'+$('#subnav .menu ul').outerHeight(true)+'px');
    .animate( properties [, duration] [, easing] [, complete] )
    //$('#subnav ul.menu').slideDown();
    */
  });
  $('#subnav h5').each(function(){
    $(this).trigger('click');
  });
  
  
});

$(document).ready(function() {
  
  $('#main-content').on('click', '.apt-row', function() {
      $('.apt-row').removeClass('apt-selected');
      $(this).addClass('apt-selected');
      
      var netid = $(this).attr('id');
      
      $('#netid').val(netid);
  });
  
});

//24 - 16 - 11

//1250 + 1000