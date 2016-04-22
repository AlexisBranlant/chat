var $ = require('jquery');
var twig = require('twig');

module.exports = {
	init: function(){
		var template = twig.twig({
		  id: "user",
		  href: "templates/user.twig"
		});
		$.getJSON('js/data.json',function(data){
		  var usersHTML = twig.twig({ ref: "user" }).render(data);
		  console.log(usersHTML);
		  $("#users").append(usersHTML);
		});
	}
};