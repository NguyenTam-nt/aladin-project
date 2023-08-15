import { UploadFileIcon } from '@assets/icons';
import Editer from '@components/Editer';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function NewNews() {
  const param = useParams();
  const navigate = useNavigate();

  const [isAdd, setisAdd] = useState(true)
  const [fileImage, setFileImage] = useState<any>(undefined);
  const [filePreview, setFilePreview] = useState<any>("");

  useEffect(() => {
    if (param.id) {
      setisAdd(false);
    }
  }, [param.id])


  const handleChoseFile = async (file: File) => {

    var reader = new FileReader();
    reader.onload = function (e: any) {
      setFileImage(file);
      setFilePreview(e.target.result)
    };
    reader.readAsDataURL(file);
  };

  const changeInputFileImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      handleChoseFile(file[0]);
      event.target.value = "";
    }
  };

  return (
    <div>
      <h3 className="text-title font-semibold text-main mt-9">
        {
          isAdd ? 'Tạo bài viết' : 'Sửa bài viết'
        }
      </h3>
      <div className="">
        <div className="mt-8">
          <h4 className='text-normal1 font-semibold text-main'>Tiêu đề tin tức*</h4>
          <div className="mt-3">
            <input
              className="w-full h-[50px] px-4 outline-none border border-background-200 rounded-md"
              value={""}
              onChange={() => { }}
              name="title"
              placeholder=''
            />
          </div>
        </div>

        <div className="mt-8">
          <h4 className='text-normal1 font-semibold text-main'>Mô tả*</h4>
          <div className="mt-3">
            <textarea
              className="w-full h-[102px] px-4 py-3 outline-none border border-background-200 rounded-md"
              value={""}
              onChange={() => { }}
              name="title"
              placeholder=''
            />
          </div>
        </div>

        <div className="mt-8">
          <h4 className='text-normal1 font-semibold text-main'>Nội dung tin tức*</h4>
          <div className="mt-3">
            <Editer />
          </div>
        </div>

        <div className="w-full mt-8">
          <p className="text-normal1 font-semibold text-main mb-3 ">
            Tải ảnh đại diện tin tức *
          </p>

          <div className="py-5 px-5 rounded-md border border-gray-200 flex justify-between h-[201px]">
            <div className="flex flex-col items-start justify-between h-full">
              <p className="text-wap-regular2 ">
                Tải lên ảnh định dạng PNG, JPEG. Kích thước ....x.....px
              </p>
              <div
                className={`px-4 py-2 border rounded-md border-main `}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(event) => changeInputFileImage(event)}
                  />
                  <UploadFileIcon className="mr-5" />
                  <span className="text-main text-normal1 font-bold">
                    Tải lên
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col mr-32 ">
              <p className="  text-wap-regular2 mb-3">
                Xem trước ảnh tải lên:
              </p>
              <div className="h-[130px]  flex items-center justify-center bg-gray rounded-md  w-[204px]">
                <img src={filePreview ? filePreview : `/images-raw/default-image.png`} className="w-full h-full rounded-md  object-cover" alt="imagedefault" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end items-center gap-3">
          <button className="w-fit h-full hover:cursor-pointer bg-[#FFEDE1] text-main text-normal1 px-5 py-2 rounded-sm border border-main">
            Hủy
          </button>
          <button className="w-fit h-full hover:cursor-pointer text-white bg-main text-normal1 px-5 py-2 rounded-sm">
            Lưu
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewNews