import{a as m}from"./react-31052980.js";import{d as ie}from"./chevron-left-00fe92ff.js";import{u as se,_ as o,a,F as R,j as t}from"./index-a4114ef4.js";import{aQ as oe,d as X,U as G,aR as de,W as me,aa as ce,aH as ue,n as ge,m as pe,aS as j}from"./main-1d195725.js";import{S as he,am as fe,aK as _,aL as N,aM as C}from"./freelancerSlice-60742dc0.js";import{C as be}from"./TextField-d5ff1ee4.js";import{C as xe}from"./circle-e0351cb4.js";import{R as ye,a as _e}from"./RadioGroup-a75dd518.js";import{M as we,a as ve}from"./index.esm-b6ccaf88.js";import{L as Ae}from"./loader-2-0dcaac2c.js";import{T as Se}from"./trash-6f040b71.js";import{A as Ne}from"./arrow-right-circle-12522627.js";import"./MenuItem-030e42a2.js";import"./FormGroup-e9548f89.js";import"./Tabs-ce9635ac.js";import"./moment-fbc5633a.js";const h=10,Ce=5242880,P=["Essay Writing","Report Writing","Literature Review","Dissertation Writing","Black Book","Research Paper","Review Article","Thesis Writing","PPT Making","Case Studies","Question & Answer "];function Ve(){var z,q,O,U,W;const w=he(),n=se(e=>e.student.allAcademicDetails);oe();const[Q,Z]=m.useState([]),[u,T]=m.useState(((z=n==null?void 0:n.assignment_type)==null?void 0:z.map(e=>e))||[]);m.useEffect(()=>{if(localStorage.getItem("Assignform")){let e=JSON.parse(localStorage.getItem("Assignform"));Z(e[0].Step1)}else console.log("no form found"),D("/freelance")},[localStorage.getItem("Assignform")]);const[K,ee]=m.useState((n==null?void 0:n.deadline)||null),[g,B]=m.useState([]),[F,te]=m.useState(null),[Fe,E]=m.useState(!1),[M,v]=m.useState(!1),[re,L]=m.useState(!1),$=m.useRef(null),D=ie(),k=["Diploma","Bachelors","Masters","PhD"],ne=async e=>{let r=[...g],c=!1;v(!0),e.forEach(l=>{if(r.length<h){if(l.size>Ce){o.error("File size is too large"),v(!1);return}r.push(l)}else c=!0,o.error("You can upload maximum 10 files"),v(!1)}),B(r);let s=JSON.parse(localStorage.getItem("assignment_files_random_number")?localStorage.getItem("assignment_files_random_number"):F),d={academic_assignment:r,submit:"submit",random_number:s||F};await X.post(`${G}/student/fileuploadsubmitassignmentacademicwriting.php`,d,{headers:{"Content-Type":"multipart/form-data"}}).then(l=>{var f,b,x,y;te((f=l==null?void 0:l.data)==null?void 0:f.random_number),console.log(l),localStorage.setItem("assignment_files_random_number",(b=l==null?void 0:l.data)==null?void 0:b.random_number),w(j({assignment_files:(x=l==null?void 0:l.data)==null?void 0:x.file_name_string,assignment_files_random_number:(y=l==null?void 0:l.data)==null?void 0:y.random_number}))}).catch(l=>{console.log(l)}),v(!1),E(!!c)},le=e=>{var f,b,x,y,V,J,Y,H;let r=JSON.parse(localStorage.getItem("assignment_files_random_number")?localStorage.getItem("assignment_files_random_number"):F),c=e.split(`${r}`)[1];console.log(e);let s=[...g],d=s.findIndex(p=>p===c);if(d===-1){let p=(y=(x=(b=(f=n==null?void 0:n.assignment_files)==null?void 0:f.split("_$_"))==null?void 0:b.filter(I=>I!==""))==null?void 0:x.filter(I=>I!==e))==null?void 0:y.join("_$_");w(j({assignment_files:p}))}s.splice(d,1);let l=(H=(Y=(J=(V=n==null?void 0:n.assignment_files)==null?void 0:V.split("_$_"))==null?void 0:J.filter(p=>p!==""))==null?void 0:Y.filter(p=>p!==e))==null?void 0:H.join("_$_");w(j({assignment_files:l})),$.current.value=null,B(s)},[A,ae]=m.useState(""),i=fe({enableReinitialize:!0,initialValues:{title:"",assignment_type:[],description:"",deadline:"",budget:""},onSubmit:async e=>{let r=!1;if(e.title||(o.error("Please Enter Assignment title"),r=!0),e.assignment_type.length===0&&(o.error("Please Select Assignment type"),r=!0),e.description||(o.error("Please Enter Assignment description"),r=!0),e.deadline||(o.error("Please Enter Deadline"),r=!0),A||(o.error("Please Select assignment level"),r=!0),e.budget||(o.error("Please Enter Assignment Budget"),r=!0),r)return;L(!0);let c={...e,level:A,user_id:JSON.parse(localStorage.getItem("id"))||5,assignment_files:n==null?void 0:n.assignment_files,assignment_files_random_number:n==null?void 0:n.assignment_files_random_number,domain:"Freelancer Academic Writing",stream:"Academic Writing",submit:"submit"};await X.post(`${G}/student/submitassignmentacademicwriting.php`,c).then(s=>{console.log(s),w(de()),o.success("Assignment Posted Successfully"),L(!1),D("/dashboard")}).catch(s=>{console.log(s),L(!1),o.error("Something went wrong")})}});m.useEffect(()=>{i.setFieldValue("assignment_type",u)},[u]);const S=e=>{if(i.errors[e]){o.error(i.errors[e]);return}i.setFieldValue(e,i.values[e])};return a(R,{children:[" ",t(me,{children:t("title",{children:"Academic Writing"})}),a("div",{className:" backdrop-blur-2xl drop-shadow shadow-2xl rounded-xl py-8 md:my-5 flex-col bg-white bg-opacity-20  max-w-[70rem] mt-8 mb-6 mx-auto flex   px-5 md:px-0  items-center",children:[t("div",{className:"flex flex-col items-center justify-center gap-2 md:flex-row",children:t("div",{className:" py-5 max-w-[100rem] mx-auto flex md:flex-row flex-col px-5 md:px-0 justify-between items-center",children:t("button",{className:"flex-col max-w-sm px-10 bg-white border border-gray-200 rounded-lg shadow-2xl  backdrop-blur-3xl",children:t("div",{className:"p-5",children:t("h5",{className:"mb-2 text-2xl font-bold tracking-tight text-gray-900 ",children:Q})})})})}),a("section",{id:"generalothers",children:[t("label",{className:"block mt-4 mb-2 text-center text-xl font-medium ",children:"General Details Section"}),a("div",{className:"flex flex-col md:w-[45rem] w-[20rem]",children:[t("br",{}),t("span",{className:"text-lg font-semibold text-gray-700",children:"Assignment Type (Select Your Type)"}),t("fieldset",{className:"flex flex-wrap items-center justify-center w-full gap-3 py-8",children:P==null?void 0:P.map((e,r)=>{let c=u==null?void 0:u.find(d=>d===e),s=c?"blue141":"gray-900";return a("div",{children:[t("input",{type:"checkbox",name:e,value:e,id:e,className:"peer hidden  ",onChange:d=>{d.target.checked?(T([...u,d.target.value]),i.setFieldValue("assignment_type",[...u,d.target.value])):(T(u.filter(l=>l!==d.target.value)),i.setFieldValue("assignment_type",u.filter(l=>l!==d.target.value)))}}),a("label",{htmlFor:e,className:`flex items-center justify-center gap-2 px-3 py-2 text-${s} border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 ${c?` border-${s}  bg-${s}  text-white`:""}`,children:[c?t(be,{size:20}):t(xe,{size:20}),t("p",{className:"text-sm font-medium",children:e})]})]},r)})}),a(_,{variant:"outlined",required:!0,sx:{marginTop:"1rem",width:"100%"},children:[" ",t(N,{htmlFor:"outlined-adornment-name",children:"Assignment Title"}),t(C,{sx:{borderRadius:"25px"},value:i.values.title,onChange:i.handleChange("title"),onBlur:()=>S("title"),type:"text",id:"title",name:"title",placeholder:"Enter the title of your Assignment",label:"Assignment Title"})]}),a(_,{variant:"outlined",required:!0,sx:{marginTop:"2rem",width:"100%"},children:[" ",t(N,{htmlFor:"outlined-adornment-name",children:"Assignment Description"}),t(C,{sx:{borderRadius:"25px"},value:i.values.description,onChange:i.handleChange("description"),onBlur:()=>S("description"),multiline:!0,type:"text",rows:5,cols:33,id:"description",name:"description",label:"Assignment Description",placeholder:" Describe in more than 100 words about detailed requirements and what\r is to be done in the assignment."})]}),a(_,{sx:{mt:5},variant:"outlined",required:!0,children:[t("span",{className:"text-lg font-semibold text-gray-700",children:"Level of Assignment"}),t(ye,{row:!0,"aria-labelledby":"demo-controlled-radio-buttons-group",name:"controlled-radio-buttons-group",value:A,label:"Level of Assignment",onChange:e=>ae(e.target.value),children:k==null?void 0:k.map((e,r)=>t("label",{className:"flex items-center justify-center gap-2 px-3 py-2 mx-1 my-1 text-gray-900 border rounded-md cursor-pointer hover:border-gray-200 ",children:t(ce,{value:e,label:e,control:t(_e,{checked:A===e})})},r))})]})]})]}),a("section",{id:"deadlineothers",children:[t("label",{className:"block mt-4 mb-2 text-xl text-center font-medium ",children:"Deadline and Budget Section"}),a("div",{className:"flex flex-col md:w-[45rem] w-[20rem]",children:[a(_,{variant:"outlined",required:!0,sx:{marginTop:"1rem",width:"100%"},children:[" ",t(N,{htmlFor:"outlined-adornment-name",children:"Assignment Budget"}),t(C,{sx:{borderRadius:"25px"},value:(q=i==null?void 0:i.values)==null?void 0:q.budget,onChange:i.handleChange("budget"),onBlur:()=>S("budget"),type:"number",id:"budget",name:"budget",placeholder:"Enter the budget of your Assignment in INR",label:"Assignment Budget"})]}),t(ue,{dateAdapter:we,children:t(ve,{label:"Deadline for the assignment",value:K,minDate:new Date,onChange:e=>{const r=ge(new Date(e),"yyyy-MM-dd HH:mm");ee(r),i.setFieldValue("deadline",r)},renderInput:e=>a(_,{variant:"outlined",required:!0,sx:{marginTop:"3rem",width:"100%"},children:[" ",t(N,{htmlFor:"outlined-adornment-name",children:"Deadline for the assignment"}),t(C,{onBlur:()=>S("deadline"),sx:{borderRadius:"25px"},...e,placeholder:"Select The Deadline of Assignment",label:"Deadline for the assignment"})]})})})]})]}),a("section",{id:"uploadothers",children:[t("label",{className:" mt-4 mb-2 text-xl font-medium flex items-center justify-center",children:"Upload assignment guidelines"}),a("div",{className:"flex flex-col gap-2 md:w-[45rem] w-[20rem] items-center justify-center mt-4 mb-2",children:[(g==null?void 0:g.length)>h?null:t("div",{className:"flex items-center justify-center w-full pb-2 ",children:a("label",{htmlFor:"dropzone-file",className:"flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed  cursor-pointer  dark:hover:bg-bray-800 hover:bg-gray-100 bg-white rounded-xl shadow-lg  bg-opacity-20 backdrop-blur-lg drop-shadow-lg",children:[t(R,{children:M?a("div",{role:"status",className:"flex items-center justify-center gap-2",children:[t(Ae,{size:20,className:"animate-spin"}),t("span",{className:"capitalize",children:"Please wait..."})]}):a(R,{children:[t("svg",{"aria-hidden":"true",className:"w-10 h-10 mb-3 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:t("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"})}),t("p",{className:"mb-2 text-md text-gray-500 ",children:t("p",{className:"font-semibold text-center px-5 md:px-2",children:"Upload assignment guidelines and other related files (Can upload max 10 files)"})}),t("p",{className:"text-sm text-gray-500 ",children:"PDF, DOC, DOCX, ZIP ,etc up to 5MB each"})]})}),t("input",{multiple:!0,id:"dropzone-file",type:"file",className:"hidden",ref:$,onChange:e=>{let r=[...e.target.files];if((r==null?void 0:r.length)>h){o.error(`You can upload only ${h} files`);return}if((r==null?void 0:r.length)+(g==null?void 0:g.length)>h){o.error(`You can upload only ${h} files`);return}ne(r)}})]})}),(W=(U=(O=n==null?void 0:n.assignment_files)==null?void 0:O.split("_$_"))==null?void 0:U.filter(e=>e!==""))==null?void 0:W.map((e,r)=>a("div",{className:"flex items-center  justify-between w-full bg-gray-200 text-gray-800 px-2 rounded-lg my-0.5",children:[a("span",{className:"p-1 rounded-lg ",children:[r+1,"."," ",e==null?void 0:e.replace(n==null?void 0:n.assignment_files_random_number,"")]}),t("button",{onClick:()=>{le(e)},className:"m-1 leading-none text-white  rounded-full hover:text-gray-100",children:t(Se,{color:"red",size:20})})]},r))]})]}),t(pe,{loading:re,onClick:i.handleSubmit,variant:"contained",color:"primary",type:"submit",disabled:M,endIcon:t(Ne,{}),sx:{bgcolor:"#2956A8",color:"#fff",borderRadius:"1000px",mt:2,height:"50px","&:hover":{backgroundColor:"#fff",color:"#000"}},children:"Assign"})]})]})}export{Ve as default};