import DialogConfirmDelete from '@components/DialogConfirmDelete';
import { ModalContext } from '@contexts/ModalContext';
import { TranslateContext } from '@contexts/Translation';
import React, { useContext, useState } from 'react';
import { ModalCreate } from '../components/ModalCreate';
import { ICAdd } from '@assets/icons/ICAdd';
import Pagination from '@features/dashboard/components/Pagination';
import { ICEdit } from '@assets/icons/ICEdit';
import { Colors } from '@constants/color';
import { Button } from '@components/Button';


const ManageAlbumDetail = () => {
    const {t} = useContext(TranslateContext)
    const [currenPage, setCurrentPage] = useState(1);
    const [isChoose ,setIsChoose] = useState<number[]>([])
    const [data, setData] = useState([
      {
        id: 1,
        image:
          "https://s3-alpha-sig.figma.com/img/b69c/0ba2/adc1ec8c23b20a5518839269dfe8aa70?Expires=1685923200&Signature=ly2GkZoIgjvlhGwucbrz7id6XWMI2dR29waQ8NgQbPIvn8jlwZs3h8CL7PwYRQBY~z1ZG3mTqzckMM6DQZR1dOti8n-OIcd~oKZK0kpW89tSv8RTrMcLj3Kb~b3zywMc8d4ncPdq3UEm7w10Yqzr47VXeirP3WRQ6VG-upChaORlVMXef7T2K4izdUNM53J4BGt7niD7WNh62dDxYngEISJIgQ1FnXUKskjekY0viBF75Ad4EhM9BWwAaj2TGH2X1XihSW02vyBPp9YbmXO0Ovxp1OEjHwrJijWpo8cqQaNNYosCjBQdox~Iy5fYH9w7c-cRIBmcN1vomo7kcQDPGw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
      {
        id: 2,
        image:
          "https://s3-alpha-sig.figma.com/img/b69c/0ba2/adc1ec8c23b20a5518839269dfe8aa70?Expires=1685923200&Signature=ly2GkZoIgjvlhGwucbrz7id6XWMI2dR29waQ8NgQbPIvn8jlwZs3h8CL7PwYRQBY~z1ZG3mTqzckMM6DQZR1dOti8n-OIcd~oKZK0kpW89tSv8RTrMcLj3Kb~b3zywMc8d4ncPdq3UEm7w10Yqzr47VXeirP3WRQ6VG-upChaORlVMXef7T2K4izdUNM53J4BGt7niD7WNh62dDxYngEISJIgQ1FnXUKskjekY0viBF75Ad4EhM9BWwAaj2TGH2X1XihSW02vyBPp9YbmXO0Ovxp1OEjHwrJijWpo8cqQaNNYosCjBQdox~Iy5fYH9w7c-cRIBmcN1vomo7kcQDPGw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
      {
        id: 3,
        image:
          "https://s3-alpha-sig.figma.com/img/b69c/0ba2/adc1ec8c23b20a5518839269dfe8aa70?Expires=1685923200&Signature=ly2GkZoIgjvlhGwucbrz7id6XWMI2dR29waQ8NgQbPIvn8jlwZs3h8CL7PwYRQBY~z1ZG3mTqzckMM6DQZR1dOti8n-OIcd~oKZK0kpW89tSv8RTrMcLj3Kb~b3zywMc8d4ncPdq3UEm7w10Yqzr47VXeirP3WRQ6VG-upChaORlVMXef7T2K4izdUNM53J4BGt7niD7WNh62dDxYngEISJIgQ1FnXUKskjekY0viBF75Ad4EhM9BWwAaj2TGH2X1XihSW02vyBPp9YbmXO0Ovxp1OEjHwrJijWpo8cqQaNNYosCjBQdox~Iy5fYH9w7c-cRIBmcN1vomo7kcQDPGw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
      {
        id: 4,
        image:
          "https://s3-alpha-sig.figma.com/img/b69c/0ba2/adc1ec8c23b20a5518839269dfe8aa70?Expires=1685923200&Signature=ly2GkZoIgjvlhGwucbrz7id6XWMI2dR29waQ8NgQbPIvn8jlwZs3h8CL7PwYRQBY~z1ZG3mTqzckMM6DQZR1dOti8n-OIcd~oKZK0kpW89tSv8RTrMcLj3Kb~b3zywMc8d4ncPdq3UEm7w10Yqzr47VXeirP3WRQ6VG-upChaORlVMXef7T2K4izdUNM53J4BGt7niD7WNh62dDxYngEISJIgQ1FnXUKskjekY0viBF75Ad4EhM9BWwAaj2TGH2X1XihSW02vyBPp9YbmXO0Ovxp1OEjHwrJijWpo8cqQaNNYosCjBQdox~Iy5fYH9w7c-cRIBmcN1vomo7kcQDPGw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
      {
        id: 5,
        image:
          "https://s3-alpha-sig.figma.com/img/b69c/0ba2/adc1ec8c23b20a5518839269dfe8aa70?Expires=1685923200&Signature=ly2GkZoIgjvlhGwucbrz7id6XWMI2dR29waQ8NgQbPIvn8jlwZs3h8CL7PwYRQBY~z1ZG3mTqzckMM6DQZR1dOti8n-OIcd~oKZK0kpW89tSv8RTrMcLj3Kb~b3zywMc8d4ncPdq3UEm7w10Yqzr47VXeirP3WRQ6VG-upChaORlVMXef7T2K4izdUNM53J4BGt7niD7WNh62dDxYngEISJIgQ1FnXUKskjekY0viBF75Ad4EhM9BWwAaj2TGH2X1XihSW02vyBPp9YbmXO0Ovxp1OEjHwrJijWpo8cqQaNNYosCjBQdox~Iy5fYH9w7c-cRIBmcN1vomo7kcQDPGw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
      {
        id: 6,
        image:
          "https://s3-alpha-sig.figma.com/img/b013/cb79/fbccf20c7af41e668fa200b042f47cd4?Expires=1685923200&Signature=LqkaRiRgw9q3xdpl2tQghOV6s~1-LXnYROHwZSaEXOVZCh-PmugARC~X4EbPk1LVhqcrC1hqXtLUiMtMCYnq5RuBBc~c5JV-XHw-qDNb-UF1kFUxSJyQZMGw6KU~JiejTyRcPzGKPPRucy1RQSi5XEtff5mAGHjVb2cPSWLLg7nXA8KRs4WGcnupRwOY-9jcSokirRPmDQbhwbGThK9zVrGE2eDq65QMpxfvIXij~UeCnUgvushtmpvoz-VReXxXLvtGl8Ov0nsprbfyU83oQqTMyv1xFHF4j0s~Jlw0IlG4FrI1LkTpML4ilQ6zT3-k0F~i4ITlKZfQect7bXQQWA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
    ]);

    const { setElementModal } = useContext(ModalContext);

    const handleImageChange = (event) => {
      const file = event.target.files[0];

      setData([{ id: 1, image: URL.createObjectURL(file) }, ...data]);
    };

   const deleteImage = async () => {
     const newData = [...data];
     await isChoose.map((item) => {
       try {
        data.splice(item, 1);
       } catch (e) {
        
       }
     });
     setIsChoose([])
     setData(newData);
   }; 

    const handleShowModalDelete = () => {
      if (isChoose.length > 0) {
        setElementModal(
          <DialogConfirmDelete message={t("image.delete_image")} onClick={deleteImage} />
        );
      }
    };

    const chooseItem = (index: number) => {
      const newChoose = [...isChoose];
      const position = index;
      if (!newChoose.includes(position)) {
        newChoose.push(position);
      } else {
        const indexToRemove = newChoose.indexOf(position);
        newChoose.splice(indexToRemove, 1);
      }
      setIsChoose(newChoose);
    };

 
    return (
      <div className="px-[24px]">
        <div className="flex items-center ">
          <span className="text-_40  font-bold mr-[27px] uppercase ">
            [Tên Album]
          </span>
          <ICEdit></ICEdit>
        </div>
     
        <div className="flex flex-space items-center justify-between mt-[42px]">
          <p className="text-_24 text-text_primary ">{t("image.title_list")}</p>
          <Button
            onClick={handleShowModalDelete}
            text="button._delete"
            color="primary"
            className="!w-[120px] border  text-text_white bg-text_C53434"
          />
        </div>
        <div className="grid grid-cols-4 gap-[24px] mt-[40px]">
        <label htmlFor="library_image" >
                <div className="flex h-[312px] w-full items-center justify-center  bg-bg_F5F7F9">
                  <ICAdd></ICAdd>
                  <input
                    type="file"
                    accept='image/*'
                    id="library_image"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </label>
          {data.map((item, index) => {
            const active = isChoose.includes(index);
            return  (
              <div key={`${index}-${active}`}>
                <div className="relative w-full">
                  <button
                    onClick={() => {
                      chooseItem(item.id);
                    }}
                    className="absolute h-[40px] w-[40px]  z-10 top-[10px] left-[20px] rounded-[20px]  border-[4px]"
                    style={{
                      backgroundColor: active
                        ? Colors.secondary
                        : "transparent",
                    }}
                  ></button>
                  <img
                    className="h-[312px] w-[312px]  items-center justify-center object-cover"
                    src={item.image}
                  ></img>
                </div>
              </div>
          )})}
        </div>

        <div className="mt-[120px] flex justify-end">
          <Pagination
            currenPage={currenPage}
            setCurrentPage={setCurrentPage}
            total={10}
          />
        </div>
      </div>
    );
}

export default ManageAlbumDetail