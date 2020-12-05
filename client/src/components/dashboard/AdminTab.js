import React, {useContext, useEffect, useState} from "react";
import {message, Spin, Tabs} from "antd";
import DataTable from "./DataTable";
import axios from "axios";
import UserContext from "../../context/user/userContext";

const {TabPane} = Tabs;

function AdminTab(props) {
    const [adminPanel, setadminPanel] = useState({
        tab: "City",
    });

    const {tab} = adminPanel;

    const [districtAdmin, setDistrictAdmins] = useState([]);
    const [cityAdmin, setCityAdmins] = useState([]);
    const [mandalAdmin, setMandalAdmins] = useState([]);
    const [normalUsers, setNormalUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const userContext = useContext(UserContext);
    const {user} = userContext;

    useEffect(() => {
        getDistrictAdmin();
        getCityAdmin();
        getNormalUsers();
        getMandalAdmin();
    }, []);

    const getDistrictAdmin = () => {
        axios
            .get(process.env.REACT_APP_SERVER_URL + "/admin/getAdmins/district")
            .then((res) => {
                if (res.status === 200) {
                    setDistrictAdmins(res.data.users);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getCityAdmin = () => {
        axios
            .get(process.env.REACT_APP_SERVER_URL + "/admin/getAdmins/city")
            .then((res) => {
                if (res.status === 200) {
                    setCityAdmins(res.data.users);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getMandalAdmin = () => {
        axios
            .get(process.env.REACT_APP_SERVER_URL + "/admin/getAdmins/mandal")
            .then((res) => {
                if (res.status === 200) {
                    setMandalAdmins(res.data.users);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getNormalUsers = () => {
        axios
            .get(process.env.REACT_APP_SERVER_URL + "/admin/getAdmins/null")
            .then((res) => {
                if (res.status === 200) {
                    setNormalUsers(res.data.users);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteUser = (id, userType) => {
        const key = "updatable";
        message.loading({content: "Deleting...", key});

        console.log("deleteteD0");
        setLoading(true);

        axios
            .delete(process.env.REACT_APP_SERVER_URL + `/admin/deleteUser/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    if (userType === "district") {
                        getDistrictAdmin();
                    } else if (userType === "city") {
                        getCityAdmin();
                    }
                        // else if( userType === 'mandal' ){
                        //   getCityAdmin();
                    // }
                    else {
                        getNormalUsers();
                    }

                    message.success({content: "User Deleted !!", key, duration: 3});

                    setLoading(false);
                }
            })
            .catch((err) => {
                setLoading(false);
            });
    };


    return (
        <Tabs defaultActiveKey={[tab]}>
            {user.admin.toLowerCase() === "state" ? (
                <TabPane tab="District Admins" key="District">
                    {loading ? (
                        <Spin size="large"/>
                    ) : (
                        <DataTable users={districtAdmin} redirect={props.redirect} deleteUser={deleteUser}
                                   adminType={'district'}/>
                    )}
                </TabPane>
            ) : null}

            {user.admin.toLowerCase() === "state" ||
            user.admin.toLowerCase() === "district" ? (
                <TabPane tab="City Admins" key="City">
                    {loading ? (
                        <Spin size="large"/>
                    ) : (
                        <DataTable users={cityAdmin} redirect={props.redirect} deleteUser={deleteUser}
                                   adminType={'city'}/>
                    )}
                </TabPane>
            ) : null}


            <TabPane tab="Users" key="Users">
                {loading ? (
                    <Spin size="large"/>
                ) : (
                    <DataTable users={normalUsers} redirect={props.redirect} deleteUser={deleteUser}
                               adminType={'null'}/>
                )}
            </TabPane>
        </Tabs>
    );
}

export default AdminTab;
