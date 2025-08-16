import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import API from "@/shared/api";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  setImages: Dispatch<SetStateAction<string[]>>;
}

function NewsFormFile({ setImages }: IProps) {
  const message = useMessageApi();
  const { t } = useTranslation("news");

  const props: UploadProps = {
    multiple: true,
    customRequest: async (options) => {
      const { file, onSuccess, onError } = options;

      const formData = new FormData();
      formData.append("file", file as Blob);

      try {
        const res = await API.post<{ filename: string; path: string }>(
          "/api/v1/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        message.success(t("File uploaded successfully!"));

        if (onSuccess) {
          onSuccess(res.data, file as any);
          setImages((prev) => [...prev, res.data.path]);
        }
      } catch (err) {
        message.error(t("Error uploading file!"));
        if (onError) {
          onError(err as any);
        }
      }
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>{t("Click to Upload")}</Button>
    </Upload>
  );
}

export default NewsFormFile;
