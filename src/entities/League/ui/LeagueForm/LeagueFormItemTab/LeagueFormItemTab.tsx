import { Form, Input } from "antd";
import { memo } from "react";
import type { ILueagueForm } from "../../../model/types";
import type { TYPE_LANG } from "@/shared/types/lang";
import { useTranslation } from "react-i18next";

interface IProps {
  lang: TYPE_LANG;
}

function LeagueFormItemTab({ lang }: IProps) {
  const { t } = useTranslation("league");

  return (
    <Form.Item<ILueagueForm>
      label={t("Name league")}
      name={["title", lang]}
      rules={[{ required: true, message: t("Please input your league!") }]}
    >
      <Input />
    </Form.Item>
  );
}

export default memo(LeagueFormItemTab);
