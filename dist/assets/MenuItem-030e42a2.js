import{a as p,g as u,E as U,I as G,Q as N,b as r,G as c,F as P,_ as j,L as x,e as D,B as S,j as $,d as E}from"./freelancerSlice-60742dc0.js";import{a as d}from"./react-31052980.js";import{j as M}from"./index-a4114ef4.js";function ee(e){return u("MuiDivider",e)}const _=p("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]),L=_;function te(e){return u("MuiListItemIcon",e)}const H=p("MuiListItemIcon",["root","alignItemsFlexStart"]),O=H;function se(e){return u("MuiListItemText",e)}const W=p("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]),k=W;function z(e){return u("MuiMenuItem",e)}const A=p("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),n=A,Q=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],h=(e,t)=>{const{ownerState:s}=e;return[t.root,s.dense&&t.dense,s.divider&&t.divider,!s.disableGutters&&t.gutters]},q=e=>{const{disabled:t,dense:s,divider:a,disableGutters:l,selected:g,classes:o}=e,i=E({root:["root",s&&"dense",t&&"disabled",!l&&"gutters",a&&"divider",g&&"selected"]},z,o);return r({},o,i)},J=U(G,{shouldForwardProp:e=>N(e)||e==="classes",name:"MuiMenuItem",slot:"Root",overridesResolver:h})(({theme:e,ownerState:t})=>r({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${n.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:c(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${n.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:c(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${n.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:c(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:c(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${n.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${n.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${L.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${L.inset}`]:{marginLeft:52},[`& .${k.root}`]:{marginTop:0,marginBottom:0},[`& .${k.inset}`]:{paddingLeft:36},[`& .${O.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&r({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${O.root} svg`]:{fontSize:"1.25rem"}}))),K=d.forwardRef(function(t,s){const a=P({props:t,name:"MuiMenuItem"}),{autoFocus:l=!1,component:g="li",dense:o=!1,divider:f=!1,disableGutters:i=!1,focusVisibleClassName:R,role:T="menuitem",tabIndex:v,className:w}=a,V=j(a,Q),C=d.useContext(x),y=d.useMemo(()=>({dense:o||C.dense||!1,disableGutters:i}),[C.dense,o,i]),m=d.useRef(null);D(()=>{l&&m.current&&m.current.focus()},[l]);const B=r({},a,{dense:y.dense,divider:f,disableGutters:i}),b=q(a),F=S(m,s);let I;return a.disabled||(I=v!==void 0?v:-1),M(x.Provider,{value:y,children:M(J,r({ref:F,role:T,tabIndex:I,component:g,focusVisibleClassName:$(b.focusVisible,R),className:$(b.root,w)},V,{ownerState:B,classes:b}))})}),ae=K;export{ae as M,te as a,se as b,ee as g,k as l};