import { memo } from "react";
import { Flex } from "antd";
import styles from "./LogoLink.module.scss";
import { Link } from "react-router-dom";
import { routePaths } from "@/shared/config/routeConfig";

function LogoLink() {
  return (
    <Flex className={styles.logoLinkWrapper} align="center" justify="center">
      <Link to={routePaths.Home}>
        <img src="/logo.svg" alt="Logo-Football" />
      </Link>
    </Flex>
  );
}

export default memo(LogoLink);
