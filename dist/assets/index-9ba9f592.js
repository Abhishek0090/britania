import{s as u,d as h,U as g,C as b,W as j,ba as N,f as $,c as f}from"./main-1d195725.js";import{P as y}from"./index-72f685bb.js";import{u as T,j as i,a as P,F as p}from"./index-a4114ef4.js";import{a as d}from"./react-31052980.js";import{A as C}from"./index-5bb0223d.js";import{h as E}from"./chevron-left-00fe92ff.js";import"./freelancerSlice-60742dc0.js";import"./TextField-d5ff1ee4.js";import"./MenuItem-030e42a2.js";import"./trash-6f040b71.js";import"./arrow-right-circle-12522627.js";import"./SearchTwoTone-880281d3.js";import"./index-4db24ebd.js";import"./MoreVertTwoTone-502dd3b1.js";import"./ListItemText-a11f0774.js";function F({id:m}){const t=T(u),s=t==null?void 0:t.id,r=["Technical pm","Non-Technical pm"],A=["Technical hr","Non-Technical hr"],[e,o]=d.useState([]),[x,D]=d.useState([]);return d.useEffect(()=>{r.includes(t==null?void 0:t.teamDomain)?h.get(`${g}/team/pmdetails.php?pm_id=${s}`).then(a=>{console.log(a==null?void 0:a.data),o(a==null?void 0:a.data[1])}).catch(a=>{console.log(a)}):A.includes(t==null?void 0:t.teamDomain)?h.get(`${g}/team/freelancingassignmenttable.php`).then(a=>{var l,n;console.log(a==null?void 0:a.data),(t==null?void 0:t.teamDomain)==="Technical hr"?o((l=a==null?void 0:a.data)==null?void 0:l.filter(c=>(c==null?void 0:c.domain)==="Technical")):o((n=a==null?void 0:a.data)==null?void 0:n.filter(c=>(c==null?void 0:c.domain)==="Non-Technical"))}).catch(a=>{console.log(a)}):h.get(`${g}/team/freelancingassignmenttable.php`).then(a=>{var l;console.log(a==null?void 0:a.data),o((l=a==null?void 0:a.data)==null?void 0:l.filter(n=>(n==null?void 0:n.domain)==="Technical"))}).catch(a=>{console.log(a)})},[]),d.useEffect(()=>{if(m){const a=e==null?void 0:e.filter(l=>{var n;return(n=l==null?void 0:l.freelancers)==null?void 0:n.map(c=>c==null?void 0:c.id).includes(m)});D(a)}},[m,e,t==null?void 0:t.teamDomain]),i(b,{children:i(C,{statusName:null,streamName:null,cryptoOrders:m?x:e})})}function z(){var r;const{id:m}=E(),t=T(u),s={name:(r=t==null?void 0:t.teamData)==null?void 0:r.name,avatar:"/static/images/avatars/1.jpg"};return P(p,{children:[i(j,{children:i("title",{children:"Technical Assignments"})}),i(N,{children:i(y,{title:"Technical Assignments",subtitle:`${s.name}, these are all technical assignments.`})}),i($,{fullwidth:"true",sx:{mx:2},children:i(f,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:i(f,{item:!0,xs:12,children:i(F,{id:m})})})})]})}export{z as default};