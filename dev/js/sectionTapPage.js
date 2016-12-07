var $ = require('jquery');

var pages = require('./pageController.js');

(function(){
  $(".section-tap-page").click(function(){
    var tapPage = $(this).attr('id');
    switch(tapPage){
      case 'app-title':
        pages.goToPage('#age-form');
        break;
      default:
        break;
    }
  });
})();
