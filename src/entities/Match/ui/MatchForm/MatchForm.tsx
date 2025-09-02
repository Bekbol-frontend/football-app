import { memo, useCallback, useMemo, useState } from "react";
import { Button, DatePicker, Flex, Form, Select, Typography } from "antd";
import { matchStatus, type IMatchPost } from "../../model/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API, { baseURL } from "@/shared/api";
import { queryKey } from "@/shared/consts/queryKey";
import { useWatch } from "antd/es/form/Form";
import { createMatch, getClubMatch } from "../../model/services";
import dayjs from "dayjs";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routePaths } from "@/shared/config/routeConfig";

const { Title } = Typography;

function MatchForm() {
  const [leagueEnabled, setLeagueEnabled] = useState(false);
  const [subLeagueEnabled, setSubLeagueEnabled] = useState(false);
  const [clubEnabled, setClubEnabled] = useState(false);
  const [stadiumEnabled, setStadiumEnabled] = useState(false);

  const [form] = Form.useForm();
  const { t } = useTranslation("match");
  const message = useMessageApi();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.matches] });
      message.success(t("Match created successfully!"));
      navigate(routePaths.MatchPage);
      form.resetFields();
    },
    onError: (error) => {
      console.log(error);
      message.error(`${t("Error creating match!")} \n ${error.message}`);
    },
  });

  const { isPending, isError } = createMutation;

  const { data: dataLeague, isLoading } = useQuery({
    queryFn: async () =>
      await API.get<{ id: number; title: string }[]>(
        "/api/v1/admin/leagues/list"
      ),
    queryKey: [queryKey.leagues],
    enabled: leagueEnabled,
  });

  const { data: dataSubLeague, isLoading: isLoadingSub } = useQuery({
    queryFn: async () =>
      await API.get<{ id: number; title: string }[]>(
        "/api/v1/admin/leagues/list/sub-leagues"
      ),
    queryKey: [queryKey.subleagues],
    enabled: subLeagueEnabled,
  });

  const clubLeagueId = useWatch("clubLeagueId", form);
  const opponentLeagueId = useWatch("opponentLeagueId", form);
  const clubId = useWatch("clubId", form);
  const opponentClubId = useWatch("opponentClubId", form);

  const { data: dataClub, isLoading: isLoadingClub } = useQuery({
    queryFn: () => getClubMatch(clubLeagueId),
    queryKey: [queryKey.clubs, clubLeagueId],
    enabled: clubEnabled && !!clubLeagueId,
  });

  const { data: dataOpponentClub, isLoading: isLoadingOpponentClub } = useQuery(
    {
      queryFn: () => getClubMatch(opponentLeagueId),
      queryKey: [queryKey.clubs, opponentLeagueId],
      enabled: clubEnabled && !!opponentLeagueId,
    }
  );

  const { data: dataStadium, isLoading: isLoadingStadium } = useQuery({
    queryFn: async () =>
      await API.get<{ id: number; name: string }[]>(
        "/api/v1/admin/stadium/list"
      ),
    queryKey: [queryKey.stadium],
    enabled: stadiumEnabled,
  });

  const clubLeftData = useMemo(() => {
    return dataClub?.data.find((el) => el.id === clubId);
  }, [dataClub, clubId]);

  const clubRightData = useMemo(() => {
    return dataOpponentClub?.data.find((el) => el.id === opponentClubId);
  }, [dataOpponentClub, opponentClubId]);

  const onFinish = useCallback(
    (value: IMatchPost) => {
      const data: IMatchPost = {
        ...value,
        matchDate: dayjs(value.matchDate).toISOString(),
      };

      createMutation.mutate(data);
    },
    [createMutation]
  );

  return (
    <>
      <Title level={2}>Create Match</Title>
      <Form
        form={form}
        name="match"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Flex
          align="center"
          gap={30}
          style={{
            margin: clubLeftData ? "30px 0" : 0,
          }}
        >
          {clubLeftData && (
            <Flex style={{ flex: 1 }} align="center" justify="space-between">
              <Flex align="center" gap={20}>
                <Flex>
                  <img
                    src={`${baseURL}/${clubLeftData.logo}`}
                    alt={clubLeftData.name}
                  />
                </Flex>
                <Title level={4} style={{ marginBottom: 0 }}>
                  {clubLeftData.name}
                </Title>
              </Flex>
            </Flex>
          )}
          {clubRightData && (
            <Flex style={{ flex: 1 }} align="center" justify="space-between">
              <div></div>
              <Flex align="center" gap={20}>
                <Title level={4} style={{ marginBottom: 0 }}>
                  {clubRightData.name}
                </Title>
                <Flex>
                  <img
                    src={`${baseURL}/${clubRightData.logo}`}
                    alt={clubRightData.name}
                  />
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>

        <Form.Item<IMatchPost>
          label="Match Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Please input your club status!",
            },
          ]}
        >
          <Select
            placeholder="Select a status"
            options={Object.entries(matchStatus).map(([value, label]) => ({
              value,
              label,
            }))}
          />
        </Form.Item>

        <Flex gap={30}>
          {/* LEFT */}
          <div style={{ flex: 1 }}>
            {/* League */}
            <Form.Item<IMatchPost>
              label="League"
              name="clubLeagueId"
              rules={[
                {
                  required: true,
                  message: "Please input your club lueague!",
                },
              ]}
            >
              <Select
                placeholder="Select a league"
                onClick={() => setLeagueEnabled(true)}
                loading={isLoading}
                options={dataLeague?.data.map((el) => ({
                  value: el.id,
                  label: el.title,
                }))}
              />
            </Form.Item>

            {/* Subleague */}
            <Form.Item<IMatchPost>
              label="Subleague"
              name="clubSubLeagueId"
              rules={[
                {
                  required: true,
                  message: "Please input your club sublueague!",
                },
              ]}
            >
              <Select
                placeholder="Select a subleague"
                onClick={() => setSubLeagueEnabled(true)}
                loading={isLoadingSub}
                options={dataSubLeague?.data.map((el) => ({
                  value: el.id,
                  label: el.title,
                }))}
              />
            </Form.Item>

            {/* Club */}
            <Form.Item<IMatchPost>
              label="Club"
              name="clubId"
              rules={[{ required: true, message: "Please input your club!" }]}
            >
              <Select
                placeholder="Select a club"
                onClick={() => setClubEnabled(true)}
                loading={isLoadingClub}
                options={dataClub?.data.map((el) => ({
                  value: el.id,
                  label: el.name,
                }))}
                disabled={!clubLeagueId}
              />
            </Form.Item>

            <Form.Item<IMatchPost>
              label="Date"
              name="matchDate"
              rules={[
                { required: true, message: "Please input your club date!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          {/* RIGHT */}
          <div style={{ flex: 1 }}>
            {/* League */}
            <Form.Item<IMatchPost>
              label="League"
              name="opponentLeagueId"
              rules={[
                {
                  required: true,
                  message: "Please input your club lueague!",
                },
              ]}
            >
              <Select
                placeholder="Select a league"
                onClick={() => setLeagueEnabled(true)}
                loading={isLoading}
                options={dataLeague?.data.map((el) => ({
                  value: el.id,
                  label: el.title,
                }))}
              />
            </Form.Item>

            {/* Subleague */}
            <Form.Item<IMatchPost>
              label="Subleague"
              name="opponentSubLeagueId"
              rules={[
                {
                  required: true,
                  message: "Please input your club sublueague!",
                },
              ]}
            >
              <Select
                placeholder="Select a subleague"
                onClick={() => setSubLeagueEnabled(true)}
                loading={isLoadingSub}
                options={dataSubLeague?.data.map((el) => ({
                  value: el.id,
                  label: el.title,
                }))}
              />
            </Form.Item>

            {/* Club */}
            <Form.Item<IMatchPost>
              label="Club"
              name="opponentClubId"
              rules={[{ required: true, message: "Please input your club!" }]}
            >
              <Select
                placeholder="Select a club"
                disabled={!opponentLeagueId}
                loading={isLoadingOpponentClub}
                options={dataOpponentClub?.data.map((el) => ({
                  value: el.id,
                  label: el.name,
                }))}
              />
            </Form.Item>

            {/* Stadium */}
            <Form.Item<IMatchPost>
              label="Stadium"
              name="stadiumId"
              rules={[
                {
                  required: true,
                  message: "Please input your club stadium!",
                },
              ]}
            >
              <Select
                placeholder="Select a stadium"
                onClick={() => setStadiumEnabled(true)}
                loading={isLoadingStadium}
                options={dataStadium?.data.map((el) => ({
                  value: el.id,
                  label: el.name,
                }))}
              />
            </Form.Item>
          </div>
        </Flex>

        <Flex gap={3}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            danger={isError}
          >
            Create
          </Button>
          <Button type="primary" htmlType="button">
            Back
          </Button>
        </Flex>
      </Form>
    </>
  );
}

export default memo(MatchForm);
