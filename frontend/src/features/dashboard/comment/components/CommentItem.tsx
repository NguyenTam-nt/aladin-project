import { ICAddSquare } from "@assets/icons/ICAddSquare";
import { ICCheck } from "@assets/icons/ICCheck";
import { ICDate } from "@assets/icons/ICDate";
import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import { ICMail } from "@assets/icons/ICMail";
import { ICUser } from "@assets/icons/ICUser";
import { renderStar } from "@commons/common";
import { Avatar } from "@components/Avatar";
import { Colors } from "@constants/color";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import { t } from "i18next";
import React, { memo } from "react";
import { ReplyModal } from "./ReplyModal";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";
import { ICRequest } from "@assets/icons/ICRequest";
import { ModalConfirm } from "./ModalConfirm";

export const CommentItem = memo(() => {
  const { setElementModal } = useModalContext();

  const handleShowModal = () => {
    setElementModal(<ReplyModal />);
  };
  const handleShowModalDelete = () => {
    setElementModal(
      <DiglogComfirmDelete message="adminComment.message_delete" />
    );
  };

  const handleShowModalConfirm = () => {
    setElementModal(
      <ModalConfirm  />
    );
  };


  return (
    <div className="bg-white mb-4">
      <div className="flex bg-bg_F1F1F1 px-4 py-2 h-[48px] justify-between items-center">
        <div className="flex  gap-x-[32px] items-center">
          <div className="flex items-center gap-x-2">
            <span>
              <ICUser />
            </span>{" "}
            <span className="text-_14 text-text_primary">Như Quỳnh</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span>
              <ICMail />
            </span>{" "}
            <span className="text-_14 text-text_primary">
              quynhnhu@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <span>
              <ICDate />
            </span>{" "}
            <span className="text-_14 text-text_primary">Như Quỳnh</span>
          </div>
        </div>
        <div className="flex flex-1 justify-end items-center gap-x-4">
          {/* <Button
            color="primary"
            className=" bg-bg_01A63E max-w-[116px] font-normal !h-[32px] rounded-[50px]"
            imageLeft={
              <span className="mr-[10px]">
                <ICCheck color={Colors.text_white} />
              </span>
            }
            text="Đã duyệt"
          /> */}

         <Button
           onClick={handleShowModalConfirm}
            color="empty"
            className="border-bg_01A63E text-bg_01A63E max-w-[124px] font-normal !h-[32px] rounded-[50px] "
            imageLeft={
              <span className="mr-[10px]">
                <ICRequest width={24} height={24} color={Colors.bg_01A63E} />
              </span>
            }
            text="Phê duyệt"
          />

          <Button
            onClick={handleShowModalDelete}
            color="primary"
            className=" bg-bg_E73F3F max-w-[84px] font-normal !h-[32px] rounded-[50px]"
            imageLeft={
              <span className="mr-[10px]">
                <ICDeleteTrashLight color={Colors.text_white} />
              </span>
            }
            text="button._delete"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 [&>div]:p-[16px]">
        <div className="p-[16px] border-r border-br_E8E8E8 gap-x-[12px] flex items-center">
          <img
            className="min-w-[101px] max-w-[101px] h-[101px] object-cover"
            src="https://s3-alpha-sig.figma.com/img/7b57/03df/f07b9acd58d1dd21946d15b38e18fd1b?Expires=1687737600&Signature=WFvw-Uk0lPHi2rVPmItUBwdRvOrrOxcFzrgiRnYtmSQrSYZae1u~TWddx~nwm~GtRhxKlGTF-tnITcq1h8pokBwzh5qVdN170J9WylC5DdA-jbrDhvnl8V1znZvtj5U5BpQ9a1IKsRlK6rQioWxt3QsIVvJFK~-l2NaMWw4xwwHDKjuDWI36LxVutYv8QFGxQdwb2zKSCgGa1VN86UqQ4y-eRpna849oXo5aYG3m5g35ePvDQJhdOXdGP7oPRrqsxlh98ICgQz~LO0ZVvRwe4fQyDgTG0e~N5~at09CHtc9m5kk4J~arYBIVhZF-2dZ32be2oQNGfqnLMeBUW~LGGg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          />
          <div className="">
            <p className="text-_16 font-semibold line-clamp-1">
              Bò hầm bit tết
            </p>
            <p className="text-_14 text-text_secondary line-clamp-3">
              Bò hầm bit tếtBò hầm bit tếtBò hầm bit tếtBò hầm bit tếtBò hầm bit
              tếtBò hầm bit tếtBò hầm bit tếtBò hầm bit tếtB
            </p>
          </div>
        </div>
        <div className="border-r border-br_E8E8E8">
          <div className="flex items-center gap-x-4">{renderStar(4, 24)}</div>
          <p className="text-_14 mt-2 text-text_secondary">
            Không như mong đợi
          </p>
        </div>
        <div>
          {false ? (
            <div className="">
              <div className="flex items-center gap-x-1">
                <Avatar name="Admin" />
                <span className="text-_14 font-semibold text-text_primary">
                  Admin
                </span>
              </div>
              <p className=" line-clamp-3 mt-2 text-text_secondary">
                Ăn thì ăn hết rồi giờ chê =))
              </p>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center h-full">
              <button
                onClick={handleShowModal}
                className="text-_14 p-2 hover:shadow-md font-bold flex items-center text-TrueBlue_500"
              >
                <span className="mr-1">
                  <ICAddSquare />
                </span>{" "}
                {t("button.reply")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
