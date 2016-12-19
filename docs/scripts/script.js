var main = function () {
    $('.buttons button').click(function () {
        var targetTab = $(this).attr('class');
        $('.tab:not(.' + targetTab + ')').slideUp(500);
        setTimeout(function () {
            $('section.' + targetTab).slideDown(500);
        }, 500);
    });
    
    var count = 0;
    $('.gallery .next').click(function () {
        var amount = parseFloat($('.gallery img').css('width').slice(0, $('.gallery img').css('width').length - 2));
        if (count <= 2) {
            count++;
        }
        $('.gallery img').css('transform', 'translateX(-' + (count * (amount + 20)) + 'px)');
    });
    $('.gallery .prev').click(function () {
        var amount = parseFloat($('.gallery img').css('width').slice(0, $('.gallery img').css('width').length - 2));
        if (count != 0) {
            count--;
        }
        $('.gallery img').css('transform', 'translateX(-' + (count * (amount + 20)) + 'px)'); 
    });
    
    $('.doc').click(function () {
        var src = $(this).attr('src').slice(0, $(this).attr('src').length - 3) + 'pdf',
            html = '<embed src="' + src + '">';
        $('.fullscreen').append(html);
        $('.fullscreen').css({
            'transform': 'scale(1)',
            'opacity': '1'
        });
        $('body').css('overflow', 'hidden');
    });
    
    $('.hide').click(function () {
        $('.fullscreen').css({
            'transform': 'scale(0)',
            'opacity': '0'
        });
        $('.fullscreen embed').remove();
        $('body').css('overflow', 'auto');
    });
}

$(document).ready(main);