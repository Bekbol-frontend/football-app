import { memo, useCallback, useMemo, useState, type ChangeEvent } from "react";
import { Button, Card, Popconfirm, Space, Table } from "antd";
import { type TableProps } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteSubleague, getSubleagues } from "../../model/services";
import { queryKey } from "@/shared/consts/queryKey";
import type { ISubleague } from "../../model/types";

import { ImageTable } from "@/shared/ui/ImageTable";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchDataInput from "@/shared/ui/SearchDataInput/ui/SearchDataInput";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { routePaths } from "@/shared/config/routeConfig";
import { useMessageApi } from "@/app/Providers/MessageProvider";

function SubleagueData() {
  const [id, setId] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { i18n, t } = useTranslation("subleague");
  const navigate = useNavigate();
  const message = useMessageApi();
  const queryClient = useQueryClient();

  const limit = searchParams.get("limit") || "5";
  const page = searchParams.get("page") || "1";
  const searchParamsVal = searchParams.get("search") || "";

  const onChangeSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchParams({ search: event.target.value, limit });
    },
    [limit]
  );

  const deleteMutation = useMutation({
    mutationFn: deleteSubleague,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.subleagues] });
      message.success(t("Subleague deleted successfully!"));
    },
    onError: () => {
      message.error(t("Error deleting subleague!"));
    },
  });

  const { mutate, isPending } = deleteMutation;

  const onClickDeleteNews = useCallback(
    (id: number) => {
      setId(id);
      mutate(id);
    },
    [mutate]
  );

  const searchValue = useDebounce(searchParamsVal, 500);

  const { data, isLoading } = useQuery({
    queryFn: () => getSubleagues(i18n.language, limit, page, searchValue),
    queryKey: [queryKey.subleagues, i18n.language, limit, page, searchValue],
  });

  const columns: TableProps<ISubleague>["columns"] = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: t("Logo"),
        dataIndex: "logo",
        key: "logo",
        render: (logo: string) => <ImageTable logo={logo} />,
      },
      {
        title: t("Title"),
        dataIndex: "title",
        key: "title",
      },
      {
        title: t("Parent League ID"),
        dataIndex: "parentLeagueId",
        key: "parentLeagueId",
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
              onClick={() =>
                navigate(`${routePaths.SubleagueUpdatePage}/${record.id}`)
              }
            />
          </Space>
        ),
      },
    ],
    [id, isPending, navigate, onClickDeleteNews, t]
  );

  return (
    <Card>
      <SearchDataInput value={searchParamsVal} onChangeInput={onChangeSearch} />
      <Table<ISubleague>
        columns={columns}
        dataSource={data?.data.data}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: Number(page) || 1,
          pageSize: Number(limit) || 10,
          total: data?.data.meta.totalItems,
          showSizeChanger: true,
          onChange: (page, limit) => {
            setSearchParams({ page: String(page), limit: String(limit) });
          },
        }}
      />
    </Card>
  );
}

export default memo(SubleagueData);
