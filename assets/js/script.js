var scrolloffset = 20;

jQuery( document ).ready(function() {

    // ========== PRELOADER ========== //
    jQuery(window).load(function(){
        preloaderFadeOutTime = 500;
        function hidePreloader() {
            var preloader = $('#preloader');
            preloader.fadeOut(preloaderFadeOutTime);
        }
        hidePreloader();
    });

	// ========== HEADROOM NAVIGATIE ========== //
	var myElement = document.querySelector(".headroom");
	var headroom = new Headroom(myElement, {
	  "offset": 800,
      "tolerance": 10
	});
	headroom.init();

	// ========== COUNTDOWN ========== //
	 var ts = new Date('Mon, 20 Nov 2017 10:00:00 GMT+0100').getTime();

    if((new Date()) > ts){
        // The new year is here! Count towards something else.
        // Notice the *1000 at the end - time must be in milliseconds
        ts = (new Date()).getTime() + 10*24*60*60*1000;
    }

    $('#countdown').countdown({
        timestamp   : ts,
        callback    : function(days, hours, minutes, seconds){

            var message = "";

            message += days + " day" + ( days==1 ? '':'s' ) + ", ";
            message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
            message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
            message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";

        }
    });
    $('#countdownnav').countdown({
        timestamp   : ts,
        callback    : function(days, hours, minutes, seconds){

            var message = "";

            message += days + " day" + ( days==1 ? '':'s' ) + ", ";
            message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
            message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
            message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";

        }
    });

    // ========== VERTICAL SCROLL NAVIGATION ========== //

    var contentSections = jQuery('.allabout'),
        navigationItems = jQuery('.vertical-nav a.aboutnav');

    updateNavigation();
    jQuery(window).on('scroll', function(){
        updateNavigation();
    });

    //smooth scroll to the section
    navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll(jQuery(this.hash));
    });

    function updateNavigation() {
    	var activeSection = 0;
        contentSections.each(function(){
            $this = jQuery(this);
            var thisSection = jQuery('.vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
            if ( ( $this.offset().top - scrolloffset < jQuery(window).scrollTop() ) && ( $this.offset().top + $this.outerHeight() - scrolloffset > jQuery(window).scrollTop() ) ) {
                if(thisSection > activeSection)
                	activeSection = thisSection;
            }
        });
        navigationItems.not(':eq(' +activeSection+')').removeClass('is-selected');
        navigationItems.eq(activeSection).addClass('is-selected');
    }

    function smoothScroll(target) {
        jQuery('body,html').animate(
            {'scrollTop':target.offset().top},
            600
        );
    }

    // ========== SAME HEIGHT ========== //
    jQuery('.text-columns .row').each(function() {
        jQuery(this).children('.sameHeight').matchHeight({});
    });
    jQuery('.team .row').each(function() {
        jQuery(this).children('.sameHeight').matchHeight({});
    });
    
	// ========== YOUTUBE IFRAMES ========== //
	jQuery(function () {
		jQuery(".youtube").YouTubeModal({autoplay:1, width:640, height:480});
	});

	// ========== SMOOTHSCROLL ========== //
	jQuery(".scrolltonext").on("click", function() {
		jQuery('html, body').animate({
       		scrollTop: jQuery(this).closest('section').next().offset().top
    	}, 800);
    	return false;
	});

	jQuery('a.page-scroll[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            jQuery('html, body').animate({
              scrollTop: target.offset().top - 0
            }, 1000);

			jQuery('.navbar-collapse').collapse('hide');

            return false;
          }
        }
    }); 

	// ========== STICK IN PARENT ========== //
	jQuery(".sidebarnav").stick_in_parent({
        offset_top: 100,
    });

    // ========== PIE CHART ========== //
    window.onload = function() { 
        $("#chartContainer").CanvasJSChart({ 
            backgroundColor: "transparent",

            legend :{ 
                verticalAlign: "center", 
                horizontalAlign: "right",
                fontSize: '14',
            }, 
            data: [ 
            { 
                type: "pie", 
                showInLegend: true, 
                startAngle: -90,
                indexLabelPlacement: "inside",
                indexLabelFontColor: "#ffffff",
                indexLabelFontFamily: "Whitney Book",
                indexLabelFontSize: "16",
                toolTipContent: "{label} <br/> {y} %",
                indexLabel: "{y} %", 
                dataPoints: [ 
                    { label: "Token Sale",  y: 40, legendText: "40 - Token Sale", color: "#727bbb"},
                    { label: "Ecosystem incentivization",   y: 30, legendText: "30 - Ecosystem incentivization", color: "#64c7f3" },
                    { label: "Cold Storage",    y: 10, legendText: "10 - Cold Storage", color: "#f9b568" }, 
                    { label: "Founders",   y: 18,  legendText: "18 - Founders", color: "#91c571" }, 
                    { label: "Advisors",       y: 2,  legendText: "2 - Advisors", color: "#6f3d79" }, 
                ] 
            } 
            ] 
        }); 
    }

    jQuery('#slider_references').lightSlider({
        autoWidth:true,
        loop:false,
        slideMargin:20,
        controls: false,
        onSliderLoad: function() {
            jQuery('#slider_references').removeClass('cS-hidden');
        } 
    });  

});