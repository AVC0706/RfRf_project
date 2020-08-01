import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import DataTable from "./DataTable";
import axios from "axios";
const { TabPane } = Tabs;
function AdminTab() {
  const [adminPanel, setadminPanel] = useState({
    tab: "City",
  });
  const { tab } = adminPanel;

  const [districtAdmin, setDistrictAdmins] = useState([]);
  const [cityAdmin, setCityAdmins] = useState([]);
  const [normalUsers, setNormalUsers] = useState([]);


  useEffect(() => {
    getDistrictAdmin();
    getCityAdmin();
    getNormalUsers();
  }, []);

  const getDistrictAdmin = () => {
    axios
      .get("http://localhost:5000/api/stateAdmin/getAdmins/district")
      .then((res) => {
        if (res.status === 200) {
          setDistrictAdmins(res.data.users);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCityAdmin = () => {
    axios
      .get("http://localhost:5000/api/stateAdmin/getAdmins/city")
      .then((res) => {
        if (res.status === 200) {
          setCityAdmins(res.data.users);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getNormalUsers = () => {
    axios
      .get("http://localhost:5000/api/stateAdmin/getAdmins/null")
      .then((res) => {
        if (res.status === 200) {
          setNormalUsers(res.data.users);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Tabs defaultActiveKey={[tab]}>
      <TabPane tab="District" key="District">
        <DataTable users={districtAdmin} />
      </TabPane>
      <TabPane tab="City" key="City">
        <DataTable users={cityAdmin}></DataTable>
      </TabPane>
      <TabPane tab="Users" key="Users">
        <DataTable users={normalUsers}></DataTable>
      </TabPane>
    </Tabs>
  );
}

export default AdminTab;
