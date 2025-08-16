import { queryKey } from "@/shared/consts/queryKey";
import { useQuery } from "@tanstack/react-query";
import { memo, useEffect } from "react";
import { getNews } from "../../model/services/services-data";
import { Button, Card, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { NewsStatus, type INews } from "../../model/types";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/shared/lib/formatDate";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMessageApi } from "@/app/Providers/MessageProvider";

function NewsData() {
  const { i18n } = useTranslation();
  const message = useMessageApi();

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey.news, i18n.language],
    queryFn: () => getNews(i18n.language),
  });

  const columns: TableProps<INews>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Information",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "description",
      key: "description",
      render: (_, record) => formatDate(record.publishedAt),
    },
    {
      title: "Posted",
      dataIndex: "author",
      key: "author",
      render: (_, record) => record.author.name,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <Tag
          color={
            status === NewsStatus.DRAFT
              ? "blue"
              : status === NewsStatus.PUBLISHED
              ? "green"
              : status === NewsStatus.ARCHIVED
              ? "geekblue"
              : status === NewsStatus.DELETED
              ? "error"
              : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" danger icon={<DeleteOutlined />} />
          <Button type="primary" icon={<EditOutlined />} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (isError) message.error("Error");
  }, [isError, message]);

  return (
    <Card>
      <Table<INews>
        columns={columns}
        dataSource={data?.data.data}
        rowKey="id"
        loading={isLoading}
      />
    </Card>
  );
}

export default memo(NewsData);
