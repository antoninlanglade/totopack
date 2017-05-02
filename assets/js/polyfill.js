// Bind https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function/bind
if (!Function.prototype.bind) {
    console.log('add bind');
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // au plus proche de la fonction interne
            // ECMAScript 5 IsCallable
            throw new TypeError("Function.prototype.bind - ce qui est à lier ne peut être appelé");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}
/*!
 * History API JavaScript Library v4.2.1
 *
 * Support: IE8+, FF3+, Opera 9+, Safari, Chrome and other
 *
 * Copyright 2011-2015, Dmitrii Pakhtinov ( spb.piksel@gmail.com )
 *
 * http://spb-piksel.ru/
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Update: 2015-05-22 13:02
 */
!function(a){if("function"==typeof define&&define.amd){var b="[history"+(new Date).getTime()+"]",c=requirejs.onError;a.toString=function(){return b},requirejs.onError=function(a){-1===a.message.indexOf(b)&&c.call(requirejs,a)},define([],a)}a()}(function(){function d(a,b){var c=s.history!==y;c&&(s.history=y),a.apply(y,b),c&&(s.history=z)}function e(){}function f(c,d,e){if(c==b||""===c||d)c=d?c:x.href,(!C||e)&&(c=c.replace(/^[^#]*/,"")||"#",c=x.protocol.replace(/:.*$|$/,":")+"//"+x.host+N.basepath+c.replace(RegExp("^#[/]?(?:"+N.type+")?"),""));else{var d=f(),g=t.getElementsByTagName("base")[0];!e&&g&&g.getAttribute("href")&&(g.href=g.href,d=f(g.href,b,a)),e=d.d,g=d.h,c=""+c,c=/^(?:\w+\:)?\/\//.test(c)?0===c.indexOf("/")?g+c:c:g+"//"+d.g+(0===c.indexOf("/")?c:0===c.indexOf("?")?e+c:0===c.indexOf("#")?e+d.e+c:e.replace(/[^\/]+$/g,"")+c)}P.href=c;var c=/(?:(\w+\:))?(?:\/\/(?:[^@]*@)?([^\/:\?#]+)(?::([0-9]+))?)?([^\?#]*)(?:(\?[^#]+)|\?)?(?:(#.*))?/.exec(P.href),d=c[2]+(c[3]?":"+c[3]:""),e=c[4]||"/",g=c[5]||"",h="#"===c[6]?"":c[6]||"",i=e+g+h,j=e.replace(RegExp("^"+N.basepath,"i"),N.type)+g;return{b:c[1]+"//"+d+i,h:c[1],g:d,i:c[2],k:c[3]||"",d:e,e:g,a:h,c:i,j:j,f:j+h}}function g(){var a;try{a=s.sessionStorage,a.setItem(O+"t","1"),a.removeItem(O+"t")}catch(b){a={getItem:function(a){return a=t.cookie.split(a+"="),1<a.length&&a.pop().split(";").shift()||"null"},setItem:function(a){var b={};(b[x.href]=z.state)&&(t.cookie=a+"="+w.stringify(b))}}}try{V=w.parse(a.getItem(O))||{}}catch(d){V={}}K(G+"unload",function(){a.setItem(O,w.stringify(V))},c)}function h(d,f,g,h){var i=0;g||(g={set:e},i=1);var j=!g.set,k=!g.get,l={configurable:a,set:function(){j=1},get:function(){k=1}};try{E(d,f,l),d[f]=d[f],E(d,f,g)}catch(m){}if(!(j&&k||(d.__defineGetter__&&(d.__defineGetter__(f,l.get),d.__defineSetter__(f,l.set),d[f]=d[f],g.get&&d.__defineGetter__(f,g.get),g.set&&d.__defineSetter__(f,g.set)),j&&k))){if(i)return c;if(d===s){try{var n=d[f];d[f]=b}catch(o){}if("execScript"in s)s.execScript("Public "+f,"VBScript"),s.execScript("var "+f+";","JavaScript");else try{E(d,f,{value:e})}catch(p){"onpopstate"===f&&(K("popstate",g=function(){L("popstate",g,c);var a=d.onpopstate;d.onpopstate=b,setTimeout(function(){d.onpopstate=a},1)},c),S=0)}d[f]=n}else try{try{var q=v.create(d);E(v.getPrototypeOf(q)===d?q:d,f,g);for(var r in d)"function"==typeof d[r]&&(q[r]=d[r].bind(d));try{h.call(q,q,d)}catch(t){}d=q}catch(u){E(d.constructor.prototype,f,g)}}catch(w){return c}}return d}function i(a,b,c){return c=c||{},a=a===$?x:a,c.set=c.set||function(c){a[b]=c},c.get=c.get||function(){return a[b]},c}function j(a,b,c){a in W?W[a].push(b):3<arguments.length?K(a,b,c,arguments[3]):K(a,b,c)}function k(a,b,c){var d=W[a];if(d){for(a=d.length;a--;)if(d[a]===b){d.splice(a,1);break}}else L(a,b,c)}function l(c,d){var f=(""+("string"==typeof c?c:c.type)).replace(/^on/,""),g=W[f];if(g){if(d="string"==typeof c?d:c,d.target==b)for(var i=["target","currentTarget","srcElement","type"];c=i.pop();)d=h(d,c,{get:"type"===c?function(){return f}:function(){return s}});S&&(("popstate"===f?s.onpopstate:s.onhashchange)||e).call(s,d);for(var i=0,j=g.length;j>i;i++)g[i].call(s,d);return a}return M(c,d)}function m(){var a=t.createEvent?t.createEvent("Event"):t.createEventObject();a.initEvent?a.initEvent("popstate",c,c):a.type="popstate",a.state=z.state,l(a)}function n(a,b,d,e){C?Q=x.href:(0===U&&(U=2),b=f(b,2===U&&-1!==(""+b).indexOf("#")),b.c!==f().c&&(Q=e,d?x.replace("#"+b.f):x.hash=b.f)),!D&&a&&(V[x.href]=a),T=c}function o(b){var c=Q;if(Q=x.href,c){R!==x.href&&m();var b=b||s.event,c=f(c,a),d=f();b.oldURL||(b.oldURL=c.b,b.newURL=d.b),c.a!==d.a&&l(b)}}function p(b){setTimeout(function(){K("popstate",function(a){R=x.href,D||(a=h(a,"state",{get:function(){return z.state}})),l(a)},c)},0),!C&&b!==a&&"location"in z&&(r(F.hash),T&&(T=c,m()))}function q(a){var b,a=a||s.event;a:{for(b=a.target||a.srcElement;b;){if("A"===b.nodeName)break a;b=b.parentNode}b=void 0}var d="defaultPrevented"in a?a.defaultPrevented:a.returnValue===c;b&&"A"===b.nodeName&&!d&&(d=f(),b=f(b.getAttribute("href",2)),d.b.split("#").shift()===b.b.split("#").shift()&&b.a&&(d.a!==b.a&&(F.hash=b.a),r(b.a),a.preventDefault?a.preventDefault():a.returnValue=c))}function r(a){var b=t.getElementById(a=(a||"").replace(/^#/,""));b&&b.id===a&&"A"===b.nodeName&&(a=b.getBoundingClientRect(),s.scrollTo(u.scrollLeft||0,a.top+(u.scrollTop||0)-(u.clientTop||0)))}var a=!0,b=null,c=!1,s=("object"==typeof window?window:this)||{};if(!s.history||"emulate"in s.history)return s.history;var t=s.document,u=t.documentElement,v=s.Object,w=s.JSON,x=s.location,y=s.history,z=y,A=y.pushState,B=y.replaceState,C=!!A,D="state"in y,E=v.defineProperty,F=h({},"t")?{}:t.createElement("a"),G="",H=s.addEventListener?"addEventListener":(G="on")&&"attachEvent",I=s.removeEventListener?"removeEventListener":"detachEvent",J=s.dispatchEvent?"dispatchEvent":"fireEvent",K=s[H],L=s[I],M=s[J],N={basepath:"/",redirect:0,type:"/",init:0},O="__historyAPI__",P=t.createElement("a"),Q=x.href,R="",S=1,T=c,U=0,V={},W={},X=t.title,Y={onhashchange:b,onpopstate:b},Z={setup:function(a,c,d){N.basepath=(""+(a==b?N.basepath:a)).replace(/(?:^|\/)[^\/]*$/,"/"),N.type=c==b?N.type:c,N.redirect=d==b?N.redirect:!!d},redirect:function(d,e){if(z.setup(e,d),e=N.basepath,s.top==s.self){var g=f(b,c,a).c,h=x.pathname+x.search;C?(h=h.replace(/([^\/])$/,"$1/"),g!=e&&RegExp("^"+e+"$","i").test(h)&&x.replace(g)):h!=e&&(h=h.replace(/([^\/])\?/,"$1/?"),RegExp("^"+e,"i").test(h)&&x.replace(e+"#"+h.replace(RegExp("^"+e,"i"),N.type)+x.hash))}},pushState:function(a,c,e){var f=t.title;X!=b&&(t.title=X),A&&d(A,arguments),n(a,e),t.title=f,X=c},replaceState:function(c,e,f){var g=t.title;X!=b&&(t.title=X),delete V[x.href],B&&d(B,arguments),n(c,f,a),t.title=g,X=e},location:{set:function(a){0===U&&(U=1),s.location=a},get:function(){return 0===U&&(U=1),C?x:F}},state:{get:function(){return V[x.href]||b}}},$={assign:function(a){0===(""+a).indexOf("#")?n(b,a):x.assign(a)},reload:function(){x.reload()},replace:function(c){0===(""+c).indexOf("#")?n(b,c,a):x.replace(c)},toString:function(){return this.href},href:{get:function(){return f().b}},protocol:b,host:b,hostname:b,port:b,pathname:{get:function(){return f().d}},search:{get:function(){return f().e}},hash:{set:function(a){n(b,(""+a).replace(/^(#|)/,"#"),c,Q)},get:function(){return f().a}}};return function(){var b=t.getElementsByTagName("script"),b=(b[b.length-1]||{}).src||"";(-1!==b.indexOf("?")?b.split("?").pop():"").replace(/(\w+)(?:=([^&]*))?/g,function(a,b,c){N[b]=(c||"").replace(/^(0|false)$/,"")}),K(G+"hashchange",o,c);var d=[$,F,Y,s,Z,z];D&&delete Z.state;for(var e=0;e<d.length;e+=2)for(var j in d[e])if(d[e].hasOwnProperty(j))if("function"==typeof d[e][j])d[e+1][j]=d[e][j];else{if(b=i(d[e],j,d[e][j]),!h(d[e+1],j,b,function(a,b){b===z&&(s.history=z=d[e+1]=a)}))return L(G+"hashchange",o,c),c;d[e+1]===s&&(W[j]=W[j.substr(2)]=[])}return z.setup(),N.redirect&&z.redirect(),N.init&&(U=1),!D&&w&&g(),C||t[H](G+"click",q,c),"complete"===t.readyState?p(a):(!C&&f().c!==N.basepath&&(T=a),K(G+"load",p,c)),a}()?(z.emulate=!C,s[H]=j,s[I]=k,s[J]=l,z):void 0});
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
 * @version   2.2.0
 */
!function(){"use strict";function a(a){return"function"==typeof a||"object"==typeof a&&null!==a}function b(a){return"function"==typeof a}function c(a){return"object"==typeof a&&null!==a}function j(a,b){w[f]=a,w[f+1]=b,f+=2,2===f&&(i?i(x):z())}function l(a){i=a}function r(){var a=process.nextTick,b=process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);return Array.isArray(b)&&"0"===b[1]&&"10"===b[2]&&(a=setImmediate),function(){a(x)}}function s(){return function(){h(x)}}function t(){var a=0,b=new o(x),c=document.createTextNode("");return b.observe(c,{characterData:!0}),function(){c.data=a=++a%2}}function u(){var a=new MessageChannel;return a.port1.onmessage=x,function(){a.port2.postMessage(0)}}function v(){return function(){setTimeout(x,1)}}function x(){for(var a=0;f>a;a+=2){var b=w[a],c=w[a+1];b(c),w[a]=void 0,w[a+1]=void 0}f=0}function y(){try{var a=require,b=a("vertx");return h=b.runOnLoop||b.runOnContext,s()}catch(c){return v()}}function A(){}function F(){return new TypeError("You cannot resolve a promise with itself")}function G(){return new TypeError("A promises callback cannot return that same promise.")}function H(a){try{return a.then}catch(b){return E.error=b,E}}function I(a,b,c,d){try{a.call(b,c,d)}catch(e){return e}}function J(a,b,c){k(function(a){var d=!1,e=I(c,b,function(c){d||(d=!0,b!==c?M(a,c):O(a,c))},function(b){d||(d=!0,P(a,b))},"Settle: "+(a._label||" unknown promise"));!d&&e&&(d=!0,P(a,e))},a)}function K(a,b){b._state===C?O(a,b._result):b._state===D?P(a,b._result):Q(b,void 0,function(b){M(a,b)},function(b){P(a,b)})}function L(a,c){if(c.constructor===a.constructor)K(a,c);else{var d=H(c);d===E?P(a,E.error):void 0===d?O(a,c):b(d)?J(a,c,d):O(a,c)}}function M(b,c){b===c?P(b,F()):a(c)?L(b,c):O(b,c)}function N(a){a._onerror&&a._onerror(a._result),R(a)}function O(a,b){a._state===B&&(a._result=b,a._state=C,0!==a._subscribers.length&&k(R,a))}function P(a,b){a._state===B&&(a._state=D,a._result=b,k(N,a))}function Q(a,b,c,d){var e=a._subscribers,f=e.length;a._onerror=null,e[f]=b,e[f+C]=c,e[f+D]=d,0===f&&a._state&&k(R,a)}function R(a){var b=a._subscribers,c=a._state;if(0!==b.length){for(var d,e,f=a._result,g=0;g<b.length;g+=3)d=b[g],e=b[g+c],d?V(c,d,e,f):e(f);a._subscribers.length=0}}function S(){this.error=null}function U(a,b){try{return a(b)}catch(c){return T.error=c,T}}function V(a,c,d,e){var g,h,i,j,f=b(d);if(f){if(g=U(d,e),g===T?(j=!0,h=g.error,g=null):i=!0,c===g)return P(c,G()),void 0}else g=e,i=!0;c._state!==B||(f&&i?M(c,g):j?P(c,h):a===C?O(c,g):a===D&&P(c,g))}function W(a,b){try{b(function(b){M(a,b)},function(b){P(a,b)})}catch(c){P(a,c)}}function X(a,b){var c=this;c._instanceConstructor=a,c.promise=new a(A),c._validateInput(b)?(c._input=b,c.length=b.length,c._remaining=b.length,c._init(),0===c.length?O(c.promise,c._result):(c.length=c.length||0,c._enumerate(),0===c._remaining&&O(c.promise,c._result))):P(c.promise,c._validationError())}function Z(a){return new Y(this,a).promise}function _(a){function f(a){M(c,a)}function g(a){P(c,a)}var b=this,c=new b(A);if(!e(a))return P(c,new TypeError("You must pass an array to race.")),c;for(var d=a.length,h=0;c._state===B&&d>h;h++)Q(b.resolve(a[h]),void 0,f,g);return c}function bb(a){var b=this;if(a&&"object"==typeof a&&a.constructor===b)return a;var c=new b(A);return M(c,a),c}function db(a){var b=this,c=new b(A);return P(c,a),c}function gb(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function hb(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function jb(a){this._id=fb++,this._state=void 0,this._result=void 0,this._subscribers=[],A!==a&&(b(a)||gb(),this instanceof jb||hb(),W(this,a))}function kb(){var a;if("undefined"!=typeof global)a=global;else if("undefined"!=typeof self)a=self;else try{a=Function("return this")()}catch(b){throw new Error("polyfill failed because global object is unavailable in this environment")}var c=a.Promise;(!c||"[object Promise]"!==Object.prototype.toString.call(c.resolve())||c.cast)&&(a.Promise=ib)}var d;d=Array.isArray?Array.isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)};var e=d,f=0;({}).toString;var h,i,z,k=j,m="undefined"!=typeof window?window:void 0,n=m||{},o=n.MutationObserver||n.WebKitMutationObserver,p="undefined"!=typeof process&&"[object process]"==={}.toString.call(process),q="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,w=new Array(1e3);z=p?r():o?t():q?u():void 0===m&&"function"==typeof require?y():v();var B=void 0,C=1,D=2,E=new S,T=new S;X.prototype._validateInput=function(a){return e(a)},X.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},X.prototype._init=function(){this._result=new Array(this.length)};var Y=X;X.prototype._enumerate=function(){for(var a=this,b=a.length,c=a.promise,d=a._input,e=0;c._state===B&&b>e;e++)a._eachEntry(d[e],e)},X.prototype._eachEntry=function(a,b){var d=this,e=d._instanceConstructor;c(a)?a.constructor===e&&a._state!==B?(a._onerror=null,d._settledAt(a._state,b,a._result)):d._willSettleAt(e.resolve(a),b):(d._remaining--,d._result[b]=a)},X.prototype._settledAt=function(a,b,c){var d=this,e=d.promise;e._state===B&&(d._remaining--,a===D?P(e,c):d._result[b]=c),0===d._remaining&&O(e,d._result)},X.prototype._willSettleAt=function(a,b){var c=this;Q(a,void 0,function(a){c._settledAt(C,b,a)},function(a){c._settledAt(D,b,a)})};var $=Z,ab=_,cb=bb,eb=db,fb=0,ib=jb;jb.all=$,jb.race=ab,jb.resolve=cb,jb.reject=eb,jb._setScheduler=l,jb._asap=k,jb.prototype={constructor:jb,then:function(a,b){var c=this,d=c._state;if(d===C&&!a||d===D&&!b)return this;var e=new this.constructor(A),f=c._result;if(d){var g=arguments[d-1];k(function(){V(d,e,g,f)})}else Q(c,e,a,b);return e},"catch":function(a){return this.then(null,a)}};var lb=kb,mb={Promise:ib,polyfill:lb};"function"==typeof define&&define.amd?define(function(){return mb}):"undefined"!=typeof module&&module.exports?module.exports=mb:"undefined"!=typeof this&&(this.ES6Promise=mb),lb()}.call(this);
