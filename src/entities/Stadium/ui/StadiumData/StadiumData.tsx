import { memo, useCallback, useMemo, useState, type ChangeEvent } from "react";
import { Button, Card, Popconfirm, Space, Table } from "antd";
import type { TableProps } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteStadium, getStadiums } from "../../model/services";
import { queryKey } from "@/shared/consts/queryKey";
import { useTranslation } from "react-i18next";
import type { IStadium } from "../../model/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routePaths } from "@/shared/config/routeConfig";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import SearchDataInput from "@/shared/ui/SearchDataInput/ui/SearchDataInput";

function StadiumData() {
  const [id, setId] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { i18n, t } = useTranslation("stadium");

  const navigate = useNavigate();
  const message = useMessageApi();
  const queryClient = useQueryClient();

  const searchParamsVal = searchParams.get("search") || "";
  const pageSize = searchParams.get("limit") || "2";
  const page = searchParams.get("page") || "1";

  const search = useDebounce(searchParamsVal, 500);

  const deleteMutation = useMutation({
    mutationFn: deleteStadium,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.stadium] });
      message.success(t("Stadium deleted successfully!"));
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const { isPending } = deleteMutation;

  const onClickDeleteNews = useCallback(
    (id: number) => {
      setId(id);
      deleteMutation.mutate(id);
    },
    [deleteMutation]
  );

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchParams({
        search: val,
        limit: pageSize,
      });
    },
    [pageSize]
  );

  const { data, isLoading } = useQuery({
    queryFn: () => getStadiums(i18n.language, pageSize, page, search),
    queryKey: [queryKey.stadium, i18n.language, pageSize, page, search],
  });

  const columns: TableProps<IStadium>["columns"] = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: t("Name"),
        dataIndex: "name",
        key: "name",
      },
      {
        title: t("Address"),
        dataIndex: "address",
        key: "address",
      },
      {
        title: t("City"),
        dataIndex: "city",
        key: "city",
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
                navigate(`${routePaths.StadiumUpdatePage}/${record.id}`)
              }
            />
          </Space>
        ),
      },
    ],
    [id, isPending, onClickDeleteNews, navigate, t]
  );

  return (
    <Card>
      <SearchDataInput value={searchParamsVal} onChangeInput={onChangeInput} />

      <Table<IStadium>
        columns={columns}
        dataSource={data?.data.data}
        loading={isLoading}
        rowKey="id"
        pagination={{
          pageSize: Number(pageSize),
          current: Number(page),
          total: data?.data.meta.totalItems,
          showSizeChanger: true,
          onChange: (page, limit) => {
            setSearchParams({
              page: String(page),
              limit: String(limit),
            });
          },
        }}
      />
    </Card>
  );
}

export default memo(StadiumData);
