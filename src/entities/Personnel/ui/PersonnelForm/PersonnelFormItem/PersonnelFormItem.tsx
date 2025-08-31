import type { IPersonnelForm } from "@/entities/Personnel/model/types";
import type { TYPE_LANG } from "@/shared/types/lang";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  lang: TYPE_LANG;
}

function PersonnelFormItem({ lang }: IProps) {
  const { t } = useTranslation("personnel");

  return (
    <>
      <Form.Item<IPersonnelForm>
        label={t("Full Name")}
        name={["fullName", lang]}
        rules={[{ required: true, message: t("Please input your full name!") }]}
        style={{ width: "100%" }}
      >
        <Input />
      </Form.Item>
      <Form.Item<IPersonnelForm>
        label={t("Position")}
        name={["position", lang]}
        rules={[{ required: true, message: t("Please input your position!") }]}
        style={{ width: "100%" }}
      >
        <Input />
      </Form.Item>
      <Form.Item<IPersonnelForm>
        label={t("Information")}
        name={["information", lang]}
        rules={[{ required: true, message: t("Please input your information!") }]}
        style={{ width: "100%" }}
      >
        <TextArea rows={4} />
      </Form.Item>
    </>
  );
}

export default memo(PersonnelFormItem);
