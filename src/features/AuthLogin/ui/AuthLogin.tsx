import { memo } from "react";
import AuthLoginForm from "./AuthLoginForm/AuthLoginForm";
import AuthLoginLogo from "./AuthLoginLogo/AuthLoginLogo";
import { Card } from "antd";

function AuthLogin() {
  return (
    <Card style={{ maxWidth: 565, width: "100%" }}>
      <AuthLoginLogo />
      <AuthLoginForm />
    </Card>
  );
}

export default memo(AuthLogin);
