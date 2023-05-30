import { Input } from "@components/Input";
import { InputSwitch } from "@components/InputSwitch";
import { ModalContext } from "@contexts/ModalContext";
import { PopUpContext } from "@contexts/PopupContext";
import { TranslateContext } from "@contexts/Translation";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import { headerService } from "@services/header";
import { translateService } from "@services/translate";
import type { IHeader } from "@typeRules/footer";
import React, { ChangeEvent, useCallback, useContext, useState } from "react";

type Props = {
  data: IHeader;
  onEdit: (data:IHeader) => void
};

export const ModalHandleMenu = ({ data, onEdit }: Props) => {
  const [headers, setHeaders] = useState<IHeader>(data);
  const { isVn } = useContext(TranslateContext);
  const {showSuccess, showError} = useContext(PopUpContext)
  const {hideModal} = useContext(ModalContext)

  const handleChangeParent = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setHeaders({
      ...headers,
      [name]: value,
    });
  };

  const handleTranslateParent = useCallback(
    async (name: string, value: string) => {
      if (isVn) {
        const content = await translateService.post(value);
        console.log(`${name}Ko`)
        setHeaders({
          ...headers,
          [`${name}Ko`]: content,
        });
      }
    },
    [headers, isVn]
  );

  const handleBlur = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      handleTranslateParent(name, value);
    },
    [handleTranslateParent]
  );

  const handleChangeChild = (
    event: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (!headers.items?.length) return;
    const { name, value } = event.target;
    const newHeader = { ...headers };
    const indexHeader =
      newHeader.items?.findIndex((item) => item.id === id) ?? 0;
    if (newHeader.items) {
      newHeader.items[indexHeader] = {
        ...newHeader.items[indexHeader],
        [name]: value,
      };
    }
    setHeaders({
      ...newHeader,
    });
  };

  const handleBlurChild = useCallback(
    async (event: ChangeEvent<HTMLInputElement>, id: number) => {
      if (!headers.items?.length) return;
      const { name, value } = event.target;
      const newHeader = { ...headers };
      if (isVn) {
        const content = await translateService.post(value);
        const indexHeader =
          newHeader.items?.findIndex((item) => item.id === id) ?? 0;
        if (newHeader.items) {
          newHeader.items[indexHeader] = {
            ...newHeader.items[indexHeader],
            [`${name}Ko`]: content,
          };
        }
        setHeaders({
          ...newHeader,
        });
      }
    },
    [headers, isVn]
  );

  const handleSubmit = useCallback(() => {
    headerService.put(headers).then((data) => {
      setHeaders({...data})
      onEdit({...data})
      hideModal()
      showSuccess("message.success._success")
    }).catch(() => {
      showError("message.error._error")
    })

  }, [headers, onEdit, showError, showSuccess]);

  const handleCheckedItem = useCallback((id:number) => {
    if (!headers.items?.length) return;
    const newHeader = { ...headers };
    const indexHeader =
      newHeader.items?.findIndex((item) => item.id === id) ?? 0;
    if (newHeader.items) {
      newHeader.items[indexHeader] = {
        ...newHeader.items[indexHeader],
       status: !newHeader.items[indexHeader].status
      };
    }
    setHeaders({
      ...newHeader,
    });
  }, [headers])

  return (
    <div className="w-[1144px] bg-white py-[40px] px-[24px]">
      <TitleForm title="admin._header._form._title_edit" />
      <div className="grid grid-cols-1 gap-y-[24px]">
        <div>
          <TitleInput forId="" name="admin._header._form._name" />
          <Input
            onBlur={handleBlur}
            onChange={handleChangeParent}
            name={isVn ? "name" : "nameKo"}
            value={ isVn ? headers.name: headers.nameKo}
          />
        </div>
        {headers.items &&
          headers.items.map((item) => {
            return (
              <div key={item.id}>
                <TitleInput forId="" name="admin._header._form._category" />
                <div className="w-full flex items-center gap-x-[24px]">
                  <div className="flex-1">
                    <Input
                      onBlur={(event) =>
                        handleBlurChild(event, Number(item.id))
                      }
                      onChange={(event) =>
                        handleChangeChild(event, Number(item.id))
                      }
                      name={isVn ? "name" : "nameKo"}
                      value={isVn ? item.name : item.nameKo}
                    />
                  </div>
                  <InputSwitch onChange={() => handleCheckedItem(Number(item.id))} checked={item.status} />
                </div>
              </div>
            );
          })}
        <GroupButtonAdmin onSubmit={handleSubmit} isAdd={false} />
      </div>
    </div>
  );
};
