import { ICClear } from "@assets/icons/ICClear";
import { ICPlus } from "@assets/icons/ICPlus";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Colors } from "@constants/color";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, {
  ChangeEvent,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ICategory, ICategoryChild } from "@typeRules/news";
import { TextError } from "@features/dashboard/components/TextError";
import { TranslateContext } from "@contexts/Translation";
import { translateService } from "@services/translate";
import { debounce } from "lodash";

type Props = {
  type?: "ADD" | "EDIT";
  onSubmit: (data: ICategory) => void;
  data?: ICategory;
};

const firstDataChild = {
  name: "",
  nameKo: "",
  status: true
};

export const ModalCreateCategory = memo(({ type, onSubmit, data }: Props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      nameKo: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("message.warn._required"),
      nameKo: Yup.string().required("message.warn._required"),
    }),
    onSubmit: (dataValue) => {
      if(type === "ADD") {
        onSubmit({
          ...dataValue,
          status: true,
          children: listChild.filter(
            (item) => item.name !== "" || item.nameKo !== ""
          ),
        });
        return
      }
      onSubmit({
        id: data?.id,
        ...dataValue,
        status: data?.status,
        children: listChild.filter(
          (item) => item.name !== "" || item.nameKo !== ""
        ),
      });
    },
  });

  const { isVn } = useContext(TranslateContext);

  const [listChild, setListChild] = useState<ICategoryChild[]>(
    type === "ADD" ? [firstDataChild] : []
  );
  const debouncedFuc = useRef<ReturnType<typeof debounce>>();

  useEffect(() => {
    if (type === "EDIT") {
      formik.setFieldValue("name", data?.name);
      formik.setFieldValue("nameKo", data?.nameKo);
      if (data?.children) setListChild([...data?.children]);
    }
  }, [type, data]);

  const handleAddChild = () => {
    setListChild([...listChild, firstDataChild]);
  };

  const handleDeleteChild = (index: number) => {
    const newList = [...listChild];
    newList.splice(index, 1);
    setListChild([...newList]);
  };

  const onSubmitChild = (data: ICategoryChild, index: number) => {
    const newList = [...listChild];
    newList.splice(index, 1, data);
    setListChild([...newList]);
  };
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);
    if (debouncedFuc.current) debouncedFuc.current.cancel();
    debouncedFuc.current = debounce(async () => {
      try {
        if (isVn) {
          if (formik.values.name) {
            const content = await translateService.post(formik.values.name);
            formik.setFieldValue("nameKo", content);
          }
        }
        
      } catch (error) {
        
      }
    }, 300);
    debouncedFuc.current()
  }, [formik, isVn])

  return (
    <div className=" w-[800px] 2xl:w-[1144px] bg-white py-[40px] px-[24px]">
      <TitleForm
        title={
          type === "ADD"
            ? "admin.documents._category._form.title_add"
            : "admin.documents._category._form.title_edit"
        }
      />
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 gap-[24px]"
      >
        <div>
          <TitleInput
            forId="admin.documents._category._form.name_parent"
            name="admin.documents._category._form.name_parent"
          />
          <div className="relative">
            <Input
              value={isVn ? formik.values.name : formik.values.nameKo}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              name={isVn ? "name" : "nameKo"}
              id="admin.documents._category._form.name_parent"
              placeholder="admin.documents._category._form.name_parent_placeholder"
            />
            {formik.errors.name &&
              formik.errors.nameKo &&
              formik.touched.name && <TextError message={formik.errors.name} />}
          </div>
        </div>
        <div>
          <TitleInput
            forId="admin.documents._category._form.name_child"
            name="admin.documents._category._form.name_child"
          />
          <ListChildCategory
            data={listChild}
            onDeleteItem={handleDeleteChild}
            onSubmitChild={onSubmitChild}
          />
        </div>
        <div>
          <Button
            type="button"
            onClick={handleAddChild}
            text="admin.documents._category._form.btn_create"
            className="max-w-[212px] border border-secondary"
            color="empty"
            imageLeft={
              <span className="mr-2">
                <ICPlus color={Colors.secondary} />
              </span>
            }
          />
        </div>
        <GroupButtonAdmin />
      </form>
    </div>
  );
})

type PropsListCategory = {
  data: ICategoryChild[];
  onDeleteItem: (index: number) => void;
  onSubmitChild: (data: ICategoryChild, index: number) => void;
};

const ListChildCategory = memo(
  ({ data, onDeleteItem, onSubmitChild }: PropsListCategory) => {
    return (
      <div className="grid grid-cols-1 gap-y-[24px]">
        {data.map((item, index) => {
          return (
            <ListChildCategoryItem
              key={index}
              data={item}
              index={index}
              onDeleteItem={onDeleteItem}
              onSubmitChild={onSubmitChild}
            />
          );
        })}
      </div>
    );
  }
);

type PropsListCategoryItem = {
  data: ICategoryChild;
  onDeleteItem: (index: number) => void;
  index: number;
  onSubmitChild: (data: ICategoryChild, index: number) => void;
};

const ListChildCategoryItem = memo(
  ({ data, onDeleteItem, index, onSubmitChild }: PropsListCategoryItem) => {
    const [dataChild, setDataChild] = useState(data);
    const { isVn } = useContext(TranslateContext);
    const debouncedFuc = useRef<ReturnType<typeof debounce>>();

    const handleDelete = () => {
      onDeleteItem(index);
    };

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      const newData = {
        ...dataChild,
        [isVn ? "name" : "nameKo"]: event.target.value,
      };
      setDataChild(newData);
      if (event.target.value.trim()) {
        onSubmitChild(newData, index);
      }
      if (debouncedFuc.current) debouncedFuc.current.cancel();

      debouncedFuc.current = debounce(async () => {
        try {
          if (isVn) {
            if (event.target.value !== "") {
              const content = await translateService.post(event.target.value);
              setDataChild({
                name: event.target.value,
                nameKo: content,
              });
              onSubmitChild(
                {
                  name: event.target.value,
                  nameKo: content,
                },
                index
              );
            }
          }
        } catch (error) {}
      }, 300);
      debouncedFuc.current();
    }, [dataChild, index, isVn, onSubmitChild])

    return (
      <div className="flex items-center gap-x-[24px] w-full">
        <div className="flex-1 relative">
          <Input
            id="admin.documents._category._form.name_child"
            value={isVn ? dataChild.name : dataChild.nameKo}
            name="name"
            onChange={handleChange}
            placeholder="admin.documents._category._form.name_child_placeholder"
          />
        </div>
        <button onClick={handleDelete}>
          <ICClear />
        </button>
      </div>
    );
  }
);
