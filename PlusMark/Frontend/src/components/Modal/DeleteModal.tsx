import { DeleteManageIcon } from '@assets/icons'
import { ModalContext } from '@contexts/contextModal'
import React, { MouseEventHandler, useContext } from 'react'

type Props = {
  text: String,
  handleDelete: MouseEventHandler<HTMLButtonElement>
}

function DeleteModal({ text, handleDelete }: Props) {
  const { closeModal } = useContext(ModalContext)

  return (
    <div className='p-3 bg-white rounded-md pb-8 max-w-[417px]'>
      <div className="">
        <div className="hover:cursor-pointer" onClick={closeModal}>
          <DeleteManageIcon className="ml-auto" width={16} height={16} />
        </div>
        <p className="text-normal1 text-[#393939] px-5 text-center mt-4">{text}</p>
        <div className="mt-5 flex gap-[18px] justify-center items-center">
          <button className="text-normal1 text--gray-300 rounded-md px-5 py-[10px] border-gray-300 border-[1px] " onClick={closeModal}>Hủy</button>
          <button className="text-normal1 bg-main text-white rounded-md px-5 py-[10px]" onClick={handleDelete}>Xóa</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal