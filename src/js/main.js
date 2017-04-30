/* Loading Script */
$(window).load(function() {
  "use strict";
    	$(".loader").delay(500).fadeOut();
    	$("#mask").delay(1000).fadeOut("slow");
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

/* Mixitup Portfolio */
jQuery(document).ready(function($) {
  "use strict";
	$('#portfolio').mixitup({
		targetSelector: '.item',
		transitionSpeed: 450
	});
});

/* Nivo - Lightbox */
jQuery(document).ready(function($) {
  "use strict";
    $('.nivo-lbox').nivoLightbox({ effect: 'fade' });
});

/* Skills */
jQuery(document).ready(function($) {
	"use strict";
	$('.skills-info').appear(function() {
	$('.skill1').css('width', '71%');
	$('.skill2').css('width', '85%');
	$('.skill3').css('width', '76%');
	$('.skill4').css('width', '53%');
	$('.skill5').css('width', '69%');
	},{accX: 0, accY: -150});
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

		e.preventDefault();
	    var href = $(this).attr("href");
	    ga('send', {
	      'hitType': 'event',
	      'eventCategory': 'Outbound Social',
	      'eventAction': 'Click Link',
	      'eventLabel': $(this).attr("gaEventLabel"),
	      'hitCallback': loadPage
	    });

	    // redirect after one second if recording takes too long
	    setTimeout(loadPage, 1000);

	    // redirect to outbound page
	    function loadPage() {
	      window.open(href,'_blank');
	    }
	});
});

// /* Google map */
// $(function () {
//   "use strict";
// 	var map = new GMaps({
// 	el: "#map",
// 	lat: 40.714353,
// 	lng: -74.005973,
//           zoom: 15, 
//           zoomControl : true,
//           zoomControlOpt: {
//             style : "BIG",
//             position: "TOP_LEFT"
//           },
//           panControl : true,
//           streetViewControl : false,
//           mapTypeControl: false,
//           overviewMapControl: false
//       });
        
//       var styles = [
//             {
//               stylers: [
//                 { hue: "#00ffe6" },
//                 { saturation: -100 }
//               ]
//             }
//       ];
        
//       map.addStyle({
//             styledMapName:"Styled Map",
//             styles: styles,
//             mapTypeId: "map_style"  
//       });
        
//       map.setStyle("map_style");

//       map.addMarker({
//         lat: 40.714353,
//         lng: -74.005973,
//         icon: "images/marker.png"
//       });
// });

