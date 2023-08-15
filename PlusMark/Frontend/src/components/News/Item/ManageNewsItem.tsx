
import { DeleteManageIcon, PenIcon } from '@assets/icons';
import { ModalContext } from '@contexts/contextModal';
import { ToastContex } from '@contexts/ToastContex';
import { New } from '@pages/Newspage/ManageNews';
import NewsServices from '@services/NewsServices';
import { DATE_FORMAT_3 } from '@utility/moment';
import moment from 'moment';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import DeleteModal from '../../Modal/DeleteModal';

interface Props {
  post: New,
  posts: New[],
  setPost: React.Dispatch<React.SetStateAction<New[] | undefined>>
}

function ManageNewsItem(props: Props) {
  const { post, posts, setPost } = props;
  const { setContentModal, setShowModal, closeModal } = useContext(ModalContext);
  const { onAddToast } = useContext(ToastContex);

  const handleDeleteNews = async () => {
    try {
      const response = await NewsServices.delete(post.id)
      if (response.status == 200) {
        const newPosts = posts.filter(item => item.id != post.id)
        setPost(newPosts)
        onAddToast({ type: "success", message: `Xoá thành công` });
        return
      }
      return onAddToast({ type: "error", message: `Có lỗi xảy ra` });
    } catch (ex) {
      console.log(ex)
      return onAddToast({ type: "error", message: `Có lỗi xảy ra` });
    } finally {
      closeModal()
    }
  }

  const showModalConfirmDelete = () => {
    setContentModal(<DeleteModal text="Bạn có chắc chắn xóa bài viết này khỏi hệ thống?" handleDelete={handleDeleteNews} />);
    setShowModal(true);
  }

  return (
    <div className="flex gap-12 border-b-[1px] border-b-gray-200 border-transparent mb-4">
      <div className='flex-1 flex gap-8 mb-4'>
        <div className="w-1/3 rounded-md">
          <img className="w-full rounded-md aspect-video object-cover" src={post.imageUrl} alt='news images' />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="">
            <h3 className="text-normal2 font-bold line-clamp-1 mb-1">
              {post.title}
            </h3>
            <p className="pt-4 text-normal1 text-[#303030] line-clamp-3 xl:line-clamp-5 border-t-[#F45538] border-t-[1px]">
              {post.describe}
            </p>
          </div>

          <p className="text-main text-wap-regular2">
            {post.createdAt  ? moment(post.createdAt).format(DATE_FORMAT_3) : ''}
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-start mt-2">
        <Link to={`/admin/news/update/${post.id}`} className="hover:cursor-pointer">
          <PenIcon className='hover:fill-main' />
        </Link>
        <div className="hover:cursor-pointer" onClick={showModalConfirmDelete}>
          <DeleteManageIcon className='hover:stroke-main' />
        </div>
      </div>
    </div>

  )
}

export default ManageNewsItem