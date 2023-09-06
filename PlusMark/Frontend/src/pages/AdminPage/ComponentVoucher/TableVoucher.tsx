import ICEdit from "@assets/iconElements/ICEdit";
import ICReduced from "@assets/iconElements/ICReduced";
import { useShowMessage } from "@components/Modal/DialogMessage";
import { useShowConfirm } from "@components/Modal/DiglogComfirm";
import { IVoucher } from "@services/Types/voucher";
import VoucherServices from "@services/voucherService";
import clsx from "clsx";
import { formatDate } from "commons/dayfomat";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const ItemText = (props: { text?: string }) => {
    const { text } = props;
    return (
        <div className="flex h-full w-full items-start justify-start">
            <p className="text-wap-regular2 font-normal font-PublicSans line-clamp-1 text-content">
                {text}
            </p>
        </div>
    )
};

interface IProps {
    data?: IVoucher
}
const TableVoucher = (props: IProps) => {
    const { data } = props;
    const navigate = useNavigate();
    const { showConfirm } = useShowConfirm();
    const {showSuccess,showError,showWarning } = useShowMessage();
    const checkStatus = (status?: string): string => {
        return status == "HAPPENING" ? 'Đang diễn ra' : status == "NOT_HAPPEN" ? 'Sắp diễn ra ' : 'Đã kết thúc';
    }
    const showConfirmStatusVoucher = () => {
        showConfirm("Bạn có muốn kết thúc voucher này không?", updateStatusVoucher);
    }
    const updateStatusVoucher = async () => {
        try {
            const newData = {
                ...data,
                voucherState: 'FINISHED'
            }
            const res = await VoucherServices.addOrUpdateVoucher(newData, data?.id?.toString());
            showSuccess('Voucher đã được kết thúc.')
        } catch (error) {
            console.log(error);
            showError('Kết thúc voucher thất bại.')
        }
    }
    return (
        <>
            <div className="ml-[9px] h-10 flex-1 items-start justify-between grid grid-cols-[100px_1.5fr_90px_1fr_1fr_2fr_1.5fr] gap-x-2 font-semibold">
                <ItemText text={data?.voucherCode} />
                <ItemText text={data?.voucherName} />
                <ItemText text={data?.value?.toString()} />
                <ItemText text={data?.userLimit?.toString()} />
                <ItemText text={data?.usedTotal?.toString()} />
                <div className="flex h-full w-full items-start justify-start">
                    <div className="text-wap-regular2 font-normal font-PublicSans flex flex-col">
                        <p className={clsx('',
                            {
                                'text-error-500': data?.voucherState === 'FINISHED',
                                'text-green-319F43': data?.voucherState === 'NOT_HAPPEN',
                                'text-aqua-aq02': data?.voucherState === 'HAPPENING',
                            })}>{checkStatus(data?.voucherState)}</p>
                        <p className="text-content line-clamp-1 ">{`${formatDate(data?.startDate)} - ${formatDate(data?.endDate)}`}</p>
                    </div>

                </div>
                <div>
                    {data?.voucherState == "FINISHED" && <ItemText text="Đã kết thúc" />}
                    {
                        (data?.voucherState == "NOT_HAPPEN" || data?.voucherState == "HAPPENING") && (
                            <div className="flex flex-row gap-x-7">
                                <button
                                    onClick={() => navigate(`edit/${data?.id?.toString()}`)}
                                    className="flex flex-row">
                                    <ICEdit />
                                    <p className="text-wap-regular2 font-normal font-PublicSans">Chỉnh sửa</p>
                                </button>
                                <button
                                    onClick={showConfirmStatusVoucher}
                                    className="flex flex-row gap-x-2 justify-center items-center">
                                    <ICReduced />
                                    <p className="text-wap-regular2 font-normal font-PublicSans">Kết thúc</p>
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
};

export default TableVoucher;