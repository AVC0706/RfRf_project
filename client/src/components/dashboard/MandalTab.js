import React, { useState, useEffect, useContext } from "react";
import { Tabs, Spin } from "antd";
import MandalTable from "./MandalTable";
import DataTable from "./DataTable";
import MandalApprovalTable from "./MandalApprovalTable";
import axios from "axios";
import UserContext from "../../context/user/userContext";
const { TabPane } = Tabs;

function MandalTab() {

  const userContext = useContext(UserContext);
  const { user } = userContext;

  useEffect(() => {
    getFalseMandals();
    getApprovedMandals();
  }, []);

  const [mandalPanel, setmandalPanel] = useState({
    tab: "Mandal",
  });
  const { tab } = mandalPanel;
  const [falseMandal, setFalseMandal] = useState()
  const [approvedMandal, setApprovedMandal] = useState()

  const [loading, setLoading] = useState(true);


  const getFalseMandals = () => {

    if (user.admin.toLowerCase() === "district") {
      axios
        .get(`http://localhost:5000/api/admin/districtAdmin/getMandals/${false}`)
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

    else if (user.admin.toLowerCase() === "city") {
      axios
        .get(`http://localhost:5000/api/admin/cityAdmin/getMandals/${false}`)
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
      .get("http://localhost:5000/api/admin/getMandals")
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


  return (
    <Tabs defaultActiveKey={tab}>


  {user.admin.toLowerCase() !== "state" ? (
              <TabPane tab="Pending Mandals" key="PendingMandals">
              {loading ? (
                <Spin size="large" />
              ) : (
                  <MandalApprovalTable mandals={falseMandal}></MandalApprovalTable>
                )}
            </TabPane>
      ) : null}





      <TabPane tab="Approved Mandals" key="ApprovedMandal">
        {loading ? (
          <Spin size="large" />
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