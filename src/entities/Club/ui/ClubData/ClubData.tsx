import { memo, useCallback, useMemo, useState, type ChangeEvent } from "react";
import { Button, Card, Popconfirm, Space, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteClub, getClubs } from "../../model/services";
import { queryKey } from "@/shared/consts/queryKey";
import type { IClub } from "../../model/types";
import { ImageTable } from "@/shared/ui/ImageTable";
import { useTranslation } from "react-i18next";
import SearchDataInput from "@/shared/ui/SearchDataInput/ui/SearchDataInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import { routePaths } from "@/shared/config/routeConfig";

const { Text } = Typography;

function ClubData() {
  const [id, setId] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { i18n, t } = useTranslation("club");
  const navigate = useNavigate();
  const message = useMessageApi();
  const queryClient = useQueryClient();

  const searchParamsVal = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "5";

  const deleteMutation = useMutation({
    mutationFn: deleteClub,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.clubs] });
      message.success(t("Club deleted successfully!"));
    },
    onError: (error) => {
      message.error(t(`${t("Error deleting club!")} \n ${error.message}`));
    },
  });

  const { isPending } = deleteMutation;

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ search: e.target.value, limit });
  }, []);
  const searchVal = useDebounce(searchParamsVal, 500);

  const onClickDeleteNews = useCallback(
    (val: number) => {
      setId(val);
      deleteMutation.mutate(val);
    },
    [deleteMutation]
  );

  const { data, isLoading } = useQuery({
    queryFn: () => getClubs(i18n.language, searchVal, page, limit),
    queryKey: [queryKey.clubs, i18n.language, searchVal, page, limit],
  });

  const columns: TableProps<IClub>["columns"] = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: t("Name club"),
        dataIndex: "name",
        key: "name",
      },
      {
        title: t("Logo"),
        dataIndex: "logo",
        key: "name",
        render: (logo: string) => <ImageTable logo={logo} />,
      },
      {
        title: t("League"),
        dataIndex: "league",
        key: "league",
        render: (_, record) => <Text>{record.league.title}</Text>,
      },
      {
        title: t("Subleague"),
        dataIndex: "subLeague",
        key: "subLeague",
        render: (_, record) => <Text>{record.subLeague.title}</Text>,
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
                navigate(`${routePaths.ClubUpdatePage}/${record.id}`)
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
      <SearchDataInput value={searchParamsVal} onChangeInput={onChangeSearch} />
      <Table<IClub>
        columns={columns}
        dataSource={data?.data.data}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: +page,
          pageSize: +limit,
          total: data?.data.meta.totalItems,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setSearchParams({
              page: String(page),
              limit: String(pageSize),
            });
          },
        }}
      />
    </Card>
  );
}

export default memo(ClubData);
