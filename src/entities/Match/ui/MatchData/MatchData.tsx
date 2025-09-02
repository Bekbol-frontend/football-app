import { useQuery } from "@tanstack/react-query";
import { memo, useCallback, useMemo, type ChangeEvent } from "react";
import { getMatches } from "../../model/services";
import { queryKey } from "@/shared/consts/queryKey";
import { useTranslation } from "react-i18next";
import { Card, Flex, Table, type TableProps, Tag, Typography } from "antd";
import { MatchStatus, type IMatchData } from "../../model/types";
import { ImageTable } from "@/shared/ui/ImageTable";
import { formatDateStandart } from "@/shared/lib/formatDate";
import SearchDataInput from "@/shared/ui/SearchDataInput/ui/SearchDataInput";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";

const { Text, Title } = Typography;

function MatchData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { i18n } = useTranslation("match");

  const searchParamsVal = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const search = useDebounce(searchParamsVal, 700);

  const { data, isLoading } = useQuery({
    queryFn: () => getMatches(i18n.language, search, page, limit),
    queryKey: [queryKey.matches, i18n.language, search, page, limit],
  });

  const onChangeSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchParams({ search: value, limit });
    },
    [limit]
  );

  const columns: TableProps<IMatchData>["columns"] = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 120,
      },
      {
        title: "First club",
        dataIndex: "club",
        key: "club",
        render: (_, { club }) => (
          <Flex align="center" gap={10}>
            <ImageTable logo={club.logo} />
            <Text>{club.name}</Text>
          </Flex>
        ),
      },
      {
        title: "Result",
        dataIndex: "clubScore",
        key: "clubScore",
        render: (_, { clubScore, opponentClubScore }) => (
          <Flex align="center" gap={10}>
            <Title level={5} style={{ margin: "0" }}>
              {Number(clubScore)}
            </Title>
            -
            <Title level={5} style={{ margin: "0" }}>
              {Number(opponentClubScore)}
            </Title>
          </Flex>
        ),
      },
      {
        title: "Second club",
        dataIndex: "opponentClub",
        key: "opponentClub",
        render: (_, { opponentClub }) => (
          <Flex align="center" gap={10}>
            <Text>{opponentClub.name}</Text>
            <ImageTable logo={opponentClub.logo} />
          </Flex>
        ),
      },
      {
        title: "Date & time",
        dataIndex: "matchDate",
        key: "matchDate",
        render: (_, { matchDate }) => (
          <Flex vertical align="center" justify="center">
            <Text>{formatDateStandart(matchDate).date}</Text>
            <Text>{formatDateStandart(matchDate).time}</Text>
          </Flex>
        ),
      },
      {
        title: "Stadium",
        dataIndex: "stadium",
        key: "stadium",
        render: (_, { stadium }) => <Text>{stadium.name}</Text>,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "stadium",
        render: (_, { status }) => (
          <Tag
            color={
              status === MatchStatus.ABANDONED
                ? "cyan"
                : status === MatchStatus.AWARDED
                ? "blue"
                : status === MatchStatus.CANCELLED
                ? "red"
                : status === MatchStatus.EXTRA_TIME
                ? "geekblue"
                : status === MatchStatus.FINISHED
                ? "gold"
                : status === MatchStatus.HALF_TIME
                ? "green"
                : status === MatchStatus.LIVE
                ? "magenta"
                : status === MatchStatus.PENALTY_SHOOTOUT
                ? "volcano"
                : status === MatchStatus.POSTPONED
                ? "orange"
                : "pink"
            }
          >
            {status.toUpperCase()}
          </Tag>
        ),
      },
    ],
    []
  );

  return (
    <Card>
      <SearchDataInput value={searchParamsVal} onChangeInput={onChangeSearch} />
      <Table<IMatchData>
        columns={columns}
        dataSource={data?.data.data}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: +page,
          pageSize: +limit,
          total: data?.data.meta.totalItems,
          showSizeChanger: true,
          onChange(page, pageSize) {
            setSearchParams({
              page: String(page),
              limit: String(pageSize),
              search,
            });
          },
        }}
      />
    </Card>
  );
}

export default memo(MatchData);
