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
          borderRadius: 3,
        },
        components: {
          Layout: {
            siderBg: "var(--sidebar-bg)",
            headerBg: "var(--header-bg)",
            headerHeight: "var(--header-height)",
            headerPadding: "var(--header-padding)",
          },
          Menu: {
            colorBgContainer: "transparent",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntdConfigProvider;
