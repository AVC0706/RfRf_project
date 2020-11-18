import React, {useContext, useEffect, useState} from "react";
import {Spin, Tabs} from "antd";
import MandalTable from "./MandalTable";
import MandalApprovalTable from "./MandalApprovalTable";
import axios from "axios";
import UserContext from "../../context/user/userContext";

const {TabPane} = Tabs;

function MandalTab() {

    const userContext = useContext(UserContext);
    const {user} = userContext;

    useEffect(() => {
        getFalseMandals();
        getApprovedMandals();
    }, []);

    const [mandalPanel, setmandalPanel] = useState({
        tab: "Mandal",
    });
    const {tab} = mandalPanel;
    const [falseMandal, setFalseMandal] = useState()
    const [approvedMandal, setApprovedMandal] = useState()

    const [loading, setLoading] = useState(true);


    const getFalseMandals = () => {

        if (user.admin.toLowerCase() === "district") {
            axios
                .get(process.env.REACT_APP_SERVER_URL + `/districtAdmin/getMandals/${false}`)
                .then((res) => {
                    if (res.status === 200) {
                        setFalseMandal(res.data.mandals);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (user.admin.toLowerCase() === "city") {
            axios
                .get(process.env.REACT_APP_SERVER_URL + `/cityAdmin/getMandals/${false}`)
                .then((res) => {
                    if (res.status === 200) {
                        setFalseMandal(res.data.mandals);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }


    };

    const getApprovedMandals = () => {
        axios
            .get(process.env.REACT_APP_SERVER_URL + "/admin/getMandals")
            .then((res) => {
                if (res.status === 200) {
                    setApprovedMandal(res.data.mandals);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // const approveMandal = (mandal) => {
    //   if (userContext.user.admin === 'district' && mandal.districtApproved === false) {
    //     axios.put(
    //       process.env.REACT_APP_SERVER_URL + `/districtAdmin/approveMandal/${props.match.params.id}`,
    //       mandal
    //     ).then((res) => {
    //       console.log(res.data.msg , res.data.mandal);
    //     }).catch((e) => console.log(e));
    //   }
    //   else if (userContext.user.admin === 'city' && mandal.cityApproved === false) {
    //     axios.put(
    //       process.env.REACT_APP_SERVER_URL + `/cityAdmin/approveMandal/${props.match.params.id}`,
    //       mandal
    //     ).then((res) => {
    //       console.log(res.data.msg , res.data.mandal);
    //     }).catch((e) => console.log(e));
    //   }
    //   else {
    //     console.log("Can't approve");
    //   }

    // };

    return (
        <Tabs defaultActiveKey={tab}>


            {user.admin.toLowerCase() !== "state" ? (
                <TabPane tab="Pending Mandals" key="PendingMandals">
                    {loading ? (
                        <Spin size="large"/>
                    ) : (
                        <MandalApprovalTable mandals={falseMandal}></MandalApprovalTable>
                    )}
                </TabPane>
            ) : null}


            <TabPane tab="Approved Mandals" key="ApprovedMandal">
                {loading ? (
                    <Spin size="large"/>
                ) : (
                    <MandalTable mandals={approvedMandal}></MandalTable>
                )}
            </TabPane>


        </Tabs>
    );
}

export default MandalTab;

//  {user.admin.toLowerCase() === "state" ? (
//         <TabPane tab="District Admins" key="District">
//           {loading ? (
//             <Spin size="large" />
//           ) : (
//             <DataTable users={districtAdmin} deleteUser={deleteUser} adminType={'district'}/>
//           )}
//         </TabPane>
//       ) : null}