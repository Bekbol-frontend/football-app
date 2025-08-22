import { memo, useCallback, useEffect, useState } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  Tabs,
  type TabsProps,
  Typography,
} from "antd";
import type { TYPE_LANG } from "@/shared/types/lang";
import StadiumFormItem from "./StadiumFormItem/StadiumFormItem";
import { useNavigate } from "react-router-dom";
import type { IStadiumForm } from "../../model/types";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStadium,
  getStadiumById,
  updateStadium,
} from "../../model/services";
import { queryKey } from "@/shared/consts/queryKey";
import { routePaths } from "@/shared/config/routeConfig";
import { useTranslation } from "react-i18next";
import { PageLoading } from "@/widgets/PageLoading";

const { Title } = Typography;

interface IProps {
  id?: string;
}

function StadiumForm({ id }: IProps) {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState<TYPE_LANG>("en");
  const navigate = useNavigate();
  const message = useMessageApi();

  const queryClient = useQueryClient();
  const { t } = useTranslation("stadium");

  const { data, isLoading, isFetching } = useQuery({
    queryFn: () => getStadiumById(id!),
    queryKey: [queryKey.stadium, id],
    enabled: !!id,
  });

  useEffect(() => {
    if (!isLoading && !isFetching && data?.data) {
      form.setFieldsValue(data.data);
    }
  }, [data, form, isLoading, isFetching]);

  const createMutation = useMutation({
    mutationFn: createStadium,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.stadium] });
      message.open({
        type: "success",
        content: t("Stadium created successfully!"),
      });
      navigate(routePaths.StadiumPage);
    },
    onError: (error) => {
      message.open({
        type: "error",
        content: t(error.message),
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateStadium,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.stadium] });
      message.open({
        type: "success",
        content: t("Stadium updated successfully!"),
      });
      navigate(routePaths.StadiumPage);
    },
    onError: (error) => {
      message.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const { isPending, isError } = createMutation;
  const { isPending: updatePending, isError: updateError } = updateMutation;

  const onFinish = useCallback(() => {
    const allValues: IStadiumForm = form.getFieldsValue();

    const langs = ["en", "ru", "qq", "kk", "uz", "oz"] as const;
    const empty = [];

    for (let lang of langs) {
      const name = allValues.name[lang]?.trim();

      if (!name) {
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

        empty.push(language);
      }
    }

    if (empty.length) {
      message.open({
        type: "warning",
        content: `${t("Please fill in the name in")} ${empty.join(", ")}.`,
      });
      return;
    }

    if (id) {
      updateMutation.mutate({ id, data: allValues });
      return;
    }

    createMutation.mutate(allValues);
  }, [form, message, createMutation, updateMutation, id]);

  const onChange = useCallback((val: string) => {
    setActiveTab(val as TYPE_LANG);
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "en",
      label: "English",
      children: <StadiumFormItem lang="en" />,
    },
    {
      key: "ru",
      label: "Русский",
      children: <StadiumFormItem lang="ru" />,
    },
    {
      key: "qq",
      label: "Qaraqalpaq",
      children: <StadiumFormItem lang="qq" />,
    },
    {
      key: "kk",
      label: "Каракалпак",
      children: <StadiumFormItem lang="kk" />,
    },
    {
      key: "uz",
      label: "Uzbek",
      children: <StadiumFormItem lang="uz" />,
    },
    {
      key: "oz",
      label: "Озбек",
      children: <StadiumFormItem lang="oz" />,
    },
  ];

  if (isLoading || isFetching) return <PageLoading />;

  return (
    <div>
      <Title level={2}>{id ? t("Edit stadium") : t("Create stadium")}</Title>
      <Form
        form={form}
        name={id ? "edit-stadium" : "create-stadium"}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Tabs
          defaultActiveKey={activeTab}
          items={id ? items.map((el) => ({ ...el, forceRender: true })) : items}
          onChange={onChange}
        />

        <Form.Item<IStadiumForm>
          label={t("Address")}
          name="address"
          rules={[{ required: true, message: t("Please input your address!") }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<IStadiumForm>
          label={t("City")}
          name="city"
          rules={[{ required: true, message: t("Please input your city!") }]}
        >
          <Input />
        </Form.Item>

        <Flex gap={3}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending || updatePending}
            danger={isError || updateError}
          >
            {id ? t("Edit") : t("Create")}
          </Button>
          <Button type="primary" htmlType="button" onClick={() => navigate(-1)}>
            {t("Back")}
          </Button>
        </Flex>
      </Form>
    </div>
  );
}

export default memo(StadiumForm);
