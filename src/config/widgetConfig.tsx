import { WidgetConfig } from "@lifi/widget";


const lifiConfig : WidgetConfig= {

  variant: "default",
  subvariant: "default",
  appearance: "light",
  integrator :"Coinshift",
  theme: {
    palette: {
      primary: {
        main: "#181818"
      },
      secondary: {
        main: "#ffb3b3"
      },
      text:{
        primary : '#181818',
        secondary : '#6B7280',
      }
    },
    typography: {
      fontFamily: "Inter, sans-serif"
    },
    
    shape: {
      borderRadius: 8
    }
  },
  containerStyle: {
    boxShadow: "0px 0px 8px 0px ",
    background: '#FEFDFC',
    borderRadius: "16px",
    padding : '8px',
    paddingBottom: "20px "
  },
    
}

export default lifiConfig;
