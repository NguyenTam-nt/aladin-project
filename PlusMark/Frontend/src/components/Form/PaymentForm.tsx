import { Input } from "@components/common/Input";
import InputPayment from "@components/common/InputPayment";
import SelectInputPayment from "@components/common/SelectInputPayment";
import useI18n from "@hooks/useI18n";
import { some } from "@utility/helper";
import React, { useState, useRef, useEffect } from "react";

// import province_data from "./province_date.json";
import province_data from "../../utility/province_date.json";
import { VietNamFlag } from '@assets/icons'
import PrevIconElm from "@assets/iconElements/PrevIconElm";
import { KoreanFlagImage, VietnamsFlagImage } from "@assets/images";
import useFocusOut from "@hooks/useFocusOut";
import { colors } from "@utility/colors";
import { InputComponent } from "@components/input/InputComponent";

export type WardType = {
  Level: string;
  Id?: string;
  Name?: string;
};

export type DistrictType = {
  Wards: WardType[];
  Id: string;
  Name: string;
};

export type ProvinceType = {
  Districts: DistrictType[];
  Id: string;
  Name: string;
};

type Props = {
  formik: any;
};

export type COUNTRY = 'Vietnamese' | 'Korea'
const MOBILE_TELEPHONE_PREFIXES: { country: COUNTRY; telephone_prefixes: string, image: string }[] = [
  { country: "Vietnamese", telephone_prefixes: "+84", image: VietnamsFlagImage },
  { country: "Korea", telephone_prefixes: "+82", image: KoreanFlagImage },
]

