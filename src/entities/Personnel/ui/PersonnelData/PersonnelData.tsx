import { memo, useCallback, useMemo, useState, type ChangeEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePersonnel, getPersonnel } from "../../model/services";
import { queryKey } from "@/shared/consts/queryKey";
import { Button, Card, Popconfirm, Space, Table } from "antd";
import type { TableProps } from "antd";
import type { IPersonnelData } from "../../model/types";
import { ImageTable } from "@/shared/ui/ImageTable";
import SearchDataInput from "@/shared/ui/SearchDataInput/ui/SearchDataInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import { routePaths } from "@/shared/config/routeConfig";
import { useTranslation } from "react-i18next";

function PersonnelData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState<number | null>(null);

  const queryClient = useQueryClient();
  const message = useMessageApi();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation("personnel");

  const searchParamsVal = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  const searchDebounceVal = useDebounce(searchParamsVal, 500);

  const onChangeSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchParams({ search: event.target.value, limit });
    },
    [limit]
  );

  const deleteMutation = useMutation({
    mutationFn: deletePersonnel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.personnel] });
      message.success(t("Personnel deleted successfully!"));
    },
    onError: (error) => {
      message.error(`${t("Personnel deleting error!")} \n ${error.message}`);
    },
  });

  const { isPending } = deleteMutation;

  const onClickDeletePersonnel = useCallback(
    (val: number) => {
      setId(val);
      deleteMutation.mutate(val);
    },
    [deleteMutation.mutate]
  );

  const { data, isLoading } = useQuery({
    queryFn: () => getPersonnel(i18n.language, searchDebounceVal, page, limit),
    queryKey: [
      queryKey.personnel,
      searchDebounceVal,
      page,
      limit,
      i18n.language,
    ],
  });

  const columns: TableProps<IPersonnelData<string>>["columns"] = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: t("Photo"),
        dataIndex: "avatar",
        key: "avatar",
        render: (_, record) => <ImageTable logo={record.avatar} />,
      },
      {
        title: t("Full Name"),
        dataIndex: "fullName",
        key: "fullName",
      },
      {
        title: t("Position"),
        dataIndex: "position",
        key: "position",
      },
      {
        title: t("Information"),
        dataIndex: "information",
        key: "information",
      },
      {
        title: t("Phone"),
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
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
              onConfirm={() => onClickDeletePersonnel(record.id)}
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
                navigate(`${routePaths.PersonnelUpdatePage}/${record.id}`)
              }
            />
          </Space>
        ),
      },
    ],
    [id, isPending, onClickDeletePersonnel, navigate, t]
  );

  return (
    <Card>
      <SearchDataInput value={searchParamsVal} onChangeInput={onChangeSearch} />
      <Table<IPersonnelData<string>>
        columns={columns}
        dataSource={data?.data.data}
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
              search: searchParamsVal,
            });
          },
        }}
        loading={isLoading}
      />
    </Card>
  );
}

export default memo(PersonnelData);
