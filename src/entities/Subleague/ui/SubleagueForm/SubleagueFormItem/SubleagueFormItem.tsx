import { memo } from "react";
import type { ISubleagueForm } from "@/entities/Subleague/model/types";
import type { TYPE_LANG } from "@/shared/types/lang";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

interface IProps {
  lang: TYPE_LANG;
}

function SubleagueFormItem({ lang }: IProps) {
  const { t } = useTranslation("subleague");

  return (
    <Form.Item<ISubleagueForm>
      label={t("Title")}
      name={["title", lang]}
      rules={[{ required: true, message: t("Please input your title!") }]}
    >
      <Input />
    </Form.Item>
  );
}

export default memo(SubleagueFormItem);
