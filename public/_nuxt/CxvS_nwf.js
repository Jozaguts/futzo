import{d as p,ah as m,b1 as f,g as i,j as c,a as o,h as B,k as a,a2 as $,w as s,q as C,aY as F,f as k,v,aX as b,i as h,o as V}from"./Bg0mMbJt.js";import{_ as T,a as D}from"./D-6BPBVD.js";import{S as Z}from"./CjkMynku.js";import{_ as G}from"./BwWG5K9p.js";import{g as I,_ as N}from"./Df2MblYo.js";import{V as g}from"./FykgFcap.js";import{a as O}from"./DsZMKb01.js";import{_ as E}from"./BXXfagVJ.js";import"./DkkXtawK.js";import"./30vlPJky.js";import"./HsldqIuN.js";import"./JLkqVU2y.js";import"./L5DsxvkE.js";/* empty css        */import"./CFLMDOIG.js";import"./Cz07ns0q.js";const U=p({__name:"app-bar-search-input",setup(d){const{search:e}=m(f()),r=n=>{e.value=n};return(n,t)=>(i(),c(Z,{"min-width":300,placeholder:"Buscar torneo",class:"mr-4",onSearching:r}))}}),A=p({__name:"app-bar-cat-btn",setup(d){const{dialog:e}=m(f());return(r,n)=>(i(),c(G,{icon:"futzo-icon:plus",text:"Crear torneo",class:"mr-8",onClick:n[0]||(n[0]=t=>e.value=!o(e))}))}}),R=p({__name:"tournament-app-bar-buttons",setup(d){return(e,r)=>(i(),B($,null,[a(U),a(A)],64))}}),z=p({__name:"tournament-table",setup(d){const{noTournaments:e,tournaments:r,tournamentId:n,tournament:t,pagination:x,search:w}=m(f()),H=I("tournaments"),M=l=>{switch(l){case"creado":return"warning";case"en curso":return"success";case"completado":return"primary";case"cancelado":return"error";default:return"warning"}},S=l=>{n.value=l.id,t.value=l,k().push({name:"torneos-torneo",params:{torneo:l.slug}})};return(l,u)=>o(e)?F("",!0):(i(),c(N,{key:0,headers:o(H),items:o(r),itemKey:"name",search:o(w),pagination:o(x),"onUpdate:pagination":u[0]||(u[0]=_=>o(f)().loadTournaments()),"status-handler":M},{actions:s(({item:_})=>[a(g,{color:"on-background",size:"small",rounded:"md",variant:"outlined",class:"mr-2 show-calendar-btn",onClick:y=>l.$router.push({name:"torneos-torneo-calendario",params:{torneo:_.slug}})},{default:s(()=>u[1]||(u[1]=[C("Ver calendario ")])),_:2},1032,["onClick"]),a(g,{size:"small",rounded:"md",onClick:y=>S(_)},{default:s(()=>u[2]||(u[2]=[C("Ver Torneo ")])),_:2},1032,["onClick"])]),_:1},8,["headers","items","search","pagination"]))}}),j=v(z,[["__scopeId","data-v-73ffb4ac"]]),q={},K={width:"225",height:"268",viewBox:"0 0 225 268",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function X(d,e){return i(),B("svg",K,e[0]||(e[0]=[b('<path d="M112.5 251C174.632 251 225 200.632 225 138.5C225 76.368 174.632 26 112.5 26C50.368 26 0 76.368 0 138.5C0 200.632 50.368 251 112.5 251Z" fill="#F2EBFF"></path><g filter="url(#filter0_d_484_4376)"><path d="M177 90.5H48C43.8579 90.5 40.5 93.8579 40.5 98V255.5C40.5 259.642 43.8579 263 48 263H177C181.142 263 184.5 259.642 184.5 255.5V98C184.5 93.8579 181.142 90.5 177 90.5Z" fill="white"></path></g><path d="M97.5 113H58.5C56.0147 113 54 115.015 54 117.5C54 119.985 56.0147 122 58.5 122H97.5C99.9853 122 102 119.985 102 117.5C102 115.015 99.9853 113 97.5 113Z" fill="#D5BDFF"></path><path d="M124.5 132.5H58.5C56.0147 132.5 54 134.515 54 137C54 139.485 56.0147 141.5 58.5 141.5H124.5C126.985 141.5 129 139.485 129 137C129 134.515 126.985 132.5 124.5 132.5Z" fill="#F2EBFF"></path><path d="M97.5 153.5H58.5C56.0147 153.5 54 155.515 54 158C54 160.485 56.0147 162.5 58.5 162.5H97.5C99.9853 162.5 102 160.485 102 158C102 155.515 99.9853 153.5 97.5 153.5Z" fill="#D5BDFF"></path><path d="M124.5 173H58.5C56.0147 173 54 175.015 54 177.5C54 179.985 56.0147 182 58.5 182H124.5C126.985 182 129 179.985 129 177.5C129 175.015 126.985 173 124.5 173Z" fill="#F2EBFF"></path><path d="M97.5 194H58.5C56.0147 194 54 196.015 54 198.5C54 200.985 56.0147 203 58.5 203H97.5C99.9853 203 102 200.985 102 198.5C102 196.015 99.9853 194 97.5 194Z" fill="#D5BDFF"></path><path d="M124.5 213.5H58.5C56.0147 213.5 54 215.515 54 218C54 220.485 56.0147 222.5 58.5 222.5H124.5C126.985 222.5 129 220.485 129 218C129 215.515 126.985 213.5 124.5 213.5Z" fill="#F2EBFF"></path><g filter="url(#filter1_d_484_4376)"><path d="M177 14H48C43.8579 14 40.5 17.3579 40.5 21.5V66.5C40.5 70.6421 43.8579 74 48 74H177C181.142 74 184.5 70.6421 184.5 66.5V21.5C184.5 17.3579 181.142 14 177 14Z" fill="#9155FD"></path></g><path d="M97.5 30.5H58.5C56.0147 30.5 54 32.5147 54 35C54 37.4853 56.0147 39.5 58.5 39.5H97.5C99.9853 39.5 102 37.4853 102 35C102 32.5147 99.9853 30.5 97.5 30.5Z" fill="#D5BDFF"></path><path d="M124.5 50H58.5C56.0147 50 54 52.0147 54 54.5C54 56.9853 56.0147 59 58.5 59H124.5C126.985 59 129 56.9853 129 54.5C129 52.0147 126.985 50 124.5 50Z" fill="white"></path><defs><filter id="filter0_d_484_4376" x="31.5" y="77" width="162" height="190.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="-4.5"></feOffset><feGaussianBlur stdDeviation="4.5"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0.788235 0 0 0 0 0.803922 0 0 0 0 0.85098 0 0 0 0.349 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_484_4376"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_484_4376" result="shape"></feBlend></filter><filter id="filter1_d_484_4376" x="31.5" y="0.5" width="162" height="78" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="-4.5"></feOffset><feGaussianBlur stdDeviation="4.5"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0.788235 0 0 0 0 0.803922 0 0 0 0 0.85098 0 0 0 0.349 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_484_4376"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_484_4376" result="shape"></feBlend></filter></defs>',12)]))}const Y=v(q,[["render",X]]),J={class:"d-flex flex-column align-center"},L=p({__name:"no-tournament",setup(d){const{noTournaments:e,dialog:r}=m(f());return(n,t)=>o(e)?(i(),c(O,{key:0,class:"custom-v-sheet d-flex justify-center align-center fill-height"},{default:s(()=>[h("div",J,[t[2]||(t[2]=h("h2",{class:"card-title"},"No hay torneos aún",-1)),a(Y),t[3]||(t[3]=h("p",{class:"card-sub-title"},"Crea un torneo para verlo aquí.",-1)),a(g,{color:"primary",variant:"elevated",class:"mt-4 text-body-1",onClick:t[0]||(t[0]=x=>r.value=!o(r))},{default:s(()=>t[1]||(t[1]=[C(" Crear Torneo ")])),_:1})])]),_:1})):F("",!0)}}),ce=p({__name:"index",setup(d){return V(()=>{f().loadTournaments()}),(e,r)=>(i(),c(T,null,{"app-bar":s(()=>[a(D,null,{buttons:s(()=>[a(R)]),_:1})]),default:s(()=>[a(L),a(j),a(E)]),_:1}))}});export{ce as default};