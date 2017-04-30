/* Loading Script */
$(window).load(function() {
	"use strict";
	$(".loader").delay(100).fadeOut();
    	$("#mask").delay(300).fadeOut("slow");
    });

/* Flexslider */
$(window).load(function() {
  "use strict";
	$('.flexslider').flexslider({
		animation: "fade",
		start: function(slider) {
			$('.np-controls a.next').click(function(event){
				event.preventDefault();
				slider.flexAnimate(slider.getTarget("next"));
			});
			$('.np-controls a.previous').click(function(event){
				event.preventDefault();
				slider.flexAnimate(slider.getTarget("previous"));
			});
		}
	});
});

//GA Track Menu Click Events
jQuery(document).ready(function($) {
	"use strict";

	$('.navigation li > a').click(function() {
		if (typeof ga !== "function") return;
		ga('send', {
		  hitType: 'event',
		  eventCategory: 'Menu',
		  eventAction: 'Click',
		  eventLabel: $(this).attr("gaEventLabel")
		});
	});
});

//GA Track Outbound Links
jQuery(document).ready(function($) {
	"use strict";

	$('.social li > a').click(function(e) {
		if (typeof ga !== "function") return;

	    ga('send', {
	      'hitType': 'event',
	      'eventCategory': 'Outbound Social',
	      'eventAction': 'Click',
	      'eventLabel': $(this).attr("gaEventLabel")
	    });
	});
});
