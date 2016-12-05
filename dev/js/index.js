var $ = require('jquery');
// var qi = require('./qi.js');
var pages = require('./pageController.js');
require('./background.js');

// init
(function(){
	// qi.initSubscribe();
	pages.goToPage("#detail-form");
})();
