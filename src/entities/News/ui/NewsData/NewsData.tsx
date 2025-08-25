import { queryKey } from "@/shared/consts/queryKey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import { deleteNews, getNews } from "../../model/services/services-data";
import { Button, Card, Popconfirm, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { NewsStatus, type INews } from "../../model/types";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/shared/lib/formatDate";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routePaths } from "@/shared/config/routeConfig";
import SearchDataInput from "@/shared/ui/SearchDataInput/ui/SearchDataInput";

function NewsData() {
  const [id, setId] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { t, i18n } = useTranslation("news");
  const message = useMessageApi();

  const searchParamsVal = searchParams.get("search") || "";
  const pageParamsVal = searchParams.get("page") || "1";
  const pageSizeParamsVal = searchParams.get("limit") || "10";
  const searchVal = useDebounce(searchParamsVal, 500);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      queryKey.news,
      pageSizeParamsVal,
      pageParamsVal,
      i18n.language,
      searchVal,
    ],
    queryFn: () =>
      getNews(pageSizeParamsVal, i18n.language, pageParamsVal, searchVal),
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

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchParams({
        search: val,
        limit: pageSizeParamsVal,
      });
    },
    [pageSizeParamsVal]
  );

  const columns: TableProps<INews>["columns"] = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: t("Title"),
        dataIndex: "title",
        key: "title",
      },
      {
        title: t("Information"),
        dataIndex: "description",
        key: "description",
      },
      {
        title: t("Date"),
        dataIndex: "description",
        key: "description",
        render: (_, record) => formatDate(record.publishedAt),
        sorter: (a, b) => a.publishedAt.localeCompare(b.publishedAt),
      },
      {
        title: t("Posted"),
        dataIndex: "author",
        key: "author",
        render: (_, record) => record.author.name,
      },
      {
        title: t("Status"),
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
        title: t("Action"),
        key: "action",
        width: 150,
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
    ],
    [t, id, isPending, onClickDeleteNews, navigate]
  );

  useEffect(() => {
    if (isError) message.error("Error");
  }, [isError, message]);

  return (
    <Card>
      <SearchDataInput value={searchParamsVal} onChangeInput={onChangeInput} />

      <Table<INews>
        columns={columns}
        dataSource={data?.data.data}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: Number(pageParamsVal),
          pageSize: Number(pageSizeParamsVal),
          total: data?.data.meta.totalItems,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setSearchParams({
              page: page.toString() || "1",
              limit: pageSize.toString() || "10",
              search: searchParamsVal,
            });
          },
        }}
      />
    </Card>
  );
}

export default memo(NewsData);
