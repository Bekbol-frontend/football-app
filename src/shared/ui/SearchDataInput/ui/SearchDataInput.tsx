import { memo, type ChangeEvent } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Flex, Input } from "antd";
import { useTranslation } from "react-i18next";

interface IProps {
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

function SearchDataInput(props: IProps) {
  const { value, onChangeInput } = props;

  const { t } = useTranslation();

  return (
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
        value={value}
        onChange={onChangeInput}
      />
    </Flex>
  );
}

export default memo(SearchDataInput);
