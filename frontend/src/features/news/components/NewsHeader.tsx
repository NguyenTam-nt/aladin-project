import { ICArrowDown } from "@assets/icons/ICArrowDown";
import { HeaderTilteLink } from "@components/HeaderTilteLink";
import { rootRouter } from "@constants/router";
import { TranslateContext } from "@contexts/Translation";
import { HeaderSubNavigationLink } from "layouts/Header/components/HeaderNavigation";
import React, { useContext } from "react";
import { Link } from "react-router-dom";


type routeProps = {
  item: ItemProps;
};

type ItemProps = {
  path: string;
  name: string;
  element: any;
  isHiden?: boolean;
};

const NewTextOptions = (props: routeProps) => {
  const { t } = useContext(TranslateContext);

  const { item } = props;

  return (
    <Link
      className="ml-[24px] text-text_primary text-_18  font-semibold"
      to={item.path}
    >
      {t(item.name)}
    </Link>
  );
};

const NewsHeader = () => {
  const { t } = useContext(TranslateContext);

  return (


      <HeaderTilteLink></HeaderTilteLink>
    
  );
};

export default NewsHeader;
