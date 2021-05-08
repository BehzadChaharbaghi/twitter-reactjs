import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>({

    root :{
        backgroundColor : "white",
        width : '25%',
        padding : '1.7rem 1rem',
        overflowY : "auto !important"
    },
    profText : {
        marginLeft : '0.5rem',
        width : "max-content",
        direction : 'ltr'
    },
    profName:{
        flex : 1,
    },
    profId:{
        flex : 1,
        color : theme.palette.text.hint,
        fontSize : '0.79rem !important'
    },
    twittPersonList : {

        background: "#F5F8FA",
        marginTop: "3rem",
        borderRadius: "1.5rem",
        paddingTop: 11
    },
    twittTitle : {
        fontSize : '1.1rem',
        fontWeight : '600',
        marginBottom : '11px',
        paddingRight : 24
    },
    twittPersonName : {
        marginRight : '0.5rem',
        width : "max-content"
    },
    twitterParent : {
        padding : '10px 24px'
    },
    tweetersImg : {
        width: 50,
        height: 50,
        borderRadius: "50%"
    }
}));

export default useStyles;


