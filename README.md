
vue-params
==========

Vue plugin for global parameters triggering data-binding updates.

<p/>
<img src="https://nodei.co/npm/vue-params.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/vue-params.png" alt=""/>

About
-----

This is an plugin for the [Vue](http://vuejs.org) view data-binding
library, adding the capability for global parameters under the namespace
`Vue.params` which force data-binding updates of all currently active
Vue instances.

This is intended to be used for parameters which custom Vue
methods are using and which should cause the data-binding to
update (and this way the methods to get called) every time the
parameter is changed. A typical example is the definition of
the language parameter `Vue.params.i18nextLanguage` (of plugin
[vue-i18next](https://github.com/rse/vue-i18next)) which causes all
`$t("...")` method calls in Vue expressions to be re-executed.

Usage
-----

```shell
$ npm install vue
$ npm install vue-params
```

```js
Vue.use(VueParams)
Vue.paramsCreate("foo")
Vue.params.foo = "bar"
Vue.paramsCreate("quux")
Vue.params.quux = "baz"
```

License
-------

Copyright (c) 2016-2021 Dr. Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

