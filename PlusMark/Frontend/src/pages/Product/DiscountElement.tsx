import { SaleIcon } from "@assets/icons/plust-mark/SaleIcon";
import clsx from "clsx";
import { memo } from "react";

export const DiscountElement = memo((props: { content: string, widthIcon?: number, heightIcon?: number, className?: string }) => {
    const { content, widthIcon = 154, heightIcon = 54, className } = props;
    return (
        <div className="absolute top-0 left-0 rounded-tl-lg overflow-hidden">
            <SaleIcon width={widthIcon} height={heightIcon} />
            <div className={clsx('absolute top-1/2 left-[40%] transform -translate-x-1/2 -translate-y-1/2',
                className)}
            >
                {content}%
            </div>

        </div >
    )
})