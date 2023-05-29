import { ModalContext } from "@contexts/ModalContext";
import { PopUpContext } from "@contexts/PopupContext";
import { TranslateContext } from "@contexts/Translation";
import { postService } from "@services/post";
import type { IPost, PostType } from "@typeRules/post";
import { useContext, useEffect, useState } from "react";
import { ModalHandlePost } from "../home/components/ModalHandlePost";
import DialogConfirmDelete from "@components/DialogConfirmDelete";

export const useHandlePost = (type: PostType, isAny = false) => {
  const [listPost, setListPost] = useState<IPost[]>([]);
  const { showSuccess, showError } = useContext(PopUpContext);
  const { setElementModal } = useContext(ModalContext);
  const { t } = useContext(TranslateContext);
  const onSubmitAdd = (data: IPost) => {
    postService.post({
        ...data,
        type
    }).then((res) => {
        setListPost([res, ...listPost]);
        showSuccess("message.success._success");
    }).catch(() => {
        showError("message.error._error");
    })
  };

  const onSubmitEdit = (data: IPost) => {
    postService.put({
        ...data,
    }).then((res) => {
        const newPost = [...listPost]
        const index = newPost.findIndex(item => item.id === data.id)
        newPost.splice(index, 1, res)
        setListPost([...newPost]);
        showSuccess("message.success._success");
    }).catch(() => {
        showError("message.error._error");
    })
  };

  const handleDeletePost = (id:number) => {
    postService.delete(id).then(() => {
        const newPost = [...listPost]
        const index = newPost.findIndex(item => item.id === id)
        newPost.splice(index, 1)
        setListPost([...newPost]);
        showSuccess("message.success._success");
    }).catch(() => {
        showError("message.error._error");
    })
  }
  useEffect(() => {
    postService.getByType(type).then((data) => {
        setListPost(data.data)
    })
  }, [type])

  const handleShowModal = () => {
    setElementModal(<ModalHandlePost isAny={isAny} onSubmit={onSubmitAdd} />);
  };
  const handleShowModalEdit = (data: IPost) => {
    setElementModal(
      <ModalHandlePost isAny={isAny} data={data} onSubmit={onSubmitEdit} type="EDIT" />
    );
  };

  const handleDelete = (id: number) => {
    setElementModal(
      <DialogConfirmDelete
        message={t("common._message_delete_post")}
        onClick={() => handleDeletePost(id)}
      />
    );
  };

  return {
    onSubmitAdd,
    onSubmitEdit,
    listPost,
    handleDeletePost,
    handleShowModal,
    handleShowModalEdit,
    handleDelete,
  }
};
