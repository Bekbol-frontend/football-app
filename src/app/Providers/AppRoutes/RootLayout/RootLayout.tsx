import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { HeaderNav } from "@/widgets/HeaderNav";
import { Sidebar } from "@/widgets/Sidebar";

const { Content } = Layout;

function RootLayout() {
  return (
    <>
      <Layout hasSider>
        <Sidebar />
        <Layout>
          <HeaderNav />
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default memo(RootLayout);
