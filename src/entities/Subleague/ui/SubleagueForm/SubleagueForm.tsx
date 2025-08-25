import { memo, useCallback, useState } from "react";
import { Flex, Typography, Tabs, Select } from "antd";
import type { TabsProps } from "antd";
import { Button, Form } from "antd";
import type { ISubleagueForm } from "../../model/types";
import { LangEnum, LangEnumShort, type TYPE_LANG } from "@/shared/types/lang";
import SubleagueFormItem from "./SubleagueFormItem/SubleagueFormItem";
import { type ILeague } from "@/entities/League";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/shared/api";
import { queryKey } from "@/shared/consts/queryKey";
import SubleagueFormFile from "./SubleagueFormFile/SubleagueFormFile";
import { langsArray } from "@/shared/consts/langsArray";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import { createSubleague } from "../../model/services";

const { Title } = Typography;

function SubleagueForm() {
  const [enabledLeague, setEnabledLeague] = useState(false);
  const [activeTab, setActiveTab] = useState<TYPE_LANG>("en");
  const [logo, setLogo] = useState<string>("");

  const [form] = Form.useForm();
  const message = useMessageApi();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryFn: () => {
      return API.get<{ data: ILeague[] }>("/api/v1/admin/leagues");
    },
    queryKey: [queryKey.leagues],
    enabled: enabledLeague,
  });

  const createMutation = useMutation({
    mutationFn: createSubleague,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.subleagues] });
      message.success("Subleague created successfully!");
    },
    onError: () => {
      message.error("Error creating subleague!");
    },
  });

  const { isPending, isError } = createMutation;

  const onFinish = useCallback(() => {
    const allValues: ISubleagueForm = form.getFieldsValue();
    const empty: string[] = [];

    langsArray.forEach((lang) => {
      const title = allValues.title[lang]?.trim();

      if (!title) {
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

        empty.push(lang);
      }
    });

    if (empty.length) {
      message.error(`Please fill in the fields: ${empty.join(", ")}`);
      return;
    }

    if (!logo) {
      message.error(`Please upload a logo`);
      return;
    }
    console.log({ ...allValues, logo });

    createMutation.mutate({ ...allValues, logo });
  }, [form, logo, message, createMutation]);

  const onChangeActiveTab = useCallback((val: string) => {
    setActiveTab(val as TYPE_LANG);
  }, []);

  const items: TabsProps["items"] = [
    {
      key: LangEnumShort.EN,
      label: LangEnum.EN,
      children: <SubleagueFormItem lang={LangEnumShort.EN} />,
    },
    {
      key: LangEnumShort.RU,
      label: LangEnum.RU,
      children: <SubleagueFormItem lang={LangEnumShort.RU} />,
    },
    {
      key: LangEnumShort.QQ,
      label: LangEnum.QQ,
      children: <SubleagueFormItem lang={LangEnumShort.QQ} />,
    },
    {
      key: LangEnumShort.KK,
      label: LangEnum.KK,
      children: <SubleagueFormItem lang={LangEnumShort.KK} />,
    },
    {
      key: LangEnumShort.UZ,
      label: LangEnum.UZ,
      children: <SubleagueFormItem lang={LangEnumShort.UZ} />,
    },
    {
      key: LangEnumShort.OZ,
      label: LangEnum.OZ,
      children: <SubleagueFormItem lang={LangEnumShort.OZ} />,
    },
  ];

  return (
    <>
      <Title level={2}>Subleague</Title>

      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Tabs
          type="card"
          activeKey={activeTab}
          items={items}
          onChange={onChangeActiveTab}
        />

        <Form.Item<ISubleagueForm>
          label="League"
          name="parentLeagueId"
          rules={[{ required: true, message: "Please input your league!" }]}
        >
          <Select
            options={data?.data.data.map((el) => ({
              label: el.title,
              value: el.id,
            }))}
            loading={isLoading}
            onClick={() => setEnabledLeague(true)}
          />
        </Form.Item>

        <Form.Item>
          <SubleagueFormFile logo={logo} setLogo={setLogo} />
        </Form.Item>

        <Flex gap={3}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            danger={isError}
          >
            Create
          </Button>
          <Button type="primary" htmlType="button">
            Back
          </Button>
        </Flex>
      </Form>
    </>
  );
}

export default memo(SubleagueForm);
