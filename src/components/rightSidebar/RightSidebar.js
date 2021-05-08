import React, { useState, useEffect } from 'react';
import useStyles from "./Styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Link } from 'react-router-dom';
import { getHashTags } from "../../api/api_tweet";
import { useTwittDispatch, useTwittState, setHashTagList } from '../../context/TwittContext';
import { useLocation } from "react-router-dom"

const RightSidebar = () => {
    //************ادامه.............. */
    // const onClick = () => {
    //     props.history.push(props.match.params.id)
    // };

    const classes = useStyles();

    const { hashTag: hashTags } = useTwittState();
    const tweetDispatch = useTwittDispatch();

    useEffect(() => {
        getHashTags((isOk, data) => {
            if (!isOk)
                return alert(data.message);
            //در بالا ریترن شده پس اگه ریترن بشه از تابع میاد بیرون و else بی معنیه
            setHashTagList(tweetDispatch, data);
        })
    }, []);

    return (
        <div className={classes.root}>
            {/*//گرید دو حالت بیشتر نداره: یا کانتینر و یا آیتم و بر اساس فلکس باکس سی اس اس ساخته شده:*/}
            {/*//direction => row coloumn*/}
            <Link to={"/"}>
                <Grid container direction={'row'} alignItems={'center'}>
                    <Grid item>
                        <img src={"/images/logo.png"} />
                    </Grid>
                    <Grid item>
                        <Typography component={'h1'} className={classes.logoType}>
                            توییتر پارسی
            </Typography>
                    </Grid>
                </Grid>
            </Link>
            {/*HashTagTitle:*/}
            <Typography Typography className={classes.hashTagTitle} >
                هشتگ های داغ
            </Typography >
            {/*HashtagList:*/}
            <Grid Grid container direction={"column"} alignItems={"center"} >
                {
                    hashTags.map(item => (
                        <ButtonBase className={classes.hashTagParent}>
                            <Link to={"/hashtags/" + item.text} style={{ width: "100%" }}>
                                <Grid item container>
                                    <img src={'/images/hashtag.png'} />
                                    <Typography className={classes.hashtag}>
                                        {/*باید از .text استفاده بشه چون خود item یک آبجکت از بک اند برمیگردونه*/}
                                        {item.text}
                                    </Typography>
                                </Grid>
                            </Link>
                        </ButtonBase>
                    ))
                }
            </Grid >
        </div >
    );
};

export default RightSidebar;