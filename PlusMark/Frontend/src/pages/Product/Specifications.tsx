import DynamicButton from "@components/Buttons/DynamicButton";
import clsx from "clsx";
import { useState } from 'react';
import { useTranslation } from "react-i18next";

export const TableItem = (props: { text?: string | number, className?: string }) => {
    const { text, className } = props;
    return (
        <>
            <div className={
                clsx('flex h-full text-neutra-neutra20 font-normal 2lg:text-normal ssm:text-wap-regular2 font-NunitoSans',
                    className
                )}>
                {text}
            </div>
        </>
    )
}
const DATAS_TABLE = [
    { title: "Dung tích", content: "1.8L" },
    { title: "Chức năng", content: "Nấu cơm, nấu cháo, làm nóng, cơm cháy, pizza, gato, sữa chua, ủ ấm, hấp,..." },
    { title: "Màu sắc", content: "Đen Xám" },
    { title: "Loại nồi", content: "Quai xách (Nồi cao tần)" },
    { title: "Chất liệu vỏ nồi", content: "Nhựa cách nhiệt, inox cao cấp" },
    { title: "Chất liệu lòng nồi", content: "Hợp kim inox và nhôm dày dặn phủ chống dính cao cấp" },
    { title: "Công suất", content: "1,150W" },
    { title: "Điện áp", content: "220V/50Hz" },
    { title: "Thời gian dữ ấm", content: "12 giờ" },
    { title: "Hẹn giờ", content: "Có" },
    { title: "Màn hình", content: "LED" },
    { title: "Bảng điều khiển", content: "Bảng điều khiển điện tử dạng phím cơ" },
    { title: "Dây điện", content: "Dây nguồn (có thể tháo rời tiện dụng)" },
    { title: "Phụ kiện", content: "Muỗng xới cơm" },
    { title: "Khối lượng", content: "5 giờ" },
    { title: "Màn hình", content: "LED" },
    { title: "Bảng điều khiển", content: "Bảng điều khiển điện tử dạng phím cơ" },
    { title: "Dây điện", content: "Dây nguồn (có thể tháo rời tiện dụng)" },
    { title: "Phụ kiện", content: "Muỗng xới cơm" },
    { title: "Khối lượng", content: "5 giờ" },
]
const Specifications = () => {
    const { t } = useTranslation();
    const [showMore, setShowMore] = useState(false);
    function isOdd(num: number): number { return num % 2; }
    return (
        <>
            <div className="border border-neutra-neutra80 rounded-[20px] ">
                <div className="flex flex-col ">
                    <div className="flex flex-row">
                        <div className="h-[50px] flex-1 items-center justify-center grid 2lg:grid-cols-[100px_1fr_1fr] ssm:grid-cols-[35px_80px_1fr] bg-neutra-neutra98">
                            <div className="font-bold font-NunitoSans 2lg:text-normal1 ssm:text-wap-regular2 text-neutra-neutra20 text-center flex h-full border-r-[1px] items-center justify-center">{t('product.table.stt')}</div>
                            <div className="font-bold font-NunitoSans 2lg:text-normal1 ssm:text-wap-regular2 text-neutra-neutra20 text-center flex h-full items-center justify-start 2lg:pl-6 ssm:pl-[5px] ssm:border-r-[1px] 2lg:border-r-[0px]">{t('product.table.specifications')}</div>
                            <div className="font-bold font-NunitoSans 2lg:text-normal1 ssm:text-wap-regular2 text-neutra-neutra20 2lg:pl-0 ssm:pl-[5px]">{t('product.table.model')}:</div>
                        </div>
                    </div>
                    <div>
                        {
                            DATAS_TABLE.slice(0, showMore ? DATAS_TABLE.length : 15).map((it, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className={clsx('h-[50px] flex-1 items-center justify-center grid 2lg:grid-cols-[100px_1fr_1fr] ssm:grid-cols-[35px_80px_1fr]',
                                            {
                                                'bg-white': isOdd(idx + 1) == 1,
                                                'bg-neutra-neutral98': isOdd(idx + 1) == 0,
                                                'rounded-bl-[20px] rounded-br-[20px]': (DATAS_TABLE.slice(0, showMore ? DATAS_TABLE.length : 15).length - 1) === idx
                                            }
                                        )}
                                    >
                                        <TableItem text={idx + 1} className="text-center items-center justify-center border-r-[1px]" />
                                        <TableItem text={it.title} className="2lg:pl-6 ssm:pl-[5px] ssm:pr-[3px] items-center ssm:border-r-[1px] 2lg:border-r-[0px]" />
                                        <TableItem text={it.content} className="2lg:pr-4 ssm:pl-[2px] 2lg:pl-0 items-center" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="pt-5 flex justify-center items-center">
                <DynamicButton
                    onClick={() => setShowMore(!showMore)}
                    text={showMore ? t('button.hide_away') : t('button.see_more')}
                    className="!rounded-[30px] !px-[6px] !py-2 !min-w-[142px] !w-[142px] text-[16px] leading-normal font-bold font-NunitoSans"
                />
            </div>
        </>
    )
};

export default Specifications;