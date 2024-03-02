import{a as d}from"./react-31052980.js";import{d as re}from"./chevron-left-00fe92ff.js";import{u as se,_ as u,a as s,F as v,j as a}from"./index-a4114ef4.js";import{S as oe,am as me,aK as F,aL as Y,aM as X,an as de,ao as J}from"./freelancerSlice-60742dc0.js";import{d as K,U as Z,aU as y,W as ce,m as ue,ad as I}from"./main-1d195725.js";import{L as he}from"./loader-2-0dcaac2c.js";import{T as fe}from"./trash-6f040b71.js";import{A as ge}from"./arrow-right-circle-12522627.js";import"./TextField-d5ff1ee4.js";import"./MenuItem-030e42a2.js";const pe=I.default?I.default:I,h=10,xe=10242880,be=de({name:J().required("Please enter your  name"),email:J().email("Invalid email address").required("Your email address is required")});function je(){var B,R,z;const p=oe(),n=se(e=>e.student.allNonLoggedPlagiarismDetails),[L,G]=d.useState("India"),[N,H]=d.useState("91"),[Q,D]=d.useState(""),[c,j]=d.useState([]),[$,ee]=d.useState([]),[C,ae]=d.useState(null),[_e,U]=d.useState(!1),[P,x]=d.useState(!1),[le,S]=d.useState(!1),q=d.useRef(null),te=re(),ne=async e=>{let l=[...c],m=!1;x(!0),e.forEach(t=>{if(l.length<h){if(t.size>xe){u.error("File size is too large"),x(!1);return}l.push(t)}else m=!0,u.error("You can upload maximum 10 files"),x(!1)}),j(l),l.forEach(t=>{$.push(t.name)});let i=JSON.parse(localStorage.getItem("assignment_files_random_number")?localStorage.getItem("assignment_files_random_number"):C),b={plagiarism_assignment:l,submit:"submit",random_number:i||C};await K.post(`${Z}/student/fileuploadsubmitassignmentplagcheck.php`,b,{headers:{"Content-Type":"multipart/form-data"}}).then(t=>{var _,w,f,g;ae((_=t==null?void 0:t.data)==null?void 0:_.random_number),console.log(t),localStorage.setItem("assignment_files_random_number",(w=t==null?void 0:t.data)==null?void 0:w.random_number),p(y({assignment_files:(f=t==null?void 0:t.data)==null?void 0:f.file_name_string,assignment_files_random_number:(g=t==null?void 0:t.data)==null?void 0:g.random_number}))}).catch(t=>{console.log(t)}),x(!1),U(!!m)},ie=e=>{var f,g,E,O,M,T,W,V;let l=JSON.parse(localStorage.getItem("assignment_files_random_number")?localStorage.getItem("assignment_files_random_number"):C),m=e.split(`${l}`)[1],i=[...c],b=i.findIndex(o=>o===m);if(b===-1){let o=(O=(E=(g=(f=n==null?void 0:n.assignment_files)==null?void 0:f.split("_$_"))==null?void 0:g.filter(k=>k!==""))==null?void 0:E.filter(k=>k!==e))==null?void 0:O.join("_$_");p(y({assignment_files:o}))}i.splice(b,1);let t=(V=(W=(T=(M=n==null?void 0:n.assignment_files)==null?void 0:M.split("_$_"))==null?void 0:T.filter(o=>o!==""))==null?void 0:W.filter(o=>o!==e))==null?void 0:V.join("_$_");const _=t.split("_$_").filter(o=>o!=="").map(o=>o.replace(/^\d+/,"")).join("_$_"),w=[].concat(_);ee(w),p(y({assignment_files:t})),q.current.value=null,j(i)},r=me({enableReinitialize:!0,initialValues:{name:"",email:"",number:"",country_name:L,country_code:N},onSubmit:async e=>{var m;if(!n.assignment_files){u.error("Please Upload A File Also");return}S(!0);const l={...e,name:e==null?void 0:e.name,email:e==null?void 0:e.email,country_name:L,country_code:N,number:(m=e==null?void 0:e.phone)==null?void 0:m.replace(N,""),assignment_files:n==null?void 0:n.assignment_files,assignment_files_random_number:n==null?void 0:n.assignment_files_random_number,domain:"Plag Check",submit:"submit"};await K.post(`${Z}/student/submitassignmentplagcheck.php`,l).then(i=>{p(y({...n,assignment_array:$,name:i==null?void 0:i.data.data.name,assignment_id:i.data.id,assignment_files:null,assignment_files_random_number:null,number_of_files:i.data.number_of_files,price:i.data.price,amount:i.data.amount})),te("/submit/checkplagiarism/checkout"),S(!1)}).catch(i=>{console.log(i),S(!1),u.error("Something went wrong")})},validationSchema:be}),A=e=>{if(r.errors[e]){u.error(r.errors[e]);return}r.setFieldValue(e,r.values[e])};return console.log(Q),s(v,{children:[" ",a(ce,{children:a("title",{children:"Check Plagiarism"})}),a("form",{onSubmit:r.handleSubmit,children:s("div",{className:" backdrop-blur-2xl drop-shadow shadow-2xl rounded-xl py-8 md:my-5 flex-col bg-white bg-opacity-20  max-w-[70rem] mt-8 mb-6 mx-auto flex   px-5 md:px-0  items-center",children:[a("div",{className:"flex flex-col items-center justify-center gap-2 md:flex-row",children:a("div",{className:" py-5 max-w-[100rem] mx-auto flex md:flex-row flex-col px-5 md:px-0 justify-between items-center",children:a("button",{className:"flex-col max-w-sm px-10 bg-white border border-gray-200 rounded-lg shadow-2xl  backdrop-blur-3xl",children:a("div",{className:"p-5",children:a("h5",{className:"mb-2 text-2xl font-bold tracking-tight text-gray-900 ",children:"Check Plagiarism"})})})})}),s("section",{id:"generalothers",children:[a("label",{className:" mt-4 mb-5 text-xl font-medium flex items-center justify-center",children:"Note : We Will Use Turnitin to Check Plagiarism Each File Will Cost ₹ 200"}),s("div",{className:"flex flex-col md:w-[45rem] w-[20rem] mt-5",children:[a("br",{}),s("div",{className:"flex flex-col items-center",children:[a("div",{className:"flex flex-col items-center md:flex-row w-[100%]",children:s(F,{sx:{m:1,width:"100%"},variant:"outlined",required:!0,children:[a(Y,{htmlFor:"outlined-adornment-name",children:"Name"}),a(X,{required:!0,id:"name",sx:{borderRadius:"20px"},value:r.values.name,onChange:r.handleChange("name"),onBlur:()=>A("name"),type:"text",label:"Name"})]})}),a("br",{}),s("div",{className:"flex flex-col items-center md:flex-row w-[100%]",children:[s(F,{sx:{m:1,width:"100%"},variant:"outlined",required:!0,children:[a(Y,{htmlFor:"outlined-adornment-email",children:"Email"}),a(X,{required:!0,type:"email",name:"email",id:"email",autoComplete:"on",label:"Email",sx:{borderRadius:"20px"},value:r.values.email,onChange:r.handleChange("email"),onBlur:()=>A("email"),error:Boolean(r.errors.email)})]}),a(F,{sx:{m:1,width:"100%"},children:a(pe,{country:"in",inputStyle:{width:"100%",height:"9  0%",background:"none",borderRadius:"20px",border:"1px solid #C4C4C4"},isValid:(e,l)=>(G(l==null?void 0:l.name),H(l==null?void 0:l.countryCode),e.length<12?!1:e.match(/12345/)?"Invalid value: "+e+", "+(l==null?void 0:l.name):!e.match(/1234/)),copyNumbersOnly:!0,showDropdown:!1,value:r.values.phone,onChange:e=>{r.setFieldValue("phone",e),D(e)},onBlur:r.handleBlur("phone"),error:Boolean(r.errors.phone)})})]})]})]})]}),s("section",{id:"plagerismcheck",children:[a("label",{className:" mt-4 mb-2 text-xl font-medium flex items-center justify-center",children:"Upload assignment guidelines"}),s("div",{className:"flex flex-col gap-2 md:w-[45rem] w-[20rem] items-center justify-center mt-4 mb-2",children:[(c==null?void 0:c.length)>h?null:a("div",{className:"flex items-center justify-center w-full pb-2 ",children:s("label",{htmlFor:"dropzone-file",className:"flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed  cursor-pointer  dark:hover:bg-bray-800 hover:bg-gray-100 bg-white rounded-xl shadow-lg  bg-opacity-20 backdrop-blur-lg drop-shadow-lg",children:[a(v,{children:P?s("div",{role:"status",className:"flex items-center justify-center gap-2",children:[a(he,{size:20,className:"animate-spin"}),a("span",{className:"capitalize",children:"Please wait..."})]}):s(v,{children:[a("svg",{"aria-hidden":"true",className:"w-10 h-10 mb-3 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:a("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"})}),a("p",{className:"mb-2 text-md text-gray-500 ",children:a("p",{className:"font-semibold text-center px-5 md:px-2",children:"Upload assignment guidelines and other related files (Can upload max 10 files)"})}),a("p",{className:"text-sm text-gray-500 ",children:"DOC, DOCX, etc up to 10MB each"})]})}),a("input",{multiple:!0,id:"dropzone-file",type:"file",className:"hidden",accept:".doc, .docx",ref:q,onChange:e=>{let l=[...e.target.files];if((l==null?void 0:l.length)>h){u.error(`You can upload only ${h} files`);return}if((l==null?void 0:l.length)+(c==null?void 0:c.length)>h){u.error(`You can upload only ${h} files`);return}const m=l.filter(i=>!i.name.match(/\.(doc|docx)$/i));if(m.length>0){u.error(`Unsupported file type(s): ${m.map(i=>i.name).join(", ")}`);return}ne(l)}})]})}),(z=(R=(B=n==null?void 0:n.assignment_files)==null?void 0:B.split("_$_"))==null?void 0:R.filter(e=>e!==""))==null?void 0:z.map((e,l)=>s("div",{className:"flex items-center  justify-between w-full bg-gray-200 text-gray-800 px-2 rounded-lg my-0.5",children:[s("span",{className:"p-1 rounded-lg ",children:[l+1,"."," ",e==null?void 0:e.replace(n==null?void 0:n.assignment_files_random_number,"")]}),a("button",{onClick:()=>{ie(e)},className:"m-1 leading-none text-white  rounded-full hover:text-gray-100",children:a(fe,{color:"red",size:20})})]},l))]})]}),a(ue,{loading:le,onClick:r.handleSubmit,variant:"contained",color:"primary",type:"submit",disabled:P||r.errors.email,endIcon:a(ge,{}),sx:{bgcolor:"#2956A8",color:"#fff",borderRadius:"1000px",mt:2,height:"50px","&:hover":{backgroundColor:"#fff",color:"#000"}},children:"Assign"})]})})]})}export{je as default};
