import { SubHeaderTopic } from "@features/dashboard/home/components/SubHeaderTopic";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import TitleInput from "../../TitleInput";
import { Input } from "@components/Input";
import { FooterInfoType, IFooterInfo } from "@typeRules/footer";
import { footerService } from "@services/footer";
import { PopUpContext } from "@contexts/PopupContext";

const titleFooterInfo = [
  {
    type: FooterInfoType.fb,
    title: "admin._footer._contact._fb",
  },
  {
    type: FooterInfoType.yt,
    title: "admin._footer._contact._yt",
  },
  {
    type: FooterInfoType.lk,
    title: "admin._footer._contact._lk",
  },
];

export const FooterContact = () => {
  const [data, setData] = useState<IFooterInfo[]>([]);

  useEffect(() => {
    footerService.getFooterInfo().then((data) => {
      const newData = data.data.map((_item) => {
        return {
          title: titleFooterInfo.find((item) => item.type === _item.type)
            ?.title,
          ..._item,
        };
      });
      setData(newData);
    });
  }, []);

  return (
    <div>
      <SubHeaderTopic title="admin._footer._contact._title" />
      <div className="flex flex-col gap-y-[16px]">
        {data.map((item, index) => {
          return <FooterContactItem key={index} data={item} />;
        })}
      </div>
    </div>
  );
};
type PropsItem = {
  data: IFooterInfo;
};
const FooterContactItem = ({ data }: PropsItem) => {
  const [values, setValues] = useState<IFooterInfo>(data);
  const {showError, showSuccess} = useContext(PopUpContext)

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        link: event.currentTarget.value
      })
  }

  const handleBlur = (event:ChangeEvent<HTMLInputElement>) => {
    if(event.target.value.trim() !== data?.link) {
      footerService.putFooterInfo({
        ...values
      }).then(() => {
        showSuccess("message.success._success")
      }).catch(() => {
        showError("message.error._error")
      })
    }
}

  return (
    <div className="">
      <TitleInput name={values?.title ?? ""} forId="" />
      <Input
        value={values.link}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="admin._footer._contact._placeholder"
      />
    </div>
  );
};
