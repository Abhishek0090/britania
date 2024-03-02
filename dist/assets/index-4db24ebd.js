import{p as r}from"./TextField-d5ff1ee4.js";import{j as s}from"./index-a4114ef4.js";import{E as i}from"./freelancerSlice-60742dc0.js";const p=i("span")(({theme:o})=>`
      background-color: ${o.colors.alpha.black[5]};
      padding: ${o.spacing(.5,1)};
      font-size: ${o.typography.pxToRem(13)};
      border-radius: ${o.general.borderRadius};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      max-height: ${o.spacing(3)};
      
      &.MuiLabel {
        &-primary {
          background-color: ${o.colors.primary.lighter};
          color: ${o.palette.primary.main}
        }

        &-black {
          background-color: ${o.colors.alpha.black[100]};
          color: ${o.colors.alpha.white[100]};
        }
        
        &-secondary {
          background-color: ${o.colors.secondary.lighter};
          color: ${o.palette.secondary.main}
        }

        &-new {
          background-color: '#E6F7FF';
          color: '#1890FF';
        }
        
        &-success {
          background-color: ${o.colors.success.lighter};
          color: ${o.palette.success.main}
        }
        
        &-warning {
          background-color: ${o.colors.warning.lighter};
          color: ${o.palette.warning.main}
        }
              
        &-error {
          background-color: ${o.colors.error.lighter};
          color: ${o.palette.error.main}
        }
        
        &-info {
          background-color: ${o.colors.info.lighter};
          color: ${o.palette.info.main}
        }
      }
`),a=({className:o,color:c="secondary",children:l,...n})=>s(p,{className:"MuiLabel-"+c,...n,children:l});a.propTypes={children:r.node,className:r.string,color:r.oneOf(["primary","black","secondary","error","warning","success","info","new"])};const t=a;export{t as L};
