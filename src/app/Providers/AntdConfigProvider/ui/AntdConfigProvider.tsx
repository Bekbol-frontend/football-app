import type { ReactNode } from "react";
import { ConfigProvider } from "antd";

interface IProps {
  children: ReactNode;
}

function AntdConfigProvider({ children }: IProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "var(--font-roboto)",
          fontSize: 15,
          borderRadius: 4,
        },
        components: {
          Layout: {
            siderBg: "var(--sidebar-bg)",
            headerBg: "var(--header-bg)",
            headerHeight: "var(--header-height)",
            headerPadding: "var(--header-padding)",
            colorBgContainer: "red",
            bodyBg: "var(--body-bg)",
          },
          Menu: {
            colorBgContainer: "transparent",
          },
          Input: {
            controlHeight: 35,
          },
          Button: {
            controlHeight: 35,
          },
          Select: {
            controlHeight: 35,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntdConfigProvider;
