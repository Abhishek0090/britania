import{a as G}from"./react-31052980.js";import{j as E,a as M}from"./index-a4114ef4.js";var H={};function R(e){if(!e||typeof window>"u")return;const a=document.createElement("style");return a.setAttribute("type","text/css"),a.innerHTML=e,document.head.appendChild(a),e}Object.defineProperty(H,"__esModule",{value:!0});var A=G;function O(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var r=O(A);R(`.marquee-container {
  overflow-x: hidden !important;
  display: flex !important;
  flex-direction: row !important;
  position: relative;
  width: var(--width);
  transform: var(--transform);
}
.marquee-container:hover div {
  animation-play-state: var(--pause-on-hover);
}
.marquee-container:active div {
  animation-play-state: var(--pause-on-click);
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.overlay::before, .overlay::after {
  background: linear-gradient(to right, var(--gradient-color));
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
}
.overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.overlay::before {
  left: 0;
  top: 0;
}

.marquee {
  flex: 0 0 auto;
  min-width: var(--min-width);
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
  animation-play-state: var(--play);
  animation-delay: var(--delay);
  animation-direction: var(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.initial-child-container {
  flex: 0 0 auto;
  display: flex;
  min-width: auto;
  flex-direction: row;
}

.child {
  transform: var(--transform);
}`);const Y=A.forwardRef(function({style:a={},className:b="",autoFill:g=!1,play:l=!0,pauseOnHover:B=!1,pauseOnClick:I=!1,direction:t="left",speed:f=50,delay:S=0,loop:h=0,gradient:U=!1,gradientColor:v=[255,255,255],gradientWidth:d=200,onFinish:D,onCycleComplete:Z,onMount:X,children:c},K){const[k,N]=A.useState(0),[Q,j]=A.useState(0),[m,P]=A.useState(1),[y,L]=A.useState(!1),q=A.useRef(null),i=K||q,C=A.useRef(null),u=A.useCallback(()=>{if(C.current&&i.current){const n=i.current.getBoundingClientRect(),J=C.current.getBoundingClientRect();let s=n.width,o=J.width;(t==="up"||t==="down")&&(s=n.height,o=J.height),P(g&&s&&o&&o<s?Math.ceil(s/o):1),N(s),j(o)}},[g,i,t]);A.useEffect(()=>{if(y&&(u(),C.current&&i.current)){const n=new ResizeObserver(()=>u());return n.observe(i.current),n.observe(C.current),()=>{n&&n.disconnect()}}},[u,i,y]),A.useEffect(()=>{u()},[u,c]),A.useEffect(()=>{L(!0)},[]),A.useEffect(()=>{typeof X=="function"&&X()},[]);const z=A.useMemo(()=>g?Q*m/f:Q<k?k/f:Q/f,[g,k,Q,m,f]),p=`rgba(${v[0]}, ${v[1]}, ${v[2]}`,T=A.useMemo(()=>Object.assign(Object.assign({},a),{["--pause-on-hover"]:!l||B?"paused":"running",["--pause-on-click"]:!l||B&&!I||I?"paused":"running",["--width"]:t==="up"||t==="down"?"100vh":"100%",["--transform"]:t==="up"?"rotate(-90deg)":t==="down"?"rotate(90deg)":"none"}),[a,l,B,I,t]),W=A.useMemo(()=>({["--gradient-color"]:`${p}, 1), ${p}, 0)`,["--gradient-width"]:typeof d=="number"?`${d}px`:d}),[p,d]),F=A.useMemo(()=>({["--play"]:l?"running":"paused",["--direction"]:t==="left"?"normal":"reverse",["--duration"]:`${z}s`,["--delay"]:`${S}s`,["--iteration-count"]:h?`${h}`:"infinite",["--min-width"]:g?"auto":"100%"}),[l,t,z,S,h,g]),w=A.useMemo(()=>({["--transform"]:t==="up"?"rotate(90deg)":t==="down"?"rotate(-90deg)":"none"}),[t]),x=A.useCallback(n=>[...Array(Number.isFinite(n)&&n>=0?n:0)].map((J,s)=>r.default.createElement(A.Fragment,{key:s},A.Children.map(c,o=>r.default.createElement("div",{style:w,className:"child"},o)))),[w,c]);return y?r.default.createElement("div",{ref:i,style:T,className:"marquee-container "+b},U&&r.default.createElement("div",{style:W,className:"overlay"}),r.default.createElement("div",{className:"marquee",style:F,onAnimationIteration:Z,onAnimationEnd:D},r.default.createElement("div",{className:"initial-child-container",ref:C},A.Children.map(c,n=>r.default.createElement("div",{style:w,className:"child"},n))),x(m-1)),r.default.createElement("div",{className:"marquee",style:F},x(m))):null});var V=H.default=Y;const _="/assets/ind-68a9f7e3.png",$="/assets/uk-3051b9d5.png",AA="/assets/australia-425a01f3.png",eA="/assets/singapore-f2b7f57b.png",tA="/assets/canada-8f04c71b.png",nA="data:image/png;base64,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";function iA(){const e=[{id:1,img:$},{id:2,img:AA},{id:3,img:_},{id:4,img:eA},{id:5,img:tA},{id:6,img:nA}];return E("div",{className:"flex items-center justify-center w-full h-full  font-league bg-opacity-20  md:py-4 py-1 md:py-0 md:px-5 mt-4 md:mt-5 lg:mt-0",children:M("div",{className:"flex flex-col w-full  items-center gap-5 justify-center text-sm md:text-3xl font-SemiBold uppercase text-blue141",children:[M("span",{className:"text-blue141 text-[1.3rem] md:text-[1.8rem] font-bold mb-2 text-center",children:["Present in Universities of"," "]}),E(V,{style:{width:"90%"},children:E("div",{className:"flex",children:e==null?void 0:e.map((a,b)=>E("img",{src:a==null?void 0:a.img,width:"58",height:"46",alt:"Country",loading:"lazy",className:"mr-[2rem] ml-[2rem]"},a.id))})})]})})}export{iA as default};
