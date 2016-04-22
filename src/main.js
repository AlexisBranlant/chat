var $ = require('jquery');

var header = require('./components/header/header.js');
var user = require('./components/users/user/user.js');

$(function(){//document ready
	header.init();
	user.init();
})