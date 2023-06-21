import Editor from "@components/Editor";
import TitleInput from "@components/TitleInput";
import TitleOfContentManage from "@components/TitleOfContentManage";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { Input } from "@features/dashboard/components/Input";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { useHandleImage } from "@features/dashboard/home/useHandleImage";
import { useNavigate, useParams } from "react-router-dom";

const CreateNew = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { preViewImage, handleChange } = useHandleImage();
  return (
    <div>
      <TitleOfContentManage
        name={id ? "news.update" : "news.create"}
        className="mb-8"
      />
      <div>
        <div className="grid grid-cols-2 gap-[24px]">
          <div className="col-span-2 flex items-center gap-x-[24px]">
            <div>
              <TitleInput name="news.uploadImage" />
              <div className="w-[288px] h-[190px]">
                <InputUploadFile onChange={handleChange} />
              </div>
            </div>
            {!!preViewImage ? (
              <div className="w-[288px] flex flex-col">
                <div className="flex-1 w-full">
                  <TitleInput
                    isRequired={false}
                    forId=""
                    name="common.image_uploaded"
                  />
                  <div className=" w-full h-[190px]">
                    <ImagePreview url={preViewImage} onDelete={() => {}} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="col-span-2">
            <div className="mb-4">
              <TitleInput name="news.form.title" />
              <Input placeholder="news.form.inputTitle" />
            </div>
            <div className="w-full">
              <TitleInput name="news.form.des" />
              <Input placeholder="news.form.inputDes" />
            </div>
          </div>

          <div className=" col-span-2">
            <TitleInput name="news.form.content" />
            <Editor />
          </div>

          <div className=" col-span-2 flex justify-end">
            <GroupButtonAdmin
              onCancel={() => navigate(-1)}
              isAdd={id ? false : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNew;
