import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        background: "white !important",
        width: "30rem",
        margin: "10rem auto",
        display: "flex",
        flexDirection: "column"
    },
    headerText:{
        margin: "2rem 1rem",
        alignSelf: "center"
    },
    tab:{
        flex: 1,
        fontFamily: "Shabnam"
    },
    containerInput:{
        padding: "1rem 0.8rem",
        display: "flex",
        flexDirection: "column"
    }
}));

export default useStyles;