import { queryKey } from "@/shared/consts/queryKey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memo, useCallback, useEffect, useState } from "react";
import { deleteNews, getNews } from "../../model/services/services-data";
import { Button, Card, Flex, Input, Popconfirm, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { NewsStatus, type INews } from "../../model/types";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/shared/lib/formatDate";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routePaths } from "@/shared/config/routeConfig";

function NewsData() {
  const [id, setId] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { t, i18n } = useTranslation("news");
  const message = useMessageApi();

  const searchParamsVal = searchParams.get("search") || "";
  const pageParams = searchParams.get("page") || "1";
  const searchVal = useDebounce(searchParamsVal, 500);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey.news, pageParams, i18n.language, searchVal],
    queryFn: () => getNews(i18n.language, pageParams, searchVal),
  });

  const { mutate: deleteMutate, isPending } = useMutation({
    mutationFn: deleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.news] });
      message.open({
        type: "success",
        content: t("News deleted successfully!"),
      });
    },
    onError: () => {
      message.open({
        type: "error",
        content: t("Error deleting news!"),
      });
    },
  });

  const onClickDeleteNews = useCallback(
    (id: number) => {
      setId(id);
      deleteMutate(id);
    },
    [deleteMutate]
  );

  const columns: TableProps<INews>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
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
      sorter: (a, b) => a.publishedAt.localeCompare(b.publishedAt),
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
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Popconfirm
            title={t("Delete the task")}
            description={t("Are you sure to delete this task?")}
            onConfirm={() => onClickDeleteNews(record.id)}
            okText={t("Yes")}
            cancelText={t("No")}
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              loading={id === record.id && isPending}
            />
          </Popconfirm>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              navigate(`${routePaths.NewsUpdatePage}/${record.id}`);
            }}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (isError) message.error("Error");
  }, [isError, message]);

  return (
    <Card>
      <Flex
        justify="flex-end"
        style={{
          marginBottom: 30,
        }}
      >
        <Input
          style={{
            justifyContent: "flex-end",
            width: 250,
          }}
          placeholder="Search"
          prefix={<SearchOutlined />}
          value={searchParamsVal}
          onChange={(e) => {
            const val = e.target.value;
            if (val) {
              setSearchParams({ search: val });
            } else {
              setSearchParams({});
            }
          }}
        />
      </Flex>

      <Table<INews>
        columns={columns}
        dataSource={data?.data.data}
        rowKey="id"
        loading={isLoading}
        pagination={{
          total: data?.data.meta.totalItems,
          pageSize: 5,
          current: Number(pageParams),
        }}
        onChange={(obj) => {
          const { current } = obj;
          setSearchParams({ page: current?.toString() || "1" });
        }}
      />
    </Card>
  );
}

export default memo(NewsData);
