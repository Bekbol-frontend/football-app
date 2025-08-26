import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Flex, Form, Select, Typography } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { LangEnum, LangEnumShort, type TYPE_LANG } from "@/shared/types/lang";
import ClubFormItemTab from "./ClubFormItemTab/ClubFormItemTab";
import type { IClubForm } from "../../model/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/queryKey";
import API from "@/shared/api";
import { langsArray } from "@/shared/consts/langsArray";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import { createClub, getClubById, updateClub } from "../../model/services";
import { useNavigate } from "react-router-dom";
import { routePaths } from "@/shared/config/routeConfig";
import { PageLoading } from "@/widgets/PageLoading";
import { useTranslation } from "react-i18next";
import { FileUpload } from "@/shared/ui/FileUpload";

const { Title } = Typography;

interface IProps {
  id?: string;
}

function ClubForm({ id }: IProps) {
  const [activeTab, setActiveTab] = useState<TYPE_LANG>("en");
  const [leagueEnabled, setLeagueEnabled] = useState(false);
  const [subLeagueEnabled, setSubLeagueEnabled] = useState(false);
  const [logo, setLogo] = useState<string>("");

  const [form] = Form.useForm();
  const message = useMessageApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation("club");

  const { data, isLoading, isFetching } = useQuery({
    queryFn: () => getClubById(id!),
    queryKey: [queryKey.clubs, id],
    enabled: !!id,
  });

  const createMutation = useMutation({
    mutationFn: createClub,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.clubs] });
      message.success(t("Club created successfully!"));
      navigate(routePaths.ClubPage);
    },
    onError: (error) => {
      message.error(`${t("Error creating club!")} \n ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateClub,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.clubs] });
      message.success(t("Club updated successfully!"));
      navigate(routePaths.ClubPage);
    },
    onError: (error) => {
      message.error(`${t("Error updating club!")} \n ${error.message}`);
    },
  });

  const { isPending, isError } = createMutation;
  const { isPending: isUpdatePending, isError: isUpdateError } = updateMutation;

  const { data: dataLeague, isLoading: isLoadingLeagues } = useQuery({
    queryFn: async () => {
      return API.get<{ id: number; title: string }[]>(
        "/api/v1/admin/leagues/list",
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
    },
    queryKey: [queryKey.leagues],
    enabled: leagueEnabled,
  });

  const { data: dataSubLeague, isLoading: isLoadingSubLeagues } = useQuery({
    queryFn: async () => {
      return API.get<{ id: number; title: string }[]>(
        "/api/v1/admin/leagues/list/sub-leagues",
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
    },
    queryKey: [queryKey.leagues],
    enabled: subLeagueEnabled,
  });

  const onChangeActiveTab = useCallback((val: string) => {
    setActiveTab(val as TYPE_LANG);
  }, []);

  const onFinish = useCallback(() => {
    const allValues: IClubForm = form.getFieldsValue();
    const empty: string[] = [];

    langsArray.forEach((lang) => {
      const name = allValues.name[lang]?.trim();
      const information = allValues.information[lang]?.trim();

      if (!name || !information) {
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
      message.error(`${t("Fill in the fields in")} ${empty.join(", ")}`);
      return;
    }

    if (!logo) {
      message.error(t("Please upload a logo"));
      return;
    }

    if (id) {
      updateMutation.mutate({ id, data: { ...allValues, logo } });
      return;
    }

    createMutation.mutate({ ...allValues, logo });
  }, [form, message, createMutation, logo]);

  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: LangEnumShort.EN,
        label: LangEnum.EN,
        children: <ClubFormItemTab lang={LangEnumShort.EN} />,
      },
      {
        key: LangEnumShort.RU,
        label: LangEnum.RU,
        children: <ClubFormItemTab lang={LangEnumShort.RU} />,
      },
      {
        key: LangEnumShort.QQ,
        label: LangEnum.QQ,
        children: <ClubFormItemTab lang={LangEnumShort.QQ} />,
      },
      {
        key: LangEnumShort.KK,
        label: LangEnum.KK,
        children: <ClubFormItemTab lang={LangEnumShort.KK} />,
      },
      {
        key: LangEnumShort.UZ,
        label: LangEnum.UZ,
        children: <ClubFormItemTab lang={LangEnumShort.UZ} />,
      },
      {
        key: LangEnumShort.OZ,
        label: LangEnum.OZ,
        children: <ClubFormItemTab lang={LangEnumShort.OZ} />,
      },
    ],
    []
  );

  useEffect(() => {
    if (!isLoading && !isFetching && data?.data) {
      form.setFieldsValue({
        ...data.data,
        leagueId: data.data.league.id,
        subLeagueId: data.data.subLeague.id,
      });
      setLogo(data.data.logo);
    }
  }, [data, form, isLoading, isFetching]);

  if (isLoading || isFetching) return <PageLoading />;

  return (
    <>
      <Title level={2}> {id ? t("Update club") : t("Create club")} </Title>
      <Form
        form={form}
        name={id ? "update-club" : "create-club"}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        <Tabs
          type="card"
          activeKey={activeTab}
          items={id ? items.map((el) => ({ ...el, forceRender: true })) : items}
          onChange={onChangeActiveTab}
        />

        <Flex gap={20}>
          <Form.Item<IClubForm>
            label={t("League")}
            name="leagueId"
            rules={[
              { required: true, message: t("Please input your league!") },
            ]}
            style={{ flex: 1 }}
          >
            <Select
              placeholder={t("Select a league")}
              onClick={() => setLeagueEnabled(true)}
              loading={isLoadingLeagues}
              options={dataLeague?.data.map((el) => ({
                value: el.id,
                label: el.title,
              }))}
            />
          </Form.Item>
          <Form.Item<IClubForm>
            label={t("Subleague")}
            name="subLeagueId"
            rules={[
              { required: true, message: t("Please input your subleague!") },
            ]}
            style={{ flex: 1 }}
          >
            <Select
              placeholder={t("Select a subleague")}
              onClick={() => setSubLeagueEnabled(true)}
              loading={isLoadingSubLeagues}
              options={dataSubLeague?.data.map((el) => ({
                value: el.id,
                label: el.title,
              }))}
            />
          </Form.Item>
        </Flex>

        <Form.Item>
          <FileUpload logo={logo} setLogo={setLogo} />
        </Form.Item>

        <Flex gap={3}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending || isUpdatePending}
            danger={isError || isUpdateError}
          >
            {id ? t("Update club") : t("Create club")}
          </Button>
          <Button type="primary" htmlType="button" onClick={() => navigate(-1)}>
            {t("Back")}
          </Button>
        </Flex>
      </Form>
    </>
  );
}

export default memo(ClubForm);
