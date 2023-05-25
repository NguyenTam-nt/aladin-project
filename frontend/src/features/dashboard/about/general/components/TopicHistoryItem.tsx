import { ICDeleteImage } from "@assets/icons/ICDeleteImage";
import { ICSave } from "@assets/icons/ICSave";
import { Button } from "@components/Button";
import DialogConfirmDelete from "@components/DialogConfirmDelete";
import { Input } from "@components/Input";
import { InputMultiLine } from "@components/InputMultiLine";
import { Colors } from "@constants/color";
import { ModalContext } from "@contexts/ModalContext";
import { TranslateContext } from "@contexts/Translation";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import TitleInput from "@features/dashboard/components/TitleInput";
import clsx from "clsx";
import {
  ChangeEvent,
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type PropsTopicHistoryItem = {
  type?: "ADD" | "EDIT";
  data?: {
    year: string;
    des: string;
    image: string;
  };
  onSubmit?: () => void;
};

export const TopicHistoryItem = memo(
  ({ type = "EDIT", data, onSubmit }: PropsTopicHistoryItem) => {
    // const [currentHistory, setCurrentHistory] = useState(data)
    const {t} = useContext(TranslateContext)
    const {setElementModal} = useContext(ModalContext)
    const handleShowModal = () => {
        setElementModal(<DialogConfirmDelete message={t("admin._notice._delete_history")} />)
    }

    const currentHistory = useMemo(() => {
      return data;
    }, [data]);



    return (
      <>
        <div className="flex gap-x-[24px] relative">
          <div className="w-[312px]">
            <InputYear value={currentHistory?.year ?? ""} />
            <InputUpFile image={currentHistory?.image ?? ""} />
            {type === "ADD" ? (
              <Button
                onClick={onSubmit}
                className="mt-[12px]"
                imageLeft={
                  <span className="mr-2">
                    <ICSave />
                  </span>
                }
                color="primary"
                text="button._save"
              />
            ) : null}
          </div>
          <DescriptionInput value={currentHistory?.des ?? ""} />
          <button onClick={handleShowModal} className="absolute top-[50%] right-[-20px] 2xl:right-[-44px] translate-y-[-50%]">
            <ICDeleteImage width={20} height={20} color={Colors.text_C53434} />
          </button>
        </div>
      </>
    );
  }
);

const InputYear = memo(({ value }: { value: string }) => {
  return (
    <div className="w-full">
      <TitleInput
        forId={"admin._about._general._form._year"}
        name="admin._about._general._form._year"
      />
      <Input
        value={value}
        onChange={() => {}}
        id="admin._about._general._form._year"
        placeholder="admin._about._general._form._year_placeholder"
      />
    </div>
  );
});

const InputUpFile = memo(({ image }: { image: string }) => {
  const refInput = useRef<HTMLInputElement>(null);
  const [imageHistory, setImageHistory] = useState(image);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImageHistory(URL.createObjectURL(file));
  }, []);

  const handleClickInput = useCallback(() => {
    refInput.current?.click();
  }, []);

  return (
    <div className="w-full mt-[24px]">
      <TitleInput forId={""} name="admin._about._general._form._upload" />
      <div className="h-[168px]">
        <div className={clsx("h-full", { hidden: !!imageHistory })}>
          <InputUploadFile ref={refInput} onChange={handleChange} />
        </div>
        <button
          onClick={handleClickInput}
          className={clsx("h-full w-full", { hidden: !imageHistory })}
        >
          <ImagePreview url={imageHistory} />
        </button>
      </div>
    </div>
  );
});

const DescriptionInput = memo(({ value }: { value: string }) => {
  return (
    <div className="flex-1">
      <TitleInput
        forId={"admin._about._general._form._des"}
        name="admin._about._general._form._des"
      />
      <InputMultiLine
        onChange={() => {}}
        value={value}
        id="admin._about._general._form._des"
        placeholder="admin._about._general._form._des_placeholder"
      />
    </div>
  );
});
