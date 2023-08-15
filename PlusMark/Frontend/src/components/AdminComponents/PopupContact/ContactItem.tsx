import { EditIcon, MessengerIcon, PhoneIcon, TrashCanIcon, ZaloIcon } from "@assets/icons";
import { SupportOnlineInfo } from "@services/SupportOnlineServices";
import { SUPPORT_ONLINE } from "@utility/constants";

export default function ContactItem({
  item,
  ...rest
}: {
  item: SupportOnlineInfo,
  [x: string]: any
}) {
  const { handleShowFormContact, handleDeleteContact } = rest
  const getIcon = () => {
    switch (item.appName) {
      case SUPPORT_ONLINE.PHONE:
        return <PhoneIcon fill="#F45538" />;
      case SUPPORT_ONLINE.FACEBOOK:
        return <MessengerIcon />;
      case SUPPORT_ONLINE.ZALO:
        return <ZaloIcon />;
      default:
        return <PhoneIcon fill="#F45538" />;
    }
  }
  return (
    <div
      className="border border-gray-003 flex py-6 px-7 rounded-md gap-8 justify-between items-center"
    >
      <div className="flex items-center gap-[22px]">
        <div className="w-[50px] h-[50px] flex items-center">
          {getIcon()}
        </div>
        <div className="flex flex-col gap-[14px]">
          <p className="text-lg font-bold text-[#303030] break-all">{item.fullname}</p>
          <p className="text-lg font-normal text-[#8E8E8E] break-all">{item.script}</p>
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <EditIcon
          className="cursor-pointer"
          onClick={() => handleShowFormContact(item)}
        />
        <TrashCanIcon
          className="cursor-pointer"
          onClick={() => handleDeleteContact(item.id)}
        />
      </div>
    </div>
  )
}