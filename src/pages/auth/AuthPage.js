import React, {useState} from 'react';
import {Button, Input, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import useStyles from "./Style";
import {toast} from "react-toastify";
import {loginApi, registerApi} from "../../api/api_auth";

const AuthPage = () => {
    const classes = useStyles();

    const LOGIN_TAB_VALUE = 1;
    const REG_TAB_VALUE = 2;

    const [tab, setTab] = useState(LOGIN_TAB_VALUE);

    //login state
    const [usernameLogin , setUsernameLogin]=useState();
    const [passwordLogin , setPasswordLogin]=useState();

    //Register state
    const [usernameRegister , setUsernameRegister]=useState();
    const [fullNameRegister , setFullNameRegister]=useState();
    const [passwordRegister , setPasswordRegister]=useState();
    const [confpasswordRegister , setConfPasswordRegister]=useState();

    const handleChangeTab = (e, newValue) => {
        setTab(newValue);
    }

    //Validate
    const validateLogin=(user)=>{
        if (!user.username)
            return "نام کاربری فراموش نشه"
        if (!user.password)
            return "باید حتما پسورد وارد بشه"
    };

    const validateRegister=(user)=>{
        if (!user.name)
            return "نام کامل خودتون رو وارد کنید"
        if (!user.username)
            return "نام کاربری فراموش نشه"
        if (!user.password)
            return "باید حتما پسورد وارد بشه!"
        if (user.password !== user.confPassword)
            return "تکرار رمز با رمز اولیه همخوانی ندارد"
    };

    //Handle content
    //Register
    const handleRegister=()=>{
        const user={
            name: fullNameRegister,
            username: usernameRegister,
            password: passwordRegister,
            confPassword: confpasswordRegister
        }
        const error=validateRegister(user)
        if (error)
            return toast.warn(error);
        user.confPassword= undefined;

        registerApi(user,(isOk, data)=>{
            if (!isOk)
                return toast.error(data);
            toast.success("ثبت نام شما با موفقیت انجام شد")
            localStorage.setItem("name", data.name);
            localStorage.setItem("image", data.image);
            localStorage.setItem("username", data.username);
            localStorage.setItem("x-auth-token", data["x-auth-token"]);
            window.location.reload();
        })
    };
    //Login
    const handleLogin= ()=>{
        const user={
            username: usernameLogin,
            password: passwordLogin
        };
        const error= validateLogin(user);
        if (error)
            return toast.warn(error);

        loginApi(user,(isOk, data)=>{
            if (!isOk)
                return toast.error(data);
            //login success & set localStorage browser
            toast.success("شما با موفقیت وارد شدید")
            localStorage.setItem("name", data.name);
            localStorage.setItem("image", data.image);
            localStorage.setItem("username", data.username);
            localStorage.setItem("x-auth-token", data["x-auth-token"]);
            window.location.reload();
        })
    };

    return (
        <Paper className={classes.container}>
            <Typography className={classes.headerText}>به پروژه توییتر فارسی خوش اومدی</Typography>
            <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChangeTab}
                aria-label="disabled tabs example"
            >
                <Tab className={classes.tab} label="ورود" value={LOGIN_TAB_VALUE}/>
                <Tab className={classes.tab} label="ثبت نام" value={REG_TAB_VALUE}/>
            </Tabs>

            {tab === LOGIN_TAB_VALUE &&
            <div className={classes.containerInput}>
                <Typography>نام کاربری</Typography>
                <Input className={"uni_m_b_small"} value={usernameLogin} onChange={e=>setUsernameLogin(e.target.value)}/>
                <Typography>رمز عبور</Typography>
                <Input className={"uni_m_b_small"} value={passwordLogin} onChange={e=>setPasswordLogin(e.target.value)}/>
                <Button variant={"contained"} color={"primary"} onClick={handleLogin}>ورود</Button>
            </div>
            }
            {tab === REG_TAB_VALUE &&
            <div className={classes.containerInput}>
                <Typography>نام شما</Typography>
                <Input className={"uni_m_b_small"} value={fullNameRegister} onChange={e=>setFullNameRegister(e.target.value)}/>
                <Typography>نام کاربری</Typography>
                <Input className={"uni_m_b_small"} value={usernameRegister} onChange={e=>setUsernameRegister(e.target.value)}/>
                <Typography>رمز عبور</Typography>
                <Input className={"uni_m_b_small"} value={passwordRegister} onChange={e=>setPasswordRegister(e.target.value)}/>
                <Typography>تکرار رمز عبور</Typography>
                <Input className={"uni_m_b_small"} value={confpasswordRegister} onChange={e=>setConfPasswordRegister(e.target.value)}/>
                <Button variant={"contained"} color={"secondary"} onClick={handleRegister}>ثبت نام</Button>
            </div>
            }
        </Paper>
    );
};

export default AuthPage;