import{a as l,r as Re}from"./react-31052980.js";var se={},Ae={get exports(){return se},set exports(e){se=e}},xe={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var j=l;function Te(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Fe=typeof Object.is=="function"?Object.is:Te,ze=j.useState,Ne=j.useEffect,Le=j.useLayoutEffect,De=j.useDebugValue;function Ve(e,t){var r=t(),s=ze({inst:{value:r,getSnapshot:t}}),n=s[0].inst,o=s[1];return Le(function(){n.value=r,n.getSnapshot=t,ne(n)&&o({inst:n})},[e,r,t]),Ne(function(){return ne(n)&&o({inst:n}),e(function(){ne(n)&&o({inst:n})})},[e]),De(r),r}function ne(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Fe(e,r)}catch{return!0}}function qe(e,t){return t()}var Ue=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?qe:Ve;xe.useSyncExternalStore=j.useSyncExternalStore!==void 0?j.useSyncExternalStore:Ue;(function(e){e.exports=xe})(Ae);var ae={},We={get exports(){return ae},set exports(e){ae=e}},Se={};/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var T=l,Be=se;function He(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ye=typeof Object.is=="function"?Object.is:He,Ze=Be.useSyncExternalStore,Je=T.useRef,Ge=T.useEffect,Ke=T.useMemo,Qe=T.useDebugValue;Se.useSyncExternalStoreWithSelector=function(e,t,r,s,n){var o=Je(null);if(o.current===null){var a={hasValue:!1,value:null};o.current=a}else a=o.current;o=Ke(function(){function c(m){if(!u){if(u=!0,p=m,m=s(m),n!==void 0&&a.hasValue){var x=a.value;if(n(x,m))return $=x}return $=m}if(x=$,Ye(p,m))return x;var be=s(m);return n!==void 0&&n(x,be)?x:(p=m,$=be)}var u=!1,p,$,b=r===void 0?null:r;return[function(){return c(t())},b===null?void 0:function(){return c(b())}]},[t,r,s,n]);var i=Ze(e,o[0],o[1]);return Ge(function(){a.hasValue=!0,a.value=i},[i]),Qe(i),i};(function(e){e.exports=Se})(We);function Xe(e){e()}let we=Xe;const et=e=>we=e,vr=()=>we,ie=l.createContext(null);function tt(){return l.useContext(ie)}const rt=()=>{throw new Error("uSES not initialized!")};let Ee=rt;const ot=e=>{Ee=e},nt=(e,t)=>e===t;function st(e=ie){const t=e===ie?tt:()=>l.useContext(e);return function(s,n=nt){const{store:o,subscription:a,getServerState:i}=t(),c=Ee(a.addNestedSub,o.getState,i||o.getState,s,n);return l.useDebugValue(c),c}}const hr=st();var ce={},at={get exports(){return ce},set exports(e){ce=e}},f={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y=typeof Symbol=="function"&&Symbol.for,de=y?Symbol.for("react.element"):60103,pe=y?Symbol.for("react.portal"):60106,F=y?Symbol.for("react.fragment"):60107,z=y?Symbol.for("react.strict_mode"):60108,N=y?Symbol.for("react.profiler"):60114,L=y?Symbol.for("react.provider"):60109,D=y?Symbol.for("react.context"):60110,me=y?Symbol.for("react.async_mode"):60111,V=y?Symbol.for("react.concurrent_mode"):60111,q=y?Symbol.for("react.forward_ref"):60112,U=y?Symbol.for("react.suspense"):60113,it=y?Symbol.for("react.suspense_list"):60120,W=y?Symbol.for("react.memo"):60115,B=y?Symbol.for("react.lazy"):60116,ct=y?Symbol.for("react.block"):60121,ut=y?Symbol.for("react.fundamental"):60117,lt=y?Symbol.for("react.responder"):60118,ft=y?Symbol.for("react.scope"):60119;function v(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case de:switch(e=e.type,e){case me:case V:case F:case N:case z:case U:return e;default:switch(e=e&&e.$$typeof,e){case D:case q:case B:case W:case L:return e;default:return t}}case pe:return t}}}function _e(e){return v(e)===V}f.AsyncMode=me;f.ConcurrentMode=V;f.ContextConsumer=D;f.ContextProvider=L;f.Element=de;f.ForwardRef=q;f.Fragment=F;f.Lazy=B;f.Memo=W;f.Portal=pe;f.Profiler=N;f.StrictMode=z;f.Suspense=U;f.isAsyncMode=function(e){return _e(e)||v(e)===me};f.isConcurrentMode=_e;f.isContextConsumer=function(e){return v(e)===D};f.isContextProvider=function(e){return v(e)===L};f.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===de};f.isForwardRef=function(e){return v(e)===q};f.isFragment=function(e){return v(e)===F};f.isLazy=function(e){return v(e)===B};f.isMemo=function(e){return v(e)===W};f.isPortal=function(e){return v(e)===pe};f.isProfiler=function(e){return v(e)===N};f.isStrictMode=function(e){return v(e)===z};f.isSuspense=function(e){return v(e)===U};f.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===F||e===V||e===N||e===z||e===U||e===it||typeof e=="object"&&e!==null&&(e.$$typeof===B||e.$$typeof===W||e.$$typeof===L||e.$$typeof===D||e.$$typeof===q||e.$$typeof===ut||e.$$typeof===lt||e.$$typeof===ft||e.$$typeof===ct)};f.typeOf=v;(function(e){e.exports=f})(at);var Ce=ce,dt={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},pt={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},je={};je[Ce.ForwardRef]=dt;je[Ce.Memo]=pt;var ge={},mt={get exports(){return ge},set exports(e){ge=e}},d={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ye=Symbol.for("react.element"),$e=Symbol.for("react.portal"),H=Symbol.for("react.fragment"),Y=Symbol.for("react.strict_mode"),Z=Symbol.for("react.profiler"),J=Symbol.for("react.provider"),G=Symbol.for("react.context"),yt=Symbol.for("react.server_context"),K=Symbol.for("react.forward_ref"),Q=Symbol.for("react.suspense"),X=Symbol.for("react.suspense_list"),ee=Symbol.for("react.memo"),te=Symbol.for("react.lazy"),$t=Symbol.for("react.offscreen"),ke;ke=Symbol.for("react.module.reference");function h(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case ye:switch(e=e.type,e){case H:case Z:case Y:case Q:case X:return e;default:switch(e=e&&e.$$typeof,e){case yt:case G:case K:case te:case ee:case J:return e;default:return t}}case $e:return t}}}d.ContextConsumer=G;d.ContextProvider=J;d.Element=ye;d.ForwardRef=K;d.Fragment=H;d.Lazy=te;d.Memo=ee;d.Portal=$e;d.Profiler=Z;d.StrictMode=Y;d.Suspense=Q;d.SuspenseList=X;d.isAsyncMode=function(){return!1};d.isConcurrentMode=function(){return!1};d.isContextConsumer=function(e){return h(e)===G};d.isContextProvider=function(e){return h(e)===J};d.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===ye};d.isForwardRef=function(e){return h(e)===K};d.isFragment=function(e){return h(e)===H};d.isLazy=function(e){return h(e)===te};d.isMemo=function(e){return h(e)===ee};d.isPortal=function(e){return h(e)===$e};d.isProfiler=function(e){return h(e)===Z};d.isStrictMode=function(e){return h(e)===Y};d.isSuspense=function(e){return h(e)===Q};d.isSuspenseList=function(e){return h(e)===X};d.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===H||e===Z||e===Y||e===Q||e===X||e===$t||typeof e=="object"&&e!==null&&(e.$$typeof===te||e.$$typeof===ee||e.$$typeof===J||e.$$typeof===G||e.$$typeof===K||e.$$typeof===ke||e.getModuleId!==void 0)};d.typeOf=h;(function(e){e.exports=d})(mt);ot(ae.useSyncExternalStoreWithSelector);et(Re.unstable_batchedUpdates);var k={},bt={get exports(){return k},set exports(e){k=e}},re={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gt=l,vt=Symbol.for("react.element"),ht=Symbol.for("react.fragment"),xt=Object.prototype.hasOwnProperty,St=gt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,wt={key:!0,ref:!0,__self:!0,__source:!0};function Oe(e,t,r){var s,n={},o=null,a=null;r!==void 0&&(o=""+r),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(a=t.ref);for(s in t)xt.call(t,s)&&!wt.hasOwnProperty(s)&&(n[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)n[s]===void 0&&(n[s]=t[s]);return{$$typeof:vt,type:e,key:o,ref:a,props:n,_owner:St.current}}re.Fragment=ht;re.jsx=Oe;re.jsxs=Oe;(function(e){e.exports=re})(bt);const Et=k.Fragment,_t=k.jsx,Ct=k.jsxs,xr=Object.freeze(Object.defineProperty({__proto__:null,Fragment:Et,jsx:_t,jsxs:Ct},Symbol.toStringTag,{value:"Module"}));var jt={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const kt=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Sr=(e,t)=>{const r=l.forwardRef(({color:s="currentColor",size:n=24,strokeWidth:o=2,children:a,...i},c)=>l.createElement("svg",{ref:c,...jt,width:n,height:n,stroke:s,strokeWidth:o,className:`lucide lucide-${kt(e)}`,...i},[...t.map(([u,p])=>l.createElement(u,p)),...(Array.isArray(a)?a:[a])||[]]));return r.displayName=`${e}`,r};let Ot={data:""},Pt=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Ot,It=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Mt=/\/\*[^]*?\*\/|  +/g,ve=/\n+/g,E=(e,t)=>{let r="",s="",n="";for(let o in e){let a=e[o];o[0]=="@"?o[1]=="i"?r=o+" "+a+";":s+=o[1]=="f"?E(a,o):o+"{"+E(a,o[1]=="k"?"":t)+"}":typeof a=="object"?s+=E(a,t?t.replace(/([^,])+/g,i=>o.replace(/(^:.*)|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,i):i?i+" "+c:c)):o):a!=null&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=E.p?E.p(o,a):o+":"+a+";")}return r+(t&&n?t+"{"+n+"}":n)+s},S={},Pe=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+Pe(e[r]);return t}return e},Rt=(e,t,r,s,n)=>{let o=Pe(e),a=S[o]||(S[o]=(c=>{let u=0,p=11;for(;u<c.length;)p=101*p+c.charCodeAt(u++)>>>0;return"go"+p})(o));if(!S[a]){let c=o!==e?e:(u=>{let p,$,b=[{}];for(;p=It.exec(u.replace(Mt,""));)p[4]?b.shift():p[3]?($=p[3].replace(ve," ").trim(),b.unshift(b[0][$]=b[0][$]||{})):b[0][p[1]]=p[2].replace(ve," ").trim();return b[0]})(e);S[a]=E(n?{["@keyframes "+a]:c}:c,r?"":"."+a)}let i=r&&S.g?S.g:null;return r&&(S.g=S[a]),((c,u,p,$)=>{$?u.data=u.data.replace($,c):u.data.indexOf(c)===-1&&(u.data=p?c+u.data:u.data+c)})(S[a],t,s,i),a},At=(e,t,r)=>e.reduce((s,n,o)=>{let a=t[o];if(a&&a.call){let i=a(r),c=i&&i.props&&i.props.className||/^go/.test(i)&&i;a=c?"."+c:i&&typeof i=="object"?i.props?"":E(i,""):i===!1?"":i}return s+n+(a??"")},"");function oe(e){let t=this||{},r=e.call?e(t.p):e;return Rt(r.unshift?r.raw?At(r,[].slice.call(arguments,1),t.p):r.reduce((s,n)=>Object.assign(s,n&&n.call?n(t.p):n),{}):r,Pt(t.target),t.g,t.o,t.k)}let Ie,ue,le;oe.bind({g:1});let w=oe.bind({k:1});function Tt(e,t,r,s){E.p=t,Ie=e,ue=r,le=s}function _(e,t){let r=this||{};return function(){let s=arguments;function n(o,a){let i=Object.assign({},o),c=i.className||n.className;r.p=Object.assign({theme:ue&&ue()},i),r.o=/ *go\d+/.test(c),i.className=oe.apply(r,s)+(c?" "+c:""),t&&(i.ref=a);let u=e;return e[0]&&(u=i.as||e,delete i.as),le&&u[0]&&le(i),Ie(u,i)}return t?t(n):n}}var Ft=e=>typeof e=="function",A=(e,t)=>Ft(e)?e(t):e,zt=(()=>{let e=0;return()=>(++e).toString()})(),Me=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Nt=20,I=new Map,Lt=1e3,he=e=>{if(I.has(e))return;let t=setTimeout(()=>{I.delete(e),C({type:4,toastId:e})},Lt);I.set(e,t)},Dt=e=>{let t=I.get(e);t&&clearTimeout(t)},fe=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,Nt)};case 1:return t.toast.id&&Dt(t.toast.id),{...e,toasts:e.toasts.map(o=>o.id===t.toast.id?{...o,...t.toast}:o)};case 2:let{toast:r}=t;return e.toasts.find(o=>o.id===r.id)?fe(e,{type:1,toast:r}):fe(e,{type:0,toast:r});case 3:let{toastId:s}=t;return s?he(s):e.toasts.forEach(o=>{he(o.id)}),{...e,toasts:e.toasts.map(o=>o.id===s||s===void 0?{...o,visible:!1}:o)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(o=>o.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+n}))}}},M=[],R={toasts:[],pausedAt:void 0},C=e=>{R=fe(R,e),M.forEach(t=>{t(R)})},Vt={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},qt=(e={})=>{let[t,r]=l.useState(R);l.useEffect(()=>(M.push(r),()=>{let n=M.indexOf(r);n>-1&&M.splice(n,1)}),[t]);let s=t.toasts.map(n=>{var o,a;return{...e,...e[n.type],...n,duration:n.duration||((o=e[n.type])==null?void 0:o.duration)||(e==null?void 0:e.duration)||Vt[n.type],style:{...e.style,...(a=e[n.type])==null?void 0:a.style,...n.style}}});return{...t,toasts:s}},Ut=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||zt()}),O=e=>(t,r)=>{let s=Ut(t,e,r);return C({type:2,toast:s}),s.id},g=(e,t)=>O("blank")(e,t);g.error=O("error");g.success=O("success");g.loading=O("loading");g.custom=O("custom");g.dismiss=e=>{C({type:3,toastId:e})};g.remove=e=>C({type:4,toastId:e});g.promise=(e,t,r)=>{let s=g.loading(t.loading,{...r,...r==null?void 0:r.loading});return e.then(n=>(g.success(A(t.success,n),{id:s,...r,...r==null?void 0:r.success}),n)).catch(n=>{g.error(A(t.error,n),{id:s,...r,...r==null?void 0:r.error})}),e};var Wt=(e,t)=>{C({type:1,toast:{id:e,height:t}})},Bt=()=>{C({type:5,time:Date.now()})},Ht=e=>{let{toasts:t,pausedAt:r}=qt(e);l.useEffect(()=>{if(r)return;let o=Date.now(),a=t.map(i=>{if(i.duration===1/0)return;let c=(i.duration||0)+i.pauseDuration-(o-i.createdAt);if(c<0){i.visible&&g.dismiss(i.id);return}return setTimeout(()=>g.dismiss(i.id),c)});return()=>{a.forEach(i=>i&&clearTimeout(i))}},[t,r]);let s=l.useCallback(()=>{r&&C({type:6,time:Date.now()})},[r]),n=l.useCallback((o,a)=>{let{reverseOrder:i=!1,gutter:c=8,defaultPosition:u}=a||{},p=t.filter(m=>(m.position||u)===(o.position||u)&&m.height),$=p.findIndex(m=>m.id===o.id),b=p.filter((m,x)=>x<$&&m.visible).length;return p.filter(m=>m.visible).slice(...i?[b+1]:[0,b]).reduce((m,x)=>m+(x.height||0)+c,0)},[t]);return{toasts:t,handlers:{updateHeight:Wt,startPause:Bt,endPause:s,calculateOffset:n}}},Yt=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Zt=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Jt=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Gt=_("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Yt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Zt} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Jt} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Kt=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Qt=_("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Kt} 1s linear infinite;
`,Xt=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,er=w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,tr=_("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Xt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${er} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,rr=_("div")`
  position: absolute;
