import { LogOut } from "@assets/icons";
import useI18n from "@hooks/useI18n";
import AuthService from "@services/AuthServices";
import { colors } from "@utility/colors";
import { ROUTES } from "@utility/constants";
import { RouterManage } from "@utility/routers";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
interface Props {
  onClickActive?: () => void;
}
interface Props {
  item: {
    path: string;
    exact?: boolean;
    name?: string;
    icon?: any;
  };
}
const RenderLink = (props: Props) => {
  const { t } = useI18n();

  const resolved = useResolvedPath(`${props.item.path}`);
  const match = useMatch({ path: resolved.pathname, end: false });
  return (
    <NavLink
      to={props.item.path}
      className={({ isActive }) => {
        return (
          " flex gap-[10px] border-l-4 items-center py-[15px] leading-22 pl-[23px] text-sm font-normal " +
          (isActive
            ? "border-l-main text-main"
            : " border-l-transparent font-normal ")
        );
      }}
    >
      <div className="w-7">
        <props.item.icon
           color={match ? colors.darkOrange : colors.black02}
        />
      </div>
      {t(props.item?.name || "")}
    </NavLink>
  );
};
function NavigationAdmin() {
  const { t } = useI18n();
  const handleLogout = () => {
    AuthService.doLogout();
  };
  return (
    <div className="pt-[10px] border-r-[1px] border-b-[1px] border-r-gray-200 border-b-gray-200 border-transparent h-full xl:block flex flex-col">
      {/* new changes 22/4 2022*/}
      <ul>
        {RouterManage.map((item, index) => {
          return !item.isHidden ? (
            <li key={index}>
              <RenderLink item={item} />
            </li>
          ) : null;
        })}
      </ul>
      <div
        onClick={handleLogout}
        className="pl-[23px] py-6 cursor-pointer flex gap-5 items-center"
      >
        <LogOut className="" />
        <p className="font-medium text-base leading-21px tracking-[.03]">
          {t("router.logout")}
        </p>
      </div>
    </div>
  );
}

export default NavigationAdmin;
