import{a as u}from"./react-31052980.js";import{ad as h,s as q,bN as B,W as _,m as k,ac as I}from"./main-1d195725.js";import{u as L,_ as s,a as l,F as R,j as t}from"./index-a4114ef4.js";import{an as V,ao as m,am as j,aK as d,aL as f,aM as x}from"./freelancerSlice-60742dc0.js";import{d as E}from"./chevron-left-00fe92ff.js";import"./TextField-d5ff1ee4.js";import"./MenuItem-030e42a2.js";import"./trash-6f040b71.js";import"./arrow-right-circle-12522627.js";const P=h.default?h.default:h,A=V({firstname:m().required("Please enter your first name"),lastname:m().required("Please enter your last name"),email:m().email("Invalid email address").required("Your email address is required"),creator:m().required("Please enter Creator name")});function G(){var b;const n=L(q),C=E(),[w,o]=u.useState(!1),[N,F]=u.useState("India"),[p,S]=u.useState("91"),[v]=B(),a=j({enableReinitialize:!0,initialValues:{firstname:"",lastname:"",email:"",phone:"",country_name:"",creator:n.teamData.id},onSubmit:(e,i)=>{var g;o(!0);const y={...e,firstname:e==null?void 0:e.firstname,lastname:e==null?void 0:e.lastname,email:e==null?void 0:e.email,country_name:N,country_code:p,number:(g=e==null?void 0:e.phone)==null?void 0:g.replace(p,"")};v(y).unwrap().then(r=>{(r==null?void 0:r.status)==="success"&&(o(!1),s.success(r==null?void 0:r.message),i.resetForm(),C("/team/management/student/assignment/assign-submit")),(r==null?void 0:r.status)==="error"&&(o(!1),(r==null?void 0:r.message)==="Email already registered"&&a.setFieldValue("email",""),s.error(r==null?void 0:r.message))}).catch(r=>{console.log("err",r),o(!1),s.error("Account creation failed")})},validationSchema:A}),c=e=>{if(a.errors[e]){s.error(a.errors[e]);return}a.setFieldValue(e,a.values[e])};return l(R,{children:[t(_,{children:t("title",{children:"Create User | Bluepen"})}),t("div",{className:"max-w-2xl py-10 mx-auto shadow-2xl   bg-white bg-opacity-20 drop-shadow-2xl rounded-xl md:my-10 ",children:t("div",{className:"flex flex-col px-10 rounded-lg ",children:l("div",{className:"p-5",children:[t("h5",{className:"mb-2 text-center text-4xl pb-10 font-bold tracking-tight  text-white-500 ",children:"Create User"}),t("div",{className:"flex flex-col items-center",children:t("form",{onSubmit:a.handleSubmit,className:"max-w-2xl ",children:l("div",{className:"flex flex-col items-center",children:[l("div",{className:"flex flex-col items-center md:flex-row",children:[l(d,{sx:{m:1,width:"28ch"},variant:"outlined",required:!0,children:[t(f,{htmlFor:"outlined-adornment-name",className:"text-white-900",children:"First Name"}),t(x,{required:!0,id:"name",sx:{borderRadius:"1000px"},className:"text-white-900",value:a.values.firstname,onChange:a.handleChange("firstname"),onBlur:()=>c("firstname"),type:"text",label:"First Name"})]}),l(d,{sx:{m:1,width:"28ch"},variant:"outlined",required:!0,children:[t(f,{htmlFor:"outlined-adornment-name",className:"text-white-900",children:"Last Name"}),t(x,{required:!0,sx:{borderRadius:"1000px"},value:a.values.lastname,className:"text-white-900",onChange:a.handleChange("lastname"),onBlur:()=>c("lastname"),type:"text",label:"Last Name"})]})]}),l("div",{className:"flex flex-col items-center md:flex-row",children:[l(d,{sx:{m:1,width:"28ch"},variant:"outlined",required:!0,children:[t(f,{htmlFor:"outlined-adornment-email",className:"text-white-900",children:"Email"}),t(x,{disabled:((b=n==null?void 0:n.email_otp_verified)==null?void 0:b.email_otp_verified)===1,required:!0,type:"email",name:"email",id:"email",autoComplete:"on",label:"Email",sx:{borderRadius:"1000px"},className:"text-white-900",value:a.values.email,onChange:a.handleChange("email"),onBlur:()=>c("email")})]}),t(d,{sx:{m:1,width:"28ch"},children:t(P,{country:"in",inputStyle:{width:"100%",height:"9  0%",background:"none",borderRadius:"1000px",border:"1px solid #C4C4C4",color:"#e5e7eb"},isValid:(e,i)=>(F(i==null?void 0:i.name),S(i==null?void 0:i.countryCode),e.length<10?!1:e.match(/12345/)?"Invalid value: "+e+", "+(i==null?void 0:i.name):!e.match(/1234/)),copyNumbersOnly:!0,showDropdown:!1,value:a.values.phone,onChange:e=>a.setFieldValue("phone",e),onBlur:a.handleBlur("phone"),error:Boolean(a.errors.phone)})})]}),t("div",{className:"flex flex-col items-center md:flex-row "}),t("div",{className:"flex items-center justify-center",children:t(k,{onClick:a.handleSubmit,variant:"contained",className:"bg-[#141B41]",type:"submit",startIcon:t(I,{}),loading:w,disabled:!a.values.email||!a.values.phone||!a.values.firstname||!a.values.lastname,sx:{color:"#fff",mt:2,mb:2,py:2,width:"38ch",borderRadius:"1000px","&[disabled]":{backgroundColor:"gray",color:"#fff",opacity:.5,cursor:"not-allowed"},"&:hover":{backgroundColor:"#fff",color:"#000"}},children:"Create"})})]})})})]})})})]})}export{G as default};