`,or=_("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,nr=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,sr=_("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${nr} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ar=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return t!==void 0?typeof t=="string"?l.createElement(sr,null,t):t:r==="blank"?null:l.createElement(or,null,l.createElement(Qt,{...s}),r!=="loading"&&l.createElement(rr,null,r==="error"?l.createElement(Gt,{...s}):l.createElement(tr,{...s})))},ir=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,cr=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,ur="0%{opacity:0;} 100%{opacity:1;}",lr="0%{opacity:1;} 100%{opacity:0;}",fr=_("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,dr=_("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,pr=(e,t)=>{let r=e.includes("top")?1:-1,[s,n]=Me()?[ur,lr]:[ir(r),cr(r)];return{animation:t?`${w(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},mr=l.memo(({toast:e,position:t,style:r,children:s})=>{let n=e.height?pr(e.position||t||"top-center",e.visible):{opacity:0},o=l.createElement(ar,{toast:e}),a=l.createElement(dr,{...e.ariaProps},A(e.message,e));return l.createElement(fr,{className:e.className,style:{...n,...r,...e.style}},typeof s=="function"?s({icon:o,message:a}):l.createElement(l.Fragment,null,o,a))});Tt(l.createElement);var yr=({id:e,className:t,style:r,onHeightUpdate:s,children:n})=>{let o=l.useCallback(a=>{if(a){let i=()=>{let c=a.getBoundingClientRect().height;s(e,c)};i(),new MutationObserver(i).observe(a,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return l.createElement("div",{ref:o,className:t,style:r},n)},$r=(e,t)=>{let r=e.includes("top"),s=r?{top:0}:{bottom:0},n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Me()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...s,...n}},br=oe`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,P=16,wr=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:n,containerStyle:o,containerClassName:a})=>{let{toasts:i,handlers:c}=Ht(r);return l.createElement("div",{style:{position:"fixed",zIndex:9999,top:P,left:P,right:P,bottom:P,pointerEvents:"none",...o},className:a,onMouseEnter:c.startPause,onMouseLeave:c.endPause},i.map(u=>{let p=u.position||t,$=c.calculateOffset(u,{reverseOrder:e,gutter:s,defaultPosition:t}),b=$r(p,$);return l.createElement(yr,{id:u.id,key:u.id,onHeightUpdate:c.updateHeight,className:u.visible?br:"",style:b},u.type==="custom"?A(u.message,u):n?n(u):l.createElement(mr,{toast:u,position:p}))}))},Er=g;export{Et as F,wr as I,ie as R,Er as _,Ct as a,xr as b,Sr as c,tt as d,vr as g,_t as j,g as n,hr as u};
