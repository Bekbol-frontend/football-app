import { memo, useCallback, useEffect, useState } from "react";
import { DatePicker, Flex, Modal, Select, Tabs, Typography } from "antd";
import { useTranslation } from "react-i18next";
import type { TabsProps } from "antd";
import { Button, Form, Input } from "antd";
import type { TYPE_LANG } from "@/shared/types/lang";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import NewsFormFile from "./NewsFormFile/NewsFormFile";
import { type INewsForm, type IPostNews } from "../../model/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNews } from "../../model/services/services-form";
import { queryKey } from "@/shared/consts/queryKey";
import { selectItems } from "../../model/items";
import { useNavigate } from "react-router-dom";
import { routePaths } from "@/shared/config/routeConfig";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { getNewsById } from "../../model/services/services-data";

const { TextArea } = Input;

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
  const [form] = Form.useForm<INewsForm>();
  const message = useMessageApi();
  const navigate = useNavigate();

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setPublishedDate(null);
  }, []);

  const { data } = useQuery({
    queryKey: [queryKey.news],
    queryFn: () => getNewsById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if(data?.data) {
      form.setFieldsValue({
        title: data.data.title,
        description: data.data.description,
        status: data.data.status
      });
    }
  },[data])

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

  const { isPending, isError } = mutation;

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

    mutation.mutate(data);
  }, [form, message, t, images, mutation, publishedDate]);

  const childrenElementFormItem = (lang: TYPE_LANG) => {
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
  };

  const items: TabsProps["items"] = [
    {
      key: "en",
      label: "English",
      children: childrenElementFormItem("en"),
    },
    {
      key: "ru",
      label: "Русский",
      children: childrenElementFormItem("ru"),
    },
    {
      key: "qq",
      label: "Qaraqalpaq",
      children: childrenElementFormItem("qq"),
    },
    {
      key: "kk",
      label: "Қарақалпақ",
      children: childrenElementFormItem("kk"),
    },
    {
      key: "uz",
      label: "O'zbek",
      children: childrenElementFormItem("uz"),
    },
    {
      key: "oz",
      label: "Өзбек",
      children: childrenElementFormItem("oz"),
    },
  ];

  return (
    <div>
      <Title level={2}>{t("Add news")}</Title>

      <Form
        name="news-form"
        onFinish={onSubmitForm}
        layout="vertical"
        form={form}
      >
        <Tabs
          type="card"
          activeKey={activeLang}
          items={items}
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
          <NewsFormFile setImages={setImages} />
        </Form.Item>

        <Flex gap={3}>
          <Button type="primary" htmlType="button" onClick={showModal}>
            {t("Publish later")}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            danger={isError}
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

          <Button onClick={onSubmitForm} loading={isPending} danger={isError}>
            {t("Publish")}
          </Button>
        </Flex>
      </Modal>
    </div>
  );
}

export default memo(NewsForm);
