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
//  $('#subnav h5').each(function(){
//    $(this).trigger('click');
//  });
  
  $('#main-content')
    .on('click', '.apt-row', function() {
        $('.apt-row').removeClass('apt-selected');
        $(this).addClass('apt-selected');

        var netid = $(this).attr('id');

        $('#netid').val(netid);
    })
    .on('click', '.btn.start-sesh', function() {
        var netid;
        
        if ($(this).hasClass('f-sesh')) {
            netid = $(this).attr('id');
        } else {
            netid = $('#netid').val();
        }
        
        window.location.assign('#advisors/resources');
        
        var html = "<div id='end-sesh'>" + "<button class='btn btn-primary'>End Session</button></div>"
        $('footer .row').append(html);
    });
    
    $('body').on('click', '.input-append button', function() {
        var query = $(this).siblings('input').val()
        loadDocSearch(query);
    });
    
    $('footer').on('click', '#end-sesh', function() {
        $('#end-sesh').remove();
        window.location.assign('#advisors');
    });
});

function clickOnResource(urlToGoTo) {
  if(document.getElementById('end-sesh')) {
    var http = new XMLHttpRequest();
    var url = "urlReturner.php";
    var params = "url=" + urlToGoTo;
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Content-length", params.length);
    http.setRequestHeader("Connection", "close");
    http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        window.location = urlToGoTo;
      }
    };
    http.send(params);
  } else {
    window.location = urlToGoTo;
  }
}

function loadDocSearch2(searchQuery) {
  new EJS({url: './pages/advisors/aResource.ejs'})
    .update('content', '../searchService.php?query=' + searchQuery);
}

function loadDocCategory(searchQuery, headerToClose) {
  loadDocSearch(searchQuery);
  //document.getElementById(headerToClose).click();
  $('#' + headerToClose).trigger('click');
}

// A second method for retrieving the stuff from Lawrence's webservice, and we can all test it
// It doesn't quite work the way we would neeed it to because of the format of the webservice response
function loadDocSearch(searchQuery) {
  
  // Uses a freaking awesome thing called YQL from Yahoo! Yeah buddy! Cross domain ajax, here we come!!
  var url = "http://www.williamsware.com/cs/new/searchService2.php?query=" + searchQuery;
  var yqlUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22" + encodeURIComponent(url) + "%22&format=json&callback=";
  
  window.location.assign('#advisors/resources/view');
  
  $.ajax({
    url: yqlUrl,
    datatype: 'json',
    success: function(data) {
        
        var json = {};
        json.query = searchQuery;
        json.results = {};
        
        var page = '';
        var id = 'content';
        
        if (data.query.results.json == null) {
            page = './pages/advisors/no_results.ejs';
            
        } else {
            var length = data.query.results.json.results.length;
            if (length == 0) {
                page = './pages/advisors/no_results.ejs';
            } else if (length > 0) {
                page = './pages/advisors/aResource.ejs';
                json.results = data.query.results.json.results;
            } else {
                page = './pages/advisors/oneResource.ejs';
                json.results = data.query.results.json.results;
            }
            
            
        }
        
        new EJS({url: page}).update(id, json);
      }
  });
}
