import { memo } from "react";
import type { IClubForm } from "@/entities/Club/model/types";
import type { TYPE_LANG } from "@/shared/types/lang";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next";

interface IProps {
  lang: TYPE_LANG;
}

function ClubFormItemTab({ lang }: IProps) {
  const { t } = useTranslation("club");

  return (
    <>
      <Form.Item<IClubForm>
        label={t("Name club")}
        name={["name", lang]}
        rules={[{ required: true, message: t("Please input your name club!") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IClubForm>
        label={t("Information")}
        name={["information", lang]}
        rules={[
          { required: true, message: t("Please input your information!") },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
    </>
  );
}

export default memo(ClubFormItemTab);
