import { memo, useCallback } from "react";
import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import type { LoginFormType } from "../../model/types";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { fetchLogin } from "../../model/services/fetchLogin";
import { useSelector } from "react-redux";
import { getIsError, getIsLoading } from "../../model/selectors";
import { useMessageApi } from "@/app/Providers/MessageProvider";

function AuthLoginForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const message = useMessageApi();

  const isLoading = useSelector(getIsLoading);
  const isError = useSelector(getIsError);

  const onFinish = useCallback(
    async (values: LoginFormType) => {
      const res = await dispatch(fetchLogin(values));

      if (res.meta.requestStatus === "fulfilled") {
        message.success(t("Successful authorization"));
      }

      if (res.meta.requestStatus === "rejected") {
        message.error(t("Incorrect login or password"));
      }
    },
    [dispatch, message, t]
  );

  return (
    <Form
      name="login-form"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<LoginFormType>
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: t("Please input your email!"),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<LoginFormType>
        label="Password"
        name="password"
        rules={[{ required: true, message: t("Please input your password!") }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          danger={Boolean(isError)}
        >
          {t("Login")}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default memo(AuthLoginForm);
