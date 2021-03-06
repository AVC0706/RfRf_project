import React from "react";
import {Route, Switch} from "react-router-dom";
import Login from "./views/Auth/Login/Login";
import Register from "./views/Auth/Register/Register";
import MandalRegister from "./views/Auth/Register/MandalRegister";
import Dashboard from "./views/Dashboard/Dashboard";
import MandalProfile from "./views/Profiles/MandalProfile";
import UserProfile from "./views/Profiles/UserProfile";
import HomePage from "./components/homepage/HomePage";
import MyMandal from "./views/Home/MyMandals";
import ForgetPassword from "./views/Auth/ForgetPassword/ForgetPassword";
import MandalNetwork from "./views/Home/MandalNetwork";
import NewPassword from "./views/Auth/ForgetPassword/NewPassword";
import MeetingArchive from "./views/Home/MeetingArchive";
import Publications from "./views/Home/Publications";

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/mandalregister" component={MandalRegister}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/myMandals" component={MyMandal}/>
                <Route path="/forgetPassword" component={ForgetPassword}/>
                <Route path="/mandalProfile/:id" component={MandalProfile}/>
                <Route path="/userProfile/:id" component={UserProfile}/>
                <Route path="/mandalNetwork" component={MandalNetwork}/>
                <Route path="/newPassword" component={NewPassword}/>
                <Route path="/meetingArchives" component={MeetingArchive}/>
                <Route path="/publications" component={Publications}/>
            </Switch>
        );
    }
}

export default Routes;
