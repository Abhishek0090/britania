import{g as p,a as f,E as w,b as e,F,_ as x,W as d,a1 as G,j as C,d as y}from"./freelancerSlice-60742dc0.js";import{a as g}from"./react-31052980.js";import{j}from"./index-a4114ef4.js";function M(o){return p("MuiFormGroup",o)}f("MuiFormGroup",["root","row","error"]);const R=["className","row"],S=o=>{const{classes:r,row:t,error:s}=o;return y({root:["root",t&&"row",s&&"error"]},M,r)},U=w("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(o,r)=>{const{ownerState:t}=o;return[r.root,t.row&&r.row]}})(({ownerState:o})=>e({display:"flex",flexDirection:"column",flexWrap:"wrap"},o.row&&{flexDirection:"row"})),_=g.forwardRef(function(r,t){const s=F({props:r,name:"MuiFormGroup"}),{className:a,row:c=!1}=s,l=x(s,R),i=d(),m=G({props:s,muiFormControl:i,states:["error"]}),n=e({},s,{row:c,error:m.error}),u=S(n);return j(U,e({className:C(u.root,a),ownerState:n,ref:t},l))}),W=_;export{W as F};
