var CONFIG = {
    auto: true,
    text: 'Top',
    right: 15,
    bottom: 15,
    offset: 500
};

var install = function (hook, vm) {
    var opts = vm.config.scrollToTop || CONFIG;
    CONFIG.auto = opts.auto && typeof opts.auto === 'boolean' ? opts.auto : CONFIG.auto;
    CONFIG.text = opts.text && typeof opts.text === 'string' ? opts.text : CONFIG.text;
    CONFIG.right = opts.right && typeof opts.right === 'number' ? opts.right : CONFIG.right;
    CONFIG.bottom = opts.bottom && typeof opts.bottom === 'number' ? opts.bottom : CONFIG.bottom;
    CONFIG.offset = opts.offset && typeof opts.offset === 'number' ? opts.offset : CONFIG.offset;

    var scrollBtn = '<span class="scroll-to-top" style="' +
                    'display: ' + (CONFIG.auto ? 'none' : 'block') + ';' +
                    'overflow: hidden;' +
                    'position: fixed;' +
                    'right: ' + CONFIG.right + 'px;' +
                    'bottom: ' + CONFIG.bottom + 'px;' +
                    'width: 50px;' +
                    'height: 50px;' +
                    'background: white;' +
                    'color: #666;' +
                    'border: 1px solid #ddd;' +
                    'border-radius: 4px;' +
                    'line-height: 42px;' +
                    'font-size: 16px;' +
                    'text-align: center;' +
                    'box-shadow: 0px 0px 6px #eee;' +
                    'cursor: pointer;' +
                    '">' + CONFIG.text + '</span>';

    var onScroll = function(e) {
        if (!CONFIG.auto) {
            return;
        }
        var offset = window.document.documentElement.scrollTop;
        var $scrollBtn = Docsify.dom.find('span.scroll-to-top');
        $scrollBtn.style.display = offset >= CONFIG.offset ? "block" : "none";
    };

    hook.afterEach(function(html, next) {
        next(html + scrollBtn);
    });

    hook.doneEach(function() {
        var $scrollBtn = Docsify.dom.find('span.scroll-to-top');
        if ($scrollBtn) {
            window.removeEventListener('scroll', onScroll);
            window.addEventListener('scroll', onScroll);
            Docsify.dom.on(
                $scrollBtn,
                'click',
                function (e) {
                    e.stopPropagation();
                    Docsify.dom.body.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            );
            Docsify.dom.findAll('h1,h2,h3,h4,h5,h6,h7,h8,h9').forEach(function (node) {
                node.style.position = 'relative';
            });
        }
    });
};

$docsify.plugins = [].concat(install, $docsify.plugins);
