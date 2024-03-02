import{a as d}from"./react-31052980.js";import{d as me}from"./chevron-left-00fe92ff.js";import{u as Z,a as s,F as I,j as t,_ as m}from"./index-a4114ef4.js";import{s as ce,d as P,U as k,W as ue,aa as ge,aH as fe,m as pe,aP as D,aO as he}from"./main-1d195725.js";import{S as be,am as xe,aK as S,aL as $,aM as j}from"./freelancerSlice-60742dc0.js";import{h as K}from"./moment-fbc5633a.js";import{A as _e}from"./Autocomplete-9f58a83a.js";import{b as we,C as ve}from"./TextField-d5ff1ee4.js";import{C as ye}from"./circle-e0351cb4.js";import{R as Se,a as Ce}from"./RadioGroup-a75dd518.js";import{M as Ne,a as Ae}from"./index.esm-b6ccaf88.js";import{L as Le}from"./loader-2-0dcaac2c.js";import{T as Fe}from"./trash-6f040b71.js";import{A as Ie}from"./arrow-right-circle-12522627.js";import"./MenuItem-030e42a2.js";import"./FormGroup-e9548f89.js";import"./Tabs-ce9635ac.js";const R=["Letter of Recommendation","Statement of Purpose","Resume / CV","Cover Letter"],p=10,Pe=5242880;function Ge(){var q,U,V,H;const v=be(),a=Z(e=>e.student.allProfessionalDetails),C=Z(ce),[Q,ee]=d.useState([]),[u,B]=d.useState([]);d.useEffect(()=>{if(localStorage.getItem("Assignform")){let e=JSON.parse(localStorage.getItem("Assignform"));ee(e[0].Step1),console.log(e[0].Step1)}else console.log("no form found"),z("/freelance")},[localStorage.getItem("Assignform")]);const[te,ne]=d.useState(null),[g,M]=d.useState([]),[N,re]=d.useState(null),[ke,E]=d.useState(!1),[O,y]=d.useState(!1),[le,A]=d.useState(!1),Y=d.useRef(null),z=me(),L=["Diploma","Bachelors","Masters","PhD","Job"],se=async e=>{let n=[...g],o=!1;y(!0),e.forEach(r=>{if(n.length<p){if(r.size>Pe){m.error("File size is too large"),y(!1);return}n.push(r)}else o=!0,m.error("You can upload maximum 10 files"),y(!1)}),M(n);let i=JSON.parse(localStorage.getItem("assignment_files_random_number")?localStorage.getItem("assignment_files_random_number"):N),c={professional_assignment:n,submit:"submit",random_number:i||N};await P.post(`${k}/student/fileuploadsubmitassignmentprofessionalwriting.php`,c,{headers:{"Content-Type":"multipart/form-data"}}).then(r=>{var b,x,_,w;re((b=r==null?void 0:r.data)==null?void 0:b.random_number),localStorage.setItem("assignment_files_random_number",(x=r==null?void 0:r.data)==null?void 0:x.random_number),v(D({assignment_files:(_=r==null?void 0:r.data)==null?void 0:_.file_name_string,assignment_files_random_number:(w=r==null?void 0:r.data)==null?void 0:w.random_number})),console.log(r)}).catch(r=>{console.log(r)}),y(!1),E(!!o)},ae=e=>{var b,x,_,w,W,J,X,G;let n=JSON.parse(localStorage.getItem("assignment_files_random_number")?localStorage.getItem("assignment_files_random_number"):N),o=e.split(`${n}`)[1];console.log(e);let i=[...g],c=i.findIndex(f=>f===o);if(c===-1){let f=(w=(_=(x=(b=a==null?void 0:a.assignment_files)==null?void 0:b.split("_$_"))==null?void 0:x.filter(F=>F!==""))==null?void 0:_.filter(F=>F!==e))==null?void 0:w.join("_$_");v(D({assignment_files:f}))}i.splice(c,1);let r=(G=(X=(J=(W=a==null?void 0:a.assignment_files)==null?void 0:W.split("_$_"))==null?void 0:J.filter(f=>f!==""))==null?void 0:X.filter(f=>f!==e))==null?void 0:G.join("_$_");v(D({assignment_files:r})),Y.current.value=null,M(i)},l=xe({enableReinitialize:!0,initialValues:{student_user_id:"",assignment_type:[],description:"",level:"",deadline:"",budget:""},onSubmit:async e=>{let n=!1;if(e.student_user_id||(m.error("Please Select Student"),n=!0),e.assignment_type.length===0&&(m.error("Please Select Assignment type"),n=!0),e.description||(m.error("Please Enter Assignment description"),n=!0),e.deadline||(m.error("Please Enter Deadline"),n=!0),e.level||(m.error("Please Select Assignment level"),n=!0),e.budget||(m.error("Please Enter Assignment Budget"),n=!0),n)return;A(!0);const o={...e,user_id:e.student_user_id,team_member_id:C==null?void 0:C.teamData.id,assignment_files:a==null?void 0:a.assignment_files,assignment_files_random_number:a==null?void 0:a.assignment_files_random_number,domain:"Freelancer Professional Writing",stream:"Professional Writing",submit:"submit"};console.log(o),await P.post(`${k}/team/submitassignmentprofessionalwriting.php`,o).then(i=>{console.log(i),m.success("Assignment Posted Successfully"),v(he()),A(!1),z(-1)}).catch(i=>{console.log(i),A(!1),m.error("Something went wrong")})}});d.useEffect(()=>{l.setFieldValue("assignment_type",u)},[u]);const h=e=>{if(l.errors[e]){m.error(l.errors[e]);return}l.setFieldValue(e,l.values[e])},[T,ie]=d.useState([]);d.useEffect(()=>{P.get(`${k}/team/studentstable.php`).then(e=>{ie(e.data)}).catch(e=>console.log(e))},[]);const oe=e=>e?`id: ${e.id} name: ${e.firstname} ${e.lastname}`:"",de=T.find(e=>e.id===l.values.student_user_id);return s(I,{children:[t(ue,{children:t("title",{children:"Professional Writing"})}),s("div",{className:"  drop-shadow shadow-2xl rounded-xl py-8 md:my-5 flex-col bg-white bg-opacity-20  max-w-[70rem] mt-8 mb-6 mx-auto flex   px-5 md:px-0  items-center",children:[t("div",{className:"flex flex-col items-center justify-center gap-2 md:flex-row",children:t("div",{className:" py-5 max-w-[100rem] mx-auto flex md:flex-row flex-col px-5 md:px-0 justify-between items-center",children:t("button",{className:"flex-col max-w-sm px-10 bg-white border border-gray-200 rounded-lg shadow-2xl  backdrop-blur-3xl",children:t("div",{className:"p-5",children:t("h5",{className:"mb-2 text-2xl font-bold tracking-tight text-gray-900 ",children:Q})})})})}),s("section",{id:"generalothers",children:[t("label",{className:"block mt-4 mb-2 text-center text-xl font-medium ",children:"General Details Section"}),s("div",{className:"flex flex-col md:w-[45rem] w-[20rem]",children:[t(_e,{options:T,getOptionLabel:oe,filterOptions:(e,{inputValue:n})=>{const o=n.toLowerCase();return e.filter(i=>i.id.toLowerCase().includes(o)||i.firstname.toLowerCase().includes(o)||i.lastname.toLowerCase().includes(o))},name:"student_user_id",type:"text",id:"student_user_id",value:de||null,onChange:(e,n)=>{l.setFieldValue("student_user_id",n?n.id:"")},onBlur:()=>h("student_user_id"),renderInput:e=>t(we,{...e,variant:"outlined",required:!0,sx:{marginTop:"1rem",marginBottom:"2rem",width:"100%",borderRadius:"25px"},label:"Student User Id",placeholder:"Enter the Student Id"})}),t("br",{}),t("span",{className:"text-lg font-semibold text-white-700",children:"Assignment Type (Select Your Type)"}),t("fieldset",{className:"flex flex-wrap items-center justify-center w-full gap-3 py-8",children:R==null?void 0:R.map((e,n)=>{let o=u==null?void 0:u.find(c=>c===e),i=o?"blue141":"white-900";return s("div",{children:[t("input",{type:"checkbox",name:e,value:e,id:e,className:"peer hidden  ",onChange:c=>{c.target.checked?(B([...u,c.target.value]),l.setFieldValue("assignment_type",[...u,c.target.value])):(B(u.filter(r=>r!==c.target.value)),l.setFieldValue("assignment_type",u.filter(r=>r!==c.target.value)))}}),s("label",{htmlFor:e,className:`flex items-center justify-center gap-2 px-3 py-2 text-${i} border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 ${o?` border-${i}  bg-${i}  text-white`:""}`,children:[o?t(ve,{size:20}):t(ye,{size:20}),t("p",{className:"text-sm font-medium",children:e})]})]},n)})}),s(S,{variant:"outlined",required:!0,sx:{marginTop:"2rem",width:"100%"},children:[" ",t($,{htmlFor:"outlined-adornment-name",children:"Assignment Description"}),t(j,{sx:{borderRadius:"25px"},value:l.values.description,onChange:l.handleChange("description"),onBlur:()=>h("description"),multiline:!0,type:"text",rows:5,cols:33,id:"description",name:"description",label:"Assignment Description",placeholder:" Describe in more than 100 words about detailed requirements and what\r is to be done in the assignment."})]}),s(S,{sx:{mt:4},variant:"outlined",required:!0,children:[t("span",{className:"text-lg mb-2 font-semibold text-white-700",children:"Level of Assignment"}),t(Se,{row:!0,"aria-labelledby":"demo-controlled-radio-buttons-group",name:"controlled-radio-buttons-group",value:l.values.level,label:"Level of Assignment",onChange:l.handleChange("level"),onBlur:()=>h("level"),children:L==null?void 0:L.map((e,n)=>t("label",{className:"flex items-center justify-center gap-2 px-3 py-2 mx-1 my-1 text-white-900 border rounded-md cursor-pointer hover:border-gray-200 ",children:t(ge,{value:e,label:e,control:t(Ce,{})})},n))})]})]})]}),s("section",{id:"deadlineothers",children:[t("label",{className:"block mt-4 mb-2 text-xl text-center font-medium ",children:"Deadline and Budget Section"}),s("div",{className:"flex flex-col md:w-[45rem] w-[20rem]",children:[s(S,{variant:"outlined",required:!0,sx:{marginTop:"1rem",width:"100%"},children:[" ",t($,{htmlFor:"outlined-adornment-name",children:"Assignment Budget"}),t(j,{sx:{borderRadius:"25px"},value:(q=l==null?void 0:l.values)==null?void 0:q.budget,onChange:l.handleChange("budget"),onBlur:()=>h("budget"),type:"number",id:"budget",name:"budget",placeholder:"Enter the budget of your Assignment in INR",label:"Assignment Budget"})]}),t(fe,{dateAdapter:Ne,children:t(Ae,{label:"Deadline for the assignment",value:te,minDate:new Date,onChange:e=>{ne(K(e).format("YYYY-MM-DD HH:mm")),l.setFieldValue("deadline",K(e).format("YYYY-MM-DD HH:mm"))},renderInput:e=>s(S,{variant:"outlined",required:!0,sx:{marginTop:"3rem",width:"100%"},children:[" ",t($,{htmlFor:"outlined-adornment-name",children:"Deadline for the assignment"}),t(j,{onBlur:()=>h("deadline"),sx:{borderRadius:"25px"},...e,placeholder:"Select Deadline of Assignment",label:"Deadline for the assignment"})]})})})]})]}),s("section",{id:"uploadothers",children:[t("label",{className:" mt-4 mb-2 text-xl font-medium flex items-center justify-center",children:"Upload assignment guidelines"}),s("div",{className:"flex flex-col gap-2 md:w-[45rem] w-[20rem] items-center justify-center mt-4 mb-2",children:[(g==null?void 0:g.length)>p?null:t("div",{className:"flex items-center justify-center w-full pb-2 ",children:s("label",{htmlFor:"dropzone-file",className:"flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed  cursor-pointer  dark:hover:bg-bray-800 hover:bg-gray-500  bg-[#000] rounded-xl shadow-lg  bg-opacity-20 backdrop-blur-lg drop-shadow-lg",children:[t(I,{children:O?s("div",{role:"status",className:"flex items-center justify-center gap-2",children:[t(Le,{size:20,className:"animate-spin"}),t("span",{className:"capitalize",children:"Please wait..."})]}):s(I,{children:[t("svg",{"aria-hidden":"true",className:"w-10 h-10 mb-3 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:t("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"})}),t("p",{className:"mb-2 text-sm text-white ",children:t("p",{className:"font-semibold text-center px-5 md:px-2",children:"Upload assignment guidelines and other related files (Can upload max 10 files)"})}),t("p",{className:"text-xs text-white ",children:"PDF, DOC, DOCX, ZIP ,etc up to 5MB each"})]})}),t("input",{multiple:!0,id:"dropzone-file",type:"file",className:"hidden",ref:Y,onChange:e=>{let n=[...e.target.files];if((n==null?void 0:n.length)>p){m.error(`You can upload only ${p} files`);return}if((n==null?void 0:n.length)+(g==null?void 0:g.length)>p){m.error(`You can upload only ${p} files`);return}se(n)}})]})}),(H=(V=(U=a==null?void 0:a.assignment_files)==null?void 0:U.split("_$_"))==null?void 0:V.filter(e=>e!==""))==null?void 0:H.map((e,n)=>s("div",{className:"flex items-center  justify-between w-full bg-gray-200 text-gray-800 px-2 rounded-lg my-0.5",children:[s("span",{className:"p-1 rounded-lg ",children:[n+1,"."," ",e==null?void 0:e.replace(a==null?void 0:a.assignment_files_random_number,"")]}),t("button",{onClick:()=>{ae(e)},className:"m-1 leading-none text-white  rounded-full hover:text-gray-100",children:t(Fe,{color:"red",size:20})})]},n))]})]}),t(pe,{loading:le,onClick:l.handleSubmit,variant:"contained",type:"submit",className:"bg-[#141B41]",disabled:O,endIcon:t(Ie,{}),sx:{color:"#fff",borderRadius:"1000px",mt:2,height:"50px","&[disabled]":{backgroundColor:"gray",color:"#fff",opacity:.5,cursor:"not-allowed"},"&:hover":{backgroundColor:"#fff",color:"#000"}},children:"Assign"})]})]})}export{Ge as default};
