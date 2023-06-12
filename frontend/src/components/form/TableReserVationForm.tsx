// import { CalendarIcon } from "@assets/icons/iconComponent";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { SelectInput } from "@components/SelectInput";
import { Textarea } from "@components/Textarea";
import TitleInput from "@components/TitleInput";
import TitleOfContent from "@components/TitleOfContent";
import { useTranslation } from "react-i18next";

const TableReserVationForm = () => {
  const { t } = useTranslation();
  return (
    <div className="pb-[40px] lg:pb-36">
      <div className="h-auto lg:radius-tl-br bg-text_white py-[16px] lg:py-16 px-[20px] lg:px-28">
        <TitleOfContent
          name="titleofcontent.tableReserVationForm"
          className="w-full text-center mb-4 "
        />
        <p className="text-_14 lg:text-2xl text-center font-normal text-text_secondary">
          {t("form.timeOrder")}
        </p>
        <div className="mt-[38px] lg:mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] lg:gap-[24px]">
            <div>
              <TitleInput isRequired name="form.name" />
              <Input type="text" placeholder={"form.inputName"} />
            </div>
            <div>
              <TitleInput isRequired name="form.phoneNumber" />
              <Input
                type="text"
                placeholder={t("form.inputPhoneNumber") as string}
              />
            </div>
            <div>
              <TitleInput isRequired name="form.email" />
              <Input type="text" placeholder={t("form.inputEmail") as string} />
            </div>
            <div>
              <TitleInput isRequired name="form.numberCustomers" />
              <Input
                type="text"
                placeholder={t("form.inputNumberCustomers") as string}
              />
            </div>
            <div className="col-span-1 relative">
              <TitleInput isRequired name="form.day" />
              <Input
                type="date"
                placeholder={t("form.choseDayOder") as string}
              />
            </div>
            <div>
              <TitleInput isRequired name="form.hour" />
              <Input
                type="time"
                placeholder={t("form.choseHourOder") as string}
              />
            </div>
            <div className="lg:col-span-2">
              <TitleInput isRequired name="form.place" />
              <SelectInput
               className=" rounded-[16px_0_16px_0]"
              >
                <>
                  <option disabled>{t("form.chosePlace")}</option>
                  <option>cơ sở 1</option>
                  <option>cơ sở 2</option>
                  <option>cơ sở 3</option>
                  <option>cơ sở 4</option>
                </>
              </SelectInput>
            </div>
            <div className="lg:col-span-2">
              <TitleInput isRequired name="form.note" />
              <Textarea
                rows={6}
                className="w-full resize-none px-3 py-2 placeholder:text-sm radius-tl-br16 outline-none border border-br_E6E6E6"
                placeholder={t("form.inputNote") as string}
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-[24px]">
            <Button
              onClick={() => {
                console.log("aaaa");
              }}
              color="primary"
              text="form.tableReser"
              className="radius-tl-br16 w-spc167 py-3 text-center text-sm leading-5 font-bold"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableReserVationForm;
