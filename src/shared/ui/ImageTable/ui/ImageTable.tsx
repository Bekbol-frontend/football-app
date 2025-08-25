import { baseURL } from "@/shared/api";
import { FileImageOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { memo } from "react";

interface IProps {
  logo?: string;
}

function ImageTable({ logo }: IProps) {
  return (
    <Flex
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      {logo ? (
        <img
          src={`${baseURL}${logo}`}
          alt="logo"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <FileImageOutlined />
      )}
    </Flex>
  );
}

export default memo(ImageTable);
