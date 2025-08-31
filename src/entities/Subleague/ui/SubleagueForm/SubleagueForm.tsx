import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Flex, Typography, Tabs, Select } from "antd";
import type { TabsProps } from "antd";
import { Button, Form } from "antd";
import type { ISubleagueForm } from "../../model/types";
import { LangEnum, LangEnumShort, type TYPE_LANG } from "@/shared/types/lang";
import SubleagueFormItem from "./SubleagueFormItem/SubleagueFormItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/shared/api";
import { queryKey } from "@/shared/consts/queryKey";
import { langsArray } from "@/shared/consts/langsArray";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import {
  createSubleague,
  getSubleagueById,
  updateSubleague,
} from "../../model/services";
import { PageLoading } from "@/widgets/PageLoading";
import { FileUpload } from "@/shared/ui/FileUpload";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { routePaths } from "@/shared/config/routeConfig";

const { Title } = Typography;

interface IProps {
  id?: string;
}

function SubleagueForm({ id }: IProps) {
  const [enabledLeague, setEnabledLeague] = useState(false);
  const [activeTab, setActiveTab] = useState<TYPE_LANG>("en");
  const [logo, setLogo] = useState<string>("");

  const [form] = Form.useForm();
  const message = useMessageApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation("subleague");

  const { data, isLoading } = useQuery({
    queryFn: () => {
      return API.get<{ id: number; title: string }[]>(
        "/api/v1/admin/leagues/list"
      );
    },
    queryKey: [queryKey.leagues],
    enabled: enabledLeague,
  });

  useEffect(() => {
    if (id) {
      setEnabledLeague(true);
    }
  }, [id]);

  const {
    data: subleagueData,
    isLoading: isSubleagueLoading,
    isFetching,
  } = useQuery({
    queryFn: () => getSubleagueById(id!),
    queryKey: [queryKey.subleagues, id],
    enabled: !!id,
  });

  const createMutation = useMutation({
    mutationFn: createSubleague,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.subleagues] });
      message.success(t("Subleague created successfully!"));
      navigate(routePaths.Subleague);
    },
    onError: () => {
      message.error(t("Error creating subleague!"));
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSubleague,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.subleagues] });
      message.success(t("Subleague updated successfully!"));
      navigate(routePaths.Subleague);
    },
    onError: () => {
      message.error(t("Error updating subleague!"));
    },
  });

  const { isPending, isError } = createMutation;
  const { isPending: isPendingUpdate, isError: isErrorUpdate } = updateMutation;

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
      message.error(`${t("Please fill in the fields:")} ${empty.join(", ")}`);
      return;
    }

    if (!logo) {
      message.error(t("Please upload a logo"));
      return;
    }

    const data = {
      ...allValues,
      logo,
    };

    if (id) {
      updateMutation.mutate({ id, data });
      return;
    }

    createMutation.mutate(data);
  }, [form, logo, message, createMutation, updateMutation, id, t]);

  const onChangeActiveTab = useCallback((val: string) => {
    setActiveTab(val as TYPE_LANG);
  }, []);

  const items: TabsProps["items"] = useMemo(
    () => [
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
    ],
    []
  );

  useEffect(() => {
    if (!isSubleagueLoading && !isFetching && subleagueData?.data) {
      form.setFieldsValue({
        ...subleagueData.data,
        parentLeagueId: subleagueData.data.parentLeagueId,
      });
      setLogo(subleagueData.data.logo);
    }

    return () => {
      form.resetFields();
    };
  }, [subleagueData, form, isSubleagueLoading, isFetching]);

  if (isSubleagueLoading || isFetching) return <PageLoading />;

  return (
    <>
      <Title level={2}>
        {id ? t("Update subleague") : t("Create subleague")}
      </Title>

      <Form
        form={form}
        name={id ? "update-subleague" : "create-subleague"}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Tabs
          type="card"
          activeKey={activeTab}
          items={id ? items.map((el) => ({ ...el, forceRender: true })) : items}
          onChange={onChangeActiveTab}
        />

        <Form.Item<ISubleagueForm>
          label={t("League")}
          name="parentLeagueId"
          rules={[{ required: true, message: t("Please input your league!") }]}
        >
          <Select
            options={data?.data.map((el) => ({
              label: el.title,
              value: el.id,
            }))}
            loading={isLoading}
            onClick={() => setEnabledLeague(true)}
          />
        </Form.Item>

        <Form.Item>
          <FileUpload logo={logo} setLogo={setLogo} />
        </Form.Item>

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

export default memo(SubleagueForm);
