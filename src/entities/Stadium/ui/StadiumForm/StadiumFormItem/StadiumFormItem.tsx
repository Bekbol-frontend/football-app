import { Form, Input } from "antd";
import { memo } from "react";
import type { TYPE_LANG } from "@/shared/types/lang";
import type { IStadiumForm } from "@/entities/Stadium/model/types";
import { useTranslation } from "react-i18next";

interface IProps {
  lang: TYPE_LANG;
}

function StadiumFormItem({ lang }: IProps) {
  const { t } = useTranslation("stadium");

  return (
    <Form.Item<IStadiumForm>
      label={t("Name")}
      name={["name", lang]}
      rules={[{ required: true, message: t("Please input your name!") }]}
    >
      <Input />
    </Form.Item>
  );
}

export default memo(StadiumFormItem);
