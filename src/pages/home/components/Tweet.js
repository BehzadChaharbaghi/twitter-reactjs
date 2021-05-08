import React from 'react';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "../Style";
import Typography from "@material-ui/core/Typography";
import {Favorite as FavoriteIcon} from '@material-ui/icons';
import {likeTweet, setTweetText, useTwittDispatch} from "../../../context/TwittContext";
import {toast} from "react-toastify";
import {likeTweetRequest} from "../../../api/api_tweet";


const Tweet = ({data}) => {
    const classes = useStyles();

    //تغییر رنگ هشتگ ها
    const renderTweet = (text) => {
        return {__html: text.replace(/#\S+/g, "<a href='/tags/$&' style='color: dodgerblue'>$&</a>")};
    }

    //Context:
    const twittDispatch = useTwittDispatch();

    const handleLike = () =>{
        likeTweetRequest(data._id , (isOk , data)=>{
            if (!isOk)
                return toast.error(data);
            likeTweet(twittDispatch , data._id);
        })
    };

    const reTweet = () => {
        setTweetText(twittDispatch, data.text);
    };

    const getImage = () => {
        if (data.user.image)
            return data.user.image;
        return "/images/add-avatar.png"
    };

    return (
        <div className={classes.tweetItem}>
            <Grid container>
                <img src={getImage()} className={classes.tweetListAvatar}/>
                <Grid item container direction={'column'} style={{flex: 1, marginRight: '1rem'}}>
                    <Grid item container>
                        <Typography className={classes.tweetItemName}>{data.user.name}</Typography>
                        <Typography className={classes.tweetItemId}>{data.user.id}</Typography>
                    </Grid>
                    <Typography dangerouslySetInnerHTML={renderTweet(data.text)} className={classes.tweetText}
                                components={"p"}/>
                    {
                        data.image &&
                        <div>
                            <div style={{backgroundImage: `url(${data.image})`}} className={classes.TweetImg}/>
                        </div>
                    }
                </Grid>
            </Grid>
            <Grid container direction={'row-reverse'} style={{marginTop: 17}} alignItems={'center'}>
                <IconButton className={classes.newTweetImgBTN} onClick={reTweet}>
                    <img src={'/images/retweet.png'} className={classes.newTweetImg}/>
                </IconButton>
                <IconButton className={classes.newTweetImgBTN} onClick={handleLike}>
                    <FavoriteIcon className={classes.newTweetImg}/>
                </IconButton>
                <Typography className={classes.likeCount}> {data.likes} </Typography>
            </Grid>
        </div>
    );
};

export default Tweet;