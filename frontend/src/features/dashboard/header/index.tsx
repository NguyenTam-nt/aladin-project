import React, { memo, useContext } from 'react'
import { HeaderAdmin } from '../components/HeaderAdmin'
import { SubHeaderTopic } from '../home/components/SubHeaderTopic'
import { TranslateContext } from '@contexts/Translation'
import DialogConfirmDelete from '@components/DialogConfirmDelete';
import { ModalContext } from '@contexts/ModalContext';
import { InputSwitch } from '@components/InputSwitch';
import { ICEdit } from '@assets/icons/ICEdit';
import { ICClear } from '@assets/icons/ICClear';
import { ModalHandleMenu } from './components/ModalHandleMenu';

const data = [
    {
      name: "Tin tức",
      child: ["Đào tạo", "Sự kiên"],
    },
    {
      name: "Đào tạo",
      child: ["Hệ chính quy", "Hệ sau đại học"],
    },
  ];

export const Header = () => {
    const {t} = useContext(TranslateContext)
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
          return <CategoryItem value={item} key={index} />;
        })}
      </div>
    </>
  )
}

type Props = {
    value: {
      name: string;
      child: string[];
    };
  };
  
  const CategoryItem = memo(({ value }: Props) => {
    const { t } = useContext(TranslateContext);
    const { setElementModal } = useContext(ModalContext);
    const handleShowModal = () => {
      setElementModal(
        <DialogConfirmDelete message={t("admin._notice._delete_category")} />
      );
    };
  
    const handleShowModalEdit = () => {
      setElementModal(<ModalHandleMenu  />);
    };
  
    return (
      <div className=" grid grid-cols-[25%_1fr_145px] items-center text-_14 text-text_primary py-[28px] border-b border-br_E9ECEF ">
        <div>{value.name}</div>
        <div>{value.child.join(", ")}</div>
        <div className="flex items-center gap-x-[12px]">
          <InputSwitch />
          <button onClick={handleShowModalEdit}>
            <ICEdit />
          </button>
          <button onClick={handleShowModal}>
            <ICClear />
          </button>
        </div>
      </div>
    );
  });
  