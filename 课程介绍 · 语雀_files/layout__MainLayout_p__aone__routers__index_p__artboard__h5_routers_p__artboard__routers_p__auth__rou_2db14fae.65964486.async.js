(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{115:function(u,t,e){"use strict";var n=e(27),r=e(1917),i=e(123),o=e(143),a=e(125),D=e(124),c=e(1915).getSizeValue,F=e(1916),A=e(129).NUMBER_SIZE;u.exports={wordCount:F,getSizeValue:c,sortByTime:function(u,t){var e=u.filter((function(u){return u[t]}));return 0===e.length?u:(e.sort((function(u,e){return new Date(e[t])-new Date(u[t])})),e.length===u.length?e:e.concat(u.filter((function(u){return!u[t]}))))},countdown:function(u){var t=this,e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=function(u){return u};"undefined"!=typeof window&&"function"==typeof window.__?r=window.__:this.ctx&&(r=function(){for(var u,e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return(u=t.ctx.__).call.apply(u,[t.ctx].concat(n))}),u=n(u).unix();var i=n().unix(),o=u-i;if(!(o<0)){var a,D=n.duration(1e3*o,"milliseconds"),c=D.years(),F=D.months(),A=D.days(),s=D.hours(),l=D.minutes(),f=D.seconds();return c>0?a="".concat(c," ").concat(r("年")):F>0?a="".concat(F," ").concat(r("个月")):A>0?a="".concat(A," ").concat(r("天")):s>0?a="".concat(s," ").concat(r("小时")):l>0?a="".concat(l," ").concat(r("分")):f>0&&(a="".concat(f," ").concat(r("秒"))),e?a:{text:a,years:c,months:F,days:A,hours:s,minutes:l,seconds:f}}},getAvatarText:function(u){var t=u.codePointAt(0);if(t=String.fromCodePoint(t),!/[0-9a-zA-Z\u4e00-\u9fa5]/.test(t)){var e=u.match(/[\u4e00-\u9fa5]/);e||(e=u.match(/[0-9a-zA-Z]/)),e&&(t=e[0])}return t},isPreviewableZipFiles:function(u){return!!(u=u.toLowerCase()).endsWith(".mindnode.zip")||(!!u.endsWith(".xmind.zip")||(!!u.endsWith(".mpp.zip")||!!u.endsWith(".mmap.zip")))},getExtFromFileName:function(u){return u.endsWith(".mindnode.zip")?"mindnode.zip":u.endsWith(".xmind.zip")?"xmind.zip":u.endsWith(".mpp.zip")?"mpp.zip":u.endsWith(".mmap.zip")?"mmap.zip":(/^\.[^.]+$/.test(u)?u:r.extname(u)).substring(1).toLowerCase()},isImage:function(u){var t=this.getExtFromFileName(u);return i.includes(".".concat(t))},isCompressedFile:function(u){var t=this.getExtFromFileName(u);return o.includes(".".concat(t))},isAudio:function(u){var t=this.getExtFromFileName(u);return a.includes(".".concat(t))},isVideo:function(u){var t=this.getExtFromFileName(u);return D.includes(".".concat(t))},isAxure:function(u){return u.endsWith(".rp")||u.endsWith(".rplib")},numberFormat:function(){var u=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"zh-cn";return"number"!=typeof u?"0":"zh-cn"===t?u<A.W?"".concat(u):"".concat(parseFloat((u/A.W).toFixed(1)),"W"):"en-us"===t?u>A.M?"".concat(parseFloat((u/A.M).toFixed(1)),"M"):u>A.K?"".concat(parseFloat((u/A.K).toFixed(1)),"K"):"".concat(u):void 0}}},1915:function(u,t,e){"use strict";var n=e(129).SIZE;u.exports={getSizeValue:function(u){return u>=n.TB?{value:u/n.TB,unit:"TB"}:u>=n.GB?{value:u/n.GB,unit:"GB"}:u>=n.MB?{value:u/n.MB,unit:"MB"}:{value:u/n.KB,unit:"KB"}}}},1916:function(u,t,e){"use strict";function n(u){return function(u){if(Array.isArray(u))return r(u)}(u)||function(u){if("undefined"!=typeof Symbol&&null!=u[Symbol.iterator]||null!=u["@@iterator"])return Array.from(u)}(u)||function(u,t){if(!u)return;if("string"==typeof u)return r(u,t);var e=Object.prototype.toString.call(u).slice(8,-1);"Object"===e&&u.constructor&&(e=u.constructor.name);if("Map"===e||"Set"===e)return Array.from(u);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return r(u,t)}(u)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(u,t){(null==t||t>u.length)&&(t=u.length);for(var e=0,n=new Array(t);e<t;e++)n[e]=u[e];return n}var i=e(1918),o=/(?:[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFE2\uDFE3\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])+|(?:[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F])/g,a=/--+/g,D=/\s+/;u.exports=function(u){if(!u)return 0;var t=0;return(u=(u=(u=" ".concat(i(String(u))," ")).replace(o,(function(u){return u.codePointAt(0)>127?(t+=n(u).length," "):u})).replace(a,(function(u,e,n){return D.test(n[e-1])&&t++," "}))).trim())&&(t+=u.split(D).length),t}},1917:function(u,t,e){"use strict";(function(t){function e(u){if("string"!=typeof u)throw new TypeError("Path must be a string. Received "+JSON.stringify(u))}function n(u,t){for(var e,n="",r=0,i=-1,o=0,a=0;a<=u.length;++a){if(a<u.length)e=u.charCodeAt(a);else{if(47===e)break;e=47}if(47===e){if(i===a-1||1===o);else if(i!==a-1&&2===o){if(n.length<2||2!==r||46!==n.charCodeAt(n.length-1)||46!==n.charCodeAt(n.length-2))if(n.length>2){var D=n.lastIndexOf("/");if(D!==n.length-1){-1===D?(n="",r=0):r=(n=n.slice(0,D)).length-1-n.lastIndexOf("/"),i=a,o=0;continue}}else if(2===n.length||1===n.length){n="",r=0,i=a,o=0;continue}t&&(n.length>0?n+="/..":n="..",r=2)}else n.length>0?n+="/"+u.slice(i+1,a):n=u.slice(i+1,a),r=a-i-1;i=a,o=0}else 46===e&&-1!==o?++o:o=-1}return n}var r={resolve:function(){for(var u,r="",i=!1,o=arguments.length-1;o>=-1&&!i;o--){var a;o>=0?a=arguments[o]:(void 0===u&&(u=t.cwd()),a=u),e(a),0!==a.length&&(r=a+"/"+r,i=47===a.charCodeAt(0))}return r=n(r,!i),i?r.length>0?"/"+r:"/":r.length>0?r:"."},normalize:function(u){if(e(u),0===u.length)return".";var t=47===u.charCodeAt(0),r=47===u.charCodeAt(u.length-1);return 0!==(u=n(u,!t)).length||t||(u="."),u.length>0&&r&&(u+="/"),t?"/"+u:u},isAbsolute:function(u){return e(u),u.length>0&&47===u.charCodeAt(0)},join:function(){if(0===arguments.length)return".";for(var u,t=0;t<arguments.length;++t){var n=arguments[t];e(n),n.length>0&&(void 0===u?u=n:u+="/"+n)}return void 0===u?".":r.normalize(u)},relative:function(u,t){if(e(u),e(t),u===t)return"";if((u=r.resolve(u))===(t=r.resolve(t)))return"";for(var n=1;n<u.length&&47===u.charCodeAt(n);++n);for(var i=u.length,o=i-n,a=1;a<t.length&&47===t.charCodeAt(a);++a);for(var D=t.length-a,c=o<D?o:D,F=-1,A=0;A<=c;++A){if(A===c){if(D>c){if(47===t.charCodeAt(a+A))return t.slice(a+A+1);if(0===A)return t.slice(a+A)}else o>c&&(47===u.charCodeAt(n+A)?F=A:0===A&&(F=0));break}var s=u.charCodeAt(n+A);if(s!==t.charCodeAt(a+A))break;47===s&&(F=A)}var l="";for(A=n+F+1;A<=i;++A)A!==i&&47!==u.charCodeAt(A)||(0===l.length?l+="..":l+="/..");return l.length>0?l+t.slice(a+F):(a+=F,47===t.charCodeAt(a)&&++a,t.slice(a))},_makeLong:function(u){return u},dirname:function(u){if(e(u),0===u.length)return".";for(var t=u.charCodeAt(0),n=47===t,r=-1,i=!0,o=u.length-1;o>=1;--o)if(47===(t=u.charCodeAt(o))){if(!i){r=o;break}}else i=!1;return-1===r?n?"/":".":n&&1===r?"//":u.slice(0,r)},basename:function(u,t){if(void 0!==t&&"string"!=typeof t)throw new TypeError('"ext" argument must be a string');e(u);var n,r=0,i=-1,o=!0;if(void 0!==t&&t.length>0&&t.length<=u.length){if(t.length===u.length&&t===u)return"";var a=t.length-1,D=-1;for(n=u.length-1;n>=0;--n){var c=u.charCodeAt(n);if(47===c){if(!o){r=n+1;break}}else-1===D&&(o=!1,D=n+1),a>=0&&(c===t.charCodeAt(a)?-1==--a&&(i=n):(a=-1,i=D))}return r===i?i=D:-1===i&&(i=u.length),u.slice(r,i)}for(n=u.length-1;n>=0;--n)if(47===u.charCodeAt(n)){if(!o){r=n+1;break}}else-1===i&&(o=!1,i=n+1);return-1===i?"":u.slice(r,i)},extname:function(u){e(u);for(var t=-1,n=0,r=-1,i=!0,o=0,a=u.length-1;a>=0;--a){var D=u.charCodeAt(a);if(47!==D)-1===r&&(i=!1,r=a+1),46===D?-1===t?t=a:1!==o&&(o=1):-1!==t&&(o=-1);else if(!i){n=a+1;break}}return-1===t||-1===r||0===o||1===o&&t===r-1&&t===n+1?"":u.slice(t,r)},format:function(u){if(null===u||"object"!=typeof u)throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof u);return function(u,t){var e=t.dir||t.root,n=t.base||(t.name||"")+(t.ext||"");return e?e===t.root?e+n:e+u+n:n}("/",u)},parse:function(u){e(u);var t={root:"",dir:"",base:"",ext:"",name:""};if(0===u.length)return t;var n,r=u.charCodeAt(0),i=47===r;i?(t.root="/",n=1):n=0;for(var o=-1,a=0,D=-1,c=!0,F=u.length-1,A=0;F>=n;--F)if(47!==(r=u.charCodeAt(F)))-1===D&&(c=!1,D=F+1),46===r?-1===o?o=F:1!==A&&(A=1):-1!==o&&(A=-1);else if(!c){a=F+1;break}return-1===o||-1===D||0===A||1===A&&o===D-1&&o===a+1?-1!==D&&(t.base=t.name=0===a&&i?u.slice(1,D):u.slice(a,D)):(0===a&&i?(t.name=u.slice(1,o),t.base=u.slice(1,D)):(t.name=u.slice(a,o),t.base=u.slice(a,D)),t.ext=u.slice(o,D)),a>0?t.dir=u.slice(0,a-1):i&&(t.dir="/"),t},sep:"/",delimiter:":",win32:null,posix:null};r.posix=r,u.exports=r}).call(this,e(216))},1918:function(u,t,e){"use strict";var n=/<[^>]+>/g;u.exports=function(u){return u.replace(n," ").trim()}},1929:function(u,t,e){u.exports=e(47)},2036:function(u,t,e){"use strict";e.r(t),e.d(t,"getFileAccept",(function(){return Y})),e.d(t,"getImageAccept",(function(){return G})),e.d(t,"getLocalDocAcceptArr",(function(){return q})),e.d(t,"getFileAcceptArr",(function(){return U})),e.d(t,"getImageAcceptArr",(function(){return K})),e.d(t,"getVideoAcceptArr",(function(){return Z})),e.d(t,"getAudioAcceptArr",(function(){return J}));var n=e(146),r=e.n(n),i=e(123),o=e.n(i),a=e(124),D=e.n(a),c=e(125),F=e.n(c),A=e(110),s=e.n(A),l=e(148),f=e.n(l),E=e(149),d=e.n(E),C=e(156),h=e.n(C),p=e(593),g=e.n(p),m=r.a,v=r.a.normal,_=r.a.paid,B=[f.a,d.a,s.a,h.a],w={LOCAL_DOC_EXT:g()(B).concat([".pdf"]),LOCAL_DOC_EXT_NORMAL:g()(B.map((function(u){return u.normal}))).concat([".pdf"]),LOCAL_DOC_EXT_PAID:g()(B.map((function(u){return u.paid}))).concat([".pdf"]),FILE_EXT:m,FILE_EXT_NORMAL:v,FILE_EXT_PAID:_,IMAGE_EXT:o.a,IMAGE_EXT_NORMAL:o.a.normal,IMAGE_EXT_PAID:o.a.paid,VIDEO_EXT:D.a,VIDEO_EXT_NORMAL:D.a.normal,VIDEO_EXT_PAID:D.a.paid,AUDIO_EXT:F.a,AUDIO_EXT_NORMAL:F.a.normal,AUDIO_EXT_PAID:F.a.paid},I=e(285),x=e.n(I),T=w.LOCAL_DOC_EXT,O=w.LOCAL_DOC_EXT_NORMAL,y=w.LOCAL_DOC_EXT_PAID,b=w.FILE_EXT,L=w.FILE_EXT_NORMAL,X=w.FILE_EXT_PAID,M=w.IMAGE_EXT,z=w.IMAGE_EXT_NORMAL,P=w.IMAGE_EXT_PAID,N=w.VIDEO_EXT,j=w.VIDEO_EXT_NORMAL,R=w.VIDEO_EXT_PAID,S=w.AUDIO_EXT,W=w.AUDIO_EXT_NORMAL,k=w.AUDIO_EXT_PAID,V=function(){var u="undefined"!=typeof navigator?navigator.userAgent:"";return/android/i.test(u)};function Y(){return V()?"*/*":(window.appData||{}).isYuque?x()()?X.join(","):L.join(","):b.join(",")}function G(){return V()?"image/*":(window.appData||{}).isYuque?x()()?P.join(","):z.join(","):M.join(",")}function q(){return(window.appData||{}).isYuque?x()()?y:O:T}function U(){return(window.appData||{}).isYuque?x()()?X:L:b}function K(){return(window.appData||{}).isYuque?x()()?P:z:M}function Z(){return(window.appData||{}).isYuque?x()()?R:j:N}function J(){return(window.appData||{}).isYuque?x()()?k:W:S}},285:function(u,t,e){var n=e(1929).PAYMENT_TYPE;u.exports=function(u){var t,e=window.appData,r=u||e,i=r.group,o=r.organization,a=r.isYuque,D=r.me;return!a||(o?!((t=o).payment_type===n.free||t.payment_type===n.downgrade_free):i?i.isPaid:!(!D||!/(my\/notes)|(dashboard\/notes)/.test(window.location.pathname))&&D.isPaid)}}}]);