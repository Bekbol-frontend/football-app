import { memo, useCallback, useMemo, useState } from "react";
import { useGetLeagues } from "../../model/hooks/useGetLeagues";
import { Button, Card, Flex, Input, Popconfirm, Space, Table } from "antd";
import type { TableProps } from "antd";
import type { ILeague } from "../../model/types";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/queryKey";
import { deleteLeague } from "../../model/services";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import { routePaths } from "@/shared/config/routeConfig";

function LeagueData() {
  const [id, setId] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const message = useMessageApi();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation("league");

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteLeague,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.leagues] });
      message.success(t("League deleted successfully!"));
    },
    onError: () => {
      message.error(t("Error deleting league!"));
    },
  });

  const { isPending } = deleteMutation;

  const searchParamsVal = searchParams.get("search") || "";
  const pageSizeParamsVal = searchParams.get("limit") || "2";
  const pageParamsVal = searchParams.get("page") || "1";

  const searchVal = useDebounce(searchParamsVal, 500);

  const { data, isLoading } = useGetLeagues(
    i18n.language,
    +pageSizeParamsVal,
    searchVal,
    +pageParamsVal
  );

  const onClickDeleteNews = useCallback(
    (id: number) => {
      setId(id);
      deleteMutation.mutate(id);
    },
    [deleteMutation]
  );

  const columns: TableProps<ILeague>["columns"] = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: t("Name league"),
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Action",
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
              onClick={() =>
                navigate(`${routePaths.LeagueUpdate}/${record.id}`)
              }
            />
          </Space>
        ),
      },
    ],
    [id, isPending, onClickDeleteNews, navigate, t]
  );

  return (
    <>
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
            placeholder={t("Search")}
            prefix={<SearchOutlined />}
            value={searchParamsVal}
            onChange={(e) => {
              const val = e.target.value;
              setSearchParams({
                search: val,
                limit: pageSizeParamsVal,
              });
            }}
          />
        </Flex>
        <Table<ILeague>
          columns={columns}
          dataSource={data?.data.data}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current: +pageParamsVal,
            pageSize: +pageSizeParamsVal,
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
    </>
  );
}

export default memo(LeagueData);
