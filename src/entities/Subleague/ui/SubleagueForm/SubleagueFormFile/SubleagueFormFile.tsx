import { useMessageApi } from "@/app/Providers/MessageProvider";
import API, { baseURL } from "@/shared/api";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, type UploadFile, type UploadProps } from "antd";
import { memo, useState, type Dispatch, type SetStateAction } from "react";

interface IProps {
  logo: string;
  setLogo: Dispatch<SetStateAction<string>>;
}

function SubleagueFormFile({ logo, setLogo }: IProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const message = useMessageApi();

  const props: UploadProps = {
    name: "file",
    maxCount: 1,
    listType: "picture",
    fileList,
    customRequest: async (options) => {
      const { file, onSuccess, onError, onProgress } = options;

      const formData = new FormData();
      formData.append("file", file);

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

        if (!res.data) throw new Error();

        if (onSuccess) {
          onSuccess(res.data, file);
          setFileList([
            {
              uid: String(Date.now()),
              name: res.data.filename,
              status: "done",
              url: `${baseURL}${res.data.path}`,
            },
          ]);
          setLogo(res.data.path);
        }
      } catch (error) {
        message.error("Error uploading file");
        if (onError) {
          onError(error as Error);
        }
      }
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
}

export default memo(SubleagueFormFile);
