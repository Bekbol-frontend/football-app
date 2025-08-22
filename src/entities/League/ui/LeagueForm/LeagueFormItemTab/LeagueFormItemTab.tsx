import { Form, Input } from "antd";
import { memo } from "react";
import type { ILueagueForm } from "../../../model/types";
import type { TYPE_LANG } from "@/shared/types/lang";

interface IProps {
  lang: TYPE_LANG;
}

function LeagueFormItemTab({ lang }: IProps) {
  return (
    <Form.Item<ILueagueForm>
      label="Name league"
      name={["title", lang]}
      rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Input />
    </Form.Item>
  );
}

export default memo(LeagueFormItemTab);
