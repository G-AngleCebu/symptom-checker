var $ = require('jquery');

(function(){
  exports.goToPage =  function(page_id){
    $('.section--active').removeClass('section--active');
    $(page_id).addClass('section--active');
  }
})();
