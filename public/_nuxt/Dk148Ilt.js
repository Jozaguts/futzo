const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./BpWxZBgK.js","./D38D1crN.js","./entry.zQvh-T_M.css","./2cPTsbQs.js","./ByU7tvlk.js","./CDWs0q6a.js","./C5FJ8iO1.js","./C59SY41P.js","./VGrid.D0S0a0cH.css","./CdGL1w5P.js","./VBtn.Bh6kLUXj.css"])))=>i.map(i=>d[i]);
import{z as ne,A as X,B as se,C as le,D as ke,E as Y,F as Ie,G as Pe,H as Be,I as $e,r as $,J as b,K as j,L as pe,M as Ee,k as s,N as H,O as ie,P as We,Q as Re,R as Me,S as ue,T as Xe,U as Ye,W as He,X as ze,Y as Ae,Z as F,$ as Ge,a0 as re,a1 as Le,a2 as de,a3 as W,a4 as Ue,a5 as je,a6 as Fe,a7 as ce,a8 as De,a9 as Oe,aa as Ne,ab as qe,ac as k,ad as Je,ae as Ke,af as Q,ag as Qe,d as q,ah as Ze,a as _,g as R,h as Z,w as u,ai as et,aj as tt,_ as at,o as ot,j as U,s as D,q as B,ak as fe,l as ve,m as nt,i as I,n as ee,al as z,am as st,t as me,V as lt,p as te,an as it,ao as ut}from"./D38D1crN.js";import{u as A}from"./2cPTsbQs.js";import{V as M,m as rt,a as dt}from"./CdGL1w5P.js";import{V as ct}from"./CqdbYewM.js";import{_ as ft}from"./D7ztVA15.js";import{u as vt}from"./ByU7tvlk.js";import{V as mt}from"./C5FJ8iO1.js";import{V as L,a as P}from"./C59SY41P.js";import{V as ht}from"./BANHBo3m.js";import"./CDWs0q6a.js";/* empty css        */const gt=e=>{const{touchstartX:o,touchendX:a,touchstartY:t,touchendY:l}=e,r=.5,n=16;e.offsetX=a-o,e.offsetY=l-t,Math.abs(e.offsetY)<r*Math.abs(e.offsetX)&&(e.left&&a<o-n&&e.left(e),e.right&&a>o+n&&e.right(e)),Math.abs(e.offsetX)<r*Math.abs(e.offsetY)&&(e.up&&l<t-n&&e.up(e),e.down&&l>t+n&&e.down(e))};function _t(e,o){var t;const a=e.changedTouches[0];o.touchstartX=a.clientX,o.touchstartY=a.clientY,(t=o.start)==null||t.call(o,{originalEvent:e,...o})}function bt(e,o){var t;const a=e.changedTouches[0];o.touchendX=a.clientX,o.touchendY=a.clientY,(t=o.end)==null||t.call(o,{originalEvent:e,...o}),gt(o)}function Vt(e,o){var t;const a=e.changedTouches[0];o.touchmoveX=a.clientX,o.touchmoveY=a.clientY,(t=o.move)==null||t.call(o,{originalEvent:e,...o})}function yt(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const o={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:e.left,right:e.right,up:e.up,down:e.down,start:e.start,move:e.move,end:e.end};return{touchstart:a=>_t(a,o),touchend:a=>bt(a,o),touchmove:a=>Vt(a,o)}}function xt(e,o){var i;const a=o.value,t=a!=null&&a.parent?e.parentElement:e,l=(a==null?void 0:a.options)??{passive:!0},r=(i=o.instance)==null?void 0:i.$.uid;if(!t||!r)return;const n=yt(o.value);t._touchHandlers=t._touchHandlers??Object.create(null),t._touchHandlers[r]=n,ne(n).forEach(d=>{t.addEventListener(d,n[d],l)})}function wt(e,o){var r,n;const a=(r=o.value)!=null&&r.parent?e.parentElement:e,t=(n=o.instance)==null?void 0:n.$.uid;if(!(a!=null&&a._touchHandlers)||!t)return;const l=a._touchHandlers[t];ne(l).forEach(i=>{a.removeEventListener(i,l[i])}),delete a._touchHandlers[t]}const he={mounted:xt,unmounted:wt},ge=Symbol.for("vuetify:v-window"),_e=Symbol.for("vuetify:v-window-group"),be=X({continuous:Boolean,nextIcon:{type:[Boolean,String,Function,Object],default:"$next"},prevIcon:{type:[Boolean,String,Function,Object],default:"$prev"},reverse:Boolean,showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||e==="hover"},touch:{type:[Object,Boolean],default:void 0},direction:{type:String,default:"horizontal"},modelValue:null,disabled:Boolean,selectedClass:{type:String,default:"v-window-item--active"},mandatory:{type:[Boolean,String],default:"force"},...se(),...le(),...ke()},"VWindow"),ae=Y()({name:"VWindow",directives:{Touch:he},props:be(),emits:{"update:modelValue":e=>!0},setup(e,o){let{slots:a}=o;const{themeClasses:t}=Ie(e),{isRtl:l}=Pe(),{t:r}=Be(),n=$e(e,_e),i=$(),d=b(()=>l.value?!e.reverse:e.reverse),c=j(!1),w=b(()=>{const h=e.direction==="vertical"?"y":"x",x=(d.value?!c.value:c.value)?"-reverse":"";return`v-window-${h}${x}-transition`}),V=j(0),f=$(void 0),m=b(()=>n.items.value.findIndex(h=>n.selected.value.includes(h.id)));pe(m,(h,g)=>{const x=n.items.value.length,C=x-1;x<=2?c.value=h<g:h===C&&g===0?c.value=!0:h===0&&g===C?c.value=!1:c.value=h<g}),Ee(ge,{transition:w,isReversed:c,transitionCount:V,transitionHeight:f,rootRef:i});const v=b(()=>e.continuous||m.value!==0),y=b(()=>e.continuous||m.value!==n.items.value.length-1);function p(){v.value&&n.prev()}function G(){y.value&&n.next()}const S=b(()=>{const h=[],g={icon:l.value?e.nextIcon:e.prevIcon,class:`v-window__${d.value?"right":"left"}`,onClick:n.prev,"aria-label":r("$vuetify.carousel.prev")};h.push(v.value?a.prev?a.prev({props:g}):s(M,g,null):s("div",null,null));const x={icon:l.value?e.prevIcon:e.nextIcon,class:`v-window__${d.value?"left":"right"}`,onClick:n.next,"aria-label":r("$vuetify.carousel.next")};return h.push(y.value?a.next?a.next({props:x}):s(M,x,null):s("div",null,null)),h}),T=b(()=>e.touch===!1?e.touch:{...{left:()=>{d.value?p():G()},right:()=>{d.value?G():p()},start:g=>{let{originalEvent:x}=g;x.stopPropagation()}},...e.touch===!0?{}:e.touch});return H(()=>ie(s(e.tag,{ref:i,class:["v-window",{"v-window--show-arrows-on-hover":e.showArrows==="hover"},t.value,e.class],style:e.style},{default:()=>{var h,g;return[s("div",{class:"v-window__container",style:{height:f.value}},[(h=a.default)==null?void 0:h.call(a,{group:n}),e.showArrows!==!1&&s("div",{class:"v-window__controls"},[S.value])]),(g=a.additional)==null?void 0:g.call(a,{group:n})]}}),[[We("touch"),T.value]])),{group:n}}}),Ve=X({reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},...se(),...Re(),...Me()},"VWindowItem"),oe=Y()({name:"VWindowItem",directives:{Touch:he},props:Ve(),emits:{"group:selected":e=>!0},setup(e,o){let{slots:a}=o;const t=ue(ge),l=Xe(e,_e),{isBooted:r}=Ye();if(!t||!l)throw new Error("[Vuetify] VWindowItem must be used inside VWindow");const n=j(!1),i=b(()=>r.value&&(t.isReversed.value?e.reverseTransition!==!1:e.transition!==!1));function d(){!n.value||!t||(n.value=!1,t.transitionCount.value>0&&(t.transitionCount.value-=1,t.transitionCount.value===0&&(t.transitionHeight.value=void 0)))}function c(){var v;n.value||!t||(n.value=!0,t.transitionCount.value===0&&(t.transitionHeight.value=F((v=t.rootRef.value)==null?void 0:v.clientHeight)),t.transitionCount.value+=1)}function w(){d()}function V(v){n.value&&Ge(()=>{!i.value||!n.value||!t||(t.transitionHeight.value=F(v.clientHeight))})}const f=b(()=>{const v=t.isReversed.value?e.reverseTransition:e.transition;return i.value?{name:typeof v!="string"?t.transition.value:v,onBeforeEnter:c,onAfterEnter:d,onEnterCancelled:w,onBeforeLeave:c,onAfterLeave:d,onLeaveCancelled:w,onEnter:V}:!1}),{hasContent:m}=He(e,l.isSelected);return H(()=>s(Ae,{transition:f.value,disabled:!r.value},{default:()=>{var v;return[ie(s("div",{class:["v-window-item",l.selectedClass.value,e.class],style:e.style},[m.value&&((v=a.default)==null?void 0:v.call(a))]),[[ze,l.isSelected.value]])]}})),{groupItem:l}}}),J=Symbol.for("vuetify:v-tabs"),Ct=X({fixed:Boolean,sliderColor:String,hideSlider:Boolean,direction:{type:String,default:"horizontal"},...re(rt({selectedClass:"v-tab--selected",variant:"text"}),["active","block","flat","location","position","symbol"])},"VTab"),O=Y()({name:"VTab",props:Ct(),setup(e,o){let{slots:a,attrs:t}=o;const{textColorClasses:l,textColorStyles:r}=Le(e,"sliderColor"),n=$(),i=$(),d=b(()=>e.direction==="horizontal"),c=b(()=>{var V,f;return((f=(V=n.value)==null?void 0:V.group)==null?void 0:f.isSelected.value)??!1});function w(V){var m,v;let{value:f}=V;if(f){const y=(v=(m=n.value)==null?void 0:m.$el.parentElement)==null?void 0:v.querySelector(".v-tab--selected .v-tab__slider"),p=i.value;if(!y||!p)return;const G=getComputedStyle(y).color,S=y.getBoundingClientRect(),T=p.getBoundingClientRect(),h=d.value?"x":"y",g=d.value?"X":"Y",x=d.value?"right":"bottom",C=d.value?"width":"height",xe=S[h],we=T[h],E=xe>we?S[x]-T[x]:S[h]-T[h],Ce=Math.sign(E)>0?d.value?"right":"bottom":Math.sign(E)<0?d.value?"left":"top":"center",Se=(Math.abs(E)+(Math.sign(E)<0?S[C]:T[C]))/Math.max(S[C],T[C])||0,Te=S[C]/T[C]||0,K=1.5;je(p,{backgroundColor:[G,"currentcolor"],transform:[`translate${g}(${E}px) scale${g}(${Te})`,`translate${g}(${E/K}px) scale${g}(${(Se-1)/K+1})`,"none"],transformOrigin:Array(3).fill(Ce)},{duration:225,easing:Fe})}}return H(()=>{const V=M.filterProps(e);return s(M,W({symbol:J,ref:n,class:["v-tab",e.class],style:e.style,tabindex:c.value?0:-1,role:"tab","aria-selected":String(c.value),active:!1},V,t,{block:e.fixed,maxWidth:e.fixed?300:void 0,"onGroup:selected":w}),{...a,default:()=>{var f;return s(de,null,[((f=a.default)==null?void 0:f.call(a))??e.text,!e.hideSlider&&s("div",{ref:i,class:["v-tab__slider",l.value],style:r.value},null)])}})}),Ue({},n)}}),St=X({...re(be(),["continuous","nextIcon","prevIcon","showArrows","touch","mandatory"])},"VTabsWindow"),ye=Y()({name:"VTabsWindow",props:St(),emits:{"update:modelValue":e=>!0},setup(e,o){let{slots:a}=o;const t=ue(J,null),l=ce(e,"modelValue"),r=b({get(){var n;return l.value!=null||!t?l.value:(n=t.items.value.find(i=>t.selected.value.includes(i.id)))==null?void 0:n.value},set(n){l.value=n}});return H(()=>{const n=ae.filterProps(e);return s(ae,W({_as:"VTabsWindow"},n,{modelValue:r.value,"onUpdate:modelValue":i=>r.value=i,class:["v-tabs-window",e.class],style:e.style,mandatory:!1,touch:!1}),a)}),{}}}),Tt=X({...Ve()},"VTabsWindowItem"),N=Y()({name:"VTabsWindowItem",props:Tt(),setup(e,o){let{slots:a}=o;return H(()=>{const t=oe.filterProps(e);return s(oe,W({_as:"VTabsWindowItem"},t,{class:["v-tabs-window-item",e.class],style:e.style}),a)}),{}}});function kt(e){return e?e.map(o=>Qe(o)?o:{text:o,value:o}):[]}const It=X({alignTabs:{type:String,default:"start"},color:String,fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,sliderColor:String,...De({mandatory:"force",selectedClass:"v-tab-item--selected"}),...Oe(),...le()},"VTabs"),Pt=Y()({name:"VTabs",props:It(),emits:{"update:modelValue":e=>!0},setup(e,o){let{attrs:a,slots:t}=o;const l=ce(e,"modelValue"),r=b(()=>kt(e.items)),{densityClasses:n}=Ne(e),{backgroundColorClasses:i,backgroundColorStyles:d}=qe(k(e,"bgColor")),{scopeId:c}=Je();return Ke({VTab:{color:k(e,"color"),direction:k(e,"direction"),stacked:k(e,"stacked"),fixed:k(e,"fixedTabs"),sliderColor:k(e,"sliderColor"),hideSlider:k(e,"hideSlider")}}),H(()=>{const w=Q.filterProps(e),V=!!(t.window||e.items.length>0);return s(de,null,[s(Q,W(w,{modelValue:l.value,"onUpdate:modelValue":f=>l.value=f,class:["v-tabs",`v-tabs--${e.direction}`,`v-tabs--align-tabs-${e.alignTabs}`,{"v-tabs--fixed-tabs":e.fixedTabs,"v-tabs--grow":e.grow,"v-tabs--stacked":e.stacked},n.value,i.value,e.class],style:[{"--v-tabs-height":F(e.height)},d.value,e.style],role:"tablist",symbol:J},c,a),{default:()=>{var f;return[((f=t.default)==null?void 0:f.call(t))??r.value.map(m=>{var v;return((v=t.tab)==null?void 0:v.call(t,{item:m}))??s(O,W(m,{key:m.text,value:m.value}),{default:t[`tab.${m.value}`]?()=>{var y;return(y=t[`tab.${m.value}`])==null?void 0:y.call(t,{item:m})}:void 0})})]}}),V&&s(ye,W({modelValue:l.value,"onUpdate:modelValue":f=>l.value=f,key:"tabs-window"},c),{default:()=>{var f;return[r.value.map(m=>{var v;return((v=t.item)==null?void 0:v.call(t,{item:m}))??s(N,{value:m.value},{default:()=>{var y;return(y=t[`item.${m.value}`])==null?void 0:y.call(t,{item:m})}})}),(f=t.window)==null?void 0:f.call(t)]}})])}),{}}}),Bt={key:0,class:"d-flex align-center justify-center fill-height"},$t={key:1,class:"position-relative"},pt=q({__name:"avatar",setup(e){const{image:o}=Ze(A()),a=$(null),t=$(!1),l=n=>{var d;const i=(d=n.target.files)==null?void 0:d[0];i&&(t.value=!0,A().updateImage(i).finally(()=>{t.value=!1}))},r=()=>{a.value.$el.querySelector("input").click()};return(n,i)=>{const d=at;return _(t)?(R(),Z("div",Bt,[s(dt,{color:"grey-lighten-2",indeterminate:""})])):(R(),Z("div",$t,[s(tt,{size:"64"},{default:u(()=>[s(et,{src:_(o)},null,8,["src"])]),_:1}),s(M,{class:"image-plus-avatar__btn",icon:"true",size:"x-small",color:"background",width:"28",height:"28",onClick:r},{default:u(()=>[s(d,{class:"image-plus-avatar",name:"futzo-icon:image-plus-avatar"})]),_:1}),s(ct,{class:"d-none",ref_key:"imageRef",ref:a,onChange:l},null,512)]))}}}),Et={class:"text-error"},Wt={class:"text-error"},Rt={class:"text-error"},Mt={class:"d-flex justify-end align-center pt-4"},Xt=q({__name:"personal-data-card",setup(e){const{fields:o,resetForm:a,handleSubmit:t}=vt("edit-user"),l=b(()=>A().user);ot(()=>{a({values:{name:l.value.name,phone:l.value.phone,email:l.value.email}})});const r=t(n=>{const i={id:l.value.id,name:n.name,phone:n.phone,email:n.email};A().updateUser(i)});return(n,i)=>{const d=ft;return R(),U(me,{class:"secondary-card",variant:"text"},{default:u(()=>[s(ve,{class:"secondary-card-item"},{default:u(()=>[s(D,{class:"secondary-card__title"},{default:u(()=>i[3]||(i[3]=[B("Edita tus datos personales")])),_:1}),s(fe,{class:"secondary-card__subtitle"},{default:u(()=>i[4]||(i[4]=[B(" Estos son tus datos personales, puedes editarlos debajo.")])),_:1})]),_:1}),s(D,null,{default:u(()=>[s(mt,{class:"user-data-configuration-form",onSubmit:nt(_(r),["prevent"])},{default:u(()=>[s(L,{class:"row-border-bottom","no-gutters":""},{default:u(()=>[s(P,{cols:"3"},{default:u(()=>i[5]||(i[5]=[I("p",{class:"label-form"},"Nombre completo",-1)])),_:1}),s(P,{cols:"4"},{default:u(()=>[s(ee,{modelValue:_(o).name.fieldValue,"onUpdate:modelValue":i[0]||(i[0]=c=>_(o).name.fieldValue=c),variant:"plain",class:"user-data-configuration-form__input"},null,8,["modelValue"]),I("small",Et,z(_(o).name.fieldPropsValue["error-messages"][0]),1)]),_:1})]),_:1}),s(L,{class:"row-border-bottom","no-gutters":""},{default:u(()=>[s(P,{cols:"3"},{default:u(()=>i[6]||(i[6]=[I("p",{class:"label-form"},"Teléfono",-1)])),_:1}),s(P,{cols:"4"},{default:u(()=>[s(d,null,{default:u(()=>[s(_(st),{variant:"plain",singleLine:!0,modelValue:_(o).phone.fieldValue,"onUpdate:modelValue":i[1]||(i[1]=c=>_(o).phone.fieldValue=c),class:"user-data-configuration-form__input",invalidMessage:({label:c,example:w})=>`${c} debe ser un numero valido (${w}).`},null,8,["modelValue","invalidMessage"]),I("small",Wt,z(_(o).phone.fieldPropsValue["error-messages"][0]),1)]),_:1})]),_:1})]),_:1}),s(L,{class:"row-border-bottom","no-gutters":""},{default:u(()=>[s(P,{cols:"3"},{default:u(()=>i[7]||(i[7]=[I("p",{class:"label-form"},"Correo electrónico",-1)])),_:1}),s(P,{cols:"4"},{default:u(()=>[s(ee,{type:"email",modelValue:_(o).email.fieldValue,"onUpdate:modelValue":i[2]||(i[2]=c=>_(o).email.fieldValue=c),variant:"plain",class:"user-data-configuration-form__input"},null,8,["modelValue"]),I("small",Rt,z(_(o).email.fieldPropsValue["error-messages"][0]),1)]),_:1})]),_:1}),s(L,{"no-gutters":""},{default:u(()=>[s(P,{cols:"4",offset:"3"},{default:u(()=>[I("div",Mt,[s(M,{type:"submit",class:"user-data-configuration-form__button",color:"primary",dark:""},{default:u(()=>i[8]||(i[8]=[B(" Guardar cambios ")])),_:1})])]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1})}}}),Yt=it(()=>ut(()=>import("./BpWxZBgK.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]),import.meta.url).then(e=>e.default||e)),Jt=q({__name:"configuracion",setup(e){const o=b(()=>A().user),a=$(1);return(t,l)=>{const r=Yt;return R(),U(ht,{height:"100%",color:"white",class:"pa-10 full-height configuration-v-sheet"},{default:u(()=>[s(me,{variant:"text"},{default:u(()=>[s(ve,{class:"mb-12"},{prepend:u(()=>[s(pt)]),default:u(()=>[s(lt,{class:"card-title ml-2"},{default:u(()=>{var n;return[B(z((n=_(o))==null?void 0:n.name),1)]}),_:1}),s(fe,{class:"card-subtitle ml-2"},{default:u(()=>{var n;return[B(z((n=_(o))==null?void 0:n.email),1)]}),_:1})]),_:1}),s(D,null,{default:u(()=>[s(Pt,{modelValue:_(a),"onUpdate:modelValue":l[0]||(l[0]=n=>te(a)?a.value=n:null)},{default:u(()=>[s(O,{value:1},{default:u(()=>l[2]||(l[2]=[B(" Datos personales")])),_:1}),s(O,{value:2},{default:u(()=>l[3]||(l[3]=[B(" Contraseña")])),_:1})]),_:1},8,["modelValue"]),s(ye,{modelValue:_(a),"onUpdate:modelValue":l[1]||(l[1]=n=>te(a)?a.value=n:null)},{default:u(()=>[(R(),U(N,{value:1,key:1},{default:u(()=>[s(Xt)]),_:1})),(R(),U(N,{value:2,key:2},{default:u(()=>[s(r)]),_:1}))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1})}}});export{Jt as default};
