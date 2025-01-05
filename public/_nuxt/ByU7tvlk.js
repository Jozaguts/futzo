import{u as w,e as l,d as a,f as s,g as d,h as S,a as o,j as f,b as $}from"./CDWs0q6a.js";import{bC as F,dc as N}from"./D38D1crN.js";const j=/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,C=/^\d{2} \d{3} \d{3} \d{4}$/,i=()=>a().test("no-leading-space","No se permite espacio en blanco al inicio",u=>!(u&&u.startsWith(" ")));function P(u,e={}){const n=b=>({props:{"error-messages":b.errors}}),r=E(u),t=Object.keys(r.fields),{defineField:m,handleSubmit:c,resetForm:g,validate:q,setValues:h,meta:y}=w({validationSchema:r,initialValues:e}),p=F({});return t.forEach(b=>{const[_,k]=m(b,n);p[b]={fieldValue:_,fieldPropsValue:k}}),{handleSubmit:c,resetForm:g,fields:p,validate:q,setValues:h,meta:y}}function E(u){let e={};const{t:n}=N();switch(u){case"signup":e.isSignup=$().default(!1),e.password=i().required("La contraseña es obligatoria").min(8,"La contraseña debe tener al menos 8 caracteres").matches(j,"La contraseña debe contener al menos un carácter especial"),e.username=a().required("El correo o número teléfono  es obligatorio").test("is-valid-username","El campo debe ser un número de teléfono o un correo electrónico válido",(r,t)=>{const m=i().email().isValidSync(r),c=C.test(r);return console.log(t),t.parent.inputType=c?"phone":m?"email":null,m||c}),e.name=i().when("isSignup",{is:!0,then:r=>r.required(),otherwise:r=>r.nullable()});break;case"create-location":e.location=o().nullable(),e.city=i().nullable(),e.address=i().nullable();break;case"create-calendar":e.start_date=d().required(n("forms.required")),e.end_date=d().required(n("forms.required")),e.game_time=s().required(n("forms.required")),e.time_between_games=s().required(n("forms.required")),e.schedules_available=f().of(o().shape({day:a(),hours:f().of(o().shape({to:a(),from:a()}))})),e.venues=f().of(o().shape({id:s().required(n("forms.required")),days:o().shape({monday:o().shape({start:a(),end:a()}).nullable(),tuesday:o().shape({start:a(),end:a()}).nullable(),wednesday:o().shape({start:a(),end:a()}).nullable(),thursday:o().shape({start:a(),end:a()}).nullable(),friday:o().shape({start:a(),end:a()}).nullable(),saturday:o().shape({start:a(),end:a()}).nullable(),sunday:o().shape({start:a(),end:a()}).nullable()})}));break;case"create-tournament-basic-info":e.id=s().nullable(),e.name=i().required(n("forms.required")),e.image=l().nullable().test("File is required","Solo imágenes .jgp, png, svg ",r=>{var t;return r===void 0?!0:((t=r==null?void 0:r.type)==null?void 0:t.includes("image/"))||typeof r=="string"}),e.category_id=s().required(n("forms.required")),e.tournament_format_id=s().required(n("forms.required")),e.football_type_id=s().required(n("forms.required")),e.start_date=d().nullable(),e.end_date=d().nullable();break;case"edit-tournament-basic-info":e.id=s().nullable(),e.name=i().required(n("forms.required")),e.image=l().nullable().test("File is required","Solo imágenes .jgp, png, svg ",r=>{var t;return r===void 0?!0:((t=r==null?void 0:r.type)==null?void 0:t.includes("image/"))||typeof r=="string"}),e.category_id=s().required(n("forms.required")),e.tournament_format_id=s().required(n("forms.required")),e.football_type_id=s().required(n("forms.required")),e.start_date=d().nullable(),e.end_date=d().nullable();break;case"edit-tournament-details-info":e.location=o().nullable(),e.city=i().nullable(),e.address=i().nullable(),e.prize=i().nullable(),e.winner=i().nullable(),e.description=i().nullable(),e.status=i().nullable();break;case"create-tournament-details-info":e.location=o().nullable(),e.city=i().nullable(),e.address=i().nullable(),e.prize=i().nullable(),e.winner=i().nullable(),e.description=i().nullable(),e.status=i().nullable();break;case"create-league":e.id=i().nullable(),e.name=i().min(6,n("league_min")).required(n("forms.required")),e.location=i().nullable(),e.description=i().nullable(),e.creation_date=d().nullable(),e.logo=l().test("File is required","Solo imágenes .jgp, png, svg",r=>{var t;return r===void 0?!0:((t=r==null?void 0:r.type)==null?void 0:t.includes("image/"))||typeof r=="string"}),e.banner=l().test("File is required","Solo imágenes .jgp, png, svg",r=>{var t;return r===void 0?!0:((t=r==null?void 0:r.type)==null?void 0:t.includes("image/"))||typeof r=="string"}),e.status=i().nullable();break;case"create-category":e.name=i().required(n("forms.required")),e.age_range=i().matches(/^(\d{2}-\d{2}|\*)$/,"El formato debe ser 'NN-NN' donde N es un dígito, o '*' para edad libre.").test("es-rango-valido-o-libre",'El primer número debe ser menor que el segundo, o usar "*" para edad libre',r=>{if(!r)return!1;if(r==="*")return!0;const[t,m]=r.split("-").map(Number);return t<m}),e.gender=i().required(n("forms.required"));break;case"create-team":e.name=i().required(n("forms.required")),e.image=l().nullable().test("File is required","Solo imágenes .jgp, png, svg ",r=>{var t;return r===void 0?!0:((t=r==null?void 0:r.type)==null?void 0:t.includes("image/"))||typeof r=="string"}),e.category_id=s().required(n("forms.required")),e.address=o({}),e.colors=o({}).nullable(),e.description=i().nullable(),e.email=i().email(),e.tournament_id=s().required(n("forms.required")),e.phone=i().matches(/^(\+52)?(\d{10})$/,"Número de teléfono no es válido");break;case"create-coach":e.name=i().nullable(),e.email=a().email("Correo electrónico no válido").nullable(),e.phone=i().matches(/^(\+52)?(\d{10})$/,"Número de teléfono no es válido"),e.image=l().nullable().test("File is required","Solo imágenes .jgp, png, svg ",r=>{var t;return r===void 0?!0:((t=r==null?void 0:r.type)==null?void 0:t.includes("image/"))||typeof r=="string"});break;case"create-owner":e.name=i().nullable(),e.email=a().email("Correo electrónico no válido").nullable(),e.phone=i().matches(/^(\+52)?(\d{10})$/,"Número de teléfono no es válido"),e.image=l().nullable().test("File is required","Solo imágenes .jgp, png, svg ",r=>{var t;return r===void 0?!0:((t=r==null?void 0:r.type)==null?void 0:t.includes("image/"))||typeof r=="string"});break;case"edit-team":e.name=i().required(n("forms.required")),e.image=l().nullable().test("File is required","Solo imágenes .jgp, png, svg ",r=>{var t;return r===void 0?!0:((t=r==null?void 0:r.type)==null?void 0:t.includes("image/"))||typeof r=="string"}),e.category_id=s().required(n("forms.required")),e.address=o({}),e.colors=o({}).required(n("forms.required")),e.description=i().nullable(),e.email=i().email(),e.tournament_id=s().required(n("forms.required")),e.phone=i().matches(/^(\+52)?(\d{10})$/,"Número de teléfono no es válido");break;case"edit-coach":e.name=i().required(n("forms.required")),e.email=a(),e.phone=i().matches(/^(\+52)?(\d{10})$/,"Número de teléfono no es válido"),e.image=l().nullable().test("File is required","Solo imágenes .jgp, png, svg ",r=>{var t;return r===void 0?!0:((t=r==null?void 0:r.type)==null?void 0:t.includes("image/"))||typeof r=="string"});break;case"edit-owner":e.name=i().required(n("forms.required")),e.email=a(),e.phone=i().matches(/^(\+52)?(\d{10})$/,"Número de teléfono no es válido"),e.image=l().nullable().test("File is required","Solo imágenes .jgp, png, svg ",r=>{var t;return r===void 0?!0:((t=r==null?void 0:r.type)==null?void 0:t.includes("image/"))||typeof r=="string"});break;case"edit-user":e.name=i().required(n("forms.required")),e.email=a().email("Correo electrónico no válido").required(n("forms.required")),e.phone=i();break;case"edit-password":e.password=a().required(n("forms.required")),e.new_password=a().required(n("forms.required")),e.new_password_confirmation=a().required(n("forms.required")).oneOf([S("new_password"),null],"Las contraseñas no coinciden");break;case"create-player-basic-info":e.name=i().required(n("forms.required")),e.last_name=i().required(n("forms.required")),e.birthdate=d().required(n("forms.required")),e.image=l().nullable().test("File is required","Solo imágenes .jgp, png, svg ",r=>{var t;return r===void 0?!0:((t=r==null?void 0:r.type)==null?void 0:t.includes("image/"))||typeof r=="string"}),e.nationality=i().required(n("forms.required")),e.team_id=s().nullable(),e.category_id=s().nullable();break;case"edit-player-basic-info":e.name=i().required(n("forms.required")),e.last_name=i().required(n("forms.required")),e.birthdate=d().required(n("forms.required")),e.image=l().nullable().test("File is required","Solo imágenes .jgp, png, svg ",r=>{var t;return r===void 0?!0:((t=r==null?void 0:r.type)==null?void 0:t.includes("image/"))||typeof r=="string"}),e.nationality=i().required(n("forms.required")),e.team_id=s().nullable(),e.category_id=s().nullable();break;case"create-player-details-info":e.position_id=s().nullable(),e.number=s().nullable(),e.height=s().nullable(),e.weight=s().nullable(),e.dominant_foot=a().nullable(),e.medical_notes=a().nullable();break;case"edit-player-details-info":e.position_id=s().nullable(),e.number=s().nullable(),e.height=s().nullable(),e.weight=s().nullable(),e.dominant_foot=a().nullable(),e.medical_notes=a().nullable();break;case"create-player-contact-info":e.phone=i().matches(/^(\+52)?(\d{10})$/,"Número de teléfono no es válido"),e.email=i().email().required(n("forms.required")),e.notes=a().nullable();break;case"edit-player-contact-info":e.phone=i().matches(/^(\+52)?(\d{10})$/,"Número de teléfono no es válido"),e.email=i().email().required(n("forms.required")),e.notes=a().nullable();break;default:e=l()}return o().shape(e)}export{P as u};
