import React, { useState, useRef, useEffect } from 'react';
import useStyles from "../Style";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames"
import axios from 'axios';
import { newTweetRequest } from "../../../api/api_tweet";
import { toast } from "react-toastify";
import * as url from "url";
import { useTwittDispatch, useTwittState } from "../../../context/TwittContext";
import { setTweetText as setTweet, updateHashTagList } from "../../../context/TwittContext";

const NewTweet = ({ updateTweets }) => {
    /*
        //Namespace management idea from http://enterprisejquery.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/
        (function (cursorManager) {
    
            //From: http://www.w3.org/TR/html-markup/syntax.html#syntax-elements
            var voidNodeTags = ['AREA', 'BASE', 'BR', 'COL', 'EMBED', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'MENUITEM', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR', 'BASEFONT', 'BGSOUND', 'FRAME', 'ISINDEX'];
    
            //From: https://stackoverflow.com/questions/237104/array-containsobj-in-javascript
            Array.prototype.contains = function (obj) {
                var i = this.length;
                while (i--) {
                    if (this[i] === obj) {
                        return true;
                    }
                }
                return false;
            }
    
            //Basic idea from: https://stackoverflow.com/questions/19790442/test-if-an-element-can-contain-text
            function canContainText(node) {
                if (node.nodeType == 1) { //is an element node
                    return !voidNodeTags.contains(node.nodeName);
                } else { //is not an element node
                    return false;
                }
            };
    
            function getLastChildElement(el) {
                var lc = el.lastChild;
                while (lc && lc.nodeType != 1) {
                    if (lc.previousSibling)
                        lc = lc.previousSibling;
                    else
                        break;
                }
                return lc;
            }
    
            //Based on Nico Burns's answer
            cursorManager.setEndOfContenteditable = function (contentEditableElement) {
    
                while (getLastChildElement(contentEditableElement) &&
                    canContainText(getLastChildElement(contentEditableElement))) {
                    contentEditableElement = getLastChildElement(contentEditableElement);
                }
    
                var range, selection;
                if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
                {
                    range = document.createRange();//Create a range (a range is a like the selection but invisible)
                    range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
                    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
                    selection = window.getSelection();//get the selection object (allows you to change selection)
                    selection.removeAllRanges();//remove any selections already made
                    selection.addRange(range);//make the range you have just created the visible selection
                }
                else if (document.selection)//IE 8 and lower
                {
                    range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
                    range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
                    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
                    range.select();//Select the range (make it the visible selection
                }
            }
    
        }(window.cursorManager = window.cursorManager || {}));
    */
    // const renderTweet = (text) => {
    //     return { __html: text.replace(/#\S+/g, "<span style='color: dodgerblue'>$&</span>") };
    // }
    // const input = React.useRef();


    const input = useRef();
    const inputFile = useRef();

    //Context:
    const twittDispatch = useTwittDispatch();
    const { twittText: tweet } = useTwittState();
    // const [tweet, setTweet] = useState();
    const [imageFile, setImageFile] = useState();
    const [imagePath, setImagePath] = useState();

    // useEffect(() => {
    //         input.current.addEventListener("input", function (e) {
    //         console.log("input event fired", e.target.innerText);
    //     }, false);
    // }, [])

    const newTweetClick = () => {
        //تکست داخل اینپوت و فرستادن آن در data 
        const tweetText = tweet;
        //اگر خالی بود و چیزی ننوشته بود، کاری نکن
        if (!tweetText)
            return;

        //zakhire data ha dar form data
        const formData = new FormData();
        formData.append("text", tweetText);
        if (imageFile)
            formData.append("image", imageFile);

        //axios:
        newTweetRequest(formData, (isOk, data) => {
            if (!isOk)
                return toast.error(data);

            toast.success("موفقیت آمیز بود...");
            updateTweets();
            setTweet(twittDispatch, "");
            setImagePath();
            setImageFile();
            // input.current.innerText = "";
            if (tweetText.includes('#'))
                updateHashTagList(twittDispatch);
        })
    };

    const getImage = () => {
        if (localStorage.getItem("image") && localStorage.getItem("image") !== "undefined")
            return localStorage.getItem("image");
        return "/images/add-avatar.png"
    };
    const selectImg = () => {
        //icon upload click shod selectImg run mishe va roye inputFile click mishe:
        inputFile.current.click();
    };
    const onChangeImg = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePath(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const classes = useStyles();
    return (
        <div className={classes.newTweet}>
            <Grid container>
                <img src={getImage()} style={{ width: 60, height: 60, borderRadius: "50%" }} />
                <input className={classNames(classes.input, "editable")} data-placeholder="توییت وارد کن..." ref={input}
                    value={tweet} onChange={e => setTweet(twittDispatch, e.target.value)} />
                {/*<div*/}
                {/*    contentEditable*/}
                {/*    className={classNames(classes.input, "editable")}*/}
                {/*    data-placeholder="توییت وارد کن..."*/}
                {/*    ref={input}*/}
                {/*// dangerouslySetInnerHTML={tweet}*/}
                {/*></div>*/}
                <input type={"file"} style={{ display: "none" }} ref={inputFile} onChange={onChangeImg} />
            </Grid>
            {
                imagePath &&
                <div>
                    <div style={{ backgroundImage: `url(${imagePath})` }} className={classes.TweetImg} />
                </div>
            }
            <Grid container direction={'row-reverse'} style={{ marginTop: 16 }}>
                <Button variant={'contained'} color={'primary'} className={classes.newTweetBTN}
                    onClick={newTweetClick}>توییت</Button>
                <IconButton className={classes.newTweetImgBTN} onClick={selectImg}>
                    <img src={'/images/tweetpic.png'} className={classes.newTweetImg} />
                </IconButton>
            </Grid>
        </div>
    );
}

export default NewTweet;