function PaymentForm({ formik }: Props) {
  const { t } = useI18n();
  const defaultOption = { value: "", label: "" };

  const [name, setname] = useState("");
  const [province, setProvince] = useState<some>(defaultOption);
  const [district, setDistrict] = useState<some>(defaultOption);
  const [commune, setCommune] = useState<some>(defaultOption);
  const [provinceOptions, setProvinceOptions] = useState<some[]>([]);
  const [districtOptions, setDistrictOptions] = useState<some[]>([]);
  const [communeOptions, setCommuneOptions] = useState<some[]>([]);
  const [preview, setPreview] = useState(MOBILE_TELEPHONE_PREFIXES[0]);

  useEffect(() => {
    if (province_data) {
      let optopns = province_data.map((a) => {
        return { value: a.Name, label: a.Name, district: a.Districts };
      });
      setProvinceOptions(optopns);
    }
  }, []);
  // console.log(province, district, commune);

  const onchangeProvince = (s: any) => {
    setProvince(s);
    setDistrict(defaultOption);
    setCommune(defaultOption);
    if (s.district) {
      setDistrictOptions(
        s.district.map((d: DistrictType) => {
          return { value: d.Name, label: d.Name, commune: d.Wards };
        })
      );
    }

    formik.setValues({
      ...formik.values,
      province: s.label,
      district: null,
      commune: null,
    });
  };

  const onchangeDistrict = (s: any) => {
    setDistrict(s);
    setCommune(defaultOption);
    if (s.commune) {
      setCommuneOptions(
        s.commune.map((d: WardType) => {
          return { value: d.Name, label: d.Name };
        })
      );
    }

    formik.setValues({
      ...formik.values,
      district: s.label,
      commune: null,
    });
  };

  const onchangeCommune = (s: any) => {
    setCommune(s);
    formik.setValues({
      ...formik.values,
      commune: s.label,
    });
  };

  const {
    clickShow,
    setClickShow,
    ref
  } = useFocusOut();

  const SelectPhoneNumber = () => {
    return (
      <>
        <div ref={ref}>
          <div className="flex flex-row gap-x-1 justify-center items-center">
            <img src={preview.image} alt={preview.country} />
            <p>{preview.telephone_prefixes}</p>
            <div className="relative">
              <button
                onClick={() => setClickShow((prev) => !prev)}
                className="-rotate-90 flex justify-center items-center">
                <div className="">
                  <PrevIconElm width={15} height={12} color={colors.darkOrange} />
                </div>
              </button>
              {
                clickShow && (
                  <div className="absolute z-10 w-[104px] top-4 left-0 ">
                    <div className="bg-neutra-neutral98 rounded">
                      {
                        MOBILE_TELEPHONE_PREFIXES.map((it, idx) => {
                          return (
                            it.country !== preview.country && (
                              <>
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setPreview(it)
                                    setClickShow((prev => !prev))
                                  }}
                                  className="px-[9px] py-[6px] flex flex-row gap-x-2 justify-center items-center" >
                                  <img src={it.image} alt={it.country} className="" />
                                  <p className="w-11 flex items-start text-normal text-neutra-neutral2 font-normal font-NunitoSans">{it.telephone_prefixes}</p>
                                </button >
                              </>
                            )
                          )
                        })
                      }
                    </div>
                  </div>
                )
              }
            </div>
          </div>

        </div >
      </>
    )
  }

  return (
    <div>
      <div className="mb-2">
        <label className="text-text font-bold">
          {t("payment.info_delivery.form.name")}{" "}
          <span className="text-red-500">*</span>
        </label>
      </div>
      <div className="h-10 mb-4">
        <InputPayment
          className="border-[1px] border-solid border-neutra-neutra80"
          name="fullname"
          value={formik.values.fullname}
          setValue={formik.handleChange}
          label={t("payment.info_delivery.form.name")}
          required
          onBlur={formik.handleBlur}
          autoFocus={true}
        />
      </div>
      <div className="mb-2">
        <label className="text-text font-bold">
          {t("payment.info_delivery.form.phone")}{" "}
          <span className="text-red-500">*</span>
        </label>
      </div>
      <div className="h-10 mb-4">
        <InputComponent
          value={formik.values.phoneNumber}
          name="phoneNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="payment.info_delivery.form.phone"
          className="text-normal1"
          renderLeft={() => {
            return (
              <span className="mr-[16px]">
                <SelectPhoneNumber />
              </span>
            );
          }}
        />
      </div>
      <div className="mb-2">
        <label className="text-text font-bold">
          {t("payment.info_delivery.form.email")}{" "}
          <span className="text-red-500">*</span>
        </label>
      </div>
      <div className="h-10 mb-4">
        <InputPayment
          className="border-[1px] border-solid border-neutra-neutra80 "
          name="email"
          value={formik.values.email}
          setValue={formik.handleChange}
          label={t("payment.info_delivery.form.email")}
          required
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="mb-2">
        <label className="text-text font-bold">
          {t("payment.info_delivery.form.address")}{" "}
          <span className="text-red-500">*</span>
        </label>
      </div>
      <div className="lg:flex lg:flex-wrap justify-between">
        <div className="h-10 mb-4 lg:w-[49%]">
          <InputPayment
            className="border-[1px] border-solid border-neutra-neutra80 "
            name="address"
            value={formik.values.address}
            setValue={formik.handleChange}
            label={t("payment.info_delivery.form.address")}
            required
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="h-10 mb-4 lg:w-[49%]">
          <SelectInputPayment
            name="province"
            setValue={onchangeProvince}
            options={provinceOptions}
            value={province}
            label={t("payment.info_delivery.form.province")}
            required
          />
        </div>
        <div className="h-10 mb-4 lg:w-[49%]">
          <SelectInputPayment
            name="district"
            setValue={onchangeDistrict}
            options={districtOptions}
            value={district}
            label={t("payment.info_delivery.form.district")}
            required
          />
        </div>
        <div className="h-10 mb-4 lg:w-[49%]">
          <SelectInputPayment
            name="commune"
            setValue={onchangeCommune}
            options={communeOptions}
            value={commune}
            label={t("payment.info_delivery.form.commune")}
            required
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
