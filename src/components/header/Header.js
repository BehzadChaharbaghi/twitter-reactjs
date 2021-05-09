import React from 'react';
import Typography from "@material-ui/core/Typography";
import useStyles from "./Style";
import MenuIcon from '@material-ui/icons/Menu';
import {IconButton, useMediaQuery, useTheme} from "@material-ui/core";
import {toggleDrawer, useLayoutDispatch} from "../../context/LayoutContext";

const Header = ({title, icon}) => {
    const classes = useStyles();
    const theme = useTheme();
    const isTabletSize = useMediaQuery(theme.breakpoints.down("sm"));
    const layoutDispatch = useLayoutDispatch();

    return (
        <div className={classes.header} alignItems={'center'}>
            {!isTabletSize ? icon : (
                <IconButton onClick={()=>{toggleDrawer(layoutDispatch)}} className={classes.moreMenu}>
                    <MenuIcon/>
                </IconButton>)}
            <Typography className={classes.headerTitle}>
                {title}
            </Typography>
        </div>
    );
};

export default Header;