import{_ as A}from"./D7ztVA15.js";import{cy as T,d as g,g as n,h as f,k as l,a as s,cz as C,be as V,a2 as P,cA as B,cB as S,bM as j,r as _,j as d,w as p,i as v,b3 as M,s as O,a3 as c,aj as h,ai as x,ba as D,aY as m,aU as F,al as b,q as I,cC as L,bf as z,bl as N,O as H,X as K,t as Y,L as $,o as E,bj as G,ch as U}from"./D38D1crN.js";import{a as k,V as X}from"./CdGL1w5P.js";/* empty css        */import{u as q}from"./DxicphAI.js";import{V as J,a as Q}from"./D6b5yViA.js";import"./DP5m7wrX.js";const R=T("v-spacer","div","VSpacer"),W=g({__name:"VSonner",props:{invert:{type:Boolean},position:{default:"bottom-center"},hotkey:{default:()=>["altKey","KeyT"]},expand:{type:Boolean,default:!1},duration:{},gap:{},visibleToasts:{default:3},toastOptions:{},class:{},offset:{default:32},dir:{},icons:{},containerAriaLabel:{},pauseWhenPageIsHidden:{type:Boolean},cn:{}},setup(t){return(a,e)=>(n(),f(P,null,[l(s(C),{position:a.position,hotkey:a.hotkey,expand:a.expand,"visible-toasts":a.visibleToasts,duration:a.duration,"toast-options":a.toastOptions,offset:a.offset},null,8,["position","hotkey","expand","visible-toasts","duration","toast-options","offset"]),V(a.$slots,"default")],64))}}),Z=g({__name:"ProgressBar",props:{duration:{default:5e3},progressBarProps:{},isPaused:{type:Boolean,default:!1},reverseProgressBar:{type:Boolean,default:!1}},setup(t){const a=t,e=a.reverseProgressBar?_(0):_(5e3);let r;$(()=>a.isPaused,i=>{var y;!i&&!((y=a.progressBarProps)!=null&&y.indeterminate)&&o()});function o(){r=setTimeout(()=>{a.isPaused||(a.reverseProgressBar?e.value+=120:e.value-=120,e.value<=0&&!a.reverseProgressBar?(e.value=0,clearInterval(r)):e.value>=a.duration&&a.reverseProgressBar?(e.value=a.duration,clearInterval(r)):o())},100)}return E(()=>{var i;(i=a.progressBarProps)!=null&&i.indeterminate||(e.value=a.reverseProgressBar?0:a.duration,o())}),G(()=>{clearInterval(r)}),(i,y)=>(n(),d(s(U),c(a.progressBarProps,{"model-value":Math.floor(100*(s(e)/a.duration))}),null,16,["model-value"]))}}),ee={class:"d-flex align-center justify-center fill-height"},ae={key:1,class:"d-flex align-center mr-8"},re={class:"d-flex align-center justify-center fill-height"},se={key:3},oe={class:"pb-1"},te=["innerHTML"],ne=g({inheritAttrs:!1,__name:"Toast",props:{text:{},description:{},vertical:{type:Boolean,default:!1},cardProps:{},cardTextProps:{},cardActionsProps:{default:()=>({})},action:{},prependIcon:{},prependIconProps:{},avatar:{},multipleAvatars:{},avatarProps:{},progressBar:{type:Boolean,default:!1},reverseProgressBar:{type:Boolean},progressDuration:{default:5e3},progressBarProps:{},loading:{type:Boolean}},emits:["closeToast"],setup(t){const a=_(!1);return(e,r)=>(n(),d(s(Y),c({class:"card-snackbar"},e.cardProps,{onMouseenter:r[1]||(r[1]=o=>a.value=!0),onMouseleave:r[2]||(r[2]=o=>a.value=!1)}),{default:p(()=>[v("div",{class:M({"d-flex flex-no-wrap justify-space-between":!e.vertical})},[l(s(O),c(e.cardTextProps,{class:{"d-flex align-center":e.prependIcon||e.avatar||e.multipleAvatars}}),{default:p(()=>[e.avatar?(n(),d(s(h),c({key:0,class:"mr-2"},e.avatarProps),{default:p(()=>[l(s(x),{src:e.avatar,cover:""},{placeholder:p(()=>[v("div",ee,[l(s(k),{color:"grey-lighten-2",indeterminate:""})])]),_:1},8,["src"])]),_:1},16)):e.multipleAvatars?(n(),f("div",ae,[(n(!0),f(P,null,D(e.multipleAvatars.length<=5?e.multipleAvatars:e.multipleAvatars.slice(0,5),(o,i)=>(n(),d(s(h),c({ref_for:!0},e.avatarProps,{key:i,class:"mr-n6",style:{zIndex:5-i}}),{default:p(()=>[l(s(x),{src:o,cover:""},{placeholder:p(()=>[v("div",re,[l(s(k),{color:"grey-lighten-2",indeterminate:""})])]),_:2},1032,["src"])]),_:2},1040,["style"]))),128))])):m("",!0),e.prependIcon?(n(),d(s(F),c({key:2,class:"mr-2",icon:e.prependIcon},e.prependIconProps),null,16,["icon"])):m("",!0),e.description?(n(),f("div",se,[v("div",oe,b(e.text),1),v("p",{class:"font-weight-light",innerHTML:e.description},null,8,te)])):(n(),f(P,{key:4},[I(b(e.text),1)],64))]),_:1},16,["class"]),e.action?(n(),d(s(L),z(c({key:0},e.cardActionsProps)),{default:p(()=>[l(s(R)),l(s(X),c(e.action.buttonProps,{text:e.action.label,onClick:r[0]||(r[0]=()=>{var o,i;e.$emit("closeToast"),(i=(o=e.action)==null?void 0:o.onClick)==null||i.call(o)})}),null,16,["text"])]),_:1},16)):m("",!0)],2),l(s(N),null,{default:p(()=>[H(l(Z,{duration:e.progressDuration,"progress-bar-props":e.progressBarProps,"is-paused":a.value,"reverse-progress-bar":e.reverseProgressBar},null,8,["duration","progress-bar-props","is-paused","reverse-progress-bar"]),[[K,e.progressBar]])]),_:1})]),_:1},16))}}),le=(t,a)=>{const e=t.__vccOpts||t;for(const[r,o]of a)e[r]=o;return e},ie=le(ne,[["__scopeId","data-v-c014bbd8"]]);function w(t,a){const{description:e,action:r,...o}=a||{};return B.custom(S(j(ie,{...o,progressBar:(a==null?void 0:a.progressBar)??!1,progressDuration:(a==null?void 0:a.duration)??5e3,progressBarProps:{...a==null?void 0:a.progressBarProps,indeterminate:a==null?void 0:a.loading},description:e,action:r,text:t})),{...o,unstyled:!0})}function u(t,a){return function(e,r){return w(e,{prependIcon:a,cardProps:{color:t,...r==null?void 0:r.cardProps},...r})}}Object.assign(w,{success:u("success","mdi-check-circle"),error:u("error","mdi-cancel"),warning:u("warning","mdi-alert"),info:u("info","mdi-alert-circle"),primary:u("primary","mdi-bell"),secondary:u("secondary","mdi-bell"),dismiss(t){return B.dismiss(t)},toastOriginal:B});const ge=g({__name:"blank",setup(t){return(a,e)=>{const r=A;return n(),d(Q,{app:""},{default:p(()=>[l(r,null,{default:p(()=>[l(s(W),{position:"top-right"})]),_:1}),V(a.$slots,"default"),s(q)().showFooter?(n(),d(J,{key:0,absolute:"",app:"",style:{"max-width":"50%"},color:"background"},{default:p(()=>[I(b(new Date().getFullYear())+" © Futzo ",1)]),_:1})):m("",!0)]),_:3})}}});export{ge as default};
