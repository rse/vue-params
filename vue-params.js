/*!
**  vue-params -- Vue plugin for global parameters triggering data-binding updates
**  Copyright (c) 2016 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*  Universal Module Definition (UMD)  */
(function (root, name, factory) {
    /* global define: false */
    /* global module: false */
    if (typeof define === "function" && typeof define.amd !== "undefined")
        /*  AMD environment  */
        define(name, function () { return factory(root); })
    else if (typeof module === "object" && typeof module.exports === "object")
        /*  CommonJS environment  */
        module.exports = factory(root)
    else
        /*  Browser environment  */
        root[name] = factory(root)
}(this, "VueParams", function (/* root */) {
    /*  the Plugin */
    var VueParams = {
        install: function (Vue /*, options */) {
            /*  define observable "Vue.params" object  */
            var paramValue   = {}
            var paramWatcher = []
            Object.defineProperty(Vue, "params", {
                enumerable:   true,
                configurable: false,
                value:        {},
                writeable:    false
            })

            /*  hook into the Vue instance life-cycle  */
            var _init    = Vue.prototype._init
            var _destroy = Vue.prototype._destroy
            Vue.prototype._init = function () {
                paramWatcher.push(this)
                return _init.apply(this, arguments)
            }
            Vue.prototype._destroy = function () {
                paramWatcher = paramWatcher.filter(function (watcher) { return watcher !== this })
                return _destroy.apply(this, arguments)
            }

            /*  provide global API methods  */
            Vue.paramsCreate = function (params) {
                if (typeof params === "string")
                    params = [ params ]
                if (!(typeof params === "object" && params instanceof Array))
                    throw new Error("invalid params parameter (expected single string or array of strings)")
                params.forEach(function (name) {
                    Object.defineProperty(Vue.params, name, {
                        enumerable:   true,
                        configurable: true,
                        get: function () {
                            return paramValue[name]
                        },
                        set: function (val) {
                            if (paramValue[name] !== val) {
                                paramValue[name] = val
                                paramWatcher.forEach(function (vue) {
                                    vue.$forceUpdate()
                                })
                            }
                        }
                    })
                })
            }
            Vue.paramsDestroy = function (params) {
                if (typeof params === "string")
                    params = [ params ]
                if (!(typeof params === "object" && params instanceof Array))
                    throw new Error("invalid params parameter (expected single string or array of strings)")
                params.forEach(function (name) {
                    delete Vue.params[name]
                    delete paramValue[name]
                })
            }
        }
    }

    /*  export API  */
    return VueParams
}))

