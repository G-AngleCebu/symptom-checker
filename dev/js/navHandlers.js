var $ = require('jquery');

var pages = require('./pageController.js');

(function(){
  //
  // TAP ANYWHERE TO CHANGE PAGE
  //
  $(".section-tap-page").click(function(){
    var tapPage = $(this).attr('id');
    switch(tapPage){
      case 'app-title':
        pages.goToPage('#info-1-form');
        break;

      case 'diagnosis-result':
        pages.goToPage('#app-title');
        break;

      default:
        break;
    }
  });

  //
  // NAVIGATIONS BUTTONS
  //
  $('body').on('click', '.nav-button', function(){
      var $navigator = $(this);
      if($navigator.data("page")) {
        pages.goToPage("#"+String($navigator.data("page")));
      } else {
        console.error("Unassigned 'data-page' in a .nav-button element");
      }
  });

})();
