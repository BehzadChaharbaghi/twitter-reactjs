import { React, useState, useEffect } from 'react';
import useStyles from "../home/Style";
import Header from "../../components/header/Header";
import Divider from "@material-ui/core/Divider";
import TweetList from "../home/components/TweetList";
import FaceIcon from '@material-ui/icons/Face';
import { getTweetsByUserRequest } from "../../api/api_tweet";
import { useLocation } from "react-router-dom"
import { useTwittDispatch, useTwittState , setTweetList } from '../../context/TwittContext';
import { Typography } from '@material-ui/core';


const TweetsByUser = props => {
    const classes = useStyles();

    const { tweetList } = useTwittState();
    const tweetDispatch = useTwittDispatch();
    const location = useLocation();

    useEffect(() => {
        getTweetsByUserRequest(props.match.params.id, (isOk, data) => {
            if (!isOk)
                return alert(data.message);
            setTweetList(tweetDispatch, data)
        })
    }, [location]);

    return (
        <div className={classes.root}>
            <Header title={props.match.params.user} icon={<FaceIcon />} />
            <Divider className={classes.divider} />
            {tweetList.length === 0 && <Typography style={{textAlign: 'center', backgroundColor: 'white', paddingTop: '1rem', fontSize: '24px', color: "red"}}>این کاربر توییتی ندارد</Typography>}
            <TweetList data={tweetList} />
        </div>
    );
};

export default TweetsByUser;

