
import { ICArowDown } from '@assets/icons/ICArowDown'
import bg_sales from "@assets/images/home/bg_sales.webp";
import clsx from 'clsx';
import React, { useState } from 'react'

const INITIAL_MAX_HEIGHT = 10000;

function AboutUsItem() {

  const collapseMenuRef = React.useRef<any>(null);
  const isFirstRender = React.useRef(true);
  const maxHeightRef = React.useRef(INITIAL_MAX_HEIGHT);
  const [open, setOpen] = useState(false)
  React.useEffect(() => {
    if (collapseMenuRef.current && !isFirstRender.current) {
      if (
        maxHeightRef.current > collapseMenuRef.current.offsetHeight &&
        maxHeightRef.current !== INITIAL_MAX_HEIGHT
      ) {
      // HALT!! // Someone collapsed the menu too early! // The offsetHeight is not full.
        return;
      }
      maxHeightRef.current = collapseMenuRef.current.offsetHeight;
    }
    if (open && isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [open]);

  return (
    <div className='w-rp mb-6 hover:cursor-pointer'>
      <div className="bg-white py-3 lg:py-6 px-4 pr-6 lg:pr-4 flex gap-4 justify-between items-center radius-tl-br16 lg:radius-tl-br24 "
        onClick={() => {setOpen(!open)}}
      >
        <h4 className='flex justify-center items-center h-6 lg:h-auto text-secondary text-_14 lg:text-_18 uppercase font-bold'>Cơ sở 1 - 24 Nguyễn Tuân</h4>
        <div className="">
          <ICArowDown color='black' className=''  />
        </div>
      </div>
      
      <div className={clsx(" max-h-0 overflow-hidden", {
        "": open
      })}
        style={{
          maxHeight: open ? `${maxHeightRef.current}px` : '0px',
          transition: "max-height 1s ease"
        }}
        ref={collapseMenuRef}
      >
        <div className="py-6 lg:py-11">

          <h5 className='text-_14 font-semibold text-black'>Địa chỉ: Số 225 Trần Phú, Hà Đông, Hà Nội</h5>
          <h5 className='text-_14 font-semibold text-black mt-4'>Số điện thoại: 0325625846</h5>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
            {[1,2,3,4].map((i) => {
              return <img key={i}
                className="w-full  h-full object-cover rounded-tl-r32 rounded-br-r32"
                src={bg_sales}
                alt=""
              />
            })}

          </div>

          <p className="text-_14 text-black pb-4">
                      Interdum a nunc augue tellus. Tristique nec neque diam tortor. Non massa vel facilisis vitae turpis malesuada erat. Bibendum lobortis mollis at hendrerit consequat sapien placerat et posuere. Etiam elementum fermentum consectetur gravida elit arcu viverra velit et. Mauris nibh neque ac sit. Augue nibh feugiat sed sed consequat sagittis hendrerit turpis porta. Convallis tempus scelerisque feugiat purus. A sagittis amet blandit elit erat. Mattis in vitae enim ipsum sollicitudin.
            Auctor et rutrum consequat leo nunc egestas orci pulvinar. Morbi eget dui tempor vel etiam. Diam leo proin est aliquam at. Amet enim justo habitant lectus. In consectetur libero dictum pellentesque amet ut. Sed gravida velit commodo parturient eget. Tellus rhoncus magnis et nullam euismod. Ac condimentum ultricies nam ultrices magna nec.
            Feugiat commodo donec volutpat amet mattis nibh. Eget eget blandit sed sem vehicula. Vel iaculis dolor nibh morbi sed tincidunt. Sit sodales bibendum amet feugiat integer nunc sit. Sit tellus posuere quis mi. In sit dignissim lorem dolor ac elementum posuere nec purus. A diam aliquam cursus pharetra mauris eros duis.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
            {[1,2,3,4].map((i) => {
              return <img key={i}
                className="w-full  h-full object-cover rounded-tl-r32 rounded-br-r32"
                src={bg_sales}
                alt=""
              />
            })}

          </div>

          <p className="text-_14 text-black pb-4">
              Interdum a nunc augue tellus. Tristique nec neque diam tortor. Non massa vel facilisis vitae turpis malesuada erat. Bibendum lobortis mollis at hendrerit consequat sapien placerat et posuere. Etiam elementum fermentum consectetur gravida elit arcu viverra velit et. Mauris nibh neque ac sit. Augue nibh feugiat sed sed consequat sagittis hendrerit turpis porta. Convallis tempus scelerisque feugiat purus. A sagittis amet blandit elit erat. Mattis in vitae enim ipsum sollicitudin.
            Auctor et rutrum consequat leo nunc egestas orci pulvinar. Morbi eget dui tempor vel etiam. Diam leo proin est aliquam at. Amet enim justo habitant lectus. In consectetur libero dictum pellentesque amet ut. Sed gravida velit commodo parturient eget. Tellus rhoncus magnis et nullam euismod. Ac condimentum ultricies nam ultrices magna nec.
            Feugiat commodo donec volutpat amet mattis nibh. Eget eget blandit sed sem vehicula. Vel iaculis dolor nibh morbi sed tincidunt. Sit sodales bibendum amet feugiat integer nunc sit. Sit tellus posuere quis mi. In sit dignissim lorem dolor ac elementum posuere nec purus. A diam aliquam cursus pharetra mauris eros duis.
          </p>

          <p className="text-_14 text-black pb-4">
                      Interdum a nunc augue tellus. Tristique nec neque diam tortor. Non massa vel facilisis vitae turpis malesuada erat. Bibendum lobortis mollis at hendrerit consequat sapien placerat et posuere. Etiam elementum fermentum consectetur gravida elit arcu viverra velit et. Mauris nibh neque ac sit. Augue nibh feugiat sed sed consequat sagittis hendrerit turpis porta. Convallis tempus scelerisque feugiat purus. A sagittis amet blandit elit erat. Mattis in vitae enim ipsum sollicitudin.
            Auctor et rutrum consequat leo nunc egestas orci pulvinar. Morbi eget dui tempor vel etiam. Diam leo proin est aliquam at. Amet enim justo habitant lectus. In consectetur libero dictum pellentesque amet ut. Sed gravida velit commodo parturient eget. Tellus rhoncus magnis et nullam euismod. Ac condimentum ultricies nam ultrices magna nec.
            Feugiat commodo donec volutpat amet mattis nibh. Eget eget blandit sed sem vehicula. Vel iaculis dolor nibh morbi sed tincidunt. Sit sodales bibendum amet feugiat integer nunc sit. Sit tellus posuere quis mi. In sit dignissim lorem dolor ac elementum posuere nec purus. A diam aliquam cursus pharetra mauris eros duis.
          </p>
        </div>

      </div>
    </div>
  )
}

export default AboutUsItem