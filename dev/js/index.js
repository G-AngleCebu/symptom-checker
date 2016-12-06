var $ = require('jquery');
var qi = require('./qi.js');
var pages = require('./pageController.js');
require('./background.js');
require('./sectionTapPage.js');
require('./diagnosis.js');

(function(){
	qi.initSubscribe();
	// pages.goToPage("#app-title");
	pages.goToPage("#diagnosis");
})();
