import{d as c,o as r,b as n,c as l,e as u,f as i,g as d,h as p,i as h}from"./D38D1crN.js";const g=c({__name:"callback",setup(f){return r(()=>{const e=n().params.provider[0];e==="google"||e==="facebook"?l()(`/auth/${e}/callback`,{credentials:"include",params:{code:n().query.code}}).then(()=>{const{refreshIdentity:t,isAuthenticated:a}=u();t().catch(s=>console.error(s)).then(()=>{a.value?(console.log("user authenticated"),i().push("/")):console.log("user not authenticated")})}).catch(t=>console.error(t)):console.error("provider not found")}),(e,o)=>(d(),p("div",null,o[0]||(o[0]=[h("h1",null,"please wait login in ...",-1)])))}});export{g as default};
