import { ICAddSquare } from "@assets/icons/ICAddSquare";
import { ICCheck } from "@assets/icons/ICCheck";
import { ICDate } from "@assets/icons/ICDate";
import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import { ICMail } from "@assets/icons/ICMail";
import { ICUser } from "@assets/icons/ICUser";
import { formatDateComment, renderStar } from "@commons/common";
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
import type { IComment, ICommentChild } from "@typeRules/comment";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { useHandleLoading } from "@features/dashboard/components/Loading";
import { commentService } from "@services/comment";

type Props = {
  data: IComment;
  onEdit: (data: IComment) => void;
  onEditAdmin: (data: ICommentChild) => void;
  onDelete: (id: number) => void;
};

export const CommentItem = memo(
  ({ data, onDelete, onEdit, onEditAdmin }: Props) => {
    const { setElementModal } = useModalContext();

    const { showSuccess, showError } = useShowMessage();
    const { showLoading } = useHandleLoading();

    const handleShowModal = () => {
      setElementModal(<ReplyModal onUpdate={onEditAdmin} data={data} />);
    };
    const handleShowModalDelete = () => {
      setElementModal(
        <DiglogComfirmDelete
          onClick={handleDelete}
          message="adminComment.message_delete"
        />
      );
    };

    const handleShowModalConfirm = () => {
      setElementModal(<ModalConfirm onClick={handleSubmitPD} />);
    };

    // const handleSubmitEdit = () => {
    //   showLoading()
    //   commentService
    //     .update(data)
    //     .then((data) => {
    //       onEdit(data)
    //       showSuccess("message.actions.success.update");
    //     })
    //     .catch(() => {
    //       showError("message.error._error");
    //     })
    // };

    const handleSubmitPD = () => {
      showLoading();
      commentService
        .patch(Number(data.id))
        .then((_) => {
          onEdit({
            ...data,
            status: !data.status,
          });
          showSuccess("message.actions.success.update");
        })
        .catch(() => {
          showError("Thất bại");
        });
    };

    const handleDelete = () => {
      showLoading();
      commentService
        .delete(Number(data.id))
        .then(() => {
          onDelete(Number(data.id));
          showSuccess("Xóa bình luận thành công");
        })
        .catch((error) => {
          showError(
            error?.response?.data?.message || "category.message_delete_error"
          );
        });
    };

    return (
      <div className="bg-white mb-4">
        <div className="flex bg-bg_F1F1F1 px-4 py-2 h-[48px] justify-between items-center">
          <div className="flex  gap-x-[32px] items-center">
            <div className="flex items-center gap-x-2">
              <span>
                <ICUser />
              </span>{" "}
              <span className="text-_14 break-words max-w-[200px] text-text_primary">
                {data?.commentGuest?.fullname}
              </span>
            </div>
            <div className="flex items-center gap-x-2">
              <span>
                <ICMail />
              </span>{" "}
              <span className="text-_14 text-text_primary">
                {data?.commentGuest?.email}
              </span>
            </div>
            <div className="flex items-center gap-x-2">
              <span>
                <ICDate />
              </span>{" "}
              <span className="text-_14 text-text_primary">
                {formatDateComment(data?.commentGuest?.createdDate || "")}
              </span>
            </div>
          </div>
          <div className="flex flex-1 justify-end items-center gap-x-4">
            {data.status ? (
              <Button
                color="primary"
                className=" bg-bg_01A63E max-w-[116px] font-normal !h-[32px] rounded-[50px]"
                imageLeft={
                  <span className="mr-[10px]">
                    <ICCheck color={Colors.text_white} />
                  </span>
                }
                text="Đã duyệt"
              />
            ) : (
              <Button
                onClick={handleShowModalConfirm}
                color="empty"
                className="border-bg_01A63E text-bg_01A63E max-w-[124px] font-normal !h-[32px] rounded-[50px] "
                imageLeft={
                  <span className="mr-[10px]">
                    <ICRequest
                      width={24}
                      height={24}
                      color={Colors.bg_01A63E}
                    />
                  </span>
                }
                text="Phê duyệt"
              />
            )}

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
          <div className="p-[16px] border-r border-br_E8E8E8 gap-x-[12px] flex">
            <img
              className="min-w-[101px] max-w-[101px] h-[101px] object-cover"
              src={data?.linkMedia}
            />
            <div className="">
              <p className="text-_16 font-semibold line-clamp-1">
                {data?.nameProduct}
              </p>
              <p className="text-_14 text-text_secondary line-clamp-3">
                {data?.description}
              </p>
            </div>
          </div>
          <div className="border-r border-br_E8E8E8">
            <div className="flex items-center gap-x-4">
              {renderStar(Number(data?.commentGuest?.rate), 24)}
            </div>
            <p className="text-_14 mt-2 break-words text-text_secondary">
              {data?.commentGuest?.content}
            </p>
          </div>
          <div>
            {data.commentAdmin ? (
              <div className="">
                <div className="flex items-center gap-x-1">
                  <Avatar name={data?.commentAdmin?.fullname || ""} />
                  <span className="text-_14 font-semibold text-text_primary">
                    {data?.commentAdmin?.fullname}
                  </span>
                </div>
                <p className=" line-clamp-3 mt-2 text-text_secondary">
                  {data?.commentAdmin?.content}
                </p>
              </div>
            ) : data.status ? (
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
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
