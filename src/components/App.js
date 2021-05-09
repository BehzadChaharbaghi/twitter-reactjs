import React from 'react';
import Layout from "./layout/Layout";
import Home from "../pages/home/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Redirect from 'react-router-dom/es/Redirect'
import Page404 from './../pages/404/Page404';
import TweetByHashTag from './../pages/tweetByHashTag/TweetByHashTag';
import TweetsByUser from './../pages/tweetsByUser/TweetsByUser';
import AuthPage from "../pages/auth/AuthPage";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {TwittProvider} from "../context/TwittContext";
import {LayoutProvider} from "../context/LayoutContext";

const App = () => {
    return (
        <>
            <Router>
                <Switch>
                    <PublicRoute path={"/login"} component={AuthPage}/>
                    <PrivateRoute path={"/"} render={() =>
                        <LayoutProvider>
                            <TwittProvider>
                                <Layout>
                                    <Switch>
                                        <Route exact path={"/"} component={Home}/>
                                        <Route path={"/hashtags/:hashtag"} component={TweetByHashTag}/>
                                        <Route path={"/users/:id/:user"} component={TweetsByUser}/>
                                        <Route component={Page404}/>
                                    </Switch>
                                </Layout>
                            </TwittProvider>
                        </LayoutProvider>
                    }/>
                </Switch>
            </Router>
            <ToastContainer/>
        </>
    );
};

// bool bar migardoone

const isLogin = () => !!localStorage.getItem("x-auth-token");

//Pub-Pri Component

const PublicRoute = ({component, ...props}) => {
    return <Route {...props} render={(props) => {
        if (isLogin())
            return <Redirect to="/"/>
        else {
            return React.createElement(component, props);
        }
    }}/>
};
const PrivateRoute = ({render, ...props}) => {
    return <Route {...props} render={(props) => {
        if (isLogin())
            return render(props);

        else return <Redirect to={"/login"}/>
    }
    }/>
}
export default App;