(function($) {

    /*----------------------
        HTML REPLACEMENTS ON MOBILE    
    ----------------------*/

    var replaceHtml = function() {
        var $windowWidth = $(window).width();
        if ($windowWidth < 992) {
            $('.bonus-info .bonus-card').insertBefore('.bonus-info .left-side');
        }
        else if ($windowWidth > 992) {
           $('.bonus-info .bonus-card').insertAfter('.bonus-info .left-side'); 
        }
    };
    
    replaceHtml();
    $(window).resize(replaceHtml);


    /*----------------------
        LIQUID IMAGES`
    ----------------------*/
    var defaults = {

            navRewind: true,
            navigation: true,
            navigationText: false,
            autoWidth: true,
            margin: 30,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        }


    /*-----------------
        CAROUSELS
    -----------------*/
    $('#owl-bonus-carousel').owlCarousel(defaults);                 // bonuses, casinos, games, index.html
    $('#owl-bonus-carousel2').owlCarousel(defaults);                // bonuses
    $('#owl-casinos-carousel').owlCarousel(defaults);               // index.html - online casinos
    $('#owl-certified-carousel').owlCarousel(defaults);             // index.html - certified online casinos
    $('#owl-latest-carousel').owlCarousel(defaults);                // index.html - online casino games
    $('#owl-industries-carousel').owlCarousel(defaults);            // index.html - gambling industry news

    $('#top-casinos-carousel').owlCarousel({                        // index.html - top casinos
        navigation: true,
        margin: 60,
        autoWidth: true,
        navigationText: false,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 4
            },
            992: {
                items: 6
            },
            1200: {
                items: 8
            }

        }
    });
    

    /*-----------------
        STICKY HEADER
    -----------------*/

    //cash header height
    var headerHeight = $('header').innerHeight();


    // update heigt on resize
    $(window).resize(function() {
        headerHeight = $('header').innerHeight();
    });

    $(window).scroll(function() {
        var wScrolled = $(window).scrollTop();
        if (wScrolled > headerHeight) {
            $('header.sticky').addClass('down');

        } else {
            $('header.sticky').removeClass('down');

        }
    });

    /*-----------------
        IMG LIQUID
    -----------------*/




    /*-----------------
        ACCORDION
    -----------------*/


    $('.accordion').xmaccordion({
        startOpen: 1,
        easing: 'swing',
        speed: 600
    });

    /*-----------------
       GRAB ALL CAROUSELS AND BIND SLIDE ARROWS
    -----------------*/



    function registerCarousels(carousels) {
        for (var i = 0; i < carousels.length; i++) {
            var id = carousels[i],
                owl = $(id);

            $(id).parents('.container').siblings('.container').find('.slide-controls').find('.button.next').bind('click', { owlObject: owl }, nextSlide);
            $(id).parents('.container').siblings('.container').find('.slide-controls').find('.button.prev').bind('click', { owlObject: owl }, prevSlide);
        }
    }

    function nextSlide(e) {
        e.preventDefault();
        e.data.owlObject.trigger('next.owl.carousel');
    }

    function prevSlide(e) {
        e.preventDefault();
        e.data.owlObject.trigger('prev.owl.carousel');
    }

    var carousels = ['#owl-bonus-carousel2','#owl-bonus-carousel', '#owl-casinos-carousel', '#owl-certified-carousel', '#owl-latest-carousel', '#owl-industries-carousel', '#top-casinos-carousel'];

    registerCarousels(carousels);

    /*----------------------
        PICTURE SELECTION
    ----------------------*/
    $('.picture-views > li').bind('click', selectPicture);

    function selectPicture() {
        if ($(this).hasClass('selected')) return;

        var me = $(this),
            src = me.find('figure > img').attr('src'),
            image = me.parents().eq(1).find('> div figure img'),
            anchorEl = image.parent();

        // remove 'selected' class on all items 
        clearSelection(me.parent().children());

        // select current item and change image
        me.addClass('selected');
        image.attr('src', src);
        // refresh imgLiquid on changed image
        image.parents('figure').imgLiquid();
        anchorEl.attr('href', src);

    }

    function clearSelection(items) {
        items.each(function() {
            $(this).removeClass('selected');
        });
    }


    /*---------------------
        SIDEBAR CONTROL
    ---------------------*/
    var $sidebarControl = $('.sidebar-control'),
        $shopSidebar = $('.left-sidebar');

    $sidebarControl.bind('click', toggleShopSidebar);

    function toggleShopSidebar() {
        if ($shopSidebar.hasClass('open')) {
            // Desktop enable scroll
            $('body').removeClass('no-scroll');

            // Mobile enable scroll
            // $('body').unbind('touchmove');

            // Close shop sidebar
            $shopSidebar.removeClass('open');
        } else {
            // Desktop disable scroll
            $('body').addClass('no-scroll');

            // Mobile disable scroll
            // $('body').bind('touchmove', function(e){e.preventDefault()});

            // Open shop sidebar
            $shopSidebar.addClass('open');
        }
    }


    /*------------------
        MOBILE MENU
    ------------------*/
    var $mobileMenu = $('.mobile-menu'),
        $pullNav = $('.pull-nav'),
        $selectableMenu = $mobileMenu.find('.selectable');

    $pullNav.bind('click', toggleMobileMenu);

    function toggleMobileMenu() {
        if ($mobileMenu.hasClass('open')) {
            // Desktop enable scroll
            $('body').removeClass('no-scroll');

            // Mobile enable scroll
            // $('body').unbind('touchmove');

            // Hide dark cover
            $('.mobile-menu-cover').removeClass('visible');
            // Close mobile menu
            $mobileMenu.removeClass('open');
        } else {
            // Desktop disable scroll
            $('body').addClass('no-scroll');

            // Mobile disable scroll
            // $('body').bind('touchmove', function(e){e.preventDefault()});

            // Show dark cover
            $('.mobile-menu-cover').addClass('visible');
            // Open mobile menu
            $mobileMenu.addClass('open');
        }
    }

    $mobileMenu.children('ul').children('li').bind('click', toggleMobileSubmenu);

    function toggleMobileSubmenu(e) {
        var $me = $(this);

        $me.children('ul').slideToggle(300, 'swing');
    }

    $selectableMenu.children('li').bind('click', selectMenuOption);

    function selectMenuOption(e) {
        var $me = $(this),
            $selectedOption = $me.children('a'),
            value = $selectedOption.text();

        if ($me.hasClass('selected')) return;

        removeMenuSelection($me.parent());

        $me.addClass('selected');
        $selectedOption.parents().eq(2).children('a').children('span').text(value);
    }

    function removeMenuSelection(menu) {
        menu.children('li').each(function() {
            $(this).removeClass('selected');
        });
    }

})(jQuery);