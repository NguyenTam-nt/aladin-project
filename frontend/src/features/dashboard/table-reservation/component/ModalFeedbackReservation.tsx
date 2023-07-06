import TitleInput from "@components/TitleInput";
import { FomatDateYY_MM_DD } from "@constants/formatDateY_M_D";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { Input } from "@features/dashboard/components/Input";
import { Radio } from "@features/dashboard/components/Radio";
import { Textarea } from "@features/dashboard/components/Textarea";
import { reservationTableSvice } from "@services/reservationTableSevice";
import type { book_table } from "@typeRules/tableReservation";
import { value } from "dom7";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

interface Props {
  idItem: number;
  handleUpdate: (data: book_table) => void;
}
const ModalFeedbackReservation = ({ idItem, handleUpdate }: Props) => {
  const { t } = useTranslation();
  const { hideModal, setElementModal } = useModalContext();
  const { showError, showSuccess } = useShowMessage();
  const [isFeetback, setFeetback] = useState<boolean>(true);
  const formik = useFormik<book_table>({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      numGuest: 0,
      chooseDate: "",
      chooseIdInfrastructure: 0,
      chooseInfrastructure: "",
      note: "",
      record: null,
      feedback: "",
      status: true,
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const dataUpdate = {
          ...values,
          record: values.record !== null ? values.record : true,
          status: true,
        };
        const resultUpdate = await reservationTableSvice.putReservationTable(
          dataUpdate
        );
        handleUpdate(resultUpdate);
        showSuccess("tableReservation.changeSuccess");
      } catch (error) {
        showError("message.actions.error.delete_banner");
      }
    },
  });
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange: handleChangeFomik,
    handleReset,
    setValues,
    setFieldValue,
    handleSubmit,
  } = formik;

  const getDetailReverTable = async (id: number) => {
    try {
      const resultDetail = await reservationTableSvice.getReserTableById(id);
      setValues({
        ...resultDetail,
      });
      const recordStatus = resultDetail.record === false ? false : true;
      // setFeetback(resultDetail.feedback ? false : true);
      setFeetback(recordStatus);
    } catch (error) {
      console.log("Không thể lấy chi tiết yêu cầu đặt bàn.");
    }
  };

  useEffect(() => {
    getDetailReverTable(idItem);
  }, [idItem]);

  return (
    <div className="w-[1144px] h-auto bg-white py-10 px-6">
      <h2 className="text-_32 font-bold text-text_primary uppercase text-center mb-10">
        {t("tableReservation.form.title")}
      </h2>
      <div className="">
        <h3 className="text-_20 font-bold text-text_primary text-left mb-3">
          {t("tableReservation.form.customer_title")}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <TitleInput isRequired={true} name={"form.name"} />
            <Input value={values.name} readOnly />
          </div>
          <div className="col-span-1">
            <TitleInput isRequired={true} name={"form.phoneNumber"} />
            <Input value={values.phone} readOnly />
          </div>
          <div className="col-span-1">
            <TitleInput isRequired={true} name={"form.email"} />
            <Input value={values.email} readOnly />
          </div>
          <div className="col-span-1">
            <TitleInput isRequired={false} name={"form.numberCustomers"} />
            <Input value={values.numGuest} readOnly />
          </div>
          <div className="col-span-1">
            <TitleInput isRequired={true} name={"form.day"} />
            <input
              value={FomatDateYY_MM_DD(values.chooseDate)}
              type="date"
              readOnly
              className="h-[48px] placeholder:text-text_A1A0A3 placeholder:text-_14 w-full flex items-center py-[13px] px-[16px] border-[1px] border-solid border-text_A1A0A3 focus-within:!border-TrueBlue_500 "
            />
          </div>
          <div className="col-span-1">
            <TitleInput isRequired={true} name={"form.hour"} />
            <input
              type="time"
              readOnly
              value={FomatDateYY_MM_DD(values.chooseDate, true)}
              className="h-[48px] placeholder:text-text_A1A0A3 placeholder:text-_14 w-full flex items-center py-[13px] px-[16px] border-[1px] border-solid border-text_A1A0A3 focus-within:!border-TrueBlue_500 "
            />
          </div>

          <div className="col-span-2">
            <TitleInput isRequired={false} name={"form.place"} />

            <Input value={values.chooseInfrastructure} readOnly />
          </div>
        </div>
      </div>
      <div className="mt-6">
        {/* <h3 className="text-_20 font-bold text-text_primary text-left mb-6">
          {t("adminContact.form.response_title")}
        </h3> */}

        <div className="">
          <TitleInput isRequired={false} name={"form.note"} />
          <Textarea value={values.note} readOnly />
        </div>
      </div>
      <div>
        <div className="mt-2">
          <TitleInput isRequired={true} name={"adminContact.form.response"} />
          <div className="flex gap-6">
            <div className="flex items-center">
              <Radio
                id="tableReservation.record_reques_order_table"
                name="record"
                onChange={() => {
                  !values.status && setFeetback(true);
                  !values.status && setFieldValue("record", true);
                  !values.status && setFieldValue("feedback", null);
                }}
                checked={isFeetback}
              />
              <label
                htmlFor="tableReservation.record_reques_order_table"
                className=" text-GreyPrimary text-_14 ml-[6px]"
              >
                {t("tableReservation.record_reques_order_table")}
              </label>
            </div>
            <div className="flex items-center">
              <Radio
                id="tableReservation.declinded_reques_order_table"
                name="record"
                onChange={() => {
                  !values.status && setFeetback(false);
                  !values.status && setFieldValue("record", false);
                }}
                checked={!isFeetback}
              />
              <label
                htmlFor="tableReservation.declinded_reques_order_table"
                className=" text-GreyPrimary text-_14 ml-[6px]"
              >
                {t("tableReservation.declinded_reques_order_table")}
              </label>
            </div>
          </div>
        </div>
        {!isFeetback && (
          <div className="mt-3">
            <TitleInput
              isRequired={false}
              name={"tableReservation.form.reason_for_refusa"}
            />
            <Input
              maxLength={255}
              readOnly={values.status}
              value={values.feedback || ""}
              name="feedback"
              onChange={handleChangeFomik}
            />
            {errors.feedback && touched.feedback && (
              <small className="text-xs font-normal mt-1 text-text_EA222A">
                {errors.feedback}
              </small>
            )}
          </div>
        )}
      </div>
      {!values.status && (
        <div className="flex justify-center items-center mt-[24px]">
          <Button
            type="button"
            onClick={hideModal}
            text="button._cancel"
            color="empty"
            className="!w-[120px] border border-TrueBlue_500 mr-[24px]"
          />
          <Button
            type="submit"
            onClick={() => handleSubmit()}
            text={true ? "button._save" : "button._save"}
            color="primary"
            className="!w-[120px]"
          />
        </div>
      )}
    </div>
  );
};

export default ModalFeedbackReservation;
