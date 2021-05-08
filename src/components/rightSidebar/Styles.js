import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root :{
        backgroundColor : "white",
        width : '18%',
        padding : '1.5rem 1rem',
        overflowY : "auto !important"
    },
    logoType : {
        fontSize : '1.25rem !important',
        fontWeight : '600 !important',
        marginRight : '1rem !important',
        // az option haye theme Mui estefade mikonim(dar index.js palete ro taghiir koli dadim)
        color : theme.palette.primary.main
    },
    hashTagTitle : {
        fontSize : '1.1rem !important',
        fontWeight : '600 !important',
        marginTop : '3rem !important',
        marginBottom : '1.5rem !important'
    },
    hashtag: {
        marginRight : '0.6rem !important',
        marginTop : '0.3rem !important'
    },
    hashTagParent:{
        marginBottom: '0.5rem !important',
        padding : '0.15rem !important',
        width : '100% !important'
    }
}));

export default useStyles;