import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { HeaderAdmin } from '../components/HeaderAdmin'
import { SubHeaderTopic } from '../home/components/SubHeaderTopic'
import { TranslateContext } from '@contexts/Translation'
import { ModalContext } from '@contexts/ModalContext';
import { InputSwitch } from '@components/InputSwitch';
import { ICEdit } from '@assets/icons/ICEdit';
import { ModalHandleMenu } from './components/ModalHandleMenu';
import type { IHeader } from '@typeRules/footer';
import { headerService } from '@services/header'
import { PopUpContext } from '@contexts/PopupContext';

export const Header = () => {
    const {t} = useContext(TranslateContext)
    const [data, setData] = useState<IHeader[]>([])
    useEffect(() => {
      headerService.getByIndex().then(data => {
        setData(data)
      })
    }, [])

    const handleSubmit = (newData:IHeader) => {
      const newDatas = [...data]
      const index = data.findIndex(item => item.id === newData.id)
      newDatas.splice(index, 1, newData)
        setData([...newDatas])
    }
  return (
    <>
        <HeaderAdmin title='admin._header.title' />
        <SubHeaderTopic title='admin._header.sub_title' />
        <div>
        <div className=" grid grid-cols-[25%_1fr_145px] items-center text-_18 font-semibold text-text_primary pb-[16px] border-b border-br_E9ECEF ">
          <div>{t("admin._header._table._name_parent")}</div>
          <div>{t("admin._header._table._name_child")}</div>
          <div>{t("admin._header._table._func")}</div>
        </div>
        {data.map((item, index) => {
          return <CategoryItem onEdit={handleSubmit} value={item} key={index} />;
        })}
      </div>
    </>
  )
}

type Props = {
    value: IHeader
    onEdit: (data:IHeader) => void
  };
  
  const CategoryItem = memo(({ value, onEdit }: Props) => {
    const { isVn } = useContext(TranslateContext);
    const { setElementModal } = useContext(ModalContext);
    const {showSuccess, showError} = useContext(PopUpContext)

    const handleShowModalEdit = () => {
      setElementModal(<ModalHandleMenu onEdit={onEdit} data={value} />);
    };

    const listItemString = useMemo(() => {
      return value?.items ? value.items.map(item => isVn ? item.name : item.nameKo).join(", ") : ""
    }, [isVn, value.items])

    const handleSubmitStatus = useCallback(() => {
      headerService.put({
        ...value,
        status: !value.status
      }).then((data) => {
     
        onEdit({...data})
        showSuccess("message.success._success")
      }).catch(() => {
        showError("message.error._error")
      })
  
    }, [onEdit, showError, showSuccess, value]);
  
 
  
    return (
      <div className=" grid grid-cols-[25%_1fr_145px] items-center text-_14 text-text_primary py-[28px] border-b border-br_E9ECEF ">
        <div>{value.name}</div>
        <div>{listItemString}</div>
        <div className="flex items-center gap-x-[12px]">
          <InputSwitch checked={value.status} onChange={handleSubmitStatus} />
          <button onClick={handleShowModalEdit}>
            <ICEdit />
          </button>
        </div>
      </div>
    );
  });
  