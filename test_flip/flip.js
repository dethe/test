function max(a,b){
    return a > b ? a : b;
}

function min(a,b){
    return a < b ? a : b;
}

$(function(){
    var b = $('body');
    var pages = $('div');
    var current_page = pages.eq(0);
    var mousedown = false;
    var dragging = false;
    var angle = 0;
    var prev_x = 0;
    pages.each(function(idx){
        var self = $(this);
        self.css({
            'z-index': pages.length - idx
        });
    });
    // b.mousedown(function(evt){
    //     mousedown = true;
    // });
    // b.mouseup(function(evt){
    //    mousedown = false;
    //     if (dragging){
    //         dragging = false;
    //         b.triggerHandler('touchend');
    //     }
    // });
    // b.mousemove(function(evt){
    //     evt.preventDefault();
    //     if (mousedown){
    //         if (!dragging){
    //             dragging = true;
    //             b.triggerHandler('touchstart', [evt.pageX]);
    //         }
    //         b.triggerHandler('touchmoved', [evt.pageX]);
    //     }
    // });
    function touchstart(evt){
        evt.preventDefault();
        var x = evt.targetTouches[0].clientX;
        prev_x = x;
    }
    function touchend(evt){
        evt.preventDefault();
    }
    function touchmoved(evt){
        evt.preventDefault();
        var x = evt.targetTouches[0].clientX;
        if (x < prev_x){
            console.log('moving left');
            angle = min(angle + (prev_x - x), 90);
        }else if(x > prev_x){
            console.log('moving right');
            angle = max(angle - (x - prev_x), 0);
        }
        prev_x = x;
        current_page.css('-webkit-transform', 'rotateY(' + angle + 'deg)');
    }
    document.body.addEventListener('touchmove', touchmoved, false);
    document.body.addEventListener('touchstart', touchstart, false);
    document.body.addEventListener('touchend', touchend, false);
});
