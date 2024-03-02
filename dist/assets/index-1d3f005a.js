import{s as F,c as o,a3 as M,C as I,bv as _,f as P,D,a0 as E,a1 as K,bK as N,$ as W,bL as t,a2 as U,bH as z,d as G,U as q,W as J,ba as Q,bM as V}from"./main-1d195725.js";import{u as X,j as n,a as h,F as w}from"./index-a4114ef4.js";import{T as u,I as Y}from"./TextField-d5ff1ee4.js";import{a as g}from"./react-31052980.js";import{d as Z}from"./chevron-left-00fe92ff.js";import"./numeral-1ca84eab.js";import"./moment-fbc5633a.js";import{L as A}from"./index-4db24ebd.js";import{E as d,K as p,aK as y,aL as r,ae as O}from"./freelancerSlice-60742dc0.js";import{M as aa}from"./MenuItem-030e42a2.js";import"./trash-6f040b71.js";import"./arrow-right-circle-12522627.js";function na(){var l;const e=X(F),i={name:(l=e==null?void 0:e.teamData)==null?void 0:l.name,avatar:"/static/images/avatars/1.jpg"};return n(o,{container:!0,justifyContent:"space-between",alignItems:"center",children:h(o,{item:!0,children:[n(u,{variant:"h3",component:"h3",gutterBottom:!0,children:"All HRs"}),h(u,{variant:"subtitle2",children:[i.name,", these are all the HRs."]})]})})}d(M)(({theme:e})=>`
     background: ${e.colors.error.main};
     color: ${e.palette.error.contrastText};

     &:hover {
        background: ${e.colors.error.dark};
     }
    `);const ea=(e,i,l)=>(e==null?void 0:e.length)>0?e==null?void 0:e.slice(i*l,i*l+l):[],la=(e,i)=>e==null?void 0:e.filter(l=>{let b=!0;return i!=null&&i.status&&(l==null?void 0:l.status)!==(i==null?void 0:i.status)&&(b=!1),b}),ia=({cryptoOrders:e})=>{const i=Z(),[l,b]=g.useState([]),S=l.length>0,[c,T]=g.useState(0),[f,B]=g.useState(50),[s,C]=g.useState({status:null}),$=[{id:"all",name:"All"},{id:"Active",name:"Active"},{id:"InActive",name:"InActive"}],H=a=>{let m=null;a.target.value!=="all"&&(m=a.target.value),a.target.value==="all"&&(m=null),C(j=>({...j,status:m}))},k=(a,m)=>{T(m)},L=a=>{B(parseInt(a.target.value))},R=la(e,s),v=ea(R,c,f);(l==null?void 0:l.length)>0&&(l==null?void 0:l.length)<(e==null?void 0:e.length),l==null||l.length,e==null||e.length;const x=p();return n(w,{children:(e==null?void 0:e.length)>0?h(I,{children:[!S&&n(_,{action:n(P,{width:200,display:"flex",justifyContent:"space-between",alignItems:"center",children:h(y,{fullWidth:!0,variant:"outlined",children:[n(r,{children:"Status"}),n(O,{value:(s==null?void 0:s.status)||"all",onChange:H,label:"Status",autoWidth:!0,children:$.map(a=>n(aa,{value:a==null?void 0:a.id,children:a==null?void 0:a.name},a==null?void 0:a.id))})]})}),title:"All PM"}),n(D,{}),n(E,{children:h(K,{children:[n(N,{children:h(W,{children:[n(t,{children:"ID"}),n(t,{children:"Freelancer Name"}),n(t,{children:"Phone"}),n(t,{children:"Whatsapp"}),n(t,{children:"Email"}),n(t,{children:"Status"})]})}),n(U,{children:v==null?void 0:v.map(a=>{const m=l==null?void 0:l.includes(a==null?void 0:a.id);return h(W,{hover:!0,selected:m,children:[n(t,{children:n(u,{component:"a",variant:"body1",fontWeight:"bold",gutterBottom:!0,noWrap:!0,onClick:()=>{i(`/team/management/pm/details-pm/${a==null?void 0:a.id}`)},sx:{cursor:"pointer"},color:"#3f51b5",children:a==null?void 0:a.id})}),n(t,{children:n(u,{component:"a",variant:"body1",fontWeight:"bold",color:"text.primary",gutterBottom:!0,noWrap:!0,children:a==null?void 0:a.name})}),n(t,{children:n(u,{component:"a",variant:"body1",fontWeight:"bold",color:"text.primary",gutterBottom:!0,noWrap:!0,href:`tel: ${a==null?void 0:a.number}`,children:a==null?void 0:a.number})}),n(t,{children:n(u,{component:"a",variant:"body1",fontWeight:"bold",color:"text.primary",gutterBottom:!0,noWrap:!0,href:`https://wa.me/${a==null?void 0:a.country_code}${a==null?void 0:a.number_whatsapp}?text=Hi%20I%20am%20interested%20in%20your%20services%20and%20would%20like%20to%20know%20more%20about%20it.`,children:a==null?void 0:a.number_whatsapp})}),n(t,{children:n(u,{component:"a",variant:"body1",fontWeight:"bold",color:"text.primary",gutterBottom:!0,noWrap:!0,href:`mailto: ${a==null?void 0:a.email_old}`,children:a==null?void 0:a.email_old})}),n(t,{children:h(Y,{sx:{"&:hover":{background:x.colors.primary.lighter},color:x.palette.primary.main},color:"inherit",size:"small",children:[(a==null?void 0:a.status)==="Active"?n(A,{color:"success",children:"Active"}):null,(a==null?void 0:a.status)==="InActive"?n(A,{color:"error",children:"Inactive"}):null]})})]},a==null?void 0:a.id)})})]})}),n(P,{p:2,children:n(z,{component:"div",count:e==null?void 0:e.length,onPageChange:k,onRowsPerPageChange:L,page:c,rowsPerPage:f,rowsPerPageOptions:[5,10,25,30,50,75,100,200]})})]}):n(u,{variant:"h3",component:"h3",gutterBottom:!0,children:"No PM Found"})})};function ta(){const[e,i]=g.useState([]);return g.useEffect(()=>{G.get(`${q}/team/hrtable.php`).then(l=>{console.log(l==null?void 0:l.data),i(l==null?void 0:l.data)}).catch(l=>{console.log(l)})},[]),n(I,{children:(e==null?void 0:e.length)>0&&n(ia,{cryptoOrders:e})})}function Wa(){return h(w,{children:[n(J,{children:n("title",{children:"All HR's"})}),n(Q,{children:n(na,{})}),n(V,{maxWidth:"xl",children:n(o,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:n(o,{item:!0,xs:12,children:n(ta,{})})})})]})}export{Wa as default};
