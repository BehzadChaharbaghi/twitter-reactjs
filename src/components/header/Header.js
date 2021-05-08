import React from 'react';
import Typography from "@material-ui/core/Typography";
import useStyles from "./Style";

const Header = ({title,icon}) => {
    const classes = useStyles();

    return (
        <div className={classes.header} alignItems={'center'}>
            {/*Icon: */}
            {icon}
            <Typography className={classes.headerTitle}>
                {title}
            </Typography>
        </div>
    );
};

export default Header;