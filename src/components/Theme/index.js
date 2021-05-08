import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import tinycolor from 'tinycolor2'
const colorPrimary = '#5EA9DD';

//** Material Ui dar hastash az JSS estefade karde...bara hamin mishe mesle paeen jss nevesht

const Theme = createMuiTheme({
    palette : {
        // option 1:
        primary : {
            main : colorPrimary,
            light : tinycolor(colorPrimary).lighten().toHexString()
        }
    },
    //***//
    overrides : {
        MuiTypography : {
            root : {
                fontFamily : 'shabnam !important',
                //fontSize : '2rem !important'
            }
        },
        MuiButton:{
            label:{
                fontFamily: "Shabnam"
            }
        }
    }
})

export default Theme
