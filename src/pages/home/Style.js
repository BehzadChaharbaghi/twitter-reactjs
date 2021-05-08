import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#E6E6E6 !important',
    },
    divider: {
        backgroundColor: '#7EBAFF',
        filter: 'opacity(0.19)'
    },
    newTweet: {
        backgroundColor: 'White',
        padding: 18,
        display: "flex",
        flexDirection: "column"
    },
    input: {
        marginRight: '1rem',
        border: "none",
        flex: 1,
        "&:focus": {
            outline: 'unset'
        }
    },
    newTweetBTN: {
        color: "white !important",
        borderRadius: "1rem !important",
        minHeight: "30px !important",
        minWidth: "5rem !important",
        fontFamily: "'Shabnam' !important",
        height: "30px !important",
        lineHeight: "1rem !important"
    },
    newTweetImg: {
        border: '0.5px solid #707070 !important',
        borderRadius: '50% !important',
        padding: '0.2rem !important'
    },
    newTweetImgBTN: {
        padding: '0px !important',
        marginLeft: '1rem'
    },
    tweetItem: {
        backgroundColor: 'White',
        padding: 18,
        display: "flex",
        flexDirection: "column",
        marginTop: '0.5rem'
    },
    tweetItemName: {
        fontWeight: 600
    },
    tweetItemId: {
        fontSize: '0.8rem',
        color: theme.palette.text.hint,
        marginRight: '0.5rem',
        paddingTop: '0.15rem'
    },
    tweetText: {
        fontSize: '0.9rem',
        marginTop: '0.75rem'
    },
    likeCount: {
        color: theme.palette.text.hint,
        fontSize: '0.8rem',
        marginLeft: '0.5rem'
    },
    tweetListAvatar: {
        width: 60,
        height: 60,
        borderRadius: "50%"
    },
    TweetImg : {
        width : "100%",
        height : "10rem",
        marginTop : "1rem",
        backgroundSize : "contain",
        backgroundRepeat : "no-repeat"
    }
}));

export default useStyles;