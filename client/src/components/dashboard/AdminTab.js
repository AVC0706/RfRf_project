import React, { useState } from "react";
import { Tabs } from 'antd';
import DataTable from "./DataTable";
const { TabPane } = Tabs;
function AdminTab() {
  const [adminPanel, setadminPanel] = useState({
      tab:"City",
  });
  const {tab} = adminPanel;
  return (
    <Tabs defaultActiveKey={[tab]}>
      <TabPane tab="City" key="City">
        <DataTable />
      </TabPane>
      <TabPane tab="State" key="State">
      <DataTable></DataTable>
      </TabPane>
    </Tabs>
  );
}

export default AdminTab;
