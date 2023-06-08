import React from 'react'

const fakeData = [
  {
    name: "Cơ sở số 1",
    address: "Số 225 Trần Phú, Hà Đông, Hà Nội",
    phone: "0365225425"
  },
  {
    name: "Cơ sở số 2",
    address: "Số 254 Cự Lộc, Khương Đình, Thanh Xuân, Hà Nội",
    phone: "0365225426"
  },
  {
    name: "Cơ sở số 3",
    address: "23 Định Công Thượng, Hoàng Mai, Thanh Xuân, Hà Nội",
    phone: "0365225425"
  },
]

function AddressContactSession() {
  return (
    <div className='mt-10 flex gap-4 h-[490px]'>  
      <div className="w-1/3">
        <div className="p-6 radius-tl-br bg-white">
          <h4 className='text-_14 font-semibold'>Tỉnh / Thành phố</h4>
          <div className="mt-4 h-20">

          </div>

          <h4 className='text-_14 font-semibold'>Danh sách cơ sở</h4>

          <div className="h-full overflow-y-scroll">
            {
              fakeData.map((item: any, idx: any) => {
                return <div className="py-6 border-b border-b-br_E6E6E" key={idx}>
                    <h5 className='text-_14 font-semibold 6'>{item.name}</h5>
                    <p className='text-_14 text-text_secondary my-2' >{item.address}</p>
                    <p>
                      <span className='text-_14 text-text_secondary '>{item.phone}</span>
                    </p>
                </div>
              })
            }
          </div>
        </div>
        
      </div>
      <div className="flex-1 ">
        <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14899.287236787706!2d105.8370233!3d20.9997788!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135adf6cd7d9e2d%3A0x4dcd5ff7ed5fb5f0!2zQ8O0bmcgVHkgVE5ISCBDw7RuZyBOZ2jhu4cgQWxhZGlu!5e0!3m2!1svi!2s!4v1686213517154!5m2!1svi!2s" 
          width="600" height="450"  loading="lazy"></iframe>
      </div>
    </div>
  )
}

export default AddressContactSession