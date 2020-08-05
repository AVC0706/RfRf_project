import React, { useState, useEffect } from "react";
import { Tabs , Spin , message } from "antd";
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
  const [loading , setLoading] = useState(true);


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
          setLoading(false);
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
          setLoading(false);
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
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const deleteUser = ( id , userType ) => {

    const key = 'updatable';
    message.loading({ content: 'Deleting...', key });

    console.log('deleteteD0')
    setLoading(true);

    axios.delete( `http://localhost:5000/api/admin/deleteUser/${id}` )
    .then((res) => {
      if (res.status === 200) {

        if(userType === 'district'){
          getDistrictAdmin();
        }
        else if( userType === 'city' ){
          getCityAdmin();
        }
        // else if( userType === 'mandal' ){
        //   getCityAdmin();
        // }
        else{
          getNormalUsers();
        }

        message.success({ content: 'User Deleted !!', key, duration: 3 });

        setLoading(false);
     }
    })
    .catch((err) => {

      setLoading(false);
    });

  }

  return (
    <Tabs defaultActiveKey={[tab]}>

      <TabPane tab="District" key="District">
        { loading ? (  <Spin size="large" /> ) : 
        (
          <DataTable users={districtAdmin} deleteUser={deleteUser} />
        ) 
        }
      </TabPane>

      <TabPane tab="City" key="City">
      { loading ? (  <Spin size="large" /> ) : 
        (
          <DataTable users={cityAdmin} deleteUser={deleteUser} />
        ) 
      }

      </TabPane>

      <TabPane tab="Users" key="Users">

      { loading ? (  <Spin size="large" /> ) : 
        (
          <DataTable users={normalUsers} deleteUser={deleteUser} />
        ) 
      }

      </TabPane>

    </Tabs>
  );
}

export default AdminTab;
