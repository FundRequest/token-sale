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
        contentSections.each(function(){
            $this = jQuery(this);
            var activeSection = jQuery('.vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
            if ( ( $this.offset().top - jQuery(window).height()/2 < jQuery(window).scrollTop() ) && ( $this.offset().top + $this.height() - jQuery(window).height()/2 > jQuery(window).scrollTop() ) ) {
                navigationItems.eq(activeSection).addClass('is-selected');
            }else {
                navigationItems.eq(activeSection).removeClass('is-selected');
            }
        });
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
            return false;
          }
        }
    }); 

	// ========== STICK IN PARENT ========== //
	jQuery(".sidebarnav").stick_in_parent({
        offset_top: 100,
    });


});