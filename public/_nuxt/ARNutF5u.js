import{t as g,i as O,a as E,n as R,b as z}from"./I8pzY8dt.js";import{J as k,L,r as F,K as C,o as S,cL as W,a as U}from"./D38D1crN.js";const M=O?window:void 0;function A(t){var r;const a=E(t);return(r=a==null?void 0:a.$el)!=null?r:a}function T(...t){let r,a,o,f;if(typeof t[0]=="string"||Array.isArray(t[0])?([a,o,f]=t,r=M):[r,a,o,f]=t,!r)return R;Array.isArray(a)||(a=[a]),Array.isArray(o)||(o=[o]);const l=[],d=()=>{l.forEach(u=>u()),l.length=0},m=(u,s,c,h)=>(u.addEventListener(s,c,h),()=>u.removeEventListener(s,c,h)),n=L(()=>[A(r),E(f)],([u,s])=>{if(d(),!u)return;const c=z(s)?{...s}:s;l.push(...a.flatMap(h=>o.map(b=>m(u,h,b,c))))},{immediate:!0,flush:"post"}),y=()=>{n(),d()};return g(y),y}function Z(){const t=F(!1),r=W();return r&&S(()=>{t.value=!0},r),t}function j(t){const r=Z();return k(()=>(r.value,!!t()))}function I(t,r={}){var a,o;const f=F(!1),l=C(null);let d=0,m=!0;if(O){const n=typeof r=="function"?{onDrop:r}:r,y=(a=n.multiple)!=null?a:!0,u=(o=n.preventDefaultForUnhandled)!=null?o:!1,s=e=>{var i,p;const v=Array.from((p=(i=e.dataTransfer)==null?void 0:i.files)!=null?p:[]);return v.length===0?null:y?v:[v[0]]},c=e=>{if(n.dataTypes){const i=U(n.dataTypes);return typeof i=="function"?i(e):i?i.some(p=>e.includes(p)):!0}return!0},h=e=>{var i,p;const v=Array.from((p=(i=e.dataTransfer)==null?void 0:i.items)!=null?p:[]),_=v.map(V=>V.type),w=c(_),D=y||v.length<=1;return w&&D},b=(e,i)=>{var p,v,_,w;if(m=h(e),!m){u&&e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="none");return}e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="copy");const D=s(e);switch(i){case"enter":d+=1,f.value=!0,(p=n.onEnter)==null||p.call(n,null,e);break;case"over":(v=n.onOver)==null||v.call(n,null,e);break;case"leave":d-=1,d===0&&(f.value=!1),(_=n.onLeave)==null||_.call(n,null,e);break;case"drop":d=0,f.value=!1,m&&(l.value=D,(w=n.onDrop)==null||w.call(n,D,e));break}};T(t,"dragenter",e=>b(e,"enter")),T(t,"dragover",e=>b(e,"over")),T(t,"dragleave",e=>b(e,"leave")),T(t,"drop",e=>b(e,"drop"))}return{files:l,isOverDropZone:f}}function J(t,r,a={}){const{window:o=M,...f}=a;let l;const d=j(()=>o&&"ResizeObserver"in o),m=()=>{l&&(l.disconnect(),l=void 0)},n=k(()=>{const s=E(t);return Array.isArray(s)?s.map(c=>A(c)):[A(s)]}),y=L(n,s=>{if(m(),d.value&&o){l=new ResizeObserver(r);for(const c of s)c&&l.observe(c,f)}},{immediate:!0,flush:"post"}),u=()=>{m(),y()};return g(u),{isSupported:d,stop:u}}export{J as a,I as u};
