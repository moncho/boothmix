jQuery(function($){var t=window.BRUSHED||{},e=$("#menu").clone().attr("id","navigation-mobile");t.mobileNav=function(){var t=$(window).width();979>=t?$("#mobile-nav").length>0&&(e.insertAfter("#menu"),$("#navigation-mobile #menu-nav").attr("id","menu-nav-mobile")):($("#navigation-mobile").css("display","none"),$("#mobile-nav").hasClass("open")&&$("#mobile-nav").removeClass("open"))},t.listenerMenu=function(){$("#mobile-nav").on("click",function(t){$(this).toggleClass("open"),$("#mobile-nav").hasClass("open")?$("#navigation-mobile").slideDown(500,"easeOutExpo"):$("#navigation-mobile").slideUp(500,"easeOutExpo"),t.preventDefault()}),$("#menu-nav-mobile a").on("click",function(){$("#mobile-nav").removeClass("open"),$("#navigation-mobile").slideUp(350,"easeOutExpo")})},t.slider=function(){$.supersized({slideshow:0,autoplay:0,start_slide:1,stop_loop:0,random:0,slide_interval:12e3,transition:1,transition_speed:300,new_window:1,pause_hover:0,keyboard_nav:1,performance:1,image_protect:1,min_width:0,min_height:0,vertical_center:1,horizontal_center:1,fit_always:0,fit_portrait:1,fit_landscape:0,slide_links:"blank",thumb_links:0,thumbnail_navigation:0,slides:[{image:"_include/img/slider-images/image01.jpg",title:'<div class="slide-content">V24 Labs</div>',thumb:"",url:""}],progress_bar:0,mouse_scrub:0})},t.nav=function(){$(".sticky-nav").waypoint("sticky")},t.filter=function(){if($("#projects").length>0){var t=$("#projects");t.imagesLoaded(function(){t.isotope({animationEngine:"best-available",itemSelector:".item-thumbs",layoutMode:"fitRows"})});var e=$("#options .option-set"),i=e.find("a");i.click(function(){var e=$(this);if(e.hasClass("selected"))return!1;var i=e.parents(".option-set");i.find(".selected").removeClass("selected"),e.addClass("selected");var a={},o=i.attr("data-option-key"),n=e.attr("data-option-value");return n="false"===n?!1:n,a[o]=n,"layoutMode"===o&&"function"==typeof changeLayoutMode?changeLayoutMode(e,a):t.isotope(a),!1})}},t.fancyBox=function(){($(".fancybox").length>0||$(".fancybox-media").length>0||$(".fancybox-various").length>0)&&($(".fancybox").fancybox({padding:0,beforeShow:function(){this.title=$(this.element).attr("title"),this.title="<h4>"+this.title+"</h4><p>"+$(this.element).parent().find("img").attr("alt")+"</p>"},helpers:{title:{type:"inside"}}}),$(".fancybox-media").fancybox({openEffect:"none",closeEffect:"none",helpers:{media:{}}}))},t.contactForm=function(){$("#contact-submit").on("click",function(){$contact_form=$("#contact-form");var t=$contact_form.serialize();return $.ajax({type:"POST",url:"_include/php/contact.php",data:t,dataType:"json",success:function(t){t.status&&($("#contact-form input").val(""),$("#contact-form textarea").val("")),$("#response").empty().html(t.html)}}),!1})},t.menu=function(){$("#menu-nav, #menu-nav-mobile").onePageNav({currentClass:"current",changeHash:!1,scrollSpeed:750,scrollOffset:30,scrollThreshold:.5,easing:"easeOutExpo",filter:":not(.external)"})},t.goSection=function(){$("#nextsection").on("click",function(){return $target=$($(this).attr("href")).offset().top-30,$("body, html").animate({scrollTop:$target},750,"easeOutExpo"),!1})},t.goUp=function(){$("#goUp").on("click",function(){return $target=$($(this).attr("href")).offset().top-30,$("body, html").animate({scrollTop:$target},750,"easeOutExpo"),!1})},t.scrollToTop=function(){var t=$(window).width(),e=!1,i=$("#back-to-top");i.click(function(t){$("body,html").animate({scrollTop:"0"},750,"easeOutExpo"),t.preventDefault()}),$(window).scroll(function(){e=!0}),setInterval(function(){e&&(e=!1,$(window).scrollTop()>1e3?i.css("display","block"):i.css("display","none"))},250)},t.utils=function(){$(".item-thumbs").bind("touchstart",function(){$(".active").removeClass("active"),$(this).addClass("active")}),$(".image-wrap").bind("touchstart",function(){$(".active").removeClass("active"),$(this).addClass("active")}),$("#social ul li").bind("touchstart",function(){$(".active").removeClass("active"),$(this).addClass("active")})},t.accordion=function(){var t=$(".accordion-heading.accordionize");t.delegate(".accordion-toggle","click",function(e){$(this).hasClass("active")?($(this).removeClass("active"),$(this).addClass("inactive")):(t.find(".active").addClass("inactive"),t.find(".active").removeClass("active"),$(this).removeClass("inactive"),$(this).addClass("active")),e.preventDefault()})},t.toggle=function(){var t=$(".accordion-heading.togglize");t.delegate(".accordion-toggle","click",function(t){$(this).hasClass("active")?($(this).removeClass("active"),$(this).addClass("inactive")):($(this).removeClass("inactive"),$(this).addClass("active")),t.preventDefault()})},t.toolTip=function(){$("a[data-toggle=tooltip]").tooltip()},t.slider(),$(document).ready(function(){$("body").jpreLoader({splashID:"#jSplash",showSplash:!0,showPercentage:!0,autoClose:!0,splashFunction:function(){$("#circle").delay(250).animate({opacity:1},500,"linear")}}),t.nav(),t.mobileNav(),t.listenerMenu(),t.menu(),t.goSection(),t.goUp(),t.filter(),t.fancyBox(),t.contactForm(),t.scrollToTop(),t.utils(),t.accordion(),t.toggle(),t.toolTip()}),$(window).resize(function(){t.mobileNav()})});