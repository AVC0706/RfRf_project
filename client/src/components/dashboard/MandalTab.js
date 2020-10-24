import React, { useState } from "react";
import { Tabs } from "antd";
import MandalTable from "./MandalTable";
import DataTable from "./DataTable";
import MandalApprovalTable from "./MandalApprovalTable";
const { TabPane } = Tabs;

function MandalTab() {
  const [mandalPanel, setmandalPanel] = useState({
    tab: "Mandal",
  });
  const { tab } = mandalPanel;
  return (
    <Tabs defaultActiveKey={tab}>
      <TabPane tab = "Pending Mandals" key = "PendingMandals">
        <MandalApprovalTable></MandalApprovalTable>
      </TabPane>
      <TabPane tab="Approved Mandals" key="ApprovedMandal">
        <MandalTable></MandalTable>
      </TabPane>
    </Tabs>
  );
}

export default MandalTab;
