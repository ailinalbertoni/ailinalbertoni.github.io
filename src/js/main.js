$(window).load(function() {
  "use strict";
	
	/* Loading Script */
	$(".loader").delay(100).fadeOut();
	$("#mask").delay(300).fadeOut("slow");

	/* Flexslider */
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

	/* GA Track Menu Click Events */
	$('.navigation li > a').click(function() {
		if (typeof ga !== "function") return;
		ga('send', {
		  hitType: 'event',
		  eventCategory: 'Menu',
		  eventAction: 'Click',
		  eventLabel: $(this).attr("gaEventLabel")
		});
	});

	/* GA Track Outbound Links */
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
