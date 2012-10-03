(function(){
    var digitsNode = document.getElementById('digits');

    var digits = 0;
    var a = [];
    var b = 0, d = 0, g = 0, h = 0;;
    var f = 1000;
    var c = 52514;
    var lock = false;
    var loop = null;

    var loadNext = function() {
        if(digits >= 10000 || lock) return;
        lock = true;

        b = c -= 14;
        if (!b) return;

        var e = d %= f;
        while(g = --b * 2) {
            d = d * b + f * (h ? a[b] : Math.floor(f/5));
            a[b] = d % --g;
            d = Math.floor(d/g);
        }
        var x = e + Math.floor(d/f);

        if (x > 999) x += buf.pop()*1000;

        var str = x.toString();
        while(str.length < 3) {
            str = '0' + str;
        }

        h = str.length;
        while(str.length > 0) {
            buf.push(parseInt(str.charAt(0)));
            str = str.substring(1);
        }

        lock = false;
    }
    var fLoop = function() {
        handleKeydown({
            "keyCode": 48
        });
    };

    var handleKeydown = function(e) {
        var keycode = e.keyCode;
        if (keycode > 47 && keycode < 58 && buf.length) {
            digits++;
            if (digits < 10000) {
                var print = buf.shift().toString()
                if (digits % 30 == 0) {
                    print += '<br />';
                } else if (digits % 10 == 0) {
                    print += '&nbsp;';
                }
                digitsNode.innerHTML += print;
                window.scrollTo(0, 10000000);
            }
            if (buf.length < 3) {
                loadNext();
            }
        } else if (keycode == 32) {
            if (loop) {
                window.clearInterval(loop);
                loop = null;
            } else {
                loop = window.setInterval(fLoop, 50);
            }
        }
    }

    var buf = [];
    loadNext();
    buf.shift();
    document.addEventListener('keydown', handleKeydown, false);
})();
