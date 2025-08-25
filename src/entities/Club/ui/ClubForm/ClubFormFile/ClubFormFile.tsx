import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import API, { baseURL } from "@/shared/api";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import {
  memo,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  setLogo: Dispatch<SetStateAction<string>>;
  logo: string;
}

function ClubFormFile({ setLogo, logo }: IProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const message = useMessageApi();
  const { t } = useTranslation();

  useEffect(() => {
    if (logo) {
      setFileList([
        {
          uid: "-1",
          name: "logo-type",
          status: "done",
          url: `${baseURL}${logo}`,
        },
      ]);
    }
  }, [logo]);

  const props: UploadProps = {
    maxCount: 1,
    name: "file",
    listType: "picture",
    fileList,
    customRequest: async (options) => {
      const { file, onProgress, onSuccess, onError } = options;

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
            onUploadProgress: (e) => {
              const percent = e.total
                ? Math.round((e.loaded / e.total) * 100)
                : 0;
              onProgress?.({ percent });
            },
          }
        );

        message.success(t("File uploaded successfully!"));

        if (onSuccess) {
          onSuccess(res.data, file as any);
          setLogo(res.data.path);
          setFileList([
            {
              uid: String(Date.now()),
              name: "logo-type",
              status: "done",
              url: `${baseURL}${res.data.path}`,
            },
          ]);
        }
      } catch (err) {
        message.error(t("Error uploading file!"));
        if (onError) {
          onError(err as any);
        }
      }
    },

    onRemove: async () => {
      try {
        if (logo) {
          const res = await API.delete("/api/v1/upload/file", {
            data: { path: logo },
          });
          console.log(res);
          setLogo("");
          setFileList([]);
          message.success(t("File deleted successfully!"));
        }
      } catch (error) {
        message.error(t("Error deleting file!"));
      }
    },
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>{t("Click to Upload")}</Button>
      </Upload>
    </>
  );
}

export default memo(ClubFormFile);
