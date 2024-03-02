import{p as o}from"./TextField-d5ff1ee4.js";import{E as c,j as i}from"./freelancerSlice-60742dc0.js";import{j as t}from"./index-a4114ef4.js";const p=c("span")(({theme:r})=>`
      display: inline-block;
      align-items: center;

      &.flexItem {
        display: inline-flex;
      }
      
      &.MuiText {

        &-black {
          color: ${r.palette.common.black}
        }

        &-primary {
          color: ${r.palette.primary.main}
        }
        
        &-secondary {
          color: ${r.palette.secondary.main}
        }
        
        &-success {
          color: ${r.palette.success.main}
        }
        
        &-warning {
          color: ${r.palette.warning.main}
        }
              
        &-error {
          color: ${r.palette.error.main}
        }
        
        &-info {
          color: ${r.palette.info.main}
        }
      }
`),a=({className:r,color:e="secondary",flex:s,children:n,...l})=>t(p,{className:i("MuiText-"+e,{flexItem:s}),...l,children:n});a.propTypes={children:o.node,className:o.string,color:o.oneOf(["primary","secondary","error","warning","success","info","black"])};const f=a;export{f as T};
