import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import API, { baseURL } from "@/shared/api";
import { useMessageApi } from "@/app/Providers/MessageProvider";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  setImages: Dispatch<SetStateAction<string[]>>;
  images: string[];
}

function NewsFormFile({ setImages, images }: IProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const message = useMessageApi();
  const { t } = useTranslation("news");

  useEffect(() => {
    if (images.length) {
      setFileList(
        images.map((url, idx) => ({
          uid: String(idx),
          name: url.split("/").pop() || `image-${idx}`,
          status: "done",
          url,
        }))
      );
    }
  }, [images]);

  const props: UploadProps = {
    multiple: true,
    listType: "picture",
    fileList,
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

        const newFile: UploadFile = {
          uid: (file as any).uid,
          name: (file as any).name,
          status: "done",
          url: res.data.path,
        };

        const newList = [...fileList, newFile];
        message.success(t("File uploaded successfully!"));

        if (onSuccess) {
          onSuccess(res.data, file as any);
          setFileList((prev) => [...prev, ...newList]);
          setImages((prev) => [...prev, `${baseURL}${res.data.path}`]);
        }
      } catch (err) {
        message.error(t("Error uploading file!"));
        if (onError) {
          onError(err as any);
        }
      }
    },

    onRemove: (file) => {
      const newList = fileList.filter((f) => f.uid !== file.uid);
      setFileList(newList);
      setImages(newList.map((f) => f.url!));
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

export default NewsFormFile;
