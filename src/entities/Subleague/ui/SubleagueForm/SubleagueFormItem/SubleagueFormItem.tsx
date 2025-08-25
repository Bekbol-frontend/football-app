import { memo } from "react";
import type { ISubleagueForm } from "@/entities/Subleague/model/types";
import type { TYPE_LANG } from "@/shared/types/lang";
import { Form, Input } from "antd";

interface IProps {
  lang: TYPE_LANG;
}

function SubleagueFormItem({ lang }: IProps) {
  return (
    <Form.Item<ISubleagueForm>
      label="Title"
      name={["title", lang]}
      rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Input />
    </Form.Item>
  );
}

export default memo(SubleagueFormItem);
