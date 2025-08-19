import type { INewsForm } from "@/entities/News/model/types";
import type { TYPE_LANG } from "@/shared/types/lang";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  lang: TYPE_LANG;
}

function FormItemTab({ lang }: IProps) {
  const { t } = useTranslation("news");

  return (
    <>
      <Form.Item<INewsForm>
        label={t("Title")}
        name={["title", lang]}
        rules={[{ required: true, message: t("Please input your title!") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<INewsForm>
        label={t("Information")}
        name={["description", lang]}
        rules={[
          { required: true, message: t("Please input your information!") },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
    </>
  );
}

export default memo(FormItemTab);
