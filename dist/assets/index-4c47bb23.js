import{s as u,d as g,U as f,C as D,W as C,ba as b,f as j,c as h}from"./main-1d195725.js";import{P as N}from"./index-72f685bb.js";import{u as A,j as c,a as $,F as y}from"./index-a4114ef4.js";import{a as r}from"./react-31052980.js";import{A as P}from"./index-5bb0223d.js";import{h as E}from"./chevron-left-00fe92ff.js";import"./freelancerSlice-60742dc0.js";import"./TextField-d5ff1ee4.js";import"./MenuItem-030e42a2.js";import"./trash-6f040b71.js";import"./arrow-right-circle-12522627.js";import"./SearchTwoTone-880281d3.js";import"./index-4db24ebd.js";import"./MoreVertTwoTone-502dd3b1.js";import"./ListItemText-a11f0774.js";function F({id:l}){const a=A(u),s=a==null?void 0:a.id,o=["Technical pm","Non-Technical pm"],x=["Technical hr","Non-Technical hr"],[n,d]=r.useState([]),[T,p]=r.useState([]);return r.useEffect(()=>{o.includes(a==null?void 0:a.teamDomain)?g.get(`${f}/team/pmdetails.php?pm_id=${s}`).then(t=>{console.log(t==null?void 0:t.data),d(t==null?void 0:t.data[1])}).catch(t=>{console.log(t)}):x.includes(a==null?void 0:a.teamDomain)?g.get(`${f}/team/freelancingassignmenttable.php`).then(t=>{var m,e;console.log(t==null?void 0:t.data),(a==null?void 0:a.teamDomain)==="Technical hr"?d((m=t==null?void 0:t.data)==null?void 0:m.filter(i=>(i==null?void 0:i.domain)==="Technical")):d((e=t==null?void 0:t.data)==null?void 0:e.filter(i=>(i==null?void 0:i.domain)==="Non-Technical"))}).catch(t=>{console.log(t)}):g.get(`${f}/team/freelancingassignmenttable.php`).then(t=>{console.log(t==null?void 0:t.data),d(t==null?void 0:t.data)}).catch(t=>{console.log(t)})},[]),r.useEffect(()=>{if(l){const t=n==null?void 0:n.filter(m=>{var e;return(e=m==null?void 0:m.freelancers)==null?void 0:e.map(i=>i==null?void 0:i.id).includes(l)});p(t)}},[l,n,a==null?void 0:a.teamDomain]),c(D,{children:c(P,{statusName:"Completed",streamName:null,cryptoOrders:l?T:n})})}function z(){var o;const{id:l}=E(),a=A(u),s={name:(o=a==null?void 0:a.teamData)==null?void 0:o.name,avatar:"/static/images/avatars/1.jpg"};return $(y,{children:[c(C,{children:c("title",{children:"Completed Assignments"})}),c(b,{children:c(N,{title:"Completed Assignments",subtitle:`${s.name}, these are all completed assignments.`})}),c(j,{fullwidth:"true",sx:{mx:2},children:c(h,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:c(h,{item:!0,xs:12,children:c(F,{id:l})})})})]})}export{z as default};