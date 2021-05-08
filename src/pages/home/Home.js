import React, {useEffect, useState} from 'react';
import Header from "../../components/header/Header";
import useStyles from "./Style";
import HomeIcon from "@material-ui/icons/Home";
import Divider from "@material-ui/core/Divider";
import NewTweet from "./components/NewTweet";
import TweetList from "./components/TweetList";
import {getAllTweets} from "../../api/api_tweet";
import Search from "./components/Search";
import {toast} from "react-toastify";
import {setTweetList, useTwittDispatch, useTwittState} from "../../context/TwittContext";


const Home = () => {

    const classes = useStyles();

    const twittDispatch = useTwittDispatch();
    const {tweetList : tweets} = useTwittState();
    // const [tweets, setTweets] = useState([]);

    useEffect(() => {
        updateTweets();
    }, []);

    const updateTweets = () =>{
        getAllTweets((isOk, data) => {
            if (!isOk)
                return toast.error(data.message);
            setTweetList(twittDispatch , data);
        })
    }

    return (
        <div className={classes.root}>
            <Header title={"خانه"} icon={<HomeIcon/>}/>
            <Divider className={classes.divider}/>
            <NewTweet updateTweets={updateTweets}/>
            <TweetList data={tweets}/>
        </div>
    );
};

export default Home;