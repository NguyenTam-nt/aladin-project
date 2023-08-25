import DynamicButton from '@components/Buttons/DynamicButton';
import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ProductInfo = (props: { content?: string }) => {
    const [showMore, setShowMore] = useState(false);
    const { t } = useTranslation();
    return (
        <div className="">
            <div
                className={clsx('max-h-fit w-full bg-transparent resize-none overflow-hidden',
                    { 'h-[187px]': !showMore },
                    { 'h-full': showMore },
                )}
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{ __html: props.content || "" }}
            />
            <div className="pt-5 flex justify-center items-center">
                <DynamicButton
                    onClick={() => setShowMore(!showMore)}
                    text={showMore ? t('button.hide_away') : t('button.see_more')}
                    className="!rounded-[30px] !px-[6px] !py-2 !min-w-[142px] !w-[142px] text-[16px] leading-normal font-bold font-NunitoSans"
                />
            </div>
        </div>
    )
};