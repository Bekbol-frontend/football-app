import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Tabs, Button, Flex, Form, Input, Typography } from "antd";
import { FileUpload } from "@/shared/ui/FileUpload";
import type { TabsProps } from "antd";
import type { IPersonnelForm } from "../../model/types";
import { LangEnum, LangEnumShort, type TYPE_LANG } from "@/shared/types/lang";
import PersonnelFormItem from "./PersonnelFormItem/PersonnelFormItem";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import { langsArray } from "@/shared/consts/langsArray";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPersonnel,
  getPersonnelById,
  updatePersonnel,
} from "../../model/services";
import { queryKey } from "@/shared/consts/queryKey";
import { useNavigate } from "react-router-dom";
import { routePaths } from "@/shared/config/routeConfig";
import { PageLoading } from "@/widgets/PageLoading";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

interface IProps {
  id?: string;
}

function PersonnelForm({ id }: IProps) {
  const [avatar, setAvatar] = useState("");
  const [activeTab, setActiveTab] = useState<TYPE_LANG>("en");

  const [form] = Form.useForm();
  const message = useMessageApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation("personnel");

  const { data, isLoading, isFetching } = useQuery({
    queryFn: () => getPersonnelById(id!),
    queryKey: [queryKey.personnel, id],
    enabled: !!id,
  });

  useEffect(() => {
    if (!isLoading && !isFetching && data) {
      form.setFieldsValue(data.data);
      setAvatar(data.data.avatar);
    }

    return () => {
      form.resetFields();
    };
  }, [data, form, isLoading, isFetching]);

  const createMutation = useMutation({
    mutationFn: createPersonnel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.personnel] });
      message.success(t("Personnel created successfully!"));
      navigate(routePaths.PersonnelPage);
    },
    onError: (err) => {
      message.error(`${t("Personnel creating error!")} \n ${err.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePersonnel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.personnel] });
      message.success(t("Personnel updated successfully!"));
      navigate(routePaths.PersonnelPage);
    },
    onError: (err) => {
      message.error(`${t("Personnel updating error!")} \n ${err.message}`);
    },
  });

  const { isPending, isError } = createMutation;
  const { isPending: isPendingUpdate, isError: isErrorUpdate } = updateMutation;

  const onFinish = useCallback(() => {
    const allValue: IPersonnelForm = form.getFieldsValue();
    const empty: string[] = [];

    langsArray.forEach((lang) => {
      const fullName = allValue.fullName[lang];
      const position = allValue.position[lang];
      const information = allValue.information[lang];

      if (!fullName || !position || !information) {
        const language =
          lang === LangEnumShort.EN
            ? LangEnum.EN
            : lang === LangEnumShort.RU
            ? LangEnum.RU
            : lang === LangEnumShort.QQ
            ? LangEnum.QQ
            : lang === LangEnumShort.KK
            ? LangEnum.KK
            : lang === LangEnumShort.UZ
            ? LangEnum.UZ
            : LangEnum.OZ;

        empty.push(language);
      }
    });

    if (empty.length) {
      message.open({
        type: "warning",
        content: `${empty.join(", ")} ${t("fields are empty!")}`,
      });
      return;
    }

    if (!avatar) {
      message.open({
        type: "warning",
        content: t("Image is empty!"),
      });
      return;
    }

    if (id) {
      updateMutation.mutate({
        id,
        data: {
          ...allValue,
          avatar,
        },
      });
      return;
    }

    createMutation.mutate({
      ...allValue,
      avatar,
    });
  }, [avatar, createMutation, form, message, id, updateMutation, t]);

  const onChange = useCallback((val: string) => {
    setActiveTab(val as TYPE_LANG);
  }, []);

  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: LangEnumShort.EN,
        label: LangEnum.EN,
        children: <PersonnelFormItem lang={LangEnumShort.EN} />,
      },
      {
        key: LangEnumShort.RU,
        label: LangEnum.RU,
        children: <PersonnelFormItem lang={LangEnumShort.RU} />,
      },
      {
        key: LangEnumShort.QQ,
        label: LangEnum.QQ,
        children: <PersonnelFormItem lang={LangEnumShort.QQ} />,
      },
      {
        key: LangEnumShort.KK,
        label: LangEnum.KK,
        children: <PersonnelFormItem lang={LangEnumShort.KK} />,
      },
      {
        key: LangEnumShort.UZ,
        label: LangEnum.UZ,
        children: <PersonnelFormItem lang={LangEnumShort.UZ} />,
      },
      {
        key: LangEnumShort.OZ,
        label: LangEnum.OZ,
        children: <PersonnelFormItem lang={LangEnumShort.OZ} />,
      },
    ],
    []
  );

  if (isLoading || isFetching) return <PageLoading />;

  return (
    <>
      <Title level={2}>
        {" "}
        {id ? t("Update Personnel") : t("Create Personnel")}{" "}
      </Title>
      <Form
        form={form}
        name={id ? "update-personnel-form" : "create-personnel-form"}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Flex gap={30}>
          <Flex style={{ flex: 1 }} vertical>
            <Form.Item<IPersonnelForm>
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: t("Please input your email!"),
                },
              ]}
              style={{ width: "100%" }}
            >
              <Input />
            </Form.Item>
            <Form.Item<IPersonnelForm>
              label={t("Phone")}
              name="phone"
              rules={[
                { required: true, message: t("Please input your phone!") },
              ]}
              style={{ width: "100%" }}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <FileUpload setLogo={setAvatar} logo={avatar} />
            </Form.Item>
          </Flex>
          <Flex style={{ flex: 1 }} vertical>
            <Tabs
              type="card"
              activeKey={activeTab}
              items={
                id ? items.map((el) => ({ ...el, forceRender: true })) : items
              }
              onChange={onChange}
            />
          </Flex>
        </Flex>

        <Flex gap={3}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending || isPendingUpdate}
            danger={isError || isErrorUpdate}
          >
            {id ? t("Update") : t("Create")}
          </Button>
          <Button type="primary" htmlType="button" onClick={() => navigate(-1)}>
            {t("Back")}
          </Button>
        </Flex>
      </Form>
    </>
  );
}

export default memo(PersonnelForm);
