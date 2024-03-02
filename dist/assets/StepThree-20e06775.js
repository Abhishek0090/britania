import{a8 as F,d as j,U as D}from"./main-1d195725.js";import{a as r}from"./react-31052980.js";import{d as Q}from"./chevron-left-00fe92ff.js";import{u as Z,j as e,F as G,a as _,_ as $}from"./index-a4114ef4.js";import{S as K,aQ as w}from"./freelancerSlice-60742dc0.js";import Y from"./PersonalDetails-3c935a0c.js";import"./TextField-d5ff1ee4.js";import"./MenuItem-030e42a2.js";import"./trash-6f040b71.js";import"./arrow-right-circle-12522627.js";import"./freelancerApiSlice-d2e4ab83.js";import"./loader-2-0dcaac2c.js";import"./Check-4e30e71a.js";import"./RadioGroup-a75dd518.js";import"./FormGroup-e9548f89.js";const ee=5,te=1,q=5242880,ae=r.lazy(()=>F(()=>import("./Speciality-15221beb.js"),["assets/Speciality-15221beb.js","assets/react-31052980.js","assets/TextField-d5ff1ee4.js","assets/index-a4114ef4.js","assets/freelancerSlice-60742dc0.js","assets/Tags-651fa0a7.js","assets/Autocomplete-9f58a83a.js","assets/circle-e0351cb4.js","assets/loader-2-0dcaac2c.js","assets/trash-6f040b71.js"])),re=r.lazy(()=>F(()=>import("./Experience-0365d791.js"),["assets/Experience-0365d791.js","assets/react-31052980.js","assets/index-a4114ef4.js","assets/freelancerSlice-60742dc0.js","assets/chevron-left-00fe92ff.js","assets/MenuItem-030e42a2.js"])),le=r.lazy(()=>F(()=>import("./Resume-3a1dc9aa.js"),["assets/Resume-3a1dc9aa.js","assets/react-31052980.js","assets/index-a4114ef4.js","assets/chevron-left-00fe92ff.js","assets/loader-2-0dcaac2c.js","assets/trash-6f040b71.js","assets/arrow-right-circle-12522627.js"])),R=[{id:1,name:"Psychology & Sociology"},{id:2,name:"Law"},{id:3,name:"Finance & Accounts"},{id:4,name:"Management"},{id:5,name:"Marketing"},{id:6,name:"Business Studies"},{id:7,name:"English & Literature"},{id:8,name:"Economics"}],ne=["Essay Writing","Report Writing","Literature Review","Black Book","Research Paper","Primary/Secondary Data Analysis","Review Article","Thesis Writing","Dissertation Writing","Programming / Coding","PPT","Case Studies","Question & Answer ","SOP"];function Ne(){const u=K();let f=Z(l=>l.freelancer.nonTechnicalFreelancerFormData);const[E,A]=r.useState([]),[y,I]=r.useState([]),[se,b]=r.useState(!1),[L,m]=r.useState(!1),[S,B]=r.useState([]),[v,ie]=r.useState("Non Technical"),[s,oe]=r.useState(3),[W,J]=r.useState(null),[N,V]=r.useState(null),p=Q();r.useEffect(()=>{if(localStorage.getItem("form")){let l=JSON.parse(localStorage.getItem("form"));B([...l[1].Step2.split(",")]),u(w({domains:l[1].Step2.split(",").toString()}))}else window.alert("Please fill the form from the beginning"),p("/freelance/step2")},[]);const X=l=>{let a=[...E],d=!1;m(!0),l.forEach(n=>{if(a.length<ee){if(n.size>q){$.error("File size is too large"),m(!1);return}a.push(n)}else d=!0}),A(a);let i={past_work_files:a,submit:"submit",random_number:W};j.post(`${D}/freelancer/fileuploadpastworkfiles.php`,i,{headers:{"Content-Type":"multipart/form-data"}}).then(n=>{var t,o;J((t=n==null?void 0:n.data)==null?void 0:t.random_number),u(w({past_work_files:(o=n==null?void 0:n.data)==null?void 0:o.file_name_string}))}).catch(n=>{console.log(n)}),m(!1),b(!!d)},H=async l=>{let a=[...y],d=!1;m(!0),l.forEach(t=>{if(a.length<te){if(t.size>q){$.error("File size is too large"),m(!1);return}a.push(t)}else d=!0}),I(a);let i=JSON.parse(localStorage.getItem("random_number_resume")?localStorage.getItem("random_number_resume"):N),n={resume:a,submit:"submit",random_number:i||N};await j.post(`${D}/freelancer/fileuploadresume.php`,n,{headers:{"Content-Type":"multipart/form-data"}}).then(t=>{var o,h,x,g;V((o=t==null?void 0:t.data)==null?void 0:o.random_number),localStorage.setItem("random_number_resume",(h=t==null?void 0:t.data)==null?void 0:h.random_number),u(w({resume:(x=t==null?void 0:t.data)==null?void 0:x.file_name_string,resume_random_number:(g=t==null?void 0:t.data)==null?void 0:g.random_number}))}).catch(t=>{console.log(t)}),m(!1),b(!!d)},z=l=>{var o,h,x,g,T,U,M,O;let a=JSON.parse(localStorage.getItem("random_number_resume")?localStorage.getItem("random_number_resume"):N),d=l.split(`${a}`)[1],i=[...y],n=i.findIndex(c=>c===d);if(n===-1){let c=(g=(x=(h=(o=f==null?void 0:f.resume)==null?void 0:o.split("_$_"))==null?void 0:h.filter(k=>k!==""))==null?void 0:x.filter(k=>k!==l))==null?void 0:g.join("_$_");u(w({resume:c}))}i.splice(n,1);let t=(O=(M=(U=(T=f==null?void 0:f.resume)==null?void 0:T.split("_$_"))==null?void 0:U.filter(c=>c!==""))==null?void 0:M.filter(c=>c!==l))==null?void 0:O.join("_$_");u(w({resume:t})),I(i)},C=()=>{s===1&&p("/freelance/freelancer/nontechnical/step2"),s===2&&p("/freelance/freelancer/nontechnical/step3")},P=()=>{s===2&&p("/freelance/freelancer/nontechnical/step1"),s===3&&p("/freelance/freelancer/nontechnical/step2")};return e(G,{children:s===4?e(r.Suspense,{fallback:e("div",{}),children:e(Y,{})}):_("div",{className:" backdrop-blur-2xl  drop-shadow shadow-2xl rounded-xl py-10 md:my-10 flex-col bg-white bg-opacity-20  max-w-[70rem] mt-8 mb-6 mx-auto flex   px-5 md:px-0  items-center",children:[" ",e("div",{className:" flex flex-col items-center justify-center gap-x-1 gap-y-1 md:flex-row flex-wrap",children:S==null?void 0:S.filter(l=>R==null?void 0:R.map(a=>a==null?void 0:a.name).includes(l)).map((l,a)=>e("div",{className:" max-w-[65rem] mx-auto flex md:flex-row flex-col px-2 md:px-0 justify-between items-center",children:e("button",{className:"flex-col max-w-sm px-10 bg-white border border-gray-200 rounded-lg shadow-2xl  backdrop-blur-3xl",children:e("h5",{className:"py-1 text-xl font-bold tracking-tight text-gray-900",children:l})})},a))}),_("ol",{className:"mt-10 flex items-center md:w-[50rem] w-[20rem] text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base",children:[e("li",{style:{color:s===1?"#2956A8":"#9CA3AF"},className:"flex md:w-full items-center   sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700",children:_("span",{className:"flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500",children:[s===1?e("svg",{"aria-hidden":"true",className:"w-4 h-4 mr-2 sm:w-5 sm:h-5",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})}):e("span",{className:"mr-2",children:"1"}),"Speciality"]})}),e("li",{style:{color:s===2?"#2956A8":"#9CA3AF"},className:"flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700",children:e("span",{className:"flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500",children:_("span",{className:"flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500",children:[s===2?e("svg",{"aria-hidden":"true",className:"w-4 h-4 mr-2 sm:w-5 sm:h-5",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})}):e("span",{className:"mr-2",children:"2"}),"Experience"]})})}),e("li",{style:{color:s===3?"#2956A8":"#9CA3AF"},className:"flex items-center",children:_("span",{className:"flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500",children:[s===3?e("svg",{"aria-hidden":"true",className:"w-4 h-4 mr-2 sm:w-5 sm:h-5",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})}):e("span",{className:"mr-2",children:"3"}),"Resume"]})})]}),s===1&&e(r.Suspense,{fallback:e("div",{}),children:e(ae,{nextStepHandler:C,loading:L,setLoading:m,uploadedFiles:E,handleUploadFiles:X,setUploadedFiles:A,relevantCheckboxes:ne,role:v,handleDeleteFile:z})}),s===2&&e(r.Suspense,{fallback:e("div",{}),children:e(re,{prevStepHandler:P,nextStepHandler:C,role:v})}),s===3&&e(r.Suspense,{fallback:e("div",{}),children:e(le,{handleUploadResume:H,resumeFiles:y,prevStepHandler:P,loading:L,role:v,handleDeleteFile:z})})]})})}export{Ne as default};
