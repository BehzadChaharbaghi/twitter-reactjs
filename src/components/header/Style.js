import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: 'White',
        display: "flex",
        padding: 18
    },
    headerTitle: {
        fontSize: '1.1rem',
        fontWeight: 600,
        marginRight: '0.2rem'
    },
}));

export default useStyles;