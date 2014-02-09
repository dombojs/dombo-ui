
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
                initClass = 'js-init-' + name;

            if (options || defaults) {
                options = $.extend(true, defaults, options);
            }

            if (!el.hasClass(initClass)) {
                init.call(el[0], $, el, options);
                el.addClass(initClass);
            }

        }

        return this;

    });

};

var seq = 0;
factory.id = function(node) {
    if (!node.id) node.id = 'ui-id-' + (++seq);
    return node.id;
};
