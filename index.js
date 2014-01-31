
var $ = require('dombo');

module.exports = factory;

function factory(name, defaults, init) {

    if ($.isFunction(defaults)) {
        init = defaults;
        defaults = {};
    }

    $.use(name, function plugin(options) {

        if (init) {

            var el = this,
                initClass = 'js-init-' + name,
                event = 'init' + '.' + name;

            if (options || defaults) {
                options = $.extend(true, defaults, options);
            }

            el.on(event, function(e) {
                if (!el.hasClass(initClass)) {
                    init.call(el[0], $, el, options);
                    el.addClass(initClass);
                }
            });

            el.trigger(event);

        }

        return this;

    });

};

var seq = 0;
factory.id = function(node) {
    if (!node.id) node.id = 'ui-id-' + (++seq);
    return node.id;
};
