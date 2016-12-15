var $ = require('jquery');
var qi = require('./qi.js');
var pages = require('./pageController.js');
require('./background.js');
require('./navHandlers.js');
require('./diagnosis.js');
require('./userDetails.js');

(function(){
	qi.initSubscribe();
	$('body').on('click', '.section-tap-page, button, input[type="radio"], input[type="checkbox"], label.radio-label', function(){
		qi.raiseEvent('playButtonSound');
	});

	pages.goToPage("#app-title");
})();

// $('html:lang(en)'):
// $('data-translate').text()