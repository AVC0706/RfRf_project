import React, { useState } from "react";
import { Tabs } from "antd";
import MandalTable from "./MandalTable";
import DataTable from "./DataTable";
const { TabPane } = Tabs;

function MandalTab() {
  const [mandalPanel, setmandalPanel] = useState({
    tab: "Mandal",
  });
  const { tab } = mandalPanel;
  return (
    <Tabs defaultActiveKey={tab}>
      <TabPane tab="Mandal" key="Mandal">
        <DataTable></DataTable>
      </TabPane>
    </Tabs>
  );
}

export default MandalTab;
