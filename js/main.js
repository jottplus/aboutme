let rollerOpen = true;
let last_known_scroll_position = 0;
let ticking = false;

(function() {
    resize();
    document.getElementById('handle-wrapper').onclick = function(e) {
        if (rollerOpen) closeRoller();
    };
    document.getElementById('content-header').onclick = function(e) {
        if (!rollerOpen) openRoller();
    };
    window.addEventListener('resize', resize);

    document.addEventListener('scroll', function(e) {
        last_known_scroll_position = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                doSomething(last_known_scroll_position);
                ticking = false;
            });
            ticking = true;
        }
    });

})();

function doSomething(scroll_pos) {
    if (rollerOpen && scroll_pos > 0) closeRoller();
}

function closeRoller() {
    window.scrollTo(0, 0);         
    document.getElementById('thread').classList.remove('thread-swing');
    document.getElementById('handle').classList.remove('swing');
    document.getElementById('handle-wrapper').classList.remove('handle-open');
    document.getElementById('handle-wrapper').classList.add('handle-close');
    document.getElementById('roller-blind').classList.remove('roller-open');
    document.getElementById('roller-blind').classList.add('roller-close');
    setTimeout(function() {
        document.getElementById('content').style.visibility = 'visible';  
    }, 100);
    document
    rollerOpen = false;
}

function openRoller() {        
    document.getElementById('thread').classList.add('thread-swing');
    document.getElementById('handle').classList.add('swing');
    document.getElementById('handle-wrapper').classList.remove('handle-close');
    document.getElementById('handle-wrapper').classList.add('handle-open');
    document.getElementById('roller-blind').classList.remove('roller-close');
    document.getElementById('roller-blind').classList.add('roller-open');
    setTimeout(function() {
        document.getElementById('content').style.visibility = 'hidden'; 
    }, 300);
    rollerOpen = true;
}

function resize() {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    document.getElementsByTagName('body')[0].style.height = vh + 'px';
    document.getElementById('content-image-wrapper').style.height = document.getElementById('content-image-wrapper').offsetWidth + 'px';
    document.getElementById('handle').style.height = document.getElementById('handle').offsetWidth + 'px';
}