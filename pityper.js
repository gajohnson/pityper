(function(){
    var digitsNode = document.getElementById('digits');
    var buf = [];
    var a = [];
    var b = 0, d = 0, g = 0, h = 0;
    var f = 1000;
    var c = 52514;
    var lock = false;
    var loop = null;
    var ctr = 0;

    var handleKeydown = function(e) {
        var keycode = e.keyCode;
        if (keycode > 47 && keycode < 58) {
            next();
        } else if (keycode == 32) {
            handleLoop();
        }
    };

    var handleLoop = function() {
        if (loop) {
            window.clearInterval(loop);
            loop = null;
        } else {
            loop = window.setInterval(next, 5);
        }
    };

    var next = function() {
        if (buf.length < 7) {
            loadBuf();
        }

        if (ctr < 10000 && buf.length) {
            var str = buf.shift().toString()
            if ((ctr + 1) % 25 == 0) str += '<br />';
            else if ((ctr + 1) % 5 == 0) str += '&nbsp;';
            digitsNode.innerHTML += str;
            window.scrollBy(0, window.innerHeight);
        }
        ctr++;
    };

    var loadBuf = function() {
        if(ctr > 10000 || lock) return;
        lock = true;

        b = c -= 14;
        if (b) numToBuf(getNextNum());

        lock = false;
    };

    var getNextNum = function() {
        var e = d %= f;
        while(g = --b * 2) {
            d = d * b + f * (h ? a[b] : Math.floor(f/5));
            a[b] = d % --g;
            d = Math.floor(d/g);
        }
        return e + Math.floor(d/f);
    };

    var numToBuf = function(x) {
        if (x > 999) buf.pop();

        var str = x.toString();
        while(str.length < 3) {
            str = '0' + str;
        }

        h = str.length;
        while(str.length > 0) {
            buf.push(parseInt(str.charAt(0)));
            str = str.substring(1);
        }
    };

    loadBuf();
    buf.shift(); // Ignore the first 3.
    document.addEventListener('keydown', handleKeydown, false);
    document.getElementById('header').addEventListener('click', handleLoop, false);
    document.getElementById('digits').addEventListener('click', handleLoop, false);
})();
