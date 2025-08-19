import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { DatePicker, Flex, Modal, Select, Tabs, Typography } from "antd";
import { useTranslation } from "react-i18next";
import type { TabsProps } from "antd";
import { Button, Form } from "antd";
import type { TYPE_LANG } from "@/shared/types/lang";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import NewsFormFile from "./NewsFormFile/NewsFormFile";
import { NewsStatus, type INewsForm, type IPostNews } from "../../model/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNews, updateNews } from "../../model/services/services-form";
import { queryKey } from "@/shared/consts/queryKey";
import { selectItems } from "../../model/items";
import { useNavigate } from "react-router-dom";
import { routePaths } from "@/shared/config/routeConfig";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { getNewsById } from "../../model/services/services-data";
import { PageLoading } from "@/widgets/PageLoading";
import FormItemTab from "./FormItemTab/FormItemTab";

const { Title } = Typography;
const { Option } = Select;

interface IProps {
  id?: string;
}

function NewsForm({ id }: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<TYPE_LANG>("en");
  const [images, setImages] = useState<string[]>([]);
  const [publishedDate, setPublishedDate] = useState<dayjs.Dayjs | null>(null);

  const queryClient = useQueryClient();
  const { t } = useTranslation("news");
  const [form] = Form.useForm();
  const message = useMessageApi();
  const navigate = useNavigate();

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setPublishedDate(null);
  }, []);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKey.news, id],
    queryFn: () => getNewsById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (!isLoading && !isFetching && data?.data) {
      form.setFieldsValue({
        title: data.data.title,
        description: data.data.description,
        status: data.data.status,
      });
      setImages(data.data.images);
    }

    return () => {
      form.resetFields();
    };
  }, [data, form, isLoading, isFetching]);

  const mutation = useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.news] });
      message.open({
        type: "success",
        content: t("News created successfully!"),
      });
      navigate(routePaths.Home);
    },
    onError: (error) => {
      message.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.news] });
      message.open({
        type: "success",
        content: t("News updated successfully!"),
      });
      navigate(routePaths.Home);
    },
    onError: (error) => {
      message.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const { isPending, isError } = mutation;
  const { isPending: isPendingUpdate, isError: isErrorUpdate } = updateMutation;

  const onTabChange = (key: string) => {
    setActiveLang(key as TYPE_LANG);
  };

  const onSubmitForm = useCallback(async () => {
    const allValues = form.getFieldsValue();

    const langs: TYPE_LANG[] = ["en", "ru", "qq", "kk", "uz", "oz"];
    const emptyValues = [];

    for (let lang of langs) {
      const title = allValues.title[lang]?.trim();
      const desc = allValues.description[lang]?.trim();

      if (!title || !desc) {
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

    if (!images.length) {
      message.open({
        type: "warning",
        content: `${t("Please add images")}`,
        duration: 5,
      });
      return;
    }

    const data: IPostNews = {
      ...allValues,
      images,
      publishedAt: publishedDate
        ? publishedDate.toDate().toISOString()
        : new Date().toISOString(),
    };

    if (id) {
      updateMutation.mutate({ id, data });
      return;
    }

    mutation.mutate(data);
  }, [form, message, t, images, mutation, publishedDate, updateMutation, id]);

  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: "en",
        label: "English",
        children: <FormItemTab lang="en" />,
      },
      {
        key: "ru",
        label: "Русский",
        children: <FormItemTab lang="ru" />,
      },
      {
        key: "qq",
        label: "Qaraqalpaq",
        children: <FormItemTab lang="qq" />,
      },
      {
        key: "kk",
        label: "Қарақалпақ",
        children: <FormItemTab lang="kk" />,
      },
      {
        key: "uz",
        label: "O'zbek",
        children: <FormItemTab lang="uz" />,
      },
      {
        key: "oz",
        label: "Өзбек",
        children: <FormItemTab lang="oz" />,
      },
    ],
    []
  );

  if (isLoading || isFetching) return <PageLoading />;

  return (
    <div>
      <Title level={2}>{t(id ? "Update news" : "Add news")}</Title>

      <Form
        name={id ? "news-update" : "news-create"}
        onFinish={onSubmitForm}
        layout="vertical"
        form={form}
        initialValues={{
          status: NewsStatus.DRAFT,
        }}
      >
        <Tabs
          type="card"
          activeKey={activeLang}
          items={
            id
              ? items.map((item) => ({
                  ...item,
                  forceRender: true,
                }))
              : items
          }
          onChange={onTabChange}
        />

        <Form.Item<INewsForm>
          label={t("Status")}
          name="status"
          rules={[{ required: true, message: t("Please select your status!") }]}
        >
          <Select allowClear>
            {selectItems.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <NewsFormFile setImages={setImages} images={images} />
        </Form.Item>

        <Flex gap={3}>
          <Button type="primary" htmlType="button" onClick={showModal}>
            {t("Publish later")}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending || isPendingUpdate}
            danger={isError || isErrorUpdate}
          >
            {t("Publish")}
          </Button>
          <Button type="primary" htmlType="button" onClick={() => navigate(-1)}>
            {t("Back")}
          </Button>
        </Flex>
      </Form>

      <Modal
        title={t("Publish later")}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Flex
          vertical
          gap={20}
          style={{
            padding: "20px 0 10px",
          }}
        >
          <DatePicker
            showTime
            onChange={(date: Dayjs | null) => {
              setPublishedDate(date);
            }}
          />

          <Button
            onClick={onSubmitForm}
            loading={isPending || isPendingUpdate}
            danger={isError || isErrorUpdate}
          >
            {t("Publish")}
          </Button>
        </Flex>
      </Modal>
    </div>
  );
}

export default memo(NewsForm);
