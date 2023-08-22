import useI18n from '@hooks/useI18n'
import { some } from '@utility/helper'
import InputPayment from '@components/common/InputPayment'
import SelectInputPayment from '@components/common/SelectInputPayment'
import province_data from './province_date.json'
import { useState, useEffect } from 'react'
import { MasterCard, VisaCard } from '@assets/icons'

export type WardType = {
    Level: string,
    Id?: string,
    Name?: string
}


export type DistrictType = {
    Wards: WardType[],
    Id: string,
    Name: string
}

export type ProvinceType = {
    Districts: DistrictType[],
    Id: string,
    Name: string
}

type Props = {
    formik: any
}

function CardPaymentForm({ formik}: Props) {
    const { t } = useI18n()
    const defaultOption = { value: '', label: '' }

    const [name, setname] = useState('')
    const [province, setProvince] = useState<some>(defaultOption)
    const [district, setDistrict] = useState<some>(defaultOption)
    const [commune, setCommune] = useState<some>(defaultOption)
    const [month, setMonth] = useState<some>(defaultOption)
    const [year, setYear] = useState<some>(defaultOption)
    const [provinceOptions, setProvinceOptions] = useState<some[]>([])
    const [districtOptions, setDistrictOptions] = useState<some[]>([])
    const [communeOptions, setCommuneOptions] = useState<some[]>([])
    const [monthOptions, setMonthOptions] = useState<some[]>([]);
    const [yearOptions, setYearOptions] = useState<some[]>([]);

    useEffect(() => {
        if (province_data) {
            let options = province_data.map((a) => {
                return { value: a.Name, label: a.Name, district: a.Districts };
            });
            setProvinceOptions(options);
        }

        // Generate month options
        const months = Array.from({ length: 12 }, (_, index) => {
            const monthNumber = index + 1;
            return { value: monthNumber, label: monthNumber.toString() };
        });
        setMonthOptions(months);

        // Generate year options
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: 10 }, (_, index) => {
            const year = currentYear + index;
            return { value: year, label: year.toString() };
        });
        setYearOptions(years);
    }, []);
    // console.log(province, district, commune);


    const onchangeProvince = (s: any) => {
        setProvince(s)
        setDistrict(defaultOption)
        setCommune(defaultOption)
        if (s.district) {
            setDistrictOptions(s.district.map((d: DistrictType) => {
                return { value: d.Name, label: d.Name, commune: d.Wards }
            }))

        }

        formik.setValues({
            ...formik.values, province: s.label, district: null, commune: null
        })
    }

    const onchangeDistrict = (s: any) => {
        setDistrict(s)
        setCommune(defaultOption)
        if (s.commune) {
            setCommuneOptions(s.commune.map((d: WardType) => {
                return { value: d.Name, label: d.Name }
            }))
        }

        formik.setValues({
            ...formik.values, district: s.label, commune: null
        })
    }

    const onchangeCommune = (s: any) => {
        setCommune(s)
        formik.setValues({
            ...formik.values, commune: s.label
        })
    }

    const onchangeMonth = (s: any) => {
        setMonth(s)
        formik.setValues({
            ...formik.values, month: s.label
        })
    }

    const onchangeYear = (s: any) => {
        setYear(s)
        formik.setValues({
            ...formik.values, year: s.label
        })
    }

    return (
        <div>
            <div className="mb-2"><label className="text-text font-bold">{t("payment.info_delivery.form.card_number_title")}</label></div>
            <div className="h-10 mb-4">
                <InputPayment className="border border-gray-300 " name="card_number"
                    value={formik.values.card_number} setValue={formik.handleChange}
                    label={t("payment.info_delivery.form.card_number_place_holder")} required
                    onBlur={formik.handleBlur}
                    autoFocus={true}
                />
            </div>
            <div className="mb-2"><label className="text-text font-bold">{t("payment.info_delivery.form.card_number_type_title")}</label></div>
            <div className="flex h-10 mb-4">
                <img src={VisaCard} alt="" />
                <img className='ml-2' src={MasterCard} alt="" />
            </div>
            <div className="mb-2"><label className="text-text font-bold">{t("payment.info_delivery.form.expired_date_card_title")}</label></div>
            <div className="flex flex-wrap h-10 mb-4 justify-between">
                <div className="h-10 mb-4 w-[49%]">
                    <SelectInputPayment
                        name="month"
                        setValue={onchangeMonth}
                        options={monthOptions}
                        value={month}
                        label={t("payment.info_delivery.form.month")}
                        required
                    />
                </div>
                <div className="h-10 mb-4 w-[49%]">
                    <SelectInputPayment
                        name="year"
                        setValue={onchangeYear}
                        options={yearOptions}
                        value={year}
                        label={t("payment.info_delivery.form.year")}
                        required
                    />
                </div>
            </div>
            <div className="mb-2"><label className="text-text font-bold">{t("payment.info_delivery.form.address")}</label></div>
            <div className="lg:flex lg:flex-wrap justify-between ">
                <div className="h-10 mb-4 lg:w-[49%]">
                    <InputPayment className="border border-gray-300 " name="address"
                        value={formik.values.address} setValue={formik.handleChange}
                        label={t("payment.info_delivery.form.address")} required
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="h-10 mb-4 lg:w-[49%]">
                    <SelectInputPayment
                        name="province" setValue={onchangeProvince}
                        options={provinceOptions} value={province}
                        label={t("payment.info_delivery.form.province")} 
                        required />
                </div>
                <div className="h-10 mb-4 lg:w-[49%]">
                    <SelectInputPayment
                        name="district" setValue={onchangeDistrict}
                        options={districtOptions} value={district}
                        label={t("payment.info_delivery.form.district")} 
                        required />
                </div>
                <div className="h-10 mb-4 lg:w-[49%]">
                    <SelectInputPayment
                        name="commune" setValue={onchangeCommune}
                        options={communeOptions} value={commune}
                        label={t("payment.info_delivery.form.commune")} 
                        required />
                </div>
            </div>
            <div className="mb-2"><label className="text-text font-bold">{t("payment.info_delivery.form.zip_code")}</label></div>
            <div className="h-10 mb-4">
                <InputPayment className="border border-gray-300 " name="zip_code"
                    value={formik.values.zip_code} setValue={formik.handleChange}
                    label={t("payment.info_delivery.form.zip_code")} required
                    onBlur={formik.handleBlur}
                    autoFocus={true}
                />
            </div>
            <div className="mb-2"><label className="text-text font-bold">{t("payment.info_delivery.form.country_code")}</label></div>
            <div className="h-10 mb-4">
            <SelectInputPayment
                        name="country_code" setValue={onchangeCommune}
                        options={communeOptions} value={commune}
                        label={t("payment.info_delivery.form.country_code")} required />
            </div>

        </div>
    )
}

export default CardPaymentForm;