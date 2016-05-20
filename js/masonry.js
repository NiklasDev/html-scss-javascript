(function($) {

    //masonry grid on blog page
    var $masContainer = $('.masonry');
    $($masContainer).imagesLoaded(function() {
        $($masContainer).masonry({
            itemSelector: '.post-grid',
            columnWidth: '.post-grid'
        });
    });


        
    var $msnry = $masContainer.masonry({
        // options
        itemSelector: '.post-grid'
    });

    var ias = $.ias({
        container: ".masonry",
        item: ".post-grid",
        pagination: "#pagination",
        next: ".next",
        delay: 800
    });

    ias.on('render', function(items) {
        $(items).css({ opacity: 0 });
    });

    ias.on('rendered', function(items) {
        $(items).css({ opacity: 1 });
        $msnry.masonry('appended', items);

    });

    ias.extension(new IASSpinnerExtension({
        src: 'images/loading.gif'
    }));
    ias.extension(new IASNoneLeftExtension({ html: '<div class="ias-noneleft" style="text-align:center"><p><em>You reached the end!</em></p></div>' }));


    $(window).resize(function() {
        $('.masonry').masonry('reloadItems');
    });


})(jQuery);