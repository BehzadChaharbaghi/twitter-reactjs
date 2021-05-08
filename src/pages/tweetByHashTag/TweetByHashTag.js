import React, { useEffect } from 'react';
import useStyles from "../home/Style";
import Header from "../../components/header/Header";
import Divider from "@material-ui/core/Divider";
import TweetList from "../home/components/TweetList";
import { toast } from 'react-toastify';
import { useTwittDispatch, useTwittState , setTweetList } from '../../context/TwittContext';
import { getTweetsByHashtagRequest } from "../../api/api_tweet";
import {useLocation} from "react-router-dom"



const TweetByHashTag = props => {
    const classes = useStyles();

    const { tweetList } = useTwittState();
    const tweetDispatch = useTwittDispatch();
    const location= useLocation();

    useEffect(() => {
        getTweetsByHashtagRequest(props.match.params.hashtag, (isOk, data) => {
            if (!isOk)
                return toast.error(data)
            setTweetList(tweetDispatch, data);
        })
    }, [location]);

    return (
        <div className={classes.root}>
            <Header title={props.match.params.hashtag} icon={<img src={'/images/hashtag.png'} />} />
            <Divider className={classes.divider} />
            <TweetList data={tweetList} />
        </div>
    );
};

export default TweetByHashTag;