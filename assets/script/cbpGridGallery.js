;(function (window) {

    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function CBPGridGallery(el, options) {
        this.el = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }

    CBPGridGallery.prototype._init = function () {
        // main grid
        this.grid = this.el.querySelector('section.grid-wrap > ul.grid');
        // main grid items
        this.gridItems = [].slice.call(this.grid.querySelectorAll('li:not(.grid-sizer)'));
        // init masonry grid
        this._initMasonry();
        // init events
        //this._initEvents();
    };

    CBPGridGallery.prototype._initMasonry = function () {
        var grid = this.grid;
        imagesLoaded(grid, function () {
            new Masonry(grid, {
                itemSelector: 'li',
                columnWidth: grid.querySelector('.grid-sizer')
            });
        });
    };

    window.CBPGridGallery = CBPGridGallery;

})(window);