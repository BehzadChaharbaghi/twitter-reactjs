import React, {useState, useEffect, useRef} from 'react';
import useStyles from "./Styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ButtonBase from "@material-ui/core/ButtonBase";
import {Link} from 'react-router-dom';
import {getUser} from "../../api/api_tweet";
import {Menu, MenuItem} from "@material-ui/core";
import {toast} from "react-toastify";
import {uploadUserPhoto} from "../../api/api_auth";

const Tweeters = props => {
    const classes = useStyles();

    const getImage = () => {
        if (props.img)
            return props.img;
        return "/images/add-avatar.png"
    };

    return (
        <ButtonBase>
            <Link to={`/users/${props._id}/${props.id}`} style={{width: '100%'}}>
                <Grid container alignItems={'center'} className={classes.twitterParent}>
                    <img src={getImage()} className={classes.tweetersImg}/>
                    <Grid item container direction={'column'} className={classes.twittPersonName} alignItems={"flex-start"}>
                        <Typography className={classes.profName}>{props.name}</Typography>
                        <Typography className={classes.profId}>{props.id}</Typography>
                    </Grid>
                </Grid>
            </Link>
        </ButtonBase>
    )
}

// start Main Left_Component:

const LeftSidebar = () => {

    const classes = useStyles();

    const [tweeter, setTweeter] = useState([]);
    const [anchorMenu, setAnchorMenu] = useState();
    const [imageFile, setImageFile] = useState();
    const [imagePath, setImagePath] = useState();

    useEffect(() => {
        getUser((isOk, data) => {
            if (!isOk)
                return alert(data.message);
            //در بالا ریترن شده پس اگه ریترن بشه از تابع میاد بیرون و else بی معنیه
            else setTweeter(data);
        })
    }, []);

    const inputRef = useRef();

    const handleToggleMenu = (e) => {
        if (anchorMenu)
            setAnchorMenu(null);
        else
            setAnchorMenu(e.currentTarget);
    };

    const handleAvatar = (e) =>{
        if (e.target.files && e.target.files.length > 0)
        {
            setImageFile(e.target.files[0])

            //Baraye neshan dadan pishnamayesh avatar da samte chap:
            const reader = new FileReader();
            reader.onload = (e) =>{
                setImagePath(e.target.result);
            }
            reader.readAsDataURL(e.target.files[0])

            //Upload Axe dar server:
            const formData = new FormData();
            formData.append("image" , e.target.files[0]);

            uploadUserPhoto(formData , (isOk , data)=>{
                if (!isOk)
                    return toast.error(data);
                toast.success("عکس شما با موفقیت در سرور ذخیره شد");
                localStorage.setItem("image" , data.imagePath)
            })
        }
    }
    const getImage = () => {
        if (imagePath)
            return imagePath;
        if (localStorage.getItem("image") && localStorage.getItem("image") !== "undefined")
            return localStorage.getItem("image");
        return "/images/add-avatar.png"
    };

    return (
        <div className={classes.root}>
            {/*Profile Info*/}
            <Grid container direction={'row-reverse'} alignItems={'center'} onClick={handleToggleMenu}
                  style={{cursor: "pointer"}}>
                <img src={getImage()} style={{width: 50, height: 50, borderRadius: "50%"}}/>
                <Grid item container direction={'column'} className={classes.profText}>
                    <Typography className={classes.profName}>{localStorage.getItem("name")}</Typography>
                    <Typography className={classes.profId}>{localStorage.getItem("username")}</Typography>
                </Grid>
                <input ref={inputRef} type={"file"} style={{display: "none"}} onChange={handleAvatar}/>
            </Grid>
            {/*TwittPerson Info*/}
            <Grid item container direction={'column'} className={classes.twittPersonList}>
                <Typography className={classes.twittTitle}>
                    بهترین توییت کنندگان
                </Typography>
                <Divider/>
                {
                    tweeter.map((item, index) => {
                        // ** dar return paeen mige nabayad chandta element estefade koni pas bayad to <div> bezari y aaz
                        // vizhegi REACT estedade koni: <React.Fragment> || <></> :
                        return (
                            <>
                                <Tweeters name={item.name} id={item.username} img={item.image} _id={item._id}/>
                                {index != tweeter.length - 1 && <Divider/>}
                            </>
                        )
                    })
                }
            </Grid>
            <Menu open={Boolean(anchorMenu)} onClose={() => setAnchorMenu(null)} anchorEl={anchorMenu}>
                <MenuItem onClick={() => {
                    inputRef.current.click();
                }}>ویرایش عکس پروفایل</MenuItem>
                <MenuItem onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                }}>خروج</MenuItem>
            </Menu>
        </div>
    );
};

export default LeftSidebar;