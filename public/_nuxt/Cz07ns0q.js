import{cc as m,cd as d,a as b}from"./Bg0mMbJt.js";function w(e){return m()?(d(e),!0):!1}function l(e){return typeof e=="function"?e():b(e)}const O=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const y=Object.prototype.toString,g=e=>y.call(e)==="[object Object]",f=()=>{};function S(e,o){function n(...t){return new Promise((i,r)=>{Promise.resolve(e(()=>o.apply(this,t),{fn:o,thisArg:this,args:t})).then(i).catch(r)})}return n}function h(e,o={}){let n,t,i=f;const r=c=>{clearTimeout(c),i(),i=f};return c=>{const a=l(e),u=l(o.maxWait);return n&&r(n),a<=0||u!==void 0&&u<=0?(t&&(r(t),t=null),Promise.resolve(c())):new Promise((s,p)=>{i=o.rejectOnCancel?p:s,u&&!t&&(t=setTimeout(()=>{n&&r(n),t=null,s(c())},u)),n=setTimeout(()=>{t&&r(t),t=null,s(c())},a)})}}function x(e,o=200,n={}){return S(h(o,n),e)}export{l as a,g as b,O as i,f as n,w as t,x as u};