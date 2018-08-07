function Swiper(el, ops) {
    this.container = document.querySelector(el);
    this.ops = ops;
    this.wrapper = this.container.querySelector(".swiper-wrapper");
    this.slide = this.wrapper.children;
    this.length = this.slide.length;
    this.width = this.container.offsetWidth;
    this.offsetW = this.width / 2;
    this.index = 0;
    this.addEvent();
    this.pagination();
}
Swiper.prototype = {
    constructor: Swiper,
    addEvent: function() {
        var that = this;
        var startx, starty, movex, movey;
        this.container.addEventListener("touchstart", function(e) {
            var touches = e.touches[0];
            startx = touches.clientX;
            starty = touches.clientY;
            that.wrapper.style.transitionDuration = '0';
        });
        this.container.addEventListener("touchmove", function(e) {
            var touches = e.touches[0];
            movex = touches.clientX;
            movey = touches.clientY;
            that.wrapper.style.transform = 'translate3d(' + (movex - startx - that.index * that.width) + 'px,0,0)'
        });
        this.container.addEventListener("touchend", function(e) {
            var steps = movex - startx;
            if (Math.abs(steps) > that.offsetW) {
                if (steps < 0) {
                    that.index++;
                    that.index = that.index >= that.length ? that.length - 1 : that.index;
                } else {
                    that.index--;
                    that.index = that.index <= 0 ? 0 : that.index;
                }
            }
            that.wrapper.style.transitionDuration = "0.5s";
            that.wrapper.style.transform = 'translate3d(' + -that.index * that.width + 'px,0,0)';
            that.pagination();
        });
    },
    pagination: function() {
        var obj = this.ops.pagination;
        var pageEl = document.querySelector(obj.el);
        var pagehtml = '';
        for (var i = 0; i < this.length; i++) {
            pagehtml += i == this.index ? '<span class="active"></span>' : '<span></span>';
        }
        pageEl.innerHTML = pagehtml;
    }
}