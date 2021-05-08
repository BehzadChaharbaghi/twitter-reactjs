import React, {useEffect, useState} from 'react';
import useStyles from './Styles'
import RightSidebar from "../rightSidebar/RightSidebar";
import LeftSidebar from "../leftSidebar/LeftSidebar";
import Divider from "@material-ui/core/Divider";
import {getProfileRequest} from '../../api/api_auth';
import {useHistory} from 'react-router';
import {toast} from 'react-toastify';
import {Typography} from "@material-ui/core";
import {ScaleLoader} from "react-spinners";


const Layout = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [wait, setWait] = useState(true);

    useEffect(() => {
        getProfileRequest((isOk, data) => {
            if (!isOk) {
                toast.error(data);
                localStorage.clear();
                return history.push("/login");
            }
            setWait(false)
            localStorage.setItem("name", data.name);
            localStorage.setItem("image", data.image);
            localStorage.setItem("username", data.username);
            localStorage.setItem("x-auth-token", data["x-auth-token"]);
        })
    }, [])

    if (wait)
        return <div className={classes.waitParent}>
            <ScaleLoader color={"#0984e3"} size={150} />
            <Typography>منتظر بمانید</Typography>
        </div>;
    else
        return (
            <div className={classes.root}>
                <RightSidebar/>
                <Divider orientaion={"vertical"} className={classes.divider}/>
                <div className={classes.content}>
                    {props.children}
                </div>
                <Divider orientation={"vertical"} className={classes.divider}/>
                <LeftSidebar/>
            </div>
        );
};

export default Layout;