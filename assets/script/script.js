 (function () {
     var bodyEl = $('body'),
         navToggleBtn = bodyEl.find('.nav-toggle');

     navToggleBtn.on('click', function (e) {
         bodyEl.toggleClass('active-nav');
         e.preventDefault();
     });

 })();