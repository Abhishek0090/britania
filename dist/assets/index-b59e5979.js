import{s as p,d as g,U as f,C as D,W as F,ba as b,f as j,c as h}from"./main-1d195725.js";import{P as N}from"./index-72f685bb.js";import{u,j as i,a as $,F as y}from"./index-a4114ef4.js";import{a as o}from"./react-31052980.js";import{A as P}from"./index-5bb0223d.js";import{h as C}from"./chevron-left-00fe92ff.js";import"./freelancerSlice-60742dc0.js";import"./TextField-d5ff1ee4.js";import"./MenuItem-030e42a2.js";import"./trash-6f040b71.js";import"./arrow-right-circle-12522627.js";import"./SearchTwoTone-880281d3.js";import"./index-4db24ebd.js";import"./MoreVertTwoTone-502dd3b1.js";import"./ListItemText-a11f0774.js";function E({id:n}){const a=u(p),d=a==null?void 0:a.id,l=["Technical pm","Non-Technical pm"],A=["Technical hr","Non-Technical hr"],[r,m]=o.useState([]),[x,T]=o.useState([]);return o.useEffect(()=>{l.includes(a==null?void 0:a.teamDomain)?g.get(`${f}/team/pmdetails.php?pm_id=${d}`).then(t=>{m(t==null?void 0:t.data[1])}).catch(t=>{console.log(t)}):A.includes(a==null?void 0:a.teamDomain)?g.get(`${f}/team/freelancingassignmenttable.php`).then(t=>{var s,c;(a==null?void 0:a.teamDomain)==="Technical hr"?m((s=t==null?void 0:t.data)==null?void 0:s.filter(e=>(e==null?void 0:e.domain)==="Technical")):m((c=t==null?void 0:t.data)==null?void 0:c.filter(e=>(e==null?void 0:e.domain)==="Non-Technical"))}).catch(t=>{console.log(t)}):g.get(`${f}/team/freelancingassignmenttable.php`).then(t=>{m(t==null?void 0:t.data)}).catch(t=>{console.log(t)})},[]),o.useEffect(()=>{if(n){const t=r==null?void 0:r.filter(s=>{var c;return(c=s==null?void 0:s.freelancers)==null?void 0:c.map(e=>e==null?void 0:e.id).includes(n)});T(t)}},[n,r,a==null?void 0:a.teamDomain]),i(D,{children:i(P,{statusName:"Assigned to Freelancer",streamName:null,cryptoOrders:n?x:r})})}function z(){var l;const{id:n}=C(),a=u(p),d={name:(l=a==null?void 0:a.teamData)==null?void 0:l.name,avatar:"/static/images/avatars/1.jpg"};return $(y,{children:[i(F,{children:i("title",{children:"Assigned Freelancer Assignments"})}),i(b,{children:i(N,{title:"Assigned Freelancers Assignments",subtitle:`${d.name}, these are all assigned freelancer assignments.`})}),i(j,{fullwidth:"true",sx:{mx:2},children:i(h,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:i(h,{item:!0,xs:12,children:i(E,{id:n})})})})]})}export{z as default};