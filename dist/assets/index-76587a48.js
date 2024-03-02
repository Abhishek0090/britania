import{W as p,ba as h,bM as b,c as m,C as u,bv as x,D as T,f as c}from"./main-1d195725.js";import{P as f}from"./index-0fe22e6b.js";import{a as C}from"./react-31052980.js";import{a as t,F as g,j as e}from"./index-a4114ef4.js";import{C as v}from"./CardContent-669623bc.js";import{T as y,a as o}from"./Tabs-ce9635ac.js";import{T as w}from"./TextField-d5ff1ee4.js";import"./freelancerSlice-60742dc0.js";import"./chevron-left-00fe92ff.js";import"./MenuItem-030e42a2.js";import"./trash-6f040b71.js";import"./arrow-right-circle-12522627.js";function s(a){const{children:i,value:n,index:r,...l}=a;return e("div",{role:"tabpanel",hidden:n!==r,id:`simple-tabpanel-${r}`,"aria-labelledby":`simple-tab-${r}`,...l,children:n===r&&e(c,{sx:{p:3},children:e(w,{children:i})})})}function d(a){return{id:`simple-tab-${a}`,"aria-controls":`simple-tabpanel-${a}`}}function G(){const[a,i]=C.useState(0);return t(g,{children:[e(p,{children:e("title",{children:"Tabs - Components"})}),e(h,{children:e(f,{heading:"Tabs",subHeading:"Tabs make it easy to explore and switch between different views.",docs:"https://material-ui.com/components/tabs/"})}),e(b,{maxWidth:"lg",children:e(m,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:e(m,{item:!0,xs:12,children:t(u,{children:[e(x,{title:"Basic Example"}),e(T,{}),e(v,{children:t(c,{sx:{width:"100%"},children:[t(y,{variant:"scrollable",scrollButtons:"auto",textColor:"primary",indicatorColor:"primary",value:a,onChange:(r,l)=>{i(l)},"aria-label":"basic tabs example",children:[e(o,{label:"Item One",...d(0)}),e(o,{label:"Item Two",...d(1)}),e(o,{label:"Item Three",...d(2)})]}),e(s,{value:a,index:0,children:"Item One"}),e(s,{value:a,index:1,children:"Item Two"}),e(s,{value:a,index:2,children:"Item Three"})]})})]})})})})]})}export{G as default};