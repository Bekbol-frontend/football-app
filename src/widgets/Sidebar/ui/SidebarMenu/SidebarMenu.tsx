import { memo, useMemo } from "react";
import {
  BankOutlined,
  FileTextOutlined,
  TeamOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { routePaths } from "@/shared/config/routeConfig";
import { useTranslation } from "react-i18next";

type MenuItem = Required<MenuProps>["items"][number];

function SidebarMenu() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const items: MenuItem[] = useMemo(
    () => [
      {
        key: routePaths.Home,
        icon: <FileTextOutlined />,
        label: <Link to={routePaths.Home}>{t("News")}</Link>,
      },
      {
        key: routePaths.League,
        icon: <TrophyOutlined />,
        label: <Link to={routePaths.League}>{t("League")}</Link>,
      },
      {
        key: routePaths.Subleague,
        icon: <TrophyOutlined />,
        label: <Link to={routePaths.Subleague}>{t("Subleague")}</Link>,
      },
      {
        key: routePaths.StadiumPage,
        icon: <BankOutlined />,
        label: <Link to={routePaths.StadiumPage}>{t("Stadium")}</Link>,
      },
      {
        key: routePaths.ClubPage,
        icon: <TeamOutlined />,
        label: <Link to={routePaths.ClubPage}>{t("Club")}</Link>,
      },
    ],
    [t]
  );

  const activePage = useMemo(() => {
    for (const el of Object.values(routePaths)) {
      if (pathname.startsWith(el) && el !== routePaths.Home) {
        return [el];
      }
    }

    if (pathname.startsWith(routePaths.NewsCreatePage)) {
      console.log("ten");
      return [routePaths.Home];
    }

    return [routePaths.Home];
  }, [pathname]);

  return (
    <Menu
      selectedKeys={activePage}
      items={items}
      style={{
        border: 0,
      }}
    />
  );
}

export default memo(SidebarMenu);
