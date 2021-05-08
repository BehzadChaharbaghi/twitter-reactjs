import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {withStyles} from "@material-ui/core";
import {getUser} from "../../api/api_tweet";
import {Tweeters} from "./LeftSidebar";

const styles = {
    root :{
        backgroundColor : "white",
        width : '25%',
        padding : '1.7rem 1rem'
    },
    profText : {
        marginLeft : '0.5rem',
        width : "max-content",
        direction : 'ltr'
    },
    profName:{
        flex : 1,
    },
    profId:{
        flex : 1,
        fontSize : '0.79rem !important'
    },
    twittPersonList : {

        background: "#F5F8FA",
        marginTop: "3rem",
        borderRadius: "1.5rem",
        paddingTop: 11
    },
    twittTitle : {
        fontSize : '1.1rem',
        fontWeight : '600',
        marginBottom : '11px',
        paddingRight : 24
    },
    twittPersonName : {
        marginRight : '0.5rem',
        width : "max-content"
    },
    twitterParent : {
        padding : '10px 24px'
    }
};
class LeftSidebarClassComponent extends Component{
    constructor(props) {
        super(props);
        console.log("constructor")
    }
    state= {
        users:[]
    }
    componentDidMount() {
        getUser((isOk, data) => {
            if (!isOk)
                return alert(data.message);
            //در بالا ریترن شده پس اگه ریترن بشه از تابع میاد بیرون و else بی معنیه
            this.setState({
                users: data
            })
        })
    }

    render() {
        const { classes } = this.props;

        return(

            <div className={classes.root}>
                {/*Profile Info*/}
                <Grid container direction={'row-reverse'} alignItems={'center'}>
                    <img src={"/images/Behzad.png"} style={{width: 'max-content'}}/>
                    <Grid item container direction={'column'} className={classes.profText}>
                        <Typography className={classes.profName}>بهزاد چهارباغی</Typography>
                        <Typography className={classes.profId}>bch15</Typography>
                    </Grid>
                </Grid>
                {/*TwittPerson Info*/}
                <Grid item container direction={'column'} className={classes.twittPersonList}>
                    <Typography className={classes.twittTitle}>
                        بهترین توییت کنندگان
                    </Typography>
                    <Divider/>
                    {
                        this.state.users.map((item, index) => {
                            // ** dar return paeen mige nabayad chandta element estefade koni pas bayad to <div> bezari y aaz
                            // vizhegi REACT estedade koni: <React.Fragment> || <></> :
                            return (
                                <>
                                    <Tweeters name={item.name} id={item.id} img={item.img}/>
                                    {index !=  this.state.users.length - 1 && <Divider/>}
                                </>
                            )
                        })
                    }
                </Grid>
            </div>
        )
    }
};

export default withStyles(styles)(LeftSidebarClassComponent);