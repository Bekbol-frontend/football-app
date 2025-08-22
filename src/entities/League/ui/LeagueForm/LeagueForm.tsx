import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Form, Typography, Button, Tabs, Flex } from "antd";
import { useTranslation } from "react-i18next";
import type { TabsProps } from "antd";
import LeagueFormItemTab from "./LeagueFormItemTab/LeagueFormItemTab";
import type { TYPE_LANG } from "@/shared/types/lang";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import type { ILueagueCreateData, ILueagueForm } from "../../model/types";
import LeagueFormFile from "./LeagueFormFile/LeagueFormFile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLeague,
  getLeagueById,
  updateLeague,
} from "../../model/services";
import { queryKey } from "@/shared/consts/queryKey";
import { useNavigate } from "react-router-dom";
import { PageLoading } from "@/widgets/PageLoading";
import { routePaths } from "@/shared/config/routeConfig";

const { Title } = Typography;

interface IProps {
  id?: string;
}

function LeagueForm({ id }: IProps) {
  const [activeTab, setActiveTab] = useState<TYPE_LANG>("en");
  const [logo, setLogo] = useState("");

  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  const { t } = useTranslation("league");

  const message = useMessageApi();
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKey.leagues, id],
    queryFn: () => getLeagueById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (!isLoading && !isFetching && data?.data) {
      form.setFieldsValue(data.data);
      setLogo(data.data.logo);
    }
  }, [data, form]);

  const createMutation = useMutation({
    mutationFn: createLeague,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.leagues] });
      message.success(t("League created successfully!"));
      navigate(routePaths.League);
    },
    onError: () => {
      message.error(t("Error creating league!"));
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateLeague,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.leagues] });
      message.success(t("League updated successfully!"));
      navigate(routePaths.League);
    },
    onError: () => {
      message.error(t("Error updating league!"));
    },
  });

  const { isPending, isError } = createMutation;
  const { isPending: isUpdatePending, isError: isUpdateError } = updateMutation;

  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: "en",
        label: "English",
        children: <LeagueFormItemTab lang="en" />,
      },
      {
        key: "ru",
        label: "Русский",
        children: <LeagueFormItemTab lang="ru" />,
      },
      {
        key: "qq",
        label: "Qaraqalpaq",
        children: <LeagueFormItemTab lang="qq" />,
      },
      {
        key: "kk",
        label: "Қарақалпақ",
        children: <LeagueFormItemTab lang="kk" />,
      },
      {
        key: "uz",
        label: "O'zbek",
        children: <LeagueFormItemTab lang="uz" />,
      },
      {
        key: "oz",
        label: "Өзбек",
        children: <LeagueFormItemTab lang="oz" />,
      },
    ],
    []
  );

  const onChange = useCallback((val: string) => {
    setActiveTab(val as TYPE_LANG);
  }, []);

  const onFinish = useCallback(() => {
    const allValues: ILueagueForm = form.getFieldsValue();

    const langs: TYPE_LANG[] = ["en", "ru", "qq", "kk", "uz", "oz"];
    const emptyValues = [];

    for (let lang of langs) {
      const title = allValues.title[lang]?.trim();

      if (!title) {
        const language =
          lang === "en"
            ? "English"
            : lang === "ru"
            ? "Русский"
            : lang === "qq"
            ? "Qaraqalpaq"
            : lang === "kk"
            ? "Қарақалпақ"
            : lang === "uz"
            ? "O’zbek"
            : "Өзбек";
        emptyValues.push(language);
      }
    }

    if (emptyValues.length) {
      message.open({
        type: "warning",
        content: `${t("Please fill in all fields")} ${emptyValues.join(", ")}`,
        duration: 5,
      });
      return;
    }

    if (!logo) {
      message.open({
        type: "warning",
        content: `${t("Please upload a logo")}`,
        duration: 5,
      });
      return;
    }

    const data: ILueagueCreateData = {
      ...allValues,
      logo,
    };

    if (id) {
      updateMutation.mutate({ id, data });
      return;
    }

    createMutation.mutate(data);
  }, [form, logo, createMutation, message, t, updateMutation, id]);

  if (isLoading || isFetching) return <PageLoading />;

  return (
    <div>
      <Title level={2}>{t(id ? "Update league" : "Create league")}</Title>

      <Form
        form={form}
        name={id ? "update-league" : "create-league"}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Tabs
          type="card"
          activeKey={activeTab}
          items={id ? items.map((el) => ({ ...el, forceRender: true })) : items}
          onChange={onChange}
        />

        <Form.Item>
          <LeagueFormFile setLogo={setLogo} logo={logo} />
        </Form.Item>

        <Flex gap={3}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending || isUpdatePending}
            danger={isError || isUpdateError}
          >
            {t(id ? "Update" : "Create")}
          </Button>
          <Button type="primary" htmlType="button" onClick={() => navigate(-1)}>
            {t("Back")}
          </Button>
        </Flex>
      </Form>
    </div>
  );
}

export default memo(LeagueForm);
