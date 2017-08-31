$(document).ready(function () {
    // handle the mouseenter functionality
    $(".poster-figure").mouseenter(function () {
            $(this).addClass("hover");
        })
        // handle the mouseleave functionality
        .mouseleave(function () {
            $(this).removeClass("hover");
        });

    $(".credit-brief").each(function (i) {
        len = $(this).text().length;
        if (len > 110) {
            $(this).text($(this).text().substr(0, 120) + '...');
        }
    });


});