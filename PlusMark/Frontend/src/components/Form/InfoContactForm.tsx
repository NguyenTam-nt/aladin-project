import BtnLoading from "@components/btn-loading/BtnLoading";
import { ToastContex } from "@contexts/ToastContex";
import ContactServices, { DataContactInfo } from "@services/ContactServices";
import InputFieldArrayElement from "commons/components/InputComponent/InputFieldArrayElement";
import { FormikProvider, useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from "yup";

export default function InfoContactForm({
  infoContact,
}: {
  infoContact: DataContactInfo | undefined;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onAddToast } = useContext(ToastContex);
  const defaultStore = {
    address: "",
    linkGgMap: "",
  };
  const formik = useFormik({
    initialValues: {
      workingTime: infoContact?.workingTime || "",
      stores: infoContact?.stores.concat([defaultStore]) || [defaultStore],
    },
    validationSchema: yup.object().shape({
      stores: yup.array().of(
        yup.object().shape(
          {
            address: yup.string().when("linkGgMap", {
              is: (linkGgMap: string) => linkGgMap && linkGgMap.length,
              then: (schema) => schema.required("Vui lòng nhập địa chỉ"),
            }),
            linkGgMap: yup
              .string()
              .when("address", {
                is: (address: string) => address && address.length,
                then: (schema) => schema.required("Vui lòng nhập link maps"),
              })
              .nullable()
              .matches(
                /^<iframe src="https:\/\/(www\.)?google\.[a-z]+\/maps\/embed\?[^"]+"*\s*[^>]+>*<\/iframe>$/,
                "Vui lòng nhập đúng định dạng link maps"
              ),
          },
          [
            ["address", "linkGgMap"],
            ["linkGgMap", "linkGgMap"],
          ]
        )
      ),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        values = {
          ...values,
          stores: values.stores
            .filter((store) => {
              const empStore = Object.values(store).filter((item) => !item);
              if (empStore.length !== Object.values(store).length) {
                return store;
              }
            })
            .map((item) => {
              return {
                ...item,
              };
            }),
        };
        const response = await ContactServices.putInfo(values);
        if (response.status == 200) {
          return onAddToast({ type: "success", message: `Lưu thành công` });
        }
        return onAddToast({ type: "error", message: `Có lỗi xảy ra` });
      } catch (ex) {
        console.log(ex);
        onAddToast({ type: "error", message: `Có lỗi xảy ra` });
      } finally {
        setIsLoading(false);
      }
    },
  });
  const { handleChange, handleSubmit, values, resetForm, errors, touched } =
    formik;
  const hamdleCancel = () => {
    resetForm();
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <div className="w-full xl:w-2/3">
          <div className="mb-8 flex flex-col gap-[10px]">
            <label className="text-lg font-normal text-[#F45538]">
              Thời gian làm việc
            </label>
            <div className="flex flex-col gap-2">
              <textarea
                name="workingTime"
                value={values.workingTime}
                placeholder="Nhập thời gian làm việc"
                onChange={handleChange}
                className="w-full py-3 px-5 textInput resize-none"
                rows={2}
              />
            </div>
          </div>
          <div className="mb-8">
            <label className="text-lg font-normal text-[#F45538]">
              Cơ sở làm việc
            </label>
            <InputFieldArrayElement
              name="stores"
              values={values}
              onChange={handleChange}
              placeholder={{
                address: "Nhập tên địa chỉ",
                linkGgMap: "Nhập link maps cho cơ sở này",
              }}
              errors={errors.stores}
              touched={touched.stores}
            />
          </div>
        </div>
        <div className="flex item-center mt-7 mb-[59px] gap-5">
          <button
            type="button"
            className="rounded-md py-2 px-3 border border-main flex items-center text-main text-smal font-normal bg-icon"
            onClick={hamdleCancel}
          >
            Hủy bỏ
          </button>
          <BtnLoading
            isLoading={isLoading}
            type="submit"
            className="btn-normal text-sm leading-18 mr-10px"
          >
            Lưu thông tin
          </BtnLoading>
        </div>
      </form>
    </FormikProvider>
  );
}
