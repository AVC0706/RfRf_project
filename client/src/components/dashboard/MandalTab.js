import React, { useState } from "react";
import { Tabs } from "antd";
import MandalTable from "./MandalTable";
const { TabPane } = Tabs;

function MandalTab() {
  const [mandalPanel, setmandalPanel] = useState({
    tab: "Mandal",
  });
  const { tab } = mandalPanel;
  return (
    <Tabs defaultActiveKey={tab}>
      <TabPane tab="Mandal" key="Mandal">
        <MandalTable></MandalTable>
      </TabPane>
    </Tabs>
  );
}

export default MandalTab;